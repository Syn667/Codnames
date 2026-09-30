'use client';

import React, { useState } from 'react';
import { Player, Role, Team } from '@/types/game';
import { AvatarIcon } from '@/components/art/AvatarIcon';
import {
  Crown,
  Eye,
  Shield,
  Shuffle,
  Settings,
  Play,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';

interface PlayerRosterProps {
  players: Record<string, Player>;
  currentUserId: string;
  isHost: boolean;
  onSwitchTeam: (team: Team) => void;
  onSwitchRole: (role: Role) => void;
  onRandomizeTeams: () => void;
  onOpenSettings: () => void;
  onStartGame: () => void;
}

export const PlayerRoster: React.FC<PlayerRosterProps> = ({
  players,
  currentUserId,
  isHost,
  onSwitchTeam,
  onSwitchRole,
  onRandomizeTeams,
  onOpenSettings,
  onStartGame,
}) => {
  const [showSpymasterModal, setShowSpymasterModal] = useState(false);

  const playerList = Object.values(players);
  const redPlayers = playerList.filter((p) => p.team === 'red');
  const bluePlayers = playerList.filter((p) => p.team === 'blue');
  const spectators = playerList.filter((p) => p.team === 'spectator');

  const currentUser = players[currentUserId];

  const handleRoleToggle = () => {
    if (!currentUser) return;
    if (currentUser.role === 'operative') {
      // Prompt confirmation before becoming Spymaster
      setShowSpymasterModal(true);
    } else {
      onSwitchRole('operative');
    }
  };

  const confirmSpymaster = () => {
    setShowSpymasterModal(false);
    onSwitchRole('spymaster');
  };

  const canStartGame = redPlayers.length >= 1 && bluePlayers.length >= 1;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      {/* HOST ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 md:p-4 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-base md:text-lg font-black tracking-wider text-slate-100 uppercase">
            Lobby Roster ({playerList.length} Players)
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isHost && (
            <>
              <button
                type="button"
                onClick={onRandomizeTeams}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 shadow flex items-center gap-1.5 transition-transform active:scale-95"
                title="Randomly distribute players across Red and Blue teams"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                Randomize
              </button>

              <button
                type="button"
                onClick={onOpenSettings}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 shadow flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-blue-400" />
                Game Settings & Expansions
              </button>

              <button
                type="button"
                onClick={onStartGame}
                disabled={!canStartGame}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs md:text-sm font-black tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                Start Game
              </button>
            </>
          )}

          {!isHost && (
            <div className="text-xs text-slate-400 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Waiting for host to launch the mission...
            </div>
          )}
        </div>
      </div>

      {/* TEAMS GRID: RED VS BLUE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* RED TEAM COLUMN */}
        <div className="bg-gradient-to-b from-red-950/40 to-slate-900/90 border-2 border-red-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-red-500/20 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-500/80" />
                <h3 className="text-base font-black uppercase tracking-wider text-red-300">
                  Red Team ({redPlayers.length})
                </h3>
              </div>

              {currentUser?.team !== 'red' && (
                <button
                  type="button"
                  onClick={() => onSwitchTeam('red')}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow transition-transform active:scale-95"
                >
                  Join Red
                </button>
              )}
            </div>

            {/* Players list */}
            <div className="space-y-2">
              {redPlayers.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">
                  No agents on Red team yet.
                </p>
              ) : (
                redPlayers.map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-2 rounded-xl border ${
                      p.id === currentUserId
                        ? 'bg-red-950/70 border-red-500/80 shadow'
                        : 'bg-slate-800/50 border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <AvatarIcon avatarId={p.avatarId} size="sm" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-100">
                            {p.nickname}
                          </span>
                          {p.isHost && (
                            <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                          )}
                          {p.id === currentUserId && (
                            <span className="text-[9px] bg-red-500/40 text-red-200 px-1 rounded font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 capitalize">
                          {p.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                          p.role === 'spymaster'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {p.role}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Role toggle for current user if on Red */}
          {currentUser?.team === 'red' && (
            <div className="mt-4 pt-3 border-t border-red-500/20 flex justify-between items-center">
              <span className="text-xs text-slate-300">Your current role:</span>
              <button
                type="button"
                onClick={handleRoleToggle}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg border border-slate-600 shadow flex items-center gap-1.5 transition-transform active:scale-95"
              >
                {currentUser.role === 'operative' ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    Become Spymaster
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                    Switch to Operative
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* BLUE TEAM COLUMN */}
        <div className="bg-gradient-to-b from-blue-950/40 to-slate-900/90 border-2 border-blue-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-500/20 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/80" />
                <h3 className="text-base font-black uppercase tracking-wider text-blue-300">
                  Blue Team ({bluePlayers.length})
                </h3>
              </div>

              {currentUser?.team !== 'blue' && (
                <button
                  type="button"
                  onClick={() => onSwitchTeam('blue')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow transition-transform active:scale-95"
                >
                  Join Blue
                </button>
              )}
            </div>

            {/* Players list */}
            <div className="space-y-2">
              {bluePlayers.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">
                  No agents on Blue team yet.
                </p>
              ) : (
                bluePlayers.map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-2 rounded-xl border ${
                      p.id === currentUserId
                        ? 'bg-blue-950/70 border-blue-500/80 shadow'
                        : 'bg-slate-800/50 border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <AvatarIcon avatarId={p.avatarId} size="sm" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-100">
                            {p.nickname}
                          </span>
                          {p.isHost && (
                            <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                          )}
                          {p.id === currentUserId && (
                            <span className="text-[9px] bg-blue-500/40 text-blue-200 px-1 rounded font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 capitalize">
                          {p.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                          p.role === 'spymaster'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {p.role}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Role toggle for current user if on Blue */}
          {currentUser?.team === 'blue' && (
            <div className="mt-4 pt-3 border-t border-blue-500/20 flex justify-between items-center">
              <span className="text-xs text-slate-300">Your current role:</span>
              <button
                type="button"
                onClick={handleRoleToggle}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg border border-slate-600 shadow flex items-center gap-1.5 transition-transform active:scale-95"
              >
                {currentUser.role === 'operative' ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    Become Spymaster
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                    Switch to Operative
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SPECTATORS BAR */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Spectators ({spectators.length}):
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {spectators.length === 0 ? (
              <span className="text-xs text-slate-500 italic">None</span>
            ) : (
              spectators.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700"
                >
                  {s.nickname}
                </span>
              ))
            )}
          </div>
        </div>

        {currentUser?.team !== 'spectator' && (
          <button
            type="button"
            onClick={() => onSwitchTeam('spectator')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-transform active:scale-95"
          >
            Become Spectator
          </button>
        )}
      </div>

      {/* SPYMASTER CONFIRMATION MODAL */}
      {showSpymasterModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-black uppercase tracking-wider">
                Become Spymaster?
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              As Spymaster, you will see the full secret keycard revealing which cards belong to <strong>Red</strong>, <strong>Blue</strong>, <strong>Innocent Bystanders</strong>, and the <strong>Assassin</strong>!
            </p>
            <p className="text-xs text-amber-300/90 bg-amber-950/50 p-2.5 rounded-xl border border-amber-500/30">
              ⚠️ <em>You will not be able to guess words once you see the secret identities. Only do this if you intend to give clues!</em>
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSpymasterModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSpymaster}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Yes, I Am Spymaster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
