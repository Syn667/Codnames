'use client';

import React, { useEffect, useState } from 'react';
import { ActiveTeam, Clue, Player, Role, Team, TurnState } from '@/types/game';
import { sound } from '@/lib/sound';
import { Clock, SkipForward, AlertCircle } from 'lucide-react';

interface TurnIndicatorProps {
  turn: TurnState;
  score: {
    redTotal: number;
    blueTotal: number;
    redRemaining: number;
    blueRemaining: number;
  };
  currentUser: Player | null;
  onEndTurn: () => void;
  onTimerExpired: () => void;
}

export const TurnIndicator: React.FC<TurnIndicatorProps> = ({
  turn,
  score,
  currentUser,
  onEndTurn,
  onTimerExpired,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

  // Timer logic
  useEffect(() => {
    if (!turn.timerExpiresAt) {
      setSecondsRemaining(null);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.ceil((turn.timerExpiresAt! - now) / 1000));
      setSecondsRemaining(diff);

      if (diff === 0) {
        onTimerExpired();
      } else if (diff <= 10 && diff > 0) {
        sound.playUrgentTick();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [turn.timerExpiresAt, onTimerExpired]);

  const isMyTeam = currentUser?.team === turn.team;
  const isOperative = currentUser?.role === 'operative';
  const canPassTurn = isMyTeam && isOperative && turn.phase === 'guess';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2">
      {/* Top Bar: Scores & Active Turn Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 md:p-4 shadow-xl backdrop-blur-md">
        {/* RED TEAM SCORE */}
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
            turn.team === 'red'
              ? 'bg-red-950/80 border-2 border-red-500 shadow-lg shadow-red-950/50'
              : 'bg-slate-800/60 border border-slate-700/60 opacity-80'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-400">
              Red Team
            </span>
            <span className="text-xl md:text-2xl font-black text-white">
              {score.redRemaining}{' '}
              <span className="text-xs text-slate-400 font-normal">
                / {score.redTotal} left
              </span>
            </span>
          </div>
        </div>

        {/* ACTIVE TURN & CLUE BANNER */}
        <div className="flex-1 flex flex-col items-center text-center px-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs md:text-sm font-black uppercase tracking-widest px-3 py-0.5 rounded-full ${
                turn.team === 'red'
                  ? 'bg-red-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {turn.team} Team Turn
            </span>

            {/* Countdown Timer */}
            {secondsRemaining !== null && (
              <div
                className={`flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                  secondsRemaining <= 15
                    ? 'bg-rose-950 text-rose-300 border border-rose-600 animate-pulse'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{secondsRemaining}s</span>
              </div>
            )}
          </div>

          {/* Current Phase description */}
          {turn.phase === 'clue' ? (
            <p className="text-xs md:text-sm text-slate-300 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Waiting for <strong className="text-white capitalize">{turn.team} Spymaster</strong> to give a clue...
            </p>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <span className="text-xs text-slate-400">Current Clue:</span>
              <span className="text-base md:text-lg font-black tracking-wider text-amber-300 uppercase bg-slate-800/90 px-3 py-0.5 rounded-lg border border-amber-500/40">
                "{turn.currentClue?.word}" ({turn.currentClue?.count === 'unlimited' ? '∞' : turn.currentClue?.count})
              </span>
              <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-1 rounded-md">
                {turn.guessesRemaining > 20 ? '∞' : turn.guessesRemaining} guess
                {turn.guessesRemaining === 1 ? '' : 'es'} left
              </span>
            </div>
          )}
        </div>

        {/* BLUE TEAM SCORE */}
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
            turn.team === 'blue'
              ? 'bg-blue-950/80 border-2 border-blue-500 shadow-lg shadow-blue-950/50'
              : 'bg-slate-800/60 border border-slate-700/60 opacity-80'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
              Blue Team
            </span>
            <span className="text-xl md:text-2xl font-black text-white">
              {score.blueRemaining}{' '}
              <span className="text-xs text-slate-400 font-normal">
                / {score.blueTotal} left
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* PASS TURN ACTION BAR (For active operatives during guessing) */}
      {canPassTurn && (
        <div className="mt-2 flex items-center justify-between bg-amber-950/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              You are guessing for <strong>{turn.team.toUpperCase()}</strong> team. Click unrevealed cards to guess or pass turn.
            </span>
          </div>
          <button
            type="button"
            onClick={onEndTurn}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-lg border border-slate-600 shadow transition-transform active:scale-95 flex items-center gap-1"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Pass / End Turn
          </button>
        </div>
      )}
    </div>
  );
};
