import { Room } from '@/types/game';

// In-memory room store (preserved across module reloads in Node / Next dev)
const globalRooms = global as unknown as {
  __CODNAMES_ROOMS__?: Map<string, Room>;
};

if (!globalRooms.__CODNAMES_ROOMS__) {
  globalRooms.__CODNAMES_ROOMS__ = new Map<string, Room>();
}

const memoryStore = globalRooms.__CODNAMES_ROOMS__;

/**
 * Check if Upstash Redis credentials are present in the environment (for Vercel serverless persistence)
 */
function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

/**
 * Fetch room by code (case-insensitive)
 */
export async function getRoom(code: string): Promise<Room | null> {
  const normalizedCode = code.toLowerCase().trim();
  const upstash = getUpstashConfig();

  if (upstash) {
    try {
      const res = await fetch(`${upstash.url}/get/room:${normalizedCode}`, {
        headers: { Authorization: `Bearer ${upstash.token}` },
        cache: 'no-store',
      });
      const data = await res.json();
      if (data && data.result) {
        return JSON.parse(data.result) as Room;
      }
    } catch (err) {
      console.error('Error fetching from Upstash Redis, falling back to memory:', err);
    }
  }

  return memoryStore.get(normalizedCode) || null;
}

/**
 * Save or update room
 */
export async function saveRoom(room: Room): Promise<void> {
  const normalizedCode = room.code.toLowerCase().trim();
  memoryStore.set(normalizedCode, room);

  const upstash = getUpstashConfig();
  if (upstash) {
    try {
      // Set with 24-hour expiration (86400 seconds)
      await fetch(
        `${upstash.url}/set/room:${normalizedCode}/${encodeURIComponent(
          JSON.stringify(room)
        )}?ex=86400`,
        {
          headers: { Authorization: `Bearer ${upstash.token}` },
          cache: 'no-store',
        }
      );
    } catch (err) {
      console.error('Error persisting to Upstash Redis:', err);
    }
  }
}

/**
 * Delete a room
 */
export async function deleteRoom(code: string): Promise<void> {
  const normalizedCode = code.toLowerCase().trim();
  memoryStore.delete(normalizedCode);

  const upstash = getUpstashConfig();
  if (upstash) {
    try {
      await fetch(`${upstash.url}/del/room:${normalizedCode}`, {
        headers: { Authorization: `Bearer ${upstash.token}` },
        cache: 'no-store',
      });
    } catch (err) {
      console.error('Error deleting from Upstash Redis:', err);
    }
  }
}
