'use client';

import React, { useState } from 'react';
import { Card as CardType, CardType as CardAllegiance, Role, Team } from '@/types/game';
import { CharacterArt } from '@/components/art/CharacterArt';
import { sound } from '@/lib/sound';
import { Check, HelpCircle } from 'lucide-react';

interface CardProps {
  card: CardType;
  playerRole: Role;
  playerTeam: Team;
  isMyTurnToGuess: boolean;
  onGuess: (cardId: number) => void;
  onSuggest: (cardId: number) => void;
}

export const CardComponent: React.FC<CardProps> = ({
  card,
  playerRole,
  playerTeam,
  isMyTurnToGuess,
  onGuess,
  onSuggest,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const isSpymaster = playerRole === 'spymaster';

  // Styling based on card allegiance
  const getCardStyle = (allegiance: CardAllegiance) => {
    switch (allegiance) {
      case 'red':
        return {
          bg: 'bg-gradient-to-br from-red-600 to-red-800 text-white border-red-500 shadow-red-950/60',
          badge: 'bg-red-950/80 text-red-200 border-red-700',
          title: 'RED AGENT',
        };
      case 'blue':
        return {
          bg: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white border-blue-500 shadow-blue-950/60',
          badge: 'bg-blue-950/80 text-blue-200 border-blue-700',
          title: 'BLUE AGENT',
        };
      case 'bystander':
        return {
          bg: 'bg-gradient-to-br from-amber-700/90 to-amber-900/90 text-amber-100 border-amber-600 shadow-amber-950/60',
          badge: 'bg-amber-950/80 text-amber-200 border-amber-700',
          title: 'BYSTANDER',
        };
      case 'assassin':
        return {
          bg: 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-rose-300 border-rose-900 shadow-black',
          badge: 'bg-rose-950 text-rose-400 border-rose-800',
          title: 'ASSASSIN',
        };
    }
  };

  const style = getCardStyle(card.type);

  // Spymaster tinted outline/background preview
  const getSpymasterHintStyle = () => {
    if (!isSpymaster || card.revealed) return '';
    switch (card.type) {
      case 'red':
        return 'ring-4 ring-red-500/90 bg-red-950/20';
      case 'blue':
        return 'ring-4 ring-blue-500/90 bg-blue-950/20';
      case 'bystander':
        return 'ring-2 ring-amber-600/70 bg-amber-950/15';
      case 'assassin':
        return 'ring-4 ring-rose-600/90 bg-black/50';
    }
  };

  const handleCardClick = () => {
    if (card.revealed) return;

    if (isMyTurnToGuess) {
      setShowConfirm((prev) => !prev);
    } else if (playerRole === 'operative' && playerTeam !== 'spectator') {
      sound.playTimerTick();
      onSuggest(card.id);
    }
  };

  const handleConfirmGuess = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
    onGuess(card.id);
  };

  return (
    <div className="relative aspect-[4/3] w-full select-none perspective-1000">
      <div
        onClick={handleCardClick}
        className={`w-full h-full rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between p-2 md:p-3 relative overflow-hidden border shadow-lg ${
          card.revealed
            ? `${style.bg} transform scale-[0.98]`
            : `bg-slate-800/90 hover:bg-slate-750 text-slate-100 border-slate-700/80 hover:border-slate-500 hover:shadow-xl ${getSpymasterHintStyle()}`
        } ${isMyTurnToGuess && !card.revealed ? 'hover:scale-[1.02] ring-2 ring-amber-400/40' : ''}`}
      >
        {/* REVEALED CARD VIEW */}
        {card.revealed ? (
          <>
            {/* Top row: Word and character badge */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase opacity-90 truncate mr-1">
                {card.word}
              </span>
              <span
                className={`text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${style.badge}`}
              >
                {style.title}
              </span>
            </div>

            {/* Center: Character Artwork */}
            <div className="flex-1 flex items-center justify-center my-1 relative overflow-hidden">
              <div className="w-16 h-16 md:w-20 md:h-20 max-w-full max-h-full">
                <CharacterArt
                  characterId={card.characterId}
                  category={card.type}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Bottom: Word again in larger type */}
            <div className="text-center z-10">
              <span className="font-display text-xs md:text-sm lg:text-base font-extrabold tracking-wider drop-shadow-sm uppercase">
                {card.word}
              </span>
            </div>
          </>
        ) : (
          /* UNREVEALED CARD VIEW (Innocent Parchment / Slate Tile) */
          <>
            {/* Spymaster Secret Keycard Badge in Top Right */}
            {isSpymaster && (
              <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full overflow-hidden border border-white/40 shadow">
                  <CharacterArt
                    characterId={card.characterId}
                    category={card.type}
                    className="w-full h-full"
                  />
                </div>
                <span
                  className={`text-[8px] md:text-[9px] font-black uppercase px-1 rounded shadow ${
                    card.type === 'red'
                      ? 'bg-red-600 text-white'
                      : card.type === 'blue'
                      ? 'bg-blue-600 text-white'
                      : card.type === 'assassin'
                      ? 'bg-black text-rose-400 border border-rose-600'
                      : 'bg-amber-600 text-black'
                  }`}
                >
                  {card.type.substring(0, 3)}
                </span>
              </div>
            )}

            {/* Top suggestion tokens */}
            <div className="flex items-center gap-1 flex-wrap z-10 min-h-[18px]">
              {card.suggestions.map((s) => (
                <span
                  key={s.playerId}
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow border ${
                    s.team === 'red'
                      ? 'bg-red-500/80 text-white border-red-300'
                      : 'bg-blue-500/80 text-white border-blue-300'
                  }`}
                  title={`${s.nickname} suggested this`}
                >
                  {s.nickname.slice(0, 3)}
                </span>
              ))}
            </div>

            {/* Center: Word */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
              <span className="font-display text-sm md:text-base lg:text-lg font-black tracking-wider uppercase text-slate-100 group-hover:text-amber-300 transition-colors">
                {card.word}
              </span>
            </div>

            {/* Bottom hint or suggestion marker prompt */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 opacity-60">
              <span className="font-mono text-[9px]">#{card.id + 1}</span>
              {!isSpymaster && playerRole === 'operative' && playerTeam !== 'spectator' && (
                <span className="hidden md:inline text-[9px] text-slate-400">
                  {card.suggestions.some((s) => s.team === playerTeam)
                    ? 'Suggested'
                    : 'Click to mark'}
                </span>
              )}
            </div>
          </>
        )}

        {/* GUESS CONFIRMATION POPOVER */}
        {showConfirm && isMyTurnToGuess && !card.revealed && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-xl z-30 flex flex-col items-center justify-center p-2 text-center animate-in fade-in zoom-in-95 duration-150 border-2 border-amber-400 shadow-2xl"
          >
            <p className="text-[11px] md:text-xs font-semibold text-slate-300 mb-1">
              Confirm Guess:
            </p>
            <p className="text-sm md:text-base font-black text-amber-300 tracking-wider uppercase mb-2">
              "{card.word}"
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleConfirmGuess}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1 transition-transform active:scale-95"
              >
                <Check className="w-3.5 h-3.5" />
                Guess
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-lg transition-transform active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
