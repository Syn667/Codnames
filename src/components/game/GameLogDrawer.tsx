'use client';

import React from 'react';
import { GameLogEntry } from '@/types/game';
import { History, X } from 'lucide-react';

interface GameLogDrawerProps {
  log: GameLogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const GameLogDrawer: React.FC<GameLogDrawerProps> = ({
  log,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 md:w-96 bg-slate-900/95 border-l border-slate-700/80 shadow-2xl z-40 flex flex-col backdrop-blur-md animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2 text-amber-400">
          <History className="w-4 h-4" />
          <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-slate-100">
            Mission Timeline ({log.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Log Entries */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {log.map((entry) => {
          const time = new Date(entry.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          const teamColor =
            entry.team === 'red'
              ? 'border-l-4 border-red-500 bg-red-950/20'
              : entry.team === 'blue'
              ? 'border-l-4 border-blue-500 bg-blue-950/20'
              : 'border-l-4 border-slate-600 bg-slate-800/40';

          return (
            <div
              key={entry.id}
              className={`p-2.5 rounded-xl border border-slate-800 text-xs space-y-1 shadow-sm ${teamColor}`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="uppercase font-bold tracking-wider">
                  {entry.type.replace('_', ' ')}
                </span>
                <span>{time}</span>
              </div>
              <p className="text-slate-200 leading-snug font-medium">
                {entry.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
