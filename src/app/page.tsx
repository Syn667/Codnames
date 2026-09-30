'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AVATAR_OPTIONS } from '@/data/characters';
import { AvatarIcon } from '@/components/art/AvatarIcon';
import { CharacterArt } from '@/components/art/CharacterArt';
import { CodLogo } from '@/components/art/CodLogo';
import { EXPANSION_PACKS } from '@/data/expansions';
import {
  Play,
  LogIn,
  Layers,
  Sparkles,
  HelpCircle,
  Shield,
  Zap,
  Flame,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [avatarId, setAvatarId] = useState('cod_agent');
  const [joinCode, setJoinCode] = useState('');
  const [customRoomCode, setCustomRoomCode] = useState('');
  const [showCustomCode, setShowCustomCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore saved credentials
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNickname = localStorage.getItem('codnames_nickname');
      const savedAvatarId = localStorage.getItem('codnames_avatar_id');
      if (savedNickname) setNickname(savedNickname);
      if (savedAvatarId) setAvatarId(savedAvatarId);
    }
  }, []);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNick = nickname.trim();
    if (!cleanNick) {
      setError('Please choose a codename before initiating mission.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      localStorage.setItem('codnames_nickname', cleanNick);
      localStorage.setItem('codnames_avatar_id', avatarId);

      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: cleanNick,
          avatarId,
          customCode: customRoomCode.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create room.');
        setLoading(false);
        return;
      }

      if (data.playerId) {
        localStorage.setItem('codnames_player_id', data.playerId);
      }

      router.push(`/room/${data.room.code}`);
    } catch (err) {
      console.error('Room creation failed:', err);
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = joinCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanCode) {
      setError('Please enter a room code.');
      return;
    }

    if (nickname.trim()) {
      localStorage.setItem('codnames_nickname', nickname.trim());
      localStorage.setItem('codnames_avatar_id', avatarId);
    }

    router.push(`/room/${cleanCode}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* HERO HEADER */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <CodLogo size="md" showText={true} />

          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Realtime Multiplayer
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" /> 14 Expansions Included
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 space-y-12">
        {/* CHARACTER SHOWCASE BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/80 via-slate-900/90 to-blue-950/80 border-2 border-slate-800 p-6 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider font-display">
              <Sparkles className="w-4 h-4" />
              Online Web Edition
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Two Rival Spymasters.<br className="hidden sm:inline" /> One Secret Grid.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Give one-word clues to help your field operatives identify their secret agents. Avoid the innocent bystanders — and whatever you do, <strong className="text-white font-bold">beware the assassin</strong>.
            </p>
          </div>

          {/* Character Art Quad Preview */}
          <div className="grid grid-cols-2 gap-3.5 w-72 sm:w-80 shrink-0 z-10">
            <div className="aspect-square rounded-2xl bg-red-950/60 border-2 border-red-500/80 p-3 shadow-lg flex flex-col items-center justify-center">
              <div className="w-18 h-18">
                <CharacterArt characterId="red_1" category="red" />
              </div>
              <span className="text-xs font-bold font-display uppercase tracking-wide text-red-200 mt-2">
                Red Agent
              </span>
            </div>
            <div className="aspect-square rounded-2xl bg-blue-950/60 border-2 border-blue-500/80 p-3 shadow-lg flex flex-col items-center justify-center">
              <div className="w-18 h-18">
                <CharacterArt characterId="blue_1" category="blue" />
              </div>
              <span className="text-xs font-bold font-display uppercase tracking-wide text-blue-200 mt-2">
                Blue Agent
              </span>
            </div>
            <div className="aspect-square rounded-2xl bg-amber-950/60 border-2 border-amber-500/80 p-3 shadow-lg flex flex-col items-center justify-center">
              <div className="w-18 h-18">
                <CharacterArt characterId="bystander_1" category="bystander" />
              </div>
              <span className="text-xs font-bold font-display uppercase tracking-wide text-amber-200 mt-2">
                Bystander
              </span>
            </div>
            <div className="aspect-square rounded-2xl bg-neutral-950 border-2 border-rose-600 p-3 shadow-lg flex flex-col items-center justify-center">
              <div className="w-18 h-18">
                <CharacterArt characterId="assassin_1" category="assassin" />
              </div>
              <span className="text-xs font-bold font-display uppercase tracking-wide text-rose-300 mt-2">
                Assassin
              </span>
            </div>
          </div>
        </div>

        {/* ERROR NOTIFICATION */}
        {error && (
          <div className="p-4 bg-rose-950/90 border border-rose-500 text-rose-200 rounded-2xl text-sm font-bold text-center">
            {error}
          </div>
        )}

        {/* ACTION CARDS: CREATE OR JOIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CREATE GAME CARD */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                    Host New Game
                  </h2>
                  <p className="text-sm text-slate-300 mt-0.5">
                    Create a private room and share the link with friends.
                  </p>
                </div>
              </div>

              {/* Nickname input */}
              <div className="space-y-2">
                <label
                  htmlFor="host-nickname-input"
                  className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wide"
                >
                  Your Codename / Nickname
                </label>
                <input
                  id="host-nickname-input"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Commander, Agent 007..."
                  maxLength={18}
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400/25 text-base shadow-inner placeholder:text-slate-500"
                />
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Choose Avatar
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                  {AVATAR_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAvatarId(opt.id)}
                      className={`min-h-[64px] p-2 rounded-xl flex flex-col items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        avatarId === opt.id
                          ? 'ring-2 ring-amber-400 bg-slate-800 shadow-md scale-105'
                          : 'hover:bg-slate-800/60 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <AvatarIcon avatarId={opt.id} size="md" showBorder={false} />
                      <span className="text-xs text-slate-200 font-medium truncate w-full text-center mt-1.5">
                        {opt.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Room Code */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowCustomCode(!showCustomCode)}
                  className="text-sm text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded py-1 px-0.5 cursor-pointer"
                >
                  {showCustomCode ? '− Hide Custom Room Code' : '+ Set Custom Room Code (Optional)'}
                </button>

                {showCustomCode && (
                  <div className="mt-2 space-y-1">
                    <input
                      type="text"
                      value={customRoomCode}
                      onChange={(e) => setCustomRoomCode(e.target.value)}
                      placeholder="e.g. friday-game-night"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm sm:text-base text-slate-100 uppercase font-mono font-bold focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/25"
                    />
                    <p className="text-xs text-slate-400">
                      Share this custom code so friends can easily type it in.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateRoom}
              disabled={loading || !nickname.trim()}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-display font-bold text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <Shield className="w-5 h-5" />
              {loading ? 'Creating Secret Room...' : 'Create Mission Room'}
            </button>
          </div>

          {/* JOIN GAME CARD */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center shrink-0">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                    Join Existing Mission
                  </h2>
                  <p className="text-sm text-slate-300 mt-0.5">
                    Enter a room code given by the host.
                  </p>
                </div>
              </div>

              {/* Room Code Input */}
              <div className="space-y-2">
                <label
                  htmlFor="join-code-input"
                  className="block text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wide"
                >
                  Room Code or Link
                </label>
                <input
                  id="join-code-input"
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="e.g. FOX-429 or paste full URL"
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 focus:border-blue-400 rounded-xl text-white font-mono font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400/25 text-base sm:text-lg shadow-inner text-center placeholder:text-slate-500 placeholder:normal-case placeholder:tracking-normal placeholder:font-sans"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300 space-y-2">
                <p className="font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  Have a direct link instead?
                </p>
                <p className="leading-relaxed text-slate-300">
                  If your friend sent you a link like <code className="text-amber-300 font-mono font-semibold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">.../room/xyz</code>, simply open it in any browser to jump straight into the lobby!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleJoinRoom}
              disabled={!joinCode.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-bold text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-blue-950/40 flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              Join Room
            </button>
          </div>
        </div>

        {/* EXPANSIONS DIRECTORY SHOWCASE */}
        <div className="space-y-5 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-amber-400" />
                Official Expansions & Themed Decks
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Play with any combination of core sets, official expansion packs, licensed universes, or custom words.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              14 Decks Included
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
            {EXPANSION_PACKS.map((pack) => (
              <div
                key={pack.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 hover:bg-slate-900 transition-all duration-150"
              >
                <div>
                  <span className="text-sm font-bold text-white font-display block leading-snug">
                    {pack.name}
                  </span>
                  <span className="text-xs text-slate-300 leading-normal block mt-1.5 line-clamp-2">
                    {pack.description}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-semibold pt-2 border-t border-slate-800/80">
                  <span>{pack.wordCount} words</span>
                  <span className="text-slate-400 uppercase text-[11px]">{pack.category.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-sm text-slate-400 space-y-1.5">
        <p>Codnames • Inspired by the award-winning Codenames game by Vlaada Chvátil and Czech Games Edition.</p>
        <p className="text-xs text-slate-500">Built for instant deployment on Vercel with real-time multiplayer synchronization.</p>
      </footer>
    </div>
  );
}
