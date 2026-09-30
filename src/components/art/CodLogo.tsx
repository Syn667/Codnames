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
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
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
