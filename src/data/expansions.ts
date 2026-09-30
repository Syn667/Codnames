import { ExpansionPackMetadata } from '@/types/game';
import classicWords from './words/classic.json';
import duetWords from './words/duet.json';
import deepUndercoverWords from './words/deep_undercover.json';
import scifiWords from './words/scifi.json';
import fairytalesWords from './words/fairytales.json';
import crittersWords from './words/critters.json';
import criticalRoleWords from './words/critical_role.json';
import hogwartsWords from './words/hogwarts.json';
import marvelWords from './words/marvel.json';
import disneyWords from './words/disney.json';
import simpsonsWords from './words/simpsons.json';
import blizzardWords from './words/blizzard.json';
import techWords from './words/tech.json';
import popcultureWords from './words/popculture.json';

export const EXPANSION_PACKS: ExpansionPackMetadata[] = [
  // Core Base Games
  {
    id: 'classic',
    name: 'Codenames Classic',
    category: 'core',
    description: 'The definitive 400-word original Codenames card set.',
    wordCount: classicWords.length,
    badge: 'Original',
  },
  {
    id: 'duet',
    name: 'Codenames: Duet',
    category: 'core',
    description: 'The 400 cooperative word cards designed for two-player or team play.',
    wordCount: duetWords.length,
    badge: 'Co-op',
  },
  {
    id: 'deep_undercover',
    name: 'Deep Undercover 2.1',
    category: 'core',
    description: 'Adults-only edition with 330+ spicy, double-entendre and party words.',
    is18Plus: true,
    wordCount: deepUndercoverWords.length,
    badge: '18+ NSFW',
  },

  // Official New Expansion Packs (codenamesgame.com)
  {
    id: 'scifi',
    name: 'Sci-Fi Expansion Pack',
    category: 'official_expansion',
    description: 'Space exploration, wormholes, cybernetics, alien worlds and astrophysics.',
    wordCount: scifiWords.length,
    badge: 'Official Pack',
  },
  {
    id: 'fairytales',
    name: 'Fairy Tales Expansion Pack',
    category: 'official_expansion',
    description: 'Enchanted folklore, mythology, fables, glass slippers and wishing wells.',
    wordCount: fairytalesWords.length,
    badge: 'Official Pack',
  },
  {
    id: 'critters',
    name: 'Cute Critters Pack',
    category: 'official_expansion',
    description: 'Wildlife, pets, underwater fauna and whimsical creature terms.',
    wordCount: crittersWords.length,
    badge: 'Official Pack',
  },

  // Licensed Universes
  {
    id: 'critical_role',
    name: 'Critical Role & Vox Machina',
    category: 'licensed',
    description: 'D&D roleplaying, Exandria lore, spells, taverns, and natural 20s.',
    wordCount: criticalRoleWords.length,
    badge: 'Licensed',
  },
  {
    id: 'hogwarts',
    name: 'Back to Hogwarts',
    category: 'licensed',
    description: 'Wizarding world, Hogwarts houses, spells, magical creatures, and potions.',
    wordCount: hogwartsWords.length,
    badge: 'Licensed',
  },
  {
    id: 'marvel',
    name: 'Marvel Universe',
    category: 'licensed',
    description: 'Superheroes, supervillains, Infinity stones, and cinematic lore.',
    wordCount: marvelWords.length,
    badge: 'Licensed',
  },
  {
    id: 'disney',
    name: 'Disney Family Edition',
    category: 'licensed',
    description: 'Disney animated classics, Pixar wonders, royalty and magical songs.',
    wordCount: disneyWords.length,
    badge: 'Family',
  },
  {
    id: 'simpsons',
    name: 'The Simpsons',
    category: 'licensed',
    description: 'Springfield satire, iconic characters, donuts, and couch gags.',
    wordCount: simpsonsWords.length,
    badge: 'Pop Series',
  },
  {
    id: 'blizzard',
    name: 'Blizzard Universe',
    category: 'licensed',
    description: 'Warcraft, Overwatch, StarCraft, and Diablo mythology.',
    wordCount: blizzardWords.length,
    badge: 'Gaming',
  },

  // Thematic & Tech
  {
    id: 'tech',
    name: 'Tech, Code & AI',
    category: 'thematic',
    description: 'Software development, databases, algorithms, devops, and hacker culture.',
    wordCount: techWords.length,
    badge: 'Developers',
  },
  {
    id: 'popculture',
    name: 'Pop Culture & Cinema',
    category: 'thematic',
    description: 'Blockbusters, red carpets, music award hits, and viral internet culture.',
    wordCount: popcultureWords.length,
    badge: 'Cinema & Music',
  },
];

export const WORD_DICTIONARIES: Record<string, string[]> = {
  classic: classicWords,
  duet: duetWords,
  deep_undercover: deepUndercoverWords,
  scifi: scifiWords,
  fairytales: fairytalesWords,
  critters: crittersWords,
  critical_role: criticalRoleWords,
  hogwarts: hogwartsWords,
  marvel: marvelWords,
  disney: disneyWords,
  simpsons: simpsonsWords,
  blizzard: blizzardWords,
  tech: techWords,
  popculture: popcultureWords,
};

/**
 * Returns a deduplicated array of all available words given a list of selected pack IDs
 * and any custom words provided by the user.
 */
export function getWordPool(selectedPackIds: string[], customWords: string[] = []): string[] {
  const pool = new Set<string>();

  for (const packId of selectedPackIds) {
    const words = WORD_DICTIONARIES[packId];
    if (words) {
      for (const w of words) {
        pool.add(w.trim().toUpperCase());
      }
    }
  }

  for (const w of customWords) {
    const trimmed = w.trim().toUpperCase();
    if (trimmed.length > 0) {
      pool.add(trimmed);
    }
  }

  return Array.from(pool);
}
