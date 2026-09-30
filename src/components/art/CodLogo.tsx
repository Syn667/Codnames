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
      {/* SIMPLIFIED MINIMALIST SPY CODFISH BADGE */}
      <div
        className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-1 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimalist Fish Body */}
          <path
            d="M 18 50 
               C 24 34, 46 34, 68 40 
               C 80 43, 88 50, 88 50 
               C 88 50, 80 57, 68 60 
               C 46 66, 24 66, 18 50 Z"
            fill="#0F172A"
          />

          {/* Clean Top Fin */}
          <path d="M 40 35 C 48 24, 62 26, 64 39 Z" fill="#0F172A" />

          {/* Clean Tail Fin */}
          <polygon points="20,50 6,32 10,50 6,68" fill="#0F172A" />

          {/* Cod Chin Barbel ("Whisker") */}
          <path
            d="M 80 54 Q 82 63, 78 65"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Bold Spy Sunglasses */}
          <polygon
            points="62,44 82,43 78,54 65,54"
            fill="#020617"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          {/* White glint highlight on lens */}
          <line
            x1="68"
            y1="46"
            x2="76"
            y2="46"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
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
