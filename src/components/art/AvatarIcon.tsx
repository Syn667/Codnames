import React from 'react';
import { CharacterArt } from './CharacterArt';
import { CHARACTERS } from '@/data/characters';

interface AvatarIconProps {
  avatarId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  className?: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  avatarId,
  size = 'md',
  showBorder = true,
  className = '',
}) => {
  const charInfo = CHARACTERS[avatarId] || CHARACTERS['red_1'];

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const borderClasses = {
    red: 'border-red-500 shadow-red-950/40',
    blue: 'border-blue-500 shadow-blue-950/40',
    bystander: 'border-amber-500 shadow-amber-950/40',
    assassin: 'border-rose-600 shadow-black',
  };

  const borderColor = borderClasses[charInfo.category] || borderClasses.bystander;

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-slate-900 ${
        sizeClasses[size]
      } ${showBorder ? `border-2 ${borderColor} shadow-md` : ''} ${className}`}
      title={`${charInfo.name} - ${charInfo.title}`}
    >
      <CharacterArt characterId={charInfo.id} category={charInfo.category} />
    </div>
  );
};
