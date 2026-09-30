'use client';

import React, { useState } from 'react';
import { AVATAR_OPTIONS } from '@/data/characters';
import { AvatarIcon } from '@/components/art/AvatarIcon';
import { User, ShieldCheck } from 'lucide-react';

interface NicknameModalProps {
  isOpen: boolean;
  initialNickname?: string;
  initialAvatarId?: string;
  onSubmit: (nickname: string, avatarId: string) => void;
}

export const NicknameModal: React.FC<NicknameModalProps> = ({
  isOpen,
  initialNickname = '',
  initialAvatarId = 'red_1',
  onSubmit,
}) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [avatarId, setAvatarId] = useState(initialAvatarId);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = nickname.trim();
    if (!clean) {
      setError('Please choose an operative codename.');
      return;
    }
    if (clean.length > 18) {
      setError('Codename must be 18 characters or less.');
      return;
    }

    onSubmit(clean, avatarId);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-2">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-wider text-slate-100">
            Agent Credentials
          </h2>
          <p className="text-xs text-slate-400">
            Enter your operative codename and choose your character avatar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-3 py-1.5 bg-rose-950 text-rose-200 border border-rose-600 rounded-xl text-xs font-semibold text-center">
              {error}
            </div>
          )}

          {/* Nickname input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Codename / Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Fox, Maverick, 007..."
              maxLength={18}
              autoFocus
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-amber-400/30 text-sm shadow-inner"
            />
          </div>

          {/* Avatar selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Choose Avatar
            </label>
            <div className="grid grid-cols-5 gap-2 p-2 bg-slate-950/70 border border-slate-800 rounded-2xl">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAvatarId(opt.id)}
                  className={`p-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                    avatarId === opt.id
                      ? 'ring-2 ring-amber-400 bg-slate-800/80 scale-105'
                      : 'hover:bg-slate-800/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <AvatarIcon avatarId={opt.id} size="sm" showBorder={false} />
                  <span className="text-[9px] text-slate-400 font-semibold truncate w-full text-center mt-1">
                    {opt.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Enter Game Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            Enter Game Room
          </button>
        </form>
      </div>
    </div>
  );
};
