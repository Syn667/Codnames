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
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* EXACT SPY COD BADGE FROM UPLOADED IMAGE */}
      <div
        className={`${iconSizes[size]} relative rounded-2xl overflow-hidden shadow-lg shadow-black/50 group-hover:scale-105 transition-transform shrink-0 border border-slate-700 bg-white flex items-center justify-center p-0.5`}
      >
        <img
          src="/cod_badge_icon.png"
          alt="Codnames Spy Cod"
          className="w-full h-full object-contain"
        />
      </div>

      {/* TYPOGRAPHY */}
      {showText && (
        <div className="flex flex-col">
          <div
            className={`font-display font-black tracking-wider uppercase text-white leading-none ${textSizes[size]}`}
          >
            Cod<span className="text-amber-400">names</span>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-300 font-display mt-0.5">
            Espionage Party Game
          </span>
        </div>
      )}
    </div>
  );
};
