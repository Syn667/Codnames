import { NextRequest, NextResponse } from 'next/server';
import { getRoom, saveRoom } from '@/lib/realtime/roomStore';
import {
  endTurn,
  generateBoard,
  makeGuess,
  startRematch,
  submitClue,
  toggleSuggestion,
} from '@/lib/gameEngine';
import { ActiveTeam, Player, Role, Team } from '@/types/game';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const body = await req.json();
    const { action, playerId } = body;

    const room = await getRoom(code);
    if (!room) {
      return NextResponse.json({ error: 'Room not found.' }, { status: 404 });
    }

    let updatedRoom = { ...room };

    switch (action) {
      case 'join': {
        const { nickname, avatarId = 'red_1', preferredTeam } = body;
        if (!nickname || typeof nickname !== 'string' || !nickname.trim()) {
          return NextResponse.json({ error: 'Nickname is required.' }, { status: 400 });
        }

        const id = playerId || `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const existingPlayer = updatedRoom.players[id];

        // Determine initial team: if preferredTeam is specified use it, else pick team with fewer players
        let assignedTeam: Team = preferredTeam || 'red';
        if (!preferredTeam && !existingPlayer) {
          const redCount = Object.values(updatedRoom.players).filter((p) => p.team === 'red').length;
          const blueCount = Object.values(updatedRoom.players).filter((p) => p.team === 'blue').length;
          assignedTeam = redCount <= blueCount ? 'red' : 'blue';
        }

        const player: Player = {
          id,
          nickname: nickname.trim(),
          avatarId: avatarId || existingPlayer?.avatarId || 'red_1',
          team: existingPlayer ? existingPlayer.team : assignedTeam,
          role: existingPlayer ? existingPlayer.role : 'operative',
          isHost: existingPlayer ? existingPlayer.isHost : Object.keys(updatedRoom.players).length === 0,
          joinedAt: existingPlayer ? existingPlayer.joinedAt : Date.now(),
          lastActive: Date.now(),
        };

        updatedRoom.players = {
          ...updatedRoom.players,
          [id]: player,
        };

        if (!existingPlayer) {
          updatedRoom.log = [
            {
              id: `log_${Date.now()}_${Math.random()}`,
              timestamp: Date.now(),
              type: 'player_join',
              message: `${player.nickname} joined the room.`,
            },
            ...updatedRoom.log,
          ];
        }

        await saveRoom(updatedRoom);
        return NextResponse.json({ room: updatedRoom, playerId: id });
      }

      case 'switch_team': {
        const { team } = body as { team: Team };
        const player = updatedRoom.players[playerId];
        if (!player) return NextResponse.json({ error: 'Player not found.' }, { status: 404 });

        updatedRoom.players = {
          ...updatedRoom.players,
          [playerId]: {
            ...player,
            team,
            role: team === 'spectator' ? 'operative' : player.role,
            lastActive: Date.now(),
          },
        };

        await saveRoom(updatedRoom);
        return NextResponse.json({ room: updatedRoom });
      }

      case 'switch_role': {
        const { role } = body as { role: Role };
        const player = updatedRoom.players[playerId];
        if (!player) return NextResponse.json({ error: 'Player not found.' }, { status: 404 });
        if (player.team === 'spectator') {
          return NextResponse.json({ error: 'Spectators cannot become Spymasters.' }, { status: 400 });
        }

        updatedRoom.players = {
          ...updatedRoom.players,
          [playerId]: {
            ...player,
            role,
            lastActive: Date.now(),
          },
        };

        await saveRoom(updatedRoom);
        return NextResponse.json({ room: updatedRoom });
      }

      case 'update_settings': {
        const player = updatedRoom.players[playerId];
        if (!player || !player.isHost) {
          return NextResponse.json({ error: 'Only the host can modify game settings.' }, { status: 403 });
        }

        const { settings } = body;
        if (!settings) return NextResponse.json({ error: 'Settings payload missing.' }, { status: 400 });

        updatedRoom.settings = {
          ...updatedRoom.settings,
          ...settings,
        };

        // If in lobby, regenerate the board to apply changes immediately
        if (updatedRoom.status === 'lobby') {
          const { cards, startingTeam, score } = generateBoard(updatedRoom.settings);
          updatedRoom.cards = cards;
          updatedRoom.startingTeam = startingTeam;
          updatedRoom.score = score;
          updatedRoom.turn.team = startingTeam;
        }

        await saveRoom(updatedRoom);
        return NextResponse.json({ room: updatedRoom });
      }

      case 'start_game': {
        const player = updatedRoom.players[playerId];
        if (!player || !player.isHost) {
          return NextResponse.json({ error: 'Only the host can start the game.' }, { status: 403 });
        }

        // Generate fresh board
        const { cards, startingTeam, score } = generateBoard(updatedRoom.settings);
        const timerExpiresAt =
          updatedRoom.settings.timerDuration > 0
            ? Date.now() + updatedRoom.settings.timerDuration * 1000
            : null;

        updatedRoom = {
          ...updatedRoom,
          status: 'playing',
          cards,
          startingTeam,
          turn: {
            team: startingTeam,
            phase: 'clue',
            currentClue: null,
            guessesRemaining: 0,
            guessesMadeThisTurn: 0,
            turnStartedAt: Date.now(),
            timerExpiresAt,
          },
          score,
          winner: null,
          winReason: null,
          log: [
            {
              id: `log_${Date.now()}_${Math.random()}`,
              timestamp: Date.now(),
              type: 'game_start',
              message: `🎮 Game started by ${player.nickname}! ${startingTeam.toUpperCase()} team has 9 words and gives the first clue.`,
            },
            ...updatedRoom.log,
          ],
        };

        await saveRoom(updatedRoom);
        return NextResponse.json({ room: updatedRoom });
      }

      case 'give_clue': {
        const { clueWord, clueCount } = body;
        const result = submitClue(updatedRoom, playerId, clueWord, clueCount);
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }

        await saveRoom(result.room);
        return NextResponse.json({ room: result.room });
      }

      case 'guess': {
        const { cardId } = body;
        const result = makeGuess(updatedRoom, playerId, cardId);
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }

        await saveRoom(result.room);
        return NextResponse.json({ room: result.room, cardType: result.result });
      }

      case 'suggest': {
        const { cardId } = body;
        const updated = toggleSuggestion(updatedRoom, playerId, cardId);
        await saveRoom(updated);
        return NextResponse.json({ room: updated });
      }

      case 'end_turn': {
        const { reason = 'pass' } = body;
        const updated = endTurn(updatedRoom, playerId, reason);
        await saveRoom(updated);
        return NextResponse.json({ room: updated });
      }

      case 'rematch': {
        const updated = startRematch(updatedRoom);
        await saveRoom(updated);
        return NextResponse.json({ room: updated });
      }

      case 'randomize_teams': {
        const player = updatedRoom.players[playerId];
        if (!player || !player.isHost) {
          return NextResponse.json({ error: 'Only the host can randomize teams.' }, { status: 403 });
        }

        const playerList = Object.values(updatedRoom.players).filter((p) => p.team !== 'spectator');
        // Shuffle and split equally
        const shuffled = [...playerList].sort(() => Math.random() - 0.5);
        const updatedPlayers = { ...updatedRoom.players };

        shuffled.forEach((p, idx) => {
          const assignedTeam: ActiveTeam = idx % 2 === 0 ? 'red' : 'blue';
          updatedPlayers[p.id] = {
            ...p,
            team: assignedTeam,
            role: 'operative', // reset role
          };
        });

        updatedRoom.players = updatedPlayers;
        await saveRoom(updatedRoom);
        return NextResponse.json({ room: updatedRoom });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: unknown) {
    console.error('Action error:', err);
    return NextResponse.json({ error: 'Failed to execute action.' }, { status: 500 });
  }
}
