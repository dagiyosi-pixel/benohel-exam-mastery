import React, { useState } from 'react';
import { FOUR_YEAR_ROADMAP } from '../../data/roadmapData';
import {
  Compass,
  CheckCircle2,
  Lock,
  Clock,
  Gift,
  ChevronDown,
  ChevronUp,
  MapPin,
  Flame,
} from 'lucide-react';
import { PubgErangelMap } from '../common/PubgErangelMap';

export const RoadmapTimeline: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* PUBG Mobile Tactical Campaign Header */}
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>THE 4-YEAR BATTLE ROYALE CAMPAIGN // ERANGEL TO AAU</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-slate-100">
              From Grade 9 Cadet to Grade 12 National Titan
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono leading-relaxed">
              Every phase is assigned a realistic duration, allocated study hours, and achievable weekly pacing. Mapped out by Master Dagiyosi across 700 miles. No rushing, no burn-out, pure steady discipline.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800 flex-shrink-0 font-mono">
            <MapPin className="w-6 h-6 text-amber-400 animate-bounce" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">ACTIVE BATTLEGROUND</div>
              <div className="text-sm font-bold text-amber-300">GRADE 9 • DROP ZONE 1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Satellite Flight Path Map (Erangel Grid) */}
      <PubgErangelMap
        activePhase={expandedPhase}
        onSelectPhase={(year) => setExpandedPhase(year)}
      />

      {/* 4 Campaign Drop Zones */}
      <div className="space-y-4">
        {FOUR_YEAR_ROADMAP.map((step) => {
          const isActive = step.status === 'active';
          const isExpanded = expandedPhase === step.year;

          return (
            <div
              key={step.year}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isActive
                  ? 'bg-slate-900/95 border-amber-500/60 shadow-xl shadow-amber-950/20'
                  : 'bg-slate-900/60 border-slate-800 opacity-90'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedPhase(isExpanded ? 0 : step.year)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-850/50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded text-xs font-mono font-black uppercase ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {step.grade}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-amber-400 border border-slate-800">
                      {step.pubgZoneName}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-cyan-400 border border-slate-800 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{step.totalDuration}</span>
                    </span>

                    {isActive && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>CURRENT DROP ZONE</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-black font-mono uppercase text-slate-100 flex items-center space-x-2">
                    <span>{step.phaseTitle}</span>
                  </h3>

                  <div className="text-xs font-mono text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                      <strong className="text-amber-400">Pacing: </strong>
                      {step.targetPace}
                    </span>
                    <span>
                      <strong className="text-cyan-400">Rank Target: </strong>
                      {step.pubgRankTier}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end md:self-center flex-shrink-0">
                  <div
                    className={`p-2.5 rounded-xl border flex items-center justify-center ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-600'
                    }`}
                  >
                    {isActive ? (
                      <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <button
                    aria-label="Toggle details"
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Sub-Milestones & Strategic Sprints */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5 bg-slate-950/40">
                  {/* Strategic Focus */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                    <strong className="text-amber-400 uppercase">Core Strategic Directive: </strong>
                    {step.focus}
                  </div>

                  {/* Overarching Phase Goals */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Phase Master Objectives:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                      {step.goals.map((g, gIdx) => (
                        <li key={gIdx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                              isActive ? 'text-amber-400' : 'text-slate-500'
                            }`}
                          />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Structured Sprints with Reasonable Time Allocations & Loot Drops */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                      <span>Tactical Sprints & Operation Windows (Reasonable Timelines)</span>
                      <span>Loot Drops & Rewards</span>
                    </div>

                    <div className="space-y-2.5">
                      {step.subMilestones.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-3.5 rounded-xl border font-mono transition-all ${
                            sub.completed
                              ? 'bg-emerald-950/20 border-emerald-500/40'
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  sub.completed
                                    ? 'bg-emerald-400'
                                    : 'bg-amber-400'
                                }`}
                              />
                              <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase">
                                {sub.title}
                              </h4>
                            </div>

                            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                              <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700">
                                {sub.duration}
                              </span>
                              <span className="text-slate-500 hidden sm:inline">•</span>
                              <span className="text-cyan-400 font-semibold">{sub.targetPeriod}</span>
                            </div>
                          </div>

                          {/* Sprint Tasks */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300 pl-4 border-l-2 border-slate-800 my-2">
                            {sub.objectives.map((obj, oIdx) => (
                              <div key={oIdx} className="flex items-start space-x-1.5">
                                <span className="text-amber-400">›</span>
                                <span>{obj}</span>
                              </div>
                            ))}
                          </div>

                          {/* Brotherly Loot Drop */}
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center space-x-2 text-[11px] text-amber-300/90">
                            <Gift className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <span>
                              <strong className="text-amber-400">Airdrop Loot: </strong>
                              {sub.lootDrop}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
