'use client';

import React, { useEffect } from 'react';
import { ActiveTeam, WinReason } from '@/types/game';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Skull } from 'lucide-react';

interface GameOverModalProps {
  winner: ActiveTeam | null;
  winReason: WinReason | null;
  isOpen: boolean;
  isHost: boolean;
  onRematch: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  winReason,
  isOpen,
  isHost,
  onRematch,
}) => {
  useEffect(() => {
    if (isOpen && winner) {
      sound.playVictory();

      // Launch victory confetti
      const colors =
        winner === 'red' ? ['#DC2626', '#EF4444', '#F87171'] : ['#2563EB', '#3B82F6', '#60A5FA'];

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });
    }
  }, [isOpen, winner]);

  if (!isOpen || !winner) return null;

  const isAssassin = winReason === 'assassin_triggered';
  const loserTeam: ActiveTeam = winner === 'red' ? 'blue' : 'red';

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
      <div
        className={`max-w-md w-full rounded-3xl p-6 md:p-8 text-center border-2 shadow-2xl space-y-5 ${
          winner === 'red'
            ? 'bg-gradient-to-b from-red-950/90 to-slate-900 border-red-500 shadow-red-950/80'
            : 'bg-gradient-to-b from-blue-950/90 to-slate-900 border-blue-500 shadow-blue-950/80'
        }`}
      >
        {/* Victory Icon */}
        <div className="flex justify-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-2 ${
              winner === 'red'
                ? 'bg-red-600/30 border-red-400 text-red-300'
                : 'bg-blue-600/30 border-blue-400 text-blue-300'
            }`}
          >
            {isAssassin ? (
              <Skull className="w-10 h-10 text-rose-400 animate-bounce" />
            ) : (
              <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
            {winner} Team Wins!
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            {isAssassin ? (
              <span className="text-rose-300 font-semibold">
                ☠️ {loserTeam.toUpperCase()} team triggered the ASSASSIN! Instant victory for {winner.toUpperCase()}.
              </span>
            ) : (
              <span>
                🎯 All {winner.toUpperCase()} secret agents were successfully uncovered!
              </span>
            )}
          </p>
        </div>

        {/* Rematch action */}
        <div className="pt-2">
          {isHost ? (
            <button
              type="button"
              onClick={onRematch}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              Start Rematch (Keep Players)
            </button>
          ) : (
            <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              Waiting for host to start a rematch...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
