import React from 'react';
import { useApp } from '../../context/AppContext';
import { KakashiAvatar, KonohaWillOfFireBadge } from '../common/Avatars';

export const BannerDecree: React.FC = () => {
  const { decrees } = useApp();
  const activeDecree = decrees.find((d) => d.active) || decrees[0];

  if (!activeDecree) return null;

  return (
    <div className="relative overflow-hidden my-3 mx-4 sm:mx-6 lg:mx-8 rounded-2xl border-2 border-amber-500/60 pubg-panel p-4 sm:p-5 shadow-2xl chakra-pulse">
      {/* PUBG Tactical Hazard Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10 font-mono">
        <div className="flex items-start space-x-3.5">
          {/* Kakashi Sensei / Master Dagiyosi Mentor Avatar */}
          <div className="flex-shrink-0 mt-0.5 relative">
            <KakashiAvatar size={48} className="border-2 border-amber-400 pubg-glow-gold" />
            <div className="absolute -bottom-1 -right-1">
              <KonohaWillOfFireBadge size={16} />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center space-x-1">
                <span>HOKAGE AIRDROP BROADCAST // SENSEI DAGIYOSI</span>
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">• {activeDecree.date}</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-amber-200 uppercase mt-0.5 tracking-wide">
              "{activeDecree.title}"
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-1 max-w-4xl font-sans italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
              "{activeDecree.message}"
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 self-end sm:self-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-black/90 border border-amber-500/60 text-[10px] font-black text-amber-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>NINDO DECREE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
