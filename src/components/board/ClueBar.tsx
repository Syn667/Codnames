'use client';

import React, { useState } from 'react';
import { ActiveTeam } from '@/types/game';
import { Send, Info } from 'lucide-react';

interface ClueBarProps {
  activeTeam: ActiveTeam;
  onSubmitClue: (word: string, count: number | 'unlimited' | 'zero') => void;
  disabled?: boolean;
}

export const ClueBar: React.FC<ClueBarProps> = ({
  activeTeam,
  onSubmitClue,
  disabled = false,
}) => {
  const [word, setWord] = useState('');
  const [count, setCount] = useState<number | 'unlimited' | 'zero'>(1);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = word.trim().toUpperCase();

    if (!cleanWord) {
      setError('Please enter a clue word.');
      return;
    }

    if (cleanWord.includes(' ')) {
      setError('Clue must be a single word (no spaces).');
      return;
    }

    setError(null);
    onSubmitClue(cleanWord, count);
    setWord('');
  };

  const countOptions: (number | 'unlimited' | 'zero')[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 'zero', 'unlimited',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className={`p-4 rounded-2xl border-2 shadow-2xl backdrop-blur-md transition-all ${
          activeTeam === 'red'
            ? 'bg-red-950/70 border-red-500 shadow-red-950/50'
            : 'bg-blue-950/70 border-blue-500 shadow-blue-950/50'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-100">
              Spymaster Console: Give a Clue
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            One word only • Number corresponds to cards related to clue
          </span>
        </div>

        {error && (
          <div className="mb-2 px-3 py-1.5 bg-rose-950 text-rose-200 border border-rose-600 rounded-lg text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Word Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={word}
              onChange={(e) => {
                setWord(e.target.value.replace(/\s+/g, ''));
                if (error) setError(null);
              }}
              placeholder="ENTER CLUE WORD..."
              maxLength={24}
              disabled={disabled}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-white font-black tracking-wider placeholder:text-slate-500 uppercase focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm md:text-base shadow-inner"
            />
          </div>

          {/* Number Count Selector */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
            {countOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setCount(opt)}
                className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                  count === opt
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {opt === 'unlimited' ? '∞' : opt === 'zero' ? '0' : opt}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled || !word.trim()}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTeam === 'red'
                ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Clue
          </button>
        </div>
      </form>
    </div>
  );
};
