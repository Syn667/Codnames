'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, X, QrCode } from 'lucide-react';

interface ShareModalProps {
  roomCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  roomCode,
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const roomUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/room/${roomCode}`
      : `https://codnames.app/room/${roomCode}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode.toUpperCase());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Share2 className="w-5 h-5" />
            <h3 className="text-base font-black tracking-wider uppercase text-slate-100">
              Invite Agents to Room
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Share this direct link or room code with friends. They can join on any device (phone, tablet, laptop) with no account required!
        </p>

        {/* Room Code Box */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Room Code
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 font-mono font-black text-lg md:text-xl text-amber-300 tracking-widest text-center uppercase">
              {roomCode}
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl border border-slate-600 font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Direct Link Box */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Direct Room URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={roomUrl}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono select-all focus:outline-none truncate"
            />
            <button
              type="button"
              onClick={copyUrl}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
            >
              {copiedLink ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
