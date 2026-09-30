import { NextRequest, NextResponse } from 'next/server';
import { createRoom, DEFAULT_SETTINGS } from '@/lib/gameEngine';
import { getRoom, saveRoom } from '@/lib/realtime/roomStore';
import { GameSettings, Player } from '@/types/game';

// Generates a clean, friendly 6-character room code (e.g. "FOX429" or "SPY812")
function generateRoomCode(): string {
  const prefixes = ['SPY', 'FOX', 'EAGLE', 'HAWK', 'AGENT', 'VIPER', 'GHOST', 'SHADOW', 'COBALT', 'ONYX'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${num}`.toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nickname, avatarId = 'red_1', customCode, settings } = body;

    if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
      return NextResponse.json({ error: 'Nickname is required.' }, { status: 400 });
    }

    const code = customCode
      ? customCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
      : generateRoomCode();

    // Check if room already exists
    const existing = await getRoom(code);
    if (existing) {
      return NextResponse.json({ error: 'Room code already exists. Please pick another or leave blank for a random code.' }, { status: 409 });
    }

    const playerId = `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const hostPlayer: Player = {
      id: playerId,
      nickname: nickname.trim(),
      avatarId,
      team: 'red',
      role: 'operative',
      isHost: true,
      joinedAt: Date.now(),
      lastActive: Date.now(),
    };

    const mergedSettings: GameSettings = {
      ...DEFAULT_SETTINGS,
      ...(settings || {}),
    };

    const room = createRoom(code, hostPlayer, mergedSettings);
    await saveRoom(room);

    return NextResponse.json({ room, playerId });
  } catch (err: unknown) {
    console.error('Error creating room:', err);
    return NextResponse.json({ error: 'Failed to create room.' }, { status: 500 });
  }
}
