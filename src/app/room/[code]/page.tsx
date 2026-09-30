'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GameSettings, Role, Room, Team } from '@/types/game';
import { BoardGrid } from '@/components/board/BoardGrid';
import { TurnIndicator } from '@/components/board/TurnIndicator';
import { ClueBar } from '@/components/board/ClueBar';
import { PlayerRoster } from '@/components/lobby/PlayerRoster';
import { GameSettingsModal } from '@/components/lobby/GameSettingsModal';
import { ShareModal } from '@/components/lobby/ShareModal';
import { GameOverModal } from '@/components/game/GameOverModal';
import { NicknameModal } from '@/components/game/NicknameModal';
import { GameLogDrawer } from '@/components/game/GameLogDrawer';
import { AvatarIcon } from '@/components/art/AvatarIcon';
import { sound } from '@/lib/sound';
import {
  Share2,
  Volume2,
  VolumeX,
  History,
  Shield,
  Layers,
  Home,
  AlertCircle,
} from 'lucide-react';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = (params?.code as string)?.toLowerCase();

  const [room, setRoom] = useState<Room | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [avatarId, setAvatarId] = useState<string>('red_1');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers
  const [showNicknameModal, setShowNicknameModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showLogDrawer, setShowLogDrawer] = useState<boolean>(false);

  // Ref to track previous room state to trigger audio effects on changes
  const prevRoomRef = useRef<Room | null>(null);

  // Load user credentials from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlayerId = localStorage.getItem('codnames_player_id');
      const savedNickname = localStorage.getItem('codnames_nickname');
      const savedAvatarId = localStorage.getItem('codnames_avatar_id');

      if (savedPlayerId) setPlayerId(savedPlayerId);
      if (savedNickname) setNickname(savedNickname);
      if (savedAvatarId) setAvatarId(savedAvatarId);
    }
  }, []);

  // Poll room state
  const fetchRoomState = useCallback(async () => {
    if (!roomCode) return;
    try {
      const res = await fetch(`/api/rooms/${roomCode}`, { cache: 'no-store' });
      if (!res.ok) {
        if (res.status === 404) {
          setError('Room not found. It may have expired or never existed.');
        } else {
          setError('Failed to load room.');
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      const currentRoom = data.room as Room;

      // Play audio cues based on state transitions
      if (prevRoomRef.current) {
        const prev = prevRoomRef.current;

        // Card revealed
        const prevRevealed = prev.cards.filter((c) => c.revealed).length;
        const curRevealed = currentRoom.cards.filter((c) => c.revealed).length;
        if (curRevealed > prevRevealed) {
          sound.playCardFlip();
        }

        // Clue submitted
        if (
          currentRoom.turn.phase === 'guess' &&
          prev.turn.phase === 'clue' &&
          currentRoom.turn.currentClue
        ) {
          sound.playClueGiven();
        }
      }

      prevRoomRef.current = currentRoom;
      setRoom(currentRoom);
      setLoading(false);

      // Check if current user is in the room
      if (playerId && !currentRoom.players[playerId]) {
        // Player has an ID in storage but isn't registered in this specific room yet
        setShowNicknameModal(true);
      } else if (!playerId) {
        setShowNicknameModal(true);
      }
    } catch (err) {
      console.error('Fetch room error:', err);
    }
  }, [roomCode, playerId]);

  useEffect(() => {
    fetchRoomState();
    const interval = setInterval(fetchRoomState, 1200);
    return () => clearInterval(interval);
  }, [fetchRoomState]);

  // Execute room actions
  const executeAction = async (action: string, payload: Record<string, unknown> = {}) => {
    if (!roomCode) return;
    try {
      const res = await fetch(`/api/rooms/${roomCode}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          playerId,
          ...payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Action failed.');
        return;
      }

      if (data.room) {
        setRoom(data.room);
        prevRoomRef.current = data.room;
      }

      if (data.playerId && !playerId) {
        setPlayerId(data.playerId);
        localStorage.setItem('codnames_player_id', data.playerId);
      }
    } catch (err) {
      console.error('Execute action error:', err);
    }
  };

  // Join handler
  const handleJoin = async (joinedNickname: string, joinedAvatarId: string) => {
    setNickname(joinedNickname);
    setAvatarId(joinedAvatarId);

    localStorage.setItem('codnames_nickname', joinedNickname);
    localStorage.setItem('codnames_avatar_id', joinedAvatarId);

    await executeAction('join', {
      nickname: joinedNickname,
      avatarId: joinedAvatarId,
    });

    setShowNicknameModal(false);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-black tracking-widest uppercase text-slate-300">
          Decrypting Room {roomCode?.toUpperCase()}...
        </p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-2xl">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-black uppercase text-white">Mission Aborted</h2>
          <p className="text-xs text-slate-400">{error || 'Room not found.'}</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return to Headquarters
          </button>
        </div>
      </div>
    );
  }

  const currentUser = playerId ? room.players[playerId] || null : null;
  const isHost = currentUser?.isHost ?? false;
  const isMyTurnToGuess =
    room.status === 'playing' &&
    currentUser?.team === room.turn.team &&
    currentUser?.role === 'operative' &&
    room.turn.phase === 'guess';

  const isMyTurnToGiveClue =
    room.status === 'playing' &&
    currentUser?.team === room.turn.team &&
    currentUser?.role === 'spymaster' &&
    room.turn.phase === 'clue';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* GLOBAL GAME HEADER */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Room Code */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex items-center gap-2 group"
              title="Return to Home"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <span className="font-black text-base tracking-wider uppercase hidden sm:inline text-white">
                Cod<span className="text-amber-400">names</span>
              </span>
            </button>

            {/* Room code tag */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Room</span>
              <span className="font-mono font-black text-xs md:text-sm text-amber-300 uppercase tracking-wider">
                {room.code}
              </span>
            </div>
          </div>

          {/* Controls & User Profile */}
          <div className="flex items-center gap-2">
            {/* Share Room Button */}
            <button
              type="button"
              onClick={() => setShowShareModal(true)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Invite</span>
            </button>

            {/* Expansions & Settings (Host only in lobby, or read-only view) */}
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              title="Game Settings & Expansions"
            >
              <Layers className="w-4 h-4 text-blue-400" />
            </button>

            {/* Log Timeline Drawer Button */}
            <button
              type="button"
              onClick={() => setShowLogDrawer(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors relative"
              title="Mission Log"
            >
              <History className="w-4 h-4 text-amber-400" />
              {room.log.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Current Player Badge */}
            {currentUser && (
              <div
                onClick={() => setShowNicknameModal(true)}
                className="flex items-center gap-2 pl-2 border-l border-slate-700 cursor-pointer hover:opacity-80 transition-opacity"
                title="Click to edit codename & avatar"
              >
                <AvatarIcon avatarId={currentUser.avatarId} size="sm" />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                    {currentUser.nickname}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-black ${
                      currentUser.team === 'red'
                        ? 'text-red-400'
                        : currentUser.team === 'blue'
                        ? 'text-blue-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {currentUser.team} • {currentUser.role}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col justify-start py-4">
        {room.status === 'lobby' ? (
          /* LOBBY VIEW */
          <PlayerRoster
            players={room.players}
            currentUserId={playerId || ''}
            isHost={isHost}
            onSwitchTeam={(team: Team) => executeAction('switch_team', { team })}
            onSwitchRole={(role: Role) => executeAction('switch_role', { role })}
            onRandomizeTeams={() => executeAction('randomize_teams')}
            onOpenSettings={() => setShowSettingsModal(true)}
            onStartGame={() => executeAction('start_game')}
          />
        ) : (
          /* ACTIVE GAME VIEW */
          <div className="space-y-4">
            {/* Turn & Score Banner */}
            <TurnIndicator
              turn={room.turn}
              score={room.score}
              currentUser={currentUser}
              onEndTurn={() => executeAction('end_turn', { reason: 'pass' })}
              onTimerExpired={() => executeAction('end_turn', { reason: 'timer' })}
            />

            {/* Spymaster Clue Input Console */}
            {isMyTurnToGiveClue && (
              <ClueBar
                activeTeam={room.turn.team}
                onSubmitClue={(clueWord, clueCount) =>
                  executeAction('give_clue', { clueWord, clueCount })
                }
              />
            )}

            {/* 5x5 Board Grid */}
            <BoardGrid
              cards={room.cards}
              playerRole={currentUser?.role || 'operative'}
              playerTeam={currentUser?.team || 'spectator'}
              isMyTurnToGuess={isMyTurnToGuess}
              onGuess={(cardId) => executeAction('guess', { cardId })}
              onSuggest={(cardId) => executeAction('suggest', { cardId })}
            />
          </div>
        )}
      </main>

      {/* MODALS */}
      <NicknameModal
        isOpen={showNicknameModal}
        initialNickname={nickname}
        initialAvatarId={avatarId}
        onSubmit={handleJoin}
      />

      <GameSettingsModal
        settings={room.settings}
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onSave={(newSettings: GameSettings) =>
          executeAction('update_settings', { settings: newSettings })
        }
      />

      <ShareModal
        roomCode={room.code}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <GameOverModal
        winner={room.winner}
        winReason={room.winReason}
        isOpen={room.status === 'game_over'}
        isHost={isHost}
        onRematch={() => executeAction('rematch')}
      />

      <GameLogDrawer
        log={room.log}
        isOpen={showLogDrawer}
        onClose={() => setShowLogDrawer(false)}
      />
    </div>
  );
}
