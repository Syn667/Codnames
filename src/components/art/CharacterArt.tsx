import React from 'react';
import { CardType } from '@/types/game';

interface CharacterArtProps {
  characterId: string;
  category?: CardType;
  className?: string;
  showTitle?: boolean;
}

export const CharacterArt: React.FC<CharacterArtProps> = ({
  characterId,
  category = 'bystander',
  className = 'w-full h-full',
  showTitle = false,
}) => {
  // Common color palettes
  const palettes = {
    red: {
      primary: '#DC2626',
      dark: '#991B1B',
      accent: '#F87171',
      bg: '#450A0A',
      skin: '#E2C2A4',
      shadow: '#330808',
      gear: '#FCA5A5',
    },
    blue: {
      primary: '#2563EB',
      dark: '#1E40AF',
      accent: '#60A5FA',
      bg: '#0F172A',
      skin: '#DFC0A4',
      shadow: '#0B1120',
      gear: '#93C5FD',
    },
    bystander: {
      primary: '#D97706',
      dark: '#78350F',
      accent: '#FBBF24',
      bg: '#292524',
      skin: '#E8C7A7',
      shadow: '#1C1917',
      gear: '#FDE68A',
    },
    assassin: {
      primary: '#111827',
      dark: '#030712',
      accent: '#EF4444', // Sinister red crosshair
      bg: '#090D16',
      skin: '#9CA3AF',
      shadow: '#000000',
      gear: '#4B5563',
    },
  };

  const p =
    characterId.startsWith('red')
      ? palettes.red
      : characterId.startsWith('blue')
      ? palettes.blue
      : characterId.startsWith('assassin')
      ? palettes.assassin
      : palettes.bystander;

  // Render bespoke vector illustrations for each character
  const renderIllustration = () => {
    switch (characterId) {
      // RED AGENTS
      case 'red_1': // Mastermind with fedora and trench collar
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Fedora */}
            <path d="M26 44 C26 44 45 32 60 32 C75 32 94 44 94 44 C88 44 82 40 60 40 C38 40 32 44 26 44 Z" fill={p.dark} />
            <path d="M42 41 C42 27 50 22 60 22 C70 22 78 27 78 41 Z" fill={p.primary} />
            <rect x="42" y="38" width="36" height="4" fill={p.accent} />
            {/* Head & Sunglasses */}
            <path d="M46 44 C46 54 50 63 60 63 C70 63 74 54 74 44 Z" fill={p.skin} />
            <path d="M44 49 C44 47 76 47 76 49 L72 55 C70 57 65 57 63 54 L60 53 L57 54 C55 57 50 57 48 55 Z" fill="#111827" />
            <line x1="48" y1="51" x2="54" y2="51" stroke={p.accent} strokeWidth="1.5" />
            <line x1="66" y1="51" x2="72" y2="51" stroke={p.accent} strokeWidth="1.5" />
            {/* Popped Collar & Coat */}
            <path d="M30 105 L42 66 L55 75 L60 66 L65 75 L78 66 L90 105 Z" fill={p.primary} />
            <path d="M55 75 L60 105 L65 75 Z" fill={p.dark} />
            {/* Red Tie */}
            <polygon points="58,74 62,74 64,88 60,94 56,88" fill={p.accent} />
          </g>
        );

      case 'red_2': // Femme Fatale with sleek updo, sunglasses, communicator
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Hair */}
            <path d="M38 48 C36 30 50 20 60 20 C70 20 84 30 82 48 C82 54 84 62 82 68 C80 62 78 50 78 46 L42 46 C42 50 40 62 38 68 Z" fill="#1C1917" />
            {/* Face */}
            <path d="M45 42 C45 56 50 66 60 66 C70 66 75 56 75 42 Z" fill={p.skin} />
            {/* Cat-eye Sunglasses */}
            <path d="M40 46 L56 46 L53 54 L44 54 Z" fill="#0F172A" />
            <path d="M64 46 L80 46 L76 54 L67 54 Z" fill="#0F172A" />
            <line x1="56" y1="48" x2="64" y2="48" stroke="#0F172A" strokeWidth="2" />
            {/* Red Lips */}
            <path d="M55 60 Q60 63 65 60 Q60 62 55 60 Z" fill={p.accent} />
            {/* High collar trench */}
            <path d="M32 105 L44 70 L60 77 L76 70 L88 105 Z" fill={p.primary} />
            <circle cx="82" cy="78" r="4" fill={p.gear} /> {/* Communicator pin */}
          </g>
        );

      case 'red_3': // Cryptographer with cipher wheel
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Face & Hair */}
            <path d="M44 32 C44 24 54 22 60 22 C66 22 76 24 76 32 C76 34 76 46 76 46 L44 46 Z" fill="#451A03" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Round Glasses */}
            <circle cx="52" cy="48" r="6" fill="none" stroke={p.accent} strokeWidth="2" />
            <circle cx="68" cy="48" r="6" fill="none" stroke={p.accent} strokeWidth="2" />
            <line x1="58" y1="48" x2="62" y2="48" stroke={p.accent} strokeWidth="2" />
            {/* Coat */}
            <path d="M34 105 L46 68 L60 76 L74 68 L86 105 Z" fill={p.primary} />
            {/* Cipher Dial in foreground */}
            <circle cx="60" cy="94" r="14" fill={p.dark} stroke={p.accent} strokeWidth="2" />
            <circle cx="60" cy="94" r="8" fill={p.bg} stroke={p.gear} strokeWidth="1.5" />
            <line x1="60" y1="84" x2="60" y2="104" stroke={p.accent} strokeWidth="1" />
            <line x1="50" y1="94" x2="70" y2="94" stroke={p.accent} strokeWidth="1" />
          </g>
        );

      case 'red_4': // Surveillance Operative with headphones
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Headphones band */}
            <path d="M38 48 C38 30 50 24 60 24 C70 24 82 30 82 48" fill="none" stroke={p.gear} strokeWidth="4" />
            <rect x="34" y="44" width="7" height="15" rx="3" fill={p.dark} />
            <rect x="79" y="44" width="7" height="15" rx="3" fill={p.dark} />
            {/* Face */}
            <path d="M45 36 C45 54 50 64 60 64 C70 64 75 54 75 36 Z" fill={p.skin} />
            {/* Sunglasses & Mic */}
            <path d="M46 45 L74 45 L71 52 L49 52 Z" fill="#1E293B" />
            <path d="M78 52 C72 56 68 62 62 62" fill="none" stroke={p.accent} strokeWidth="2" />
            <circle cx="61" cy="62" r="2.5" fill={p.accent} />
            {/* Tactical jacket */}
            <path d="M32 105 L44 68 L60 74 L76 68 L88 105 Z" fill={p.primary} />
            <rect x="52" y="76" width="16" height="29" fill={p.dark} />
          </g>
        );

      case 'red_5': // Courier with steel briefcase
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Hat */}
            <path d="M34 40 L86 40 L80 32 L40 32 Z" fill={p.dark} />
            <path d="M46 42 C46 54 50 64 60 64 C70 64 74 54 74 42 Z" fill={p.skin} />
            {/* Aviator Sunglasses */}
            <path d="M46 46 Q53 44 58 48 Q55 55 48 54 Z" fill="#020617" />
            <path d="M62 48 Q67 44 74 46 Q72 54 65 55 Z" fill="#020617" />
            {/* Trench coat */}
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
            {/* Handcuff & Briefcase */}
            <rect x="66" y="80" width="22" height="25" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
            <line x1="64" y1="78" x2="68" y2="82" stroke="#E2E8F0" strokeWidth="2" />
          </g>
        );

      case 'red_6': // Saboteur with laser pen
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M42 34 C42 22 52 20 60 20 C68 20 78 22 78 34 L78 44 L42 44 Z" fill="#292524" />
            <path d="M46 42 C46 54 50 64 60 64 C70 64 74 54 74 42 Z" fill={p.skin} />
            <rect x="47" y="47" width="26" height="5" rx="2" fill="#0C0A09" />
            <path d="M32 105 L44 68 L60 74 L76 68 L88 105 Z" fill={p.primary} />
            {/* Laser pen beam */}
            <line x1="72" y1="88" x2="98" y2="70" stroke="#FF0000" strokeWidth="2.5" />
            <circle cx="98" cy="70" r="3" fill="#FFFFFF" />
          </g>
        );

      case 'red_7': // Quartermaster with watch & hidden holster
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M44 30 C44 20 54 18 60 18 C66 18 76 20 76 30 L76 44 L44 44 Z" fill="#18181B" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Monocle on right eye */}
            <circle cx="67" cy="48" r="6" fill="none" stroke={p.accent} strokeWidth="1.5" />
            <line x1="73" y1="52" x2="80" y2="70" stroke={p.accent} strokeWidth="1" />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
            {/* Bowtie */}
            <polygon points="56,72 64,72 60,75" fill={p.dark} />
            <polygon points="56,78 64,78 60,75" fill={p.dark} />
          </g>
        );

      case 'red_8': // Lookout with binoculars
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M42 32 C42 22 52 20 60 20 C68 20 78 22 78 32 L78 44 L42 44 Z" fill="#44403C" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Binoculars held up */}
            <rect x="44" y="44" width="13" height="12" rx="2" fill="#1E293B" stroke={p.accent} strokeWidth="1.5" />
            <rect x="63" y="44" width="13" height="12" rx="2" fill="#1E293B" stroke={p.accent} strokeWidth="1.5" />
            <line x1="57" y1="50" x2="63" y2="50" stroke="#475569" strokeWidth="3" />
            <path d="M32 105 L44 68 L60 74 L76 68 L88 105 Z" fill={p.primary} />
          </g>
        );

      case 'red_9': // Deep Cover Asset with masked disguise
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M38 42 C38 24 50 18 60 18 C70 18 82 24 82 42 Z" fill="#27272A" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Mask/Veil */}
            <path d="M44 48 L76 48 L70 62 L50 62 Z" fill={p.dark} />
            <line x1="48" y1="46" x2="72" y2="46" stroke={p.accent} strokeWidth="2" />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
          </g>
        );

      // BLUE AGENTS
      case 'blue_1': // Director of Ops with tactical headset and earpiece
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Tactical Cap */}
            <path d="M38 36 C38 24 50 20 60 20 C70 20 82 24 82 36 L92 38 L82 42 L38 42 Z" fill={p.dark} />
            {/* Head & Earpiece */}
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            <circle cx="43" cy="50" r="3.5" fill={p.accent} />
            <path d="M43 50 L52 58" stroke={p.gear} strokeWidth="1.5" />
            {/* Sleek Shades */}
            <path d="M46 45 L74 45 L70 52 L50 52 Z" fill="#0B132B" />
            {/* Tactical Turtleneck */}
            <path d="M32 105 L44 68 L60 74 L76 68 L88 105 Z" fill={p.primary} />
            <rect x="52" y="66" width="16" height="8" rx="2" fill={p.dark} />
          </g>
        );

      case 'blue_2': // Counter-Hacker with cyber terminal glasses
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Modern bob hair */}
            <path d="M40 34 C40 22 50 20 60 20 C70 20 80 22 80 34 L82 56 L76 56 L76 44 L44 44 L44 56 L38 56 Z" fill="#0F172A" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Cyber Visor */}
            <path d="M44 44 L76 44 L72 53 L48 53 Z" fill="#0284C7" opacity="0.9" />
            <line x1="47" y1="48" x2="73" y2="48" stroke="#E0F2FE" strokeWidth="1.5" />
            {/* Tactical jacket */}
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
            <rect x="56" y="74" width="8" height="31" fill={p.dark} />
          </g>
        );

      case 'blue_3': // Extraction Pilot with aviator shades and bomber jacket
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M42 32 C42 22 52 20 60 20 C68 20 78 22 78 32 L78 42 L42 42 Z" fill="#1E293B" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Classic Aviators */}
            <path d="M46 45 Q53 43 58 47 Q56 56 48 55 Z" fill="#020617" stroke={p.gear} strokeWidth="1" />
            <path d="M62 47 Q67 43 74 45 Q72 55 64 56 Z" fill="#020617" stroke={p.gear} strokeWidth="1" />
            <line x1="58" y1="46" x2="62" y2="46" stroke={p.gear} strokeWidth="1" />
            {/* Bomber collar */}
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
            <circle cx="44" cy="66" r="5" fill="#E2E8F0" />
            <circle cx="76" cy="66" r="5" fill="#E2E8F0" />
          </g>
        );

      case 'blue_4': // Sharpshooter with scope crosshair eye
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M38 38 C38 24 50 20 60 20 C70 20 82 24 82 38 L82 46 L38 46 Z" fill="#0F172A" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Crosshair Eyepiece on left eye */}
            <circle cx="52" cy="48" r="7" fill="none" stroke={p.accent} strokeWidth="2" />
            <line x1="52" y1="39" x2="52" y2="57" stroke={p.accent} strokeWidth="1.5" />
            <line x1="43" y1="48" x2="61" y2="48" stroke={p.accent} strokeWidth="1.5" />
            {/* Right eye sunglasses */}
            <rect x="64" y="44" width="10" height="8" rx="2" fill="#0B132B" />
            <path d="M32 105 L44 68 L60 74 L76 68 L88 105 Z" fill={p.primary} />
          </g>
        );

      case 'blue_5': // Forger with loupe magnifier
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M42 32 C42 22 52 20 60 20 C68 20 78 22 78 32 L78 44 L42 44 Z" fill="#334155" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            {/* Jeweler's loupe */}
            <rect x="64" y="44" width="10" height="9" rx="1" fill="#1E293B" stroke={p.accent} strokeWidth="1.5" />
            <circle cx="69" cy="48.5" r="3" fill="#38BDF8" />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
          </g>
        );

      case 'blue_6': // Deep Diver with scuba mask
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Neoprene hood */}
            <path d="M40 40 C40 22 50 18 60 18 C70 18 80 22 80 40 L80 66 L40 66 Z" fill="#0F172A" />
            <path d="M46 42 C46 52 50 62 60 62 C70 62 74 52 74 42 Z" fill={p.skin} />
            {/* Scuba diving mask */}
            <rect x="44" y="43" width="32" height="12" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" opacity="0.8" />
            {/* Snorkel tube */}
            <path d="M78 50 C84 50 86 36 86 28" fill="none" stroke={p.accent} strokeWidth="3" />
            <path d="M30 105 L44 68 L60 74 L76 68 L90 105 Z" fill={p.primary} />
          </g>
        );

      case 'blue_7': // Field Medic with cross badge
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M42 32 C42 22 52 20 60 20 C68 20 78 22 78 32 L78 44 L42 44 Z" fill="#1E293B" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            <rect x="47" y="46" width="26" height="6" rx="2" fill="#0B132B" />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
            {/* Medic Cross */}
            <rect x="70" y="78" width="12" height="4" fill="#FFFFFF" />
            <rect x="74" y="74" width="4" height="12" fill="#FFFFFF" />
          </g>
        );

      case 'blue_8': // Interrogator with sleek shadow fedora
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M26 44 C26 44 45 32 60 32 C75 32 94 44 94 44 C88 44 82 40 60 40 C38 40 32 44 26 44 Z" fill={p.dark} />
            <path d="M42 41 C42 27 50 22 60 22 C70 22 78 27 78 41 Z" fill={p.primary} />
            <path d="M46 44 C46 54 50 63 60 63 C70 63 74 54 74 44 Z" fill={p.skin} />
            <path d="M44 49 L76 49 L72 55 L48 55 Z" fill="#0B132B" />
            <path d="M30 105 L42 66 L55 75 L60 66 L65 75 L78 66 L90 105 Z" fill={p.primary} />
            <polygon points="58,74 62,74 64,88 60,94 56,88" fill={p.accent} />
          </g>
        );

      case 'blue_9': // Drone Specialist with antenna controller
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M40 32 C40 22 50 20 60 20 C70 20 80 22 80 32 L80 44 L40 44 Z" fill="#0F172A" />
            <path d="M46 40 C46 54 50 64 60 64 C70 64 74 54 74 40 Z" fill={p.skin} />
            <rect x="47" y="46" width="26" height="6" rx="2" fill="#0284C7" />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill={p.primary} />
            {/* Micro Drone in corner */}
            <circle cx="84" cy="30" r="4" fill={p.accent} />
            <line x1="76" y1="30" x2="92" y2="30" stroke={p.gear} strokeWidth="1.5" />
            <line x1="84" y1="22" x2="84" y2="38" stroke={p.gear} strokeWidth="1.5" />
          </g>
        );

      // BYSTANDERS (Civilians)
      case 'bystander_1': // Tourist with camera
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Sun Hat */}
            <ellipse cx="60" cy="34" rx="32" ry="10" fill="#EAB308" />
            <path d="M44 32 C44 22 52 20 60 20 C68 20 76 22 76 32 Z" fill="#CA8A04" />
            <path d="M46 38 C46 52 50 62 60 62 C70 62 74 52 74 38 Z" fill={p.skin} />
            {/* Normal round glasses */}
            <circle cx="53" cy="46" r="4.5" fill="none" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="67" cy="46" r="4.5" fill="none" stroke="#78350F" strokeWidth="1.5" />
            <line x1="57.5" y1="46" x2="62.5" y2="46" stroke="#78350F" strokeWidth="1.5" />
            {/* Floral shirt */}
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill="#D97706" />
            {/* Camera around neck */}
            <rect x="50" y="76" width="20" height="14" rx="2" fill="#4B5563" stroke="#9CA3AF" strokeWidth="1.5" />
            <circle cx="60" cy="83" r="4" fill="#1F2937" stroke="#60A5FA" strokeWidth="1" />
            <path d="M44 66 L50 76 M76 66 L70 76" stroke="#1F2937" strokeWidth="1.5" />
          </g>
        );

      case 'bystander_2': // Barista with coffee cup & apron
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Messy bun */}
            <circle cx="60" cy="18" r="8" fill="#78350F" />
            <path d="M40 32 C40 22 50 20 60 20 C70 20 80 22 80 32 L80 44 L40 44 Z" fill="#78350F" />
            <path d="M46 38 C46 52 50 62 60 62 C70 62 74 52 74 38 Z" fill={p.skin} />
            {/* Smile */}
            <path d="M55 52 Q60 56 65 52" fill="none" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            {/* Apron */}
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill="#15803D" />
            {/* Steaming Coffee Cup */}
            <rect x="68" y="78" width="12" height="14" rx="2" fill="#FFFFFF" />
            <path d="M72 74 Q74 70 72 66 M76 74 Q78 70 76 66" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </g>
        );

      case 'bystander_3': // Dog Walker with puppy
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            {/* Baseball cap backwards */}
            <path d="M42 34 C42 22 52 20 60 20 C68 20 78 22 78 34 L78 40 L42 40 Z" fill="#0284C7" />
            <path d="M46 38 C46 52 50 62 60 62 C70 62 74 52 74 38 Z" fill={p.skin} />
            {/* Casual hoodie */}
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill="#B45309" />
            {/* Dog nose & ears peering from side */}
            <circle cx="82" cy="85" r="9" fill="#F59E0B" />
            <ellipse cx="78" cy="78" rx="3" ry="6" fill="#B45309" />
            <ellipse cx="88" cy="78" rx="3" ry="6" fill="#B45309" />
            <circle cx="82" cy="86" r="2.5" fill="#1F2937" />
          </g>
        );

      case 'bystander_4': // Newspaper Reader
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M44 30 C44 20 54 18 60 18 C66 18 76 20 76 30 L76 42 L44 42 Z" fill="#64748B" />
            <path d="M46 38 C46 52 50 60 60 60 C70 60 74 52 74 38 Z" fill={p.skin} />
            {/* Big Broadsheet Newspaper in front */}
            <rect x="34" y="58" width="52" height="38" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
            <line x1="60" y1="58" x2="60" y2="96" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="38" y1="64" x2="56" y2="64" stroke="#475569" strokeWidth="2" />
            <line x1="38" y1="70" x2="56" y2="70" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="38" y1="74" x2="56" y2="74" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="64" y1="64" x2="82" y2="64" stroke="#475569" strokeWidth="2" />
            <line x1="64" y1="70" x2="82" y2="70" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="64" y1="74" x2="82" y2="74" stroke="#CBD5E1" strokeWidth="1.5" />
          </g>
        );

      case 'bystander_5': // Librarian with book stack
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <circle cx="60" cy="20" r="7" fill="#57534E" />
            <path d="M46 38 C46 52 50 62 60 62 C70 62 74 52 74 38 Z" fill={p.skin} />
            {/* Glasses on chain */}
            <circle cx="53" cy="46" r="5" fill="none" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="67" cy="46" r="5" fill="none" stroke="#D97706" strokeWidth="1.5" />
            <line x1="58" y1="46" x2="62" y2="46" stroke="#D97706" strokeWidth="1.5" />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill="#854D0E" />
            {/* Book in hands */}
            <rect x="46" y="78" width="28" height="18" rx="2" fill="#1D4ED8" stroke="#F8FAFC" strokeWidth="1.5" />
            <line x1="60" y1="78" x2="60" y2="96" stroke="#F8FAFC" strokeWidth="1" />
          </g>
        );

      case 'bystander_6': // Street Musician with accordion
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M38 36 C38 24 50 20 60 20 C70 20 82 24 82 36 L82 42 L38 42 Z" fill="#047857" />
            <path d="M46 38 C46 52 50 62 60 62 C70 62 74 52 74 38 Z" fill={p.skin} />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill="#B45309" />
            {/* Accordion folds */}
            <rect x="40" y="72" width="40" height="24" rx="2" fill="#B91C1C" stroke="#FEF3C7" strokeWidth="1.5" />
            <line x1="48" y1="72" x2="48" y2="96" stroke="#FEF3C7" strokeWidth="1.5" />
            <line x1="56" y1="72" x2="56" y2="96" stroke="#FEF3C7" strokeWidth="1.5" />
            <line x1="64" y1="72" x2="64" y2="96" stroke="#FEF3C7" strokeWidth="1.5" />
            <line x1="72" y1="72" x2="72" y2="96" stroke="#FEF3C7" strokeWidth="1.5" />
          </g>
        );

      case 'bystander_7': // Pigeon Feeder
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill={p.bg} />
            <path d="M42 34 C42 22 52 20 60 20 C68 20 78 22 78 34 L78 40 L42 40 Z" fill="#71717A" />
            <path d="M46 38 C46 52 50 62 60 62 C70 62 74 52 74 38 Z" fill={p.skin} />
            <path d="M30 105 L44 66 L60 72 L76 66 L90 105 Z" fill="#4B5563" />
            {/* Flying pigeon silhouette */}
            <path d="M78 68 Q84 62 90 66 Q88 72 82 72 Q86 78 80 76 Z" fill="#E2E8F0" />
            <circle cx="89" cy="65" r="1" fill="#000000" />
          </g>
        );

      // THE SECRET AGENT COD
      case 'cod_agent':
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
            {/* Cod Fish Body */}
            <path
              d="M 18 50 C 18 40, 28 32, 46 32 C 66 32, 82 38, 92 50 C 82 62, 66 68, 46 68 C 28 68, 18 60, 18 50 Z"
              fill="#F59E0B"
            />
            {/* 3 Dorsal Fins */}
            <path d="M 36 32 C 38 23, 44 23, 46 32 Z" fill="#F59E0B" />
            <path d="M 50 32 C 52 21, 60 21, 62 32 Z" fill="#F59E0B" />
            <path d="M 66 33 C 68 25, 74 25, 76 34 Z" fill="#F59E0B" />
            {/* 2 Anal Fins */}
            <path d="M 52 68 C 54 76, 60 76, 62 68 Z" fill="#F59E0B" />
            <path d="M 66 67 C 68 74, 73 74, 75 66 Z" fill="#F59E0B" />
            {/* Tail Fin */}
            <path d="M 20 50 L 8 36 C 11 45, 11 55, 8 64 Z" fill="#F59E0B" />
            {/* Chin Barbel Whisker */}
            <path d="M 86 56 Q 88 64, 85 68" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Sunglasses */}
            <polygon points="72,44 90,43 87,53 76,54" fill="#020617" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="72" y1="45" x2="68" y2="45" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="77" y1="46" x2="83" y2="46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            {/* Bowtie */}
            <polygon points="60,53 66,56 60,59" fill="#0F172A" />
            <polygon points="56,53 50,56 56,59" fill="#0F172A" />
            <circle cx="58" cy="56" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // GRONK (The Clueless Rookie)
      case 'gronk':
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill="#292524" stroke="#F59E0B" strokeWidth="2" />
            {/* Crooked Fedora tilted sideways */}
            <path d="M 24 38 C 28 24, 60 16, 76 30 C 86 38, 92 48, 86 50 C 78 52, 34 46, 24 38 Z" fill="#78350F" />
            <path d="M 40 32 C 44 20, 68 18, 72 28 Z" fill="#92400E" />
            {/* Face */}
            <circle cx="60" cy="56" r="22" fill="#E8C7A7" />
            {/* Cross-eyed / wonky goofy eyes */}
            <circle cx="50" cy="52" r="7" fill="#FFFFFF" stroke="#1C1917" strokeWidth="1.5" />
            <circle cx="70" cy="52" r="7" fill="#FFFFFF" stroke="#1C1917" strokeWidth="1.5" />
            {/* Wonky pupils pointing towards center/up */}
            <circle cx="53" cy="52" r="3.5" fill="#0F172A" />
            <circle cx="67" cy="50" r="3.5" fill="#0F172A" />
            {/* Bandaid on forehead */}
            <rect x="42" y="40" width="16" height="5" rx="1.5" fill="#D97706" transform="rotate(-15 42 40)" opacity="0.85" />
            {/* Wide goofy bucktooth smile */}
            <path d="M 48 64 Q 60 74, 72 64" fill="none" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="57" y="65" width="6" height="5" rx="1" fill="#FFFFFF" stroke="#1C1917" strokeWidth="1" />
            {/* Crooked collar and wildly skewed tie */}
            <path d="M 36 105 L 48 78 L 60 84 L 72 78 L 84 105 Z" fill="#44403C" />
            <polygon points="58,84 68,88 56,104 50,102" fill="#DC2626" />
          </g>
        );

      // BIGHEAD (The Cranial Strategist)
      case 'bighead':
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill="#0F172A" stroke="#3B82F6" strokeWidth="2" />
            {/* Enormous Lightbulb-shaped Cranium */}
            <path
              d="M 22 44 
                 C 16 16, 104 16, 98 44 
                 C 94 62, 78 72, 60 74 
                 C 42 72, 26 62, 22 44 Z"
              fill="#DFC0A4"
            />
            {/* Faint cranial brain contour lines */}
            <path d="M 40 28 Q 60 20, 80 28" fill="none" stroke="#C8A585" strokeWidth="2" strokeLinecap="round" />
            <path d="M 46 22 Q 60 16, 74 22" fill="none" stroke="#C8A585" strokeWidth="2" strokeLinecap="round" />
            {/* Oversized Thick Magnifying Glasses */}
            <rect x="28" y="42" width="28" height="20" rx="6" fill="#60A5FA" fillOpacity="0.4" stroke="#1E3A8A" strokeWidth="2.5" />
            <rect x="64" y="42" width="28" height="20" rx="6" fill="#60A5FA" fillOpacity="0.4" stroke="#1E3A8A" strokeWidth="2.5" />
            <line x1="56" y1="52" x2="64" y2="52" stroke="#1E3A8A" strokeWidth="2.5" />
            {/* Concentric swirl pupils (Genius eyes) */}
            <circle cx="42" cy="52" r="5" fill="#1E293B" />
            <circle cx="78" cy="52" r="5" fill="#1E293B" />
            {/* Tiny comedic mouth & nose */}
            <circle cx="60" cy="62" r="1.5" fill="#78350F" />
            <path d="M 56 68 Q 60 70, 64 68" fill="none" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            {/* Comically small body & shoulders */}
            <path d="M 44 105 L 50 78 L 70 78 L 76 105 Z" fill="#1E40AF" />
            <polygon points="58,82 62,82 60,94" fill="#93C5FD" />
          </g>
        );

      // DEMOLITION / BOOMER (Explosives Specialist)
      case 'demolition':
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill="#3B0764" stroke="#DC2626" strokeWidth="2" />
            {/* Industrial Safety Goggles */}
            <path d="M 28 44 C 28 32, 44 26, 60 26 C 76 26, 92 32, 92 44 Z" fill="#18181B" />
            <circle cx="44" cy="46" r="10" fill="#EA580C" stroke="#71717A" strokeWidth="2" />
            <circle cx="76" cy="46" r="10" fill="#EA580C" stroke="#71717A" strokeWidth="2" />
            <line x1="54" y1="46" x2="66" y2="46" stroke="#27272A" strokeWidth="3" />
            {/* Face with smudge of ash */}
            <path d="M 44 48 C 44 60, 50 68, 60 68 C 70 68, 76 60, 76 48 Z" fill="#D4A373" />
            <ellipse cx="68" cy="60" rx="5" ry="3" fill="#27272A" opacity="0.6" />
            {/* Gritted smile */}
            <line x1="52" y1="62" x2="66" y2="62" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
            {/* Heavy Blast Vest */}
            <path d="M 28 105 L 42 70 L 78 70 L 92 105 Z" fill="#7F1D1D" />
            {/* Dynamite Sticks strapped across chest */}
            <rect x="36" y="80" width="10" height="22" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
            <rect x="48" y="80" width="10" height="22" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
            <rect x="60" y="80" width="10" height="22" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
            {/* Yellow warning hazard tape across vest */}
            <line x1="32" y1="90" x2="88" y2="90" stroke="#FBBF24" strokeWidth="3" strokeDasharray="6 3" />
          </g>
        );

      // AGENT SEOUL (Sleek Counter-Intelligence Operative)
      case 'agent_k':
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill="#0B132B" stroke="#38BDF8" strokeWidth="2" />
            {/* Stylish Two-Block Haircut */}
            <path
              d="M 34 40 
                 C 32 20, 54 16, 68 18 
                 C 82 20, 88 28, 86 44 
                 C 82 32, 72 26, 60 26 
                 C 44 26, 38 32, 34 40 Z"
              fill="#0F172A"
            />
            {/* Sharp Jawline Face */}
            <path d="M 44 38 L 76 38 L 72 62 L 60 70 L 48 62 Z" fill="#DFC0A4" />
            {/* Sleek Minimalist Sunglasses */}
            <polygon points="43,44 57,44 55,51 45,51" fill="#020617" />
            <polygon points="63,44 77,44 75,51 65,51" fill="#020617" />
            <line x1="57" y1="46" x2="63" y2="46" stroke="#020617" strokeWidth="1.5" />
            {/* Cool Glint */}
            <line x1="46" y1="46" x2="52" y2="46" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" />
            {/* Glowing Tactical Blue In-Ear Communicator */}
            <circle cx="41" cy="48" r="2.5" fill="#38BDF8" />
            <path d="M 41 48 Q 43 56, 48 58" fill="none" stroke="#38BDF8" strokeWidth="1" />
            {/* Black Tactical Turtleneck & Navy Spy Coat */}
            <path d="M 28 105 L 42 66 L 78 66 L 92 105 Z" fill="#1E3A8A" />
            <rect x="52" y="66" width="16" height="12" rx="2" fill="#0B132B" />
          </g>
        );

      // TANK (Colossal Muscle Enforcer)
      case 'tank':
        return (
          <g>
            <circle cx="60" cy="60" r="54" fill="#450A0A" stroke="#EF4444" strokeWidth="2" />
            {/* Colossal Trapezius and Shoulder Muscles taking up the entire screen */}
            <path
              d="M 12 105 
                 L 22 58 
                 L 46 54 
                 L 74 54 
                 L 98 58 
                 L 108 105 Z"
              fill="#B91C1C"
            />
            {/* Muscular neck */}
            <rect x="46" y="44" width="28" height="24" fill="#D4A373" />
            {/* Broad Square-Jaw Head with Buzzcut */}
            <path d="M 44 32 C 44 24, 52 22, 60 22 C 68 22, 76 24, 76 32 L 76 48 L 44 48 Z" fill="#292524" />
            <path d="M 44 38 L 76 38 L 74 56 L 68 60 L 52 60 L 46 56 Z" fill="#E8C7A7" />
            {/* Massive Square Chin Cleft */}
            <line x1="60" y1="56" x2="60" y2="59" stroke="#78350F" strokeWidth="2" />
            {/* Comically Tiny Black Sunglasses on Giant Face */}
            <rect x="49" y="42" width="10" height="5" rx="1.5" fill="#09090B" />
            <rect x="61" y="42" width="10" height="5" rx="1.5" fill="#09090B" />
            <line x1="59" y1="44" x2="61" y2="44" stroke="#09090B" strokeWidth="1.5" />
            {/* Muscle striation lines on shoulders */}
            <path d="M 28 72 Q 40 70, 46 80" fill="none" stroke="#7F1D1D" strokeWidth="3" />
            <path d="M 92 72 Q 80 70, 74 80" fill="none" stroke="#7F1D1D" strokeWidth="3" />
          </g>
        );

      // THE ASSASSIN (Instant Defeat)
      case 'assassin_1':
      default:
        return (
          <g>
            {/* Pitch black background with ominous red rim */}
            <circle cx="60" cy="60" r="54" fill="#030712" stroke="#EF4444" strokeWidth="2.5" />
            {/* Dramatic low fedora casting pitch-black shadow over entire upper face */}
            <path d="M22 46 C22 46 45 32 60 32 C75 32 98 46 98 46 C90 46 82 41 60 41 C38 41 30 46 22 46 Z" fill="#0F172A" />
            <path d="M40 42 C40 25 48 20 60 20 C72 20 80 25 80 42 Z" fill="#111827" />
            <rect x="40" y="39" width="40" height="4" fill="#EF4444" />
            {/* Stark jawline emerging from shadow */}
            <path d="M47 48 L73 48 L68 64 L60 68 L52 64 Z" fill="#374151" />
            {/* High collar trench coat in matte black */}
            <path d="M26 106 L42 64 L56 74 L60 64 L64 74 L78 64 L94 106 Z" fill="#030712" />
            <path d="M56 74 L60 106 L64 74 Z" fill="#111827" />
            {/* Glowing Red Crosshair on lapel */}
            <circle cx="76" cy="80" r="6" fill="none" stroke="#EF4444" strokeWidth="2" />
            <line x1="76" y1="72" x2="76" y2="88" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="68" y1="80" x2="84" y2="80" stroke="#EF4444" strokeWidth="1.5" />
            <circle cx="76" cy="80" r="1.5" fill="#EF4444" />
            {/* Sinister smoke wisps */}
            <path d="M38 78 Q34 72 38 68 Q42 64 38 60" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-md transition-transform duration-300"
      >
        {renderIllustration()}
      </svg>
      {showTitle && (
        <span className="text-[10px] uppercase font-bold tracking-wider mt-1 text-slate-300">
          {characterId.replace('_', ' ')}
        </span>
      )}
    </div>
  );
};
