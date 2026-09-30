import { CharacterArtInfo } from '@/types/game';

export const CHARACTERS: Record<string, CharacterArtInfo> = {
  // Red Agents
  red_1: {
    id: 'red_1',
    name: 'Agent Crimson',
    category: 'red',
    title: 'The Mastermind',
    description: 'Senior field strategist with a trench coat, fedora, and classified dossiers.',
  },
  red_2: {
    id: 'red_2',
    name: 'Agent Rouge',
    category: 'red',
    title: 'The Infiltrator',
    description: 'Stealth specialist equipped with mirrored sunglasses and compact communicator.',
  },
  red_3: {
    id: 'red_3',
    name: 'Agent Scarlett',
    category: 'red',
    title: 'The Cryptographer',
    description: 'Codebreaker decoding encrypted enemy transmissions on a miniature cipher machine.',
  },
  red_4: {
    id: 'red_4',
    name: 'Agent Fox',
    category: 'red',
    title: 'The Surveillance Pro',
    description: 'Tactical listening post operative with headset and micro-recording reel.',
  },
  red_5: {
    id: 'red_5',
    name: 'Agent Garnet',
    category: 'red',
    title: 'The Courier',
    description: 'High-speed diplomat with locked steel briefcase and disguise credentials.',
  },
  red_6: {
    id: 'red_6',
    name: 'Agent Phoenix',
    category: 'red',
    title: 'The Saboteur',
    description: 'Expert demolitionist wielding precision wirecutters and laser pen.',
  },
  red_7: {
    id: 'red_7',
    name: 'Agent Ruby',
    category: 'red',
    title: 'The Quartermaster',
    description: 'Provides customized hidden compartments and high-tech gadgets.',
  },
  red_8: {
    id: 'red_8',
    name: 'Agent Ember',
    category: 'red',
    title: 'The Lookout',
    description: 'High-rise scout scanning rooftops with night-vision binoculars.',
  },
  red_9: {
    id: 'red_9',
    name: 'Agent Blaze',
    category: 'red',
    title: 'The Deep Cover Asset',
    description: 'Operative behind enemy lines blending effortlessly into high society.',
  },

  // Blue Agents
  blue_1: {
    id: 'blue_1',
    name: 'Agent Cobalt',
    category: 'blue',
    title: 'Director of Ops',
    description: 'Strategic commander directing maneuvers with tactical headset and earpiece.',
  },
  blue_2: {
    id: 'blue_2',
    name: 'Agent Sapphire',
    category: 'blue',
    title: 'The Counter-Hacker',
    description: 'Cyber operative breaching mainframe firewalls on a ruggedized terminal.',
  },
  blue_3: {
    id: 'blue_3',
    name: 'Agent Indigo',
    category: 'blue',
    title: 'The Extraction Pilot',
    description: 'Aviator in flight jacket ready for high-speed helicopter extractions.',
  },
  blue_4: {
    id: 'blue_4',
    name: 'Agent Azure',
    category: 'blue',
    title: 'The Field Specialist',
    description: 'Sharpshooter tracking movement through crosshair scopes.',
  },
  blue_5: {
    id: 'blue_5',
    name: 'Agent Sterling',
    category: 'blue',
    title: 'The Forger',
    description: 'Documents expert producing indistinguishable diplomatic passports.',
  },
  blue_6: {
    id: 'blue_6',
    name: 'Agent Marine',
    category: 'blue',
    title: 'The Deep Diver',
    description: 'Amphibious reconnaissance operative with underwater breathing gear.',
  },
  blue_7: {
    id: 'blue_7',
    name: 'Agent Cyan',
    category: 'blue',
    title: 'The Medic',
    description: 'Field doctor with emergency antidotes and forensic chemistry kit.',
  },
  blue_8: {
    id: 'blue_8',
    name: 'Agent Ghost',
    category: 'blue',
    title: 'The Interrogator',
    description: 'Psychological profiler discerning double-agents from loyal operatives.',
  },
  blue_9: {
    id: 'blue_9',
    name: 'Agent Sky',
    category: 'blue',
    title: 'The Tech Specialist',
    description: 'Drone operator maintaining aerial overwatch with micro-transponders.',
  },

  // Innocent Bystanders
  bystander_1: {
    id: 'bystander_1',
    name: 'The Tourist',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Clutching a vintage camera and unfolding an oversized city street map.',
  },
  bystander_2: {
    id: 'bystander_2',
    name: 'The Barista',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Pouring espresso behind the cafe counter, completely unaware of the undercover deal.',
  },
  bystander_3: {
    id: 'bystander_3',
    name: 'The Dog Walker',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Strolling through the park while an energetic terrier tangles the leashes.',
  },
  bystander_4: {
    id: 'bystander_4',
    name: 'The Newspaper Reader',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Reading the morning classifieds on a park bench with hole-free ordinary glasses.',
  },
  bystander_5: {
    id: 'bystander_5',
    name: 'The Librarian',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Stacking antique encyclopedias, strictly enforcing quiet in the archives.',
  },
  bystander_6: {
    id: 'bystander_6',
    name: 'The Street Musician',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Playing jazz melodies on an accordion on the cobblestone corner.',
  },
  bystander_7: {
    id: 'bystander_7',
    name: 'The Pigeon Feeder',
    category: 'bystander',
    title: 'Innocent Civilian',
    description: 'Scattering crumbs in the plaza surrounded by a flurry of city birds.',
  },

  // The Secret Agent Cod
  cod_agent: {
    id: 'cod_agent',
    name: 'Agent Cod',
    category: 'bystander',
    title: 'Secret Agent Codfish',
    description: 'The elusive Secret Agent Codfish wearing sunglasses and bowtie.',
  },

  // Gronk (The Clueless Rookie)
  gronk: {
    id: 'gronk',
    name: 'Gronk',
    category: 'bystander',
    title: 'Clueless Operative',
    description: 'A completely bewildered rookie spy with goofy eyes, bandaid, and crooked tie.',
  },

  // Bighead (The Megamind)
  bighead: {
    id: 'bighead',
    name: 'Bighead',
    category: 'blue',
    title: 'Cranial Strategist',
    description: 'Has a gigantic brain and bulbous cranium, but struggles to fit through doorways.',
  },

  // Demolition / Nitro (Explosives Specialist)
  demolition: {
    id: 'demolition',
    name: 'Nitro',
    category: 'red',
    title: 'Explosives Specialist',
    description: 'Ordnance master equipped with goggles, defusal kit, and remote detonator.',
  },

  // Agent Habib (Suave International Operative)
  habib: {
    id: 'habib',
    name: 'Habib',
    category: 'red',
    title: 'The Diplomatic Infiltrator',
    description: 'Suave international secret agent in a tailored suit and gold aviators.',
  },

  // Agent Seoul
  agent_k: {
    id: 'agent_k',
    name: 'Agent Seoul',
    category: 'blue',
    title: 'Sleek Counter-Intelligence',
    description: 'Ultra-sharp Korean field operative in black turtleneck and tactical earpiece.',
  },

  // Tank
  tank: {
    id: 'tank',
    name: 'Tank',
    category: 'red',
    title: 'Heavy Enforcer',
    description: 'Towering powerhouse with colossal trapezius muscles and tiny sunglasses.',
  },

  // The Assassin
  assassin_1: {
    id: 'assassin_1',
    name: 'The Shadow',
    category: 'assassin',
    title: 'Contract Assassin',
    description: 'Lethal contract killer lurking in pure darkness. Instant game over.',
  },
};

export const AVATAR_OPTIONS = [
  { id: 'cod_agent', name: 'Agent Cod', team: 'spectator' },
  { id: 'gronk', name: 'Gronk', team: 'spectator' },
  { id: 'bighead', name: 'Bighead', team: 'blue' },
  { id: 'habib', name: 'Habib', team: 'red' },
  { id: 'tank', name: 'Tank', team: 'red' },
  { id: 'agent_k', name: 'Agent Seoul', team: 'blue' },
  { id: 'demolition', name: 'Nitro', team: 'red' },
  { id: 'red_1', name: 'Crimson', team: 'red' },
  { id: 'blue_1', name: 'Cobalt', team: 'blue' },
  { id: 'assassin_1', name: 'Shadow', team: 'spectator' },
];
