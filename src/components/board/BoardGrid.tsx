'use client';

import React from 'react';
import { Card as CardType, Role, Team } from '@/types/game';
import { CardComponent } from './Card';

interface BoardGridProps {
  cards: CardType[];
  playerRole: Role;
  playerTeam: Team;
  isMyTurnToGuess: boolean;
  onGuess: (cardId: number) => void;
  onSuggest: (cardId: number) => void;
}

export const BoardGrid: React.FC<BoardGridProps> = ({
  cards,
  playerRole,
  playerTeam,
  isMyTurnToGuess,
  onGuess,
  onSuggest,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-2 md:p-4">
      <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            playerRole={playerRole}
            playerTeam={playerTeam}
            isMyTurnToGuess={isMyTurnToGuess}
            onGuess={onGuess}
            onSuggest={onSuggest}
          />
        ))}
      </div>
    </div>
  );
};
