import { NextRequest, NextResponse } from 'next/server';
import { getRoom } from '@/lib/realtime/roomStore';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    if (!code) {
      return NextResponse.json({ error: 'Room code missing.' }, { status: 400 });
    }

    const room = await getRoom(code);
    if (!room) {
      return NextResponse.json({ error: 'Room not found.' }, { status: 404 });
    }

    return NextResponse.json({ room });
  } catch (err: unknown) {
    console.error('Error fetching room:', err);
    return NextResponse.json({ error: 'Failed to fetch room.' }, { status: 500 });
  }
}
