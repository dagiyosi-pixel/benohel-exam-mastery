import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Lock, Sparkles, HeartHandshake, Package } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../../utils/audio';
import { PubgAirdropAvatar } from '../common/Avatars';

export const RewardsWall: React.FC = () => {
  const { rewards, claimReward } = useApp();

  const handleClaim = (rewardId: string) => {
    soundFX.playAirdropUnlock();
    claimReward(rewardId);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6'],
    });
  };

  return (
    <div className="space-y-6">
      {/* PUBG Airdrop Supply Depot Header */}
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <Package className="w-4 h-4 text-amber-400" />
              <span>AIRDROP SUPPLY DEPOT // BROTHERHOOD ARSENAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-slate-100">
              Commander Dagiyosi's Airdrop Crates
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono leading-relaxed">
              No cash, no lavish tech. Real brotherly covenant: formula vaults, handwritten certificates of honor, heirloom tools passed down, duo gaming marathons, and celebration dinners across the 700 miles.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
            <HeartHandshake className="w-4 h-4" />
            <span>100% BROTHERLY COVENANT</span>
          </div>
        </div>
      </div>

      {/* Airdrop Supply Crates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rewards.map((rew, idx) => {
          const isUnlocked = rew.isUnlocked || rew.progressValue >= rew.targetValue;
          const isClaimed = rew.isClaimed;
          const progressPercent = Math.min(
            Math.round((rew.progressValue / rew.targetValue) * 100),
            100
          );

          return (
            <div
              key={rew.id}
              className={`rounded-2xl border flex flex-col justify-between transition-all overflow-hidden relative ${
                isClaimed
                  ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                  : isUnlocked
                  ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/20 pubg-glow-gold'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              {/* PUBG Airdrop Crate Top Styling */}
              <div className={`p-2.5 px-4 flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-wider ${
                isUnlocked
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                  : 'bg-slate-950 text-slate-400 border-b border-slate-800'
              }`}>
                <span>AIRDROP CRATE #0{idx + 1}</span>
                <span>{isClaimed ? 'CLAIMED' : isUnlocked ? 'TOUCHDOWN!' : 'IN TRANSIT'}</span>
              </div>

              <div className="p-4 space-y-3 font-mono flex-1">
                <div className="flex items-start justify-between">
                  <div
                    className={`relative p-1 rounded-xl border ${
                      isUnlocked
                        ? 'bg-red-500/20 border-red-400 pubg-glow-crimson'
                        : 'bg-slate-800/80 border-slate-700 opacity-70'
                    }`}
                  >
                    <PubgAirdropAvatar size={48} className={isUnlocked ? 'animate-pulse' : 'grayscale'} />
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isClaimed
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : isUnlocked
                        ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {isClaimed ? 'Secured' : isUnlocked ? 'Unlocked!' : 'Locked'}
                  </span>
                </div>

                <h3 className="text-sm font-black uppercase text-slate-100">
                  {rew.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  "{rew.rewardDescription}"
                </p>

                {/* Tactical Progress Meter */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Target Progress:</span>
                    <span className="text-amber-300 font-bold">
                      {rew.progressValue} / {rew.targetValue}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-xs overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0 font-mono">
                {isClaimed ? (
                  <div className="flex items-center justify-center space-x-1.5 py-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>EQUIPPED IN INVENTORY</span>
                  </div>
                ) : isUnlocked ? (
                  <button
                    onClick={() => handleClaim(rew.id)}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition active:scale-95 flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>LOOT AIRDROP CRATE</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center space-x-1.5 py-2 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Reach target to deploy crate</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
