import React from 'react';

interface CodLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const CodLogo: React.FC<CodLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SECRET AGENT COD FISH ICON */}
      <div
        className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-1 flex items-center justify-center shadow-lg shadow-amber-950/50 group-hover:scale-105 transition-transform shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Cod Body (Streamlined Atlantic Cod profile) */}
          <path
            d="M 12 50 
               C 12 40, 24 32, 42 32 
               C 62 32, 78 38, 88 50 
               C 78 62, 62 68, 42 68 
               C 24 68, 12 60, 12 50 Z"
            fill="#0F172A"
          />

          {/* Three Distinctive Cod Dorsal Fins (Top) */}
          <path d="M 32 32 C 34 23, 40 23, 42 32 Z" fill="#0F172A" />
          <path d="M 46 32 C 48 21, 56 21, 58 32 Z" fill="#0F172A" />
          <path d="M 62 33 C 64 25, 70 25, 72 34 Z" fill="#0F172A" />

          {/* Two Anal Fins (Bottom) */}
          <path d="M 48 68 C 50 76, 56 76, 58 68 Z" fill="#0F172A" />
          <path d="M 62 67 C 64 74, 69 74, 71 66 Z" fill="#0F172A" />

          {/* Broad Cod Tail Fin */}
          <path
            d="M 14 50 
               L 4 36 
               C 7 45, 7 55, 4 64 
               Z"
            fill="#0F172A"
          />

          {/* Subtle Cod Lateral Line (Sensor line on true cod) */}
          <path
            d="M 22 51 C 36 49, 52 46, 72 50"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Iconic Cod Chin Barbel (The "goatee/mic" whisker under chin) */}
          <path
            d="M 82 56 Q 84 64, 81 68"
            stroke="#0F172A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Secret Agent Sunglasses (Wayfarer style covering eye) */}
          <polygon
            points="68,44 86,43 83,53 72,54"
            fill="#020617"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          {/* Glasses Frame Bridge */}
          <line
            x1="68"
            y1="45"
            x2="64"
            y2="45"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          {/* Specular White Glint on Sunglasses */}
          <line
            x1="73"
            y1="46"
            x2="79"
            y2="46"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Secret Agent Trench Collar / Bowtie Accent */}
          <polygon points="56,53 62,56 56,59" fill="#F59E0B" />
          <polygon points="52,53 46,56 52,59" fill="#F59E0B" />
          <circle cx="54" cy="56" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* OPTIONAL TYPOGRAPHY */}
      {showText && (
        <div className="flex flex-col">
          <div
            className={`font-black tracking-wider uppercase text-white leading-none ${textSizes[size]}`}
          >
            Cod<span className="text-amber-400">names</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
            Espionage Party Game
          </span>
        </div>
      )}
    </div>
  );
};
