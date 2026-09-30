import {
  ActiveTeam,
  Card,
  CardType,
  GameLogEntry,
  GameSettings,
  GameStatus,
  Player,
  Room,
} from '@/types/game';
import { getWordPool } from '@/data/expansions';

/**
 * Fisher-Yates array shuffle
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Default game settings
 */
export const DEFAULT_SETTINGS: GameSettings = {
  timerDuration: 90, // 90 seconds
  selectedPacks: ['classic'],
  customWords: [],
  startingTeam: 'random',
};

/**
 * Generates a fresh 5x5 board with 25 unique words and keycard assignments
 */
export function generateBoard(
  settings: GameSettings,
  forcedStartingTeam?: ActiveTeam
): {
  cards: Card[];
  startingTeam: ActiveTeam;
  score: Room['score'];
} {
  // Determine starting team
  let startingTeam: ActiveTeam = 'red';
  if (forcedStartingTeam) {
    startingTeam = forcedStartingTeam;
  } else if (settings.startingTeam === 'random') {
    startingTeam = Math.random() < 0.5 ? 'red' : 'blue';
  } else {
    startingTeam = settings.startingTeam;
  }

  const secondTeam: ActiveTeam = startingTeam === 'red' ? 'blue' : 'red';

  // Get words pool
  const pool = getWordPool(settings.selectedPacks, settings.customWords);
  const shuffledPool = shuffle(pool);
  const chosenWords = shuffledPool.slice(0, 25);

  // If pool didn't have 25 words, fill with classic
  if (chosenWords.length < 25) {
    const fallback = getWordPool(['classic']);
    for (const w of shuffle(fallback)) {
      if (!chosenWords.includes(w)) {
        chosenWords.push(w);
      }
      if (chosenWords.length === 25) break;
    }
  }

  // Create card types distribution:
  // Starting team: 9
  // Second team: 8
  // Bystanders: 7
  // Assassin: 1
  const cardAssignments: { type: CardType; characterId: string }[] = [];

  // 9 cards for starting team
  const startPrefix = startingTeam;
  for (let i = 1; i <= 9; i++) {
    cardAssignments.push({
      type: startingTeam,
      characterId: `${startPrefix}_${i}`,
    });
  }

  // 8 cards for second team
  const secondPrefix = secondTeam;
  for (let i = 1; i <= 8; i++) {
    cardAssignments.push({
      type: secondTeam,
      characterId: `${secondPrefix}_${i}`,
    });
  }

  // 7 Innocent Bystanders
  for (let i = 1; i <= 7; i++) {
    cardAssignments.push({
      type: 'bystander',
      characterId: `bystander_${i}`,
    });
  }

  // 1 Assassin
  cardAssignments.push({
    type: 'assassin',
    characterId: 'assassin_1',
  });

  // Shuffle the assignments across the 25 cards
  const shuffledAssignments = shuffle(cardAssignments);

  const cards: Card[] = chosenWords.map((word, index) => ({
    id: index,
    word,
    type: shuffledAssignments[index].type,
    characterId: shuffledAssignments[index].characterId,
    revealed: false,
    suggestions: [],
  }));

  const redCount = startingTeam === 'red' ? 9 : 8;
  const blueCount = startingTeam === 'blue' ? 9 : 8;

  return {
    cards,
    startingTeam,
    score: {
      redTotal: redCount,
      blueTotal: blueCount,
      redRemaining: redCount,
      blueRemaining: blueCount,
    },
  };
}

/**
 * Initializes a new room
 */
export function createRoom(
  code: string,
  hostPlayer: Player,
  settings: GameSettings = DEFAULT_SETTINGS
): Room {
  const { cards, startingTeam, score } = generateBoard(settings);

  const timerExpiresAt =
    settings.timerDuration > 0
      ? Date.now() + settings.timerDuration * 1000
      : null;

  return {
    code: code.toLowerCase(),
    createdAt: Date.now(),
    hostId: hostPlayer.id,
    players: {
      [hostPlayer.id]: hostPlayer,
    },
    status: 'lobby',
    settings,
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
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: 'player_join',
        message: `${hostPlayer.nickname} created room ${code.toUpperCase()}.`,
      },
    ],
  };
}

