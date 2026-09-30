'use client';

import React, { useState } from 'react';
import { GameSettings } from '@/types/game';
import { EXPANSION_PACKS, getWordPool } from '@/data/expansions';
import { X, Layers, Clock, ShieldAlert, Sparkles, Plus, Check } from 'lucide-react';

interface GameSettingsModalProps {
  settings: GameSettings;
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: GameSettings) => void;
}

export const GameSettingsModal: React.FC<GameSettingsModalProps> = ({
  settings,
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedPacks, setSelectedPacks] = useState<string[]>(
    settings.selectedPacks || ['classic']
  );
  const [customWordsText, setCustomWordsText] = useState<string>(
    settings.customWords ? settings.customWords.join('\n') : ''
  );
  const [timerDuration, setTimerDuration] = useState<number>(
    settings.timerDuration ?? 90
  );
  const [startingTeam, setStartingTeam] = useState<'random' | 'red' | 'blue'>(
    settings.startingTeam || 'random'
  );
  const [activeTab, setActiveTab] = useState<string>('all');

  if (!isOpen) return null;

  // Parse custom words
  const parsedCustomWords = customWordsText
    .split(/[\n,]/)
    .map((w) => w.trim().toUpperCase())
    .filter((w) => w.length > 0);

  // Compute live word pool
  const currentPool = getWordPool(selectedPacks, parsedCustomWords);

  const togglePack = (packId: string) => {
    setSelectedPacks((prev) => {
      if (prev.includes(packId)) {
        if (prev.length === 1 && parsedCustomWords.length < 25) {
          return prev; // keep at least 1 pack if no custom words
        }
        return prev.filter((id) => id !== packId);
      } else {
        return [...prev, packId];
      }
    });
  };

  const handleSave = () => {
    onSave({
      selectedPacks,
      customWords: parsedCustomWords,
      timerDuration,
      startingTeam,
    });
    onClose();
  };

  const categories = [
    { id: 'all', label: 'All Packs' },
    { id: 'core', label: 'Core Sets' },
    { id: 'official_expansion', label: 'Official Expansions' },
    { id: 'licensed', label: 'Licensed Worlds' },
    { id: 'thematic', label: 'Thematic' },
  ];

  const filteredPacks =
    activeTab === 'all'
      ? EXPANSION_PACKS
      : EXPANSION_PACKS.filter((p) => p.category === activeTab);

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base md:text-lg font-black tracking-wider text-slate-100 uppercase">
                Game Settings & Expansions
              </h2>
              <p className="text-xs text-slate-400">
                Configure card sets, timer durations, and starting parameters.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Word Pool Summary Bar */}
        <div className="bg-amber-950/40 border-b border-amber-500/20 px-5 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-slate-200">
              Active Pool Size:{' '}
              <strong className="text-amber-300 font-bold">{currentPool.length} words</strong>
            </span>
            <span className="text-slate-400">• 25 cards drawn per match</span>
          </div>
          {currentPool.length < 25 && (
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Minimum 25 words required!
            </span>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
          {/* TIMER & STARTING TEAM ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Timer Duration */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Turn Timer
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'Unlimited', val: 0 },
                  { label: '60s', val: 60 },
                  { label: '90s', val: 90 },
                  { label: '120s', val: 120 },
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setTimerDuration(t.val)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      timerDuration === t.val
                        ? 'bg-blue-600 text-white shadow font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Team */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                First Team (Gets 9 cards)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: '🎲 Random', val: 'random' },
                  { label: '🔴 Red', val: 'red' },
                  { label: '🔵 Blue', val: 'blue' },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setStartingTeam(s.val as 'random' | 'red' | 'blue')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      startingTeam === s.val
                        ? 'bg-amber-400 text-slate-950 shadow font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EXPANSIONS PACK SELECTOR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Select Expansions & Packs ({selectedPacks.length} selected)
              </h3>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                      activeTab === cat.id
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Packs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredPacks.map((pack) => {
                const isSelected = selectedPacks.includes(pack.id);
                return (
                  <div
                    key={pack.id}
                    onClick={() => togglePack(pack.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 select-none ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400 shadow-md ring-1 ring-amber-400/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-75'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-100">
                          {pack.name}
                        </span>
                        {pack.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                              pack.is18Plus
                                ? 'bg-rose-950 text-rose-300 border-rose-700'
                                : 'bg-slate-700 text-slate-300 border-slate-600'
                            }`}
                          >
                            {pack.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {pack.description}
                      </p>
                      <span className="text-[10px] text-amber-400/90 font-mono font-bold block pt-0.5">
                        {pack.wordCount} words
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CUSTOM WORD PACK CREATOR */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                Custom Words
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {parsedCustomWords.length} custom words added
              </span>
            </div>
            <textarea
              value={customWordsText}
              onChange={(e) => setCustomWordsText(e.target.value)}
              placeholder="Paste your own words separated by commas or new lines (e.g. COFFEESHOP, MATRIX, SPYDER, GRAVITY)..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 font-mono focus:border-amber-400 focus:outline-none"
            />
            <p className="text-[10px] text-slate-400">
              Custom words are blended directly into the active pool for this room.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={currentPool.length < 25}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 text-xs md:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-950/50 transition-transform active:scale-95"
          >
            Save & Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
