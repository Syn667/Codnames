export type Team = 'red' | 'blue' | 'spectator';
export type ActiveTeam = 'red' | 'blue';
export type Role = 'operative' | 'spymaster';
export type CardType = 'red' | 'blue' | 'bystander' | 'assassin';

export interface Player {
  id: string;
  nickname: string;
  avatarId: string;
  team: Team;
  role: Role;
  isHost: boolean;
  joinedAt: number;
  lastActive: number;
}

export interface CardSuggestion {
  playerId: string;
  nickname: string;
  team: ActiveTeam;
}

export interface Card {
  id: number;
  word: string;
  type: CardType;
  revealed: boolean;
  revealedByTeam?: ActiveTeam;
  characterId: string; // Identifier for consistent character artwork
  suggestions: CardSuggestion[];
}

export interface Clue {
  word: string;
  count: number | 'unlimited' | 'zero';
  team: ActiveTeam;
  timestamp: number;
  spymasterId: string;
  spymasterName: string;
}

export interface TurnState {
  team: ActiveTeam;
  phase: 'clue' | 'guess';
  currentClue: Clue | null;
  guessesRemaining: number;
  guessesMadeThisTurn: number;
  turnStartedAt: number;
  timerExpiresAt: number | null;
}

export type LogEventType =
  | 'game_start'
  | 'clue'
  | 'guess'
  | 'pass'
  | 'timer_expired'
  | 'game_over'
  | 'player_join'
  | 'player_leave'
  | 'rematch';

export interface GameLogEntry {
  id: string;
  timestamp: number;
  type: LogEventType;
  message: string;
  team?: ActiveTeam;
  details?: {
    word?: string;
    cardType?: CardType;
    clueWord?: string;
    clueCount?: number | 'unlimited' | 'zero';
    playerName?: string;
    winner?: ActiveTeam;
    reason?: string;
  };
}

export interface GameSettings {
  timerDuration: number; // 0 = unlimited, 60, 90, 120, etc.
  selectedPacks: string[];
  customWords: string[];
  startingTeam: 'random' | 'red' | 'blue';
}

export type GameStatus = 'lobby' | 'playing' | 'game_over';
export type WinReason = 'all_agents_found' | 'assassin_triggered' | 'resigned';

export interface Room {
  code: string;
  createdAt: number;
  hostId: string;
  players: Record<string, Player>;
  status: GameStatus;
  settings: GameSettings;
  cards: Card[];
  startingTeam: ActiveTeam;
  turn: TurnState;
  score: {
    redTotal: number;
    blueTotal: number;
    redRemaining: number;
    blueRemaining: number;
  };
  winner: ActiveTeam | null;
  winReason: WinReason | null;
  log: GameLogEntry[];
}

export interface ExpansionPackMetadata {
  id: string;
  name: string;
  category: 'core' | 'official_expansion' | 'licensed' | 'thematic' | 'custom';
  description: string;
  is18Plus?: boolean;
  wordCount: number;
  badge?: string;
}

export interface CharacterArtInfo {
  id: string;
  name: string;
  category: CardType;
  title: string;
  description: string;
  genderOrArchetype?: string;
}