/**
 * Validates and submits a Spymaster clue
 */
export function submitClue(
  room: Room,
  playerId: string,
  clueWord: string,
  clueCount: number | 'unlimited' | 'zero'
): { room: Room; error?: string } {
  if (room.status !== 'playing') {
    return { room, error: 'Game is not currently active.' };
  }

  const player = room.players[playerId];
  if (!player) {
    return { room, error: 'Player not found in room.' };
  }

  if (player.team !== room.turn.team) {
    return { room, error: `It is currently ${room.turn.team.toUpperCase()} team's turn.` };
  }

  if (player.role !== 'spymaster') {
    return { room, error: 'Only the Spymaster can submit a clue.' };
  }

  if (room.turn.phase !== 'clue') {
    return { room, error: 'A clue has already been submitted for this turn.' };
  }

  const cleanWord = clueWord.trim().toUpperCase();
  if (!cleanWord || cleanWord.includes(' ')) {
    return { room, error: 'Clue must be a single word with no spaces.' };
  }

  // Calculate guesses allowed:
  // Codenames official rule: Spymaster gives N -> Operatives get N + 1 guesses
  // If unlimited or 0 -> Unlimited guesses (set to 99)
  let guessesRemaining = 99;
  if (typeof clueCount === 'number' && clueCount > 0) {
    guessesRemaining = clueCount + 1;
  }

  const timerExpiresAt =
    room.settings.timerDuration > 0
      ? Date.now() + room.settings.timerDuration * 1000
      : null;

  const clue = {
    word: cleanWord,
    count: clueCount,
    team: room.turn.team,
    timestamp: Date.now(),
    spymasterId: player.id,
    spymasterName: player.nickname,
  };

  const countDisplay = clueCount === 'unlimited' ? '∞' : clueCount;
  const logEntry: GameLogEntry = {
    id: `log_${Date.now()}_${Math.random()}`,
    timestamp: Date.now(),
    type: 'clue',
    team: room.turn.team,
    message: `${player.nickname} gave clue: "${cleanWord}" (${countDisplay})`,
    details: {
      clueWord: cleanWord,
      clueCount,
      playerName: player.nickname,
    },
  };

  const updatedRoom: Room = {
    ...room,
    turn: {
      ...room.turn,
      phase: 'guess',
      currentClue: clue,
      guessesRemaining,
      guessesMadeThisTurn: 0,
      timerExpiresAt,
    },
    log: [logEntry, ...room.log],
  };

  return { room: updatedRoom };
}

/**
 * Operative makes a guess on a card
 */
export function makeGuess(
  room: Room,
  playerId: string,
  cardId: number
): { room: Room; result?: CardType; error?: string } {
  if (room.status !== 'playing') {
    return { room, error: 'Game is not currently active.' };
  }

  const player = room.players[playerId];
  if (!player) {
    return { room, error: 'Player not found.' };
  }

  if (player.team !== room.turn.team) {
    return { room, error: `It is currently ${room.turn.team.toUpperCase()} team's turn.` };
  }

  if (player.role !== 'operative') {
    return { room, error: 'Only Operatives can guess cards.' };
  }

  if (room.turn.phase !== 'guess') {
    return { room, error: 'Waiting for Spymaster to give a clue first.' };
  }

  const card = room.cards.find((c) => c.id === cardId);
  if (!card) {
    return { room, error: 'Card not found.' };
  }

  if (card.revealed) {
    return { room, error: 'Card is already revealed.' };
  }

  const activeTeam = room.turn.team;
  const otherTeam: ActiveTeam = activeTeam === 'red' ? 'blue' : 'red';
  const cardType = card.type;

  // Reveal the card
  const newCards = room.cards.map((c) =>
    c.id === cardId
      ? {
          ...c,
          revealed: true,
          revealedByTeam: activeTeam,
          suggestions: [],
        }
      : c
  );

  let newScore = { ...room.score };
  let newStatus: GameStatus = room.status;
  let newWinner = room.winner;
  let newWinReason = room.winReason;
  let nextTeam: ActiveTeam = activeTeam;
  let nextPhase: 'clue' | 'guess' = room.turn.phase;
  let remainingGuesses = room.turn.guessesRemaining - 1;
  const guessesMadeThisTurn = room.turn.guessesMadeThisTurn + 1;

  // Track event for log
  let logMessage = '';

  if (cardType === activeTeam) {
    // Correct card!
    if (activeTeam === 'red') {
      newScore.redRemaining = Math.max(0, newScore.redRemaining - 1);
    } else {
      newScore.blueRemaining = Math.max(0, newScore.blueRemaining - 1);
    }

    logMessage = `${player.nickname} correctly guessed "${card.word}" (${activeTeam.toUpperCase()} Agent)!`;

    // Check if active team won
    const activeTeamRemaining =
      activeTeam === 'red' ? newScore.redRemaining : newScore.blueRemaining;

    if (activeTeamRemaining === 0) {
      newStatus = 'game_over';
      newWinner = activeTeam;
      newWinReason = 'all_agents_found';
      logMessage += ` ${activeTeam.toUpperCase()} team has found all agents and WINS!`;
    } else if (remainingGuesses <= 0) {
      // Out of guesses -> switch turn
      nextTeam = otherTeam;
      nextPhase = 'clue';
      logMessage += ` Out of guesses. Turn passes to ${otherTeam.toUpperCase()}.`;
    }
  } else if (cardType === otherTeam) {
    // Guessed opponent's card!
    if (otherTeam === 'red') {
      newScore.redRemaining = Math.max(0, newScore.redRemaining - 1);
    } else {
      newScore.blueRemaining = Math.max(0, newScore.blueRemaining - 1);
    }

    logMessage = `${player.nickname} guessed "${card.word}" - it was a ${otherTeam.toUpperCase()} Agent! Turn ends.`;

    // Check if other team accidentally won
    const otherTeamRemaining =
      otherTeam === 'red' ? newScore.redRemaining : newScore.blueRemaining;

    if (otherTeamRemaining === 0) {
      newStatus = 'game_over';
      newWinner = otherTeam;
      newWinReason = 'all_agents_found';
      logMessage += ` ${otherTeam.toUpperCase()} team has all agents revealed and WINS!`;
    } else {
      nextTeam = otherTeam;
      nextPhase = 'clue';
    }
  } else if (cardType === 'bystander') {
    // Innocent bystander
    logMessage = `${player.nickname} guessed "${card.word}" - Innocent Bystander! Turn ends.`;
    nextTeam = otherTeam;
    nextPhase = 'clue';
  } else if (cardType === 'assassin') {
    // ASSASSIN TRIGGERED! Instant Loss for active team!
    newStatus = 'game_over';
    newWinner = otherTeam;
    newWinReason = 'assassin_triggered';
    logMessage = `🚨 ${player.nickname} touched the ASSASSIN ("${card.word}")! ${activeTeam.toUpperCase()} loses instantly! ${otherTeam.toUpperCase()} WINS!`;
  }

  const logEntry: GameLogEntry = {
    id: `log_${Date.now()}_${Math.random()}`,
    timestamp: Date.now(),
    type: cardType === 'assassin' ? 'game_over' : 'guess',
    team: activeTeam,
    message: logMessage,
    details: {
      word: card.word,
      cardType,
      playerName: player.nickname,
      winner: newWinner || undefined,
      reason: newWinReason || undefined,
    },
  };

  const timerExpiresAt =
    newStatus === 'playing' && room.settings.timerDuration > 0
      ? Date.now() + room.settings.timerDuration * 1000
      : null;

  const updatedRoom: Room = {
    ...room,
    cards: newCards,
    score: newScore,
    status: newStatus,
    winner: newWinner,
    winReason: newWinReason,
    turn: {
      team: nextTeam,
      phase: nextPhase,
      currentClue: nextTeam === activeTeam ? room.turn.currentClue : null,
      guessesRemaining: nextTeam === activeTeam ? remainingGuesses : 0,
      guessesMadeThisTurn: nextTeam === activeTeam ? guessesMadeThisTurn : 0,
      turnStartedAt: nextTeam === activeTeam ? room.turn.turnStartedAt : Date.now(),
      timerExpiresAt,
    },
    log: [logEntry, ...room.log],
  };

  return { room: updatedRoom, result: cardType };
}

/**
 * Operatives can toggle a suggestion token on a card before confirming
 */
export function toggleSuggestion(
  room: Room,
  playerId: string,
  cardId: number
): Room {
  const player = room.players[playerId];
  if (!player || player.team === 'spectator') return room;

  const activeTeam = player.team as ActiveTeam;

  const newCards = room.cards.map((c) => {
    if (c.id !== cardId || c.revealed) return c;

    const existingIndex = c.suggestions.findIndex((s) => s.playerId === playerId);
    let newSuggestions = [...c.suggestions];

    if (existingIndex >= 0) {
      newSuggestions.splice(existingIndex, 1);
    } else {
      newSuggestions.push({
        playerId,
        nickname: player.nickname,
        team: activeTeam,
      });
    }

    return {
      ...c,
      suggestions: newSuggestions,
    };
  });

  return {
    ...room,
    cards: newCards,
  };
}

/**
 * Pass / End turn
 */
export function endTurn(
  room: Room,
  playerId?: string,
  reason: 'pass' | 'timer' = 'pass'
): Room {
  if (room.status !== 'playing') return room;

  const activeTeam = room.turn.team;
  const nextTeam: ActiveTeam = activeTeam === 'red' ? 'blue' : 'red';
  const player = playerId ? room.players[playerId] : null;

  const message =
    reason === 'timer'
      ? `⏰ Turn timer expired! Turn passes to ${nextTeam.toUpperCase()}.`
      : `${player?.nickname || activeTeam.toUpperCase()} ended their turn. It is now ${nextTeam.toUpperCase()}'s turn.`;

  const logEntry: GameLogEntry = {
    id: `log_${Date.now()}_${Math.random()}`,
    timestamp: Date.now(),
    type: reason === 'timer' ? 'timer_expired' : 'pass',
    team: activeTeam,
    message,
  };

  const timerExpiresAt =
    room.settings.timerDuration > 0
      ? Date.now() + room.settings.timerDuration * 1000
      : null;

  return {
    ...room,
    turn: {
      team: nextTeam,
      phase: 'clue',
      currentClue: null,
      guessesRemaining: 0,
      guessesMadeThisTurn: 0,
      turnStartedAt: Date.now(),
      timerExpiresAt,
    },
    log: [logEntry, ...room.log],
  };
}

/**
 * Starts a rematch / fresh board while keeping all players in the room
 */
export function startRematch(room: Room): Room {
  // Flip starting team for fairness in rematch
  const nextStartingTeam: ActiveTeam =
    room.startingTeam === 'red' ? 'blue' : 'red';

  const { cards, startingTeam, score } = generateBoard(
    room.settings,
    nextStartingTeam
  );

  const timerExpiresAt =
    room.settings.timerDuration > 0
      ? Date.now() + room.settings.timerDuration * 1000
      : null;

  const logEntry: GameLogEntry = {
    id: `log_${Date.now()}_${Math.random()}`,
    timestamp: Date.now(),
    type: 'rematch',
    message: `🔄 New game started! ${startingTeam.toUpperCase()} team goes first.`,
  };

  return {
    ...room,
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
    log: [logEntry, ...room.log],
  };
}
