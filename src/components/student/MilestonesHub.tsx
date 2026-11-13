import React, { useState } from 'react';
import { FOUR_YEAR_ROADMAP } from '../../data/roadmapData';
import {
  Trophy,
  CheckCircle2,
  Gift,
  Target,
  ChevronRight,
  ChevronDown,
  Flag,
  Compass,
} from 'lucide-react';
import { soundFX } from '../../utils/audio';
import { PubgErangelMap } from '../common/PubgErangelMap';

export const MilestonesHub: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'g9_sprints' | '4year'>('all');
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [expandedSprints, setExpandedSprints] = useState<Record<string, boolean>>({
    'sprint-1-1': false,
    'sprint-1-2': true, // Active sprint open by default
  });

  const toggleSprint = (sprintId: string) => {
    soundFX.playTacticalClick();
    setExpandedSprints((prev) => ({
      ...prev,
      [sprintId]: !prev[sprintId],
    }));
  };

  const g9Roadmap = FOUR_YEAR_ROADMAP[0];
  const sprints = g9Roadmap?.subMilestones || [];

  return (
    <div className="space-y-6">
      {/* Top Banner: Dedicated Milestones Command Center */}
      <div className="pubg-panel border-2 border-amber-500/60 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>THE ACADEMIC MILESTONE COMMAND // 4-YEAR CAMPAIGN</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-mono uppercase text-slate-100">
              Benohel's Mission Milestones
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono leading-relaxed">
              Every milestone has allocated study hours, real target weeks, and brotherly rewards from Master Dagiyosi across 700 miles. Clear them step by step. No rushing, no burn-out.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/90 p-3.5 rounded-xl border border-amber-500/40 shadow-inner flex-shrink-0 font-mono">
            <Flag className="w-6 h-6 text-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">CURRENT ACTIVE SPRINT</div>
              <div className="text-sm font-black text-amber-300">SPRINT 1.2 • MID-YEAR</div>
              <div className="text-[10px] text-emerald-400">Pacing: 1.25 Hours / Day</div>
            </div>
          </div>
        </div>

        {/* Milestone Quick Filter Pills */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[11px] hidden sm:inline">Filter View:</span>
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'g9_sprints', label: 'Grade 9 Sprints (5)' },
            { id: '4year', label: '4-Year Grand Campaign' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundFX.playTacticalClick();
                setActiveFilter(f.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                activeFilter === f.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Spotlight Card: Current Sprint In Focus */}
      <div className="pubg-panel border-2 border-amber-400/80 rounded-2xl p-5 shadow-2xl relative overflow-hidden font-mono space-y-4 pubg-glow-gold">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/40">
              <Target className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                🎯 CURRENT PRIORITY MILESTONE
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-100 uppercase">
                Sprint 1.2: Semester 1 Consolidation & Mid-Year Audit
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-amber-500/40 text-amber-300 font-bold">
              Target: 8 Weeks (~70 Study Hours)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-cyan-500/40 text-cyan-300 font-bold">
              Hidar – Tahsas
            </span>
          </div>
        </div>

        {/* Sprint Objectives Checklist */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase text-slate-400">Core Sprint Deliverables:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {[
              'Biology: Unit 1 (Bio & Tech) & Unit 2 (Cell Biology)',
              'IT: Unit 1 (Intro to ICT) & Unit 2 (Software)',
              'English: Unit 1 (Learning to Learn) & Unit 2 (Places)',
              'Mid-Year Audit Call with Master Dagiyosi (0 unverified units)',
            ].map((obj, oIdx) => (
              <div
                key={oIdx}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 flex items-center space-x-2"
              >
                <div className="w-4 h-4 rounded border border-amber-400 flex items-center justify-center text-[10px] text-amber-400 font-bold">
                  {oIdx + 1}
                </div>
                <span className="leading-tight">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brotherly Loot Drop Reward */}
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center space-x-3 text-xs">
          <Gift className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="text-slate-300">
            <strong className="text-amber-300">Loot Unlocked on Milestone Clear: </strong>
            Master Dagiyosi’s Dedicated Handwritten Letter of Commendation & Official Seal mailed across 700 miles.
          </div>
        </div>
      </div>

      {/* Sprints Timeline Section */}
      {(activeFilter === 'all' || activeFilter === 'g9_sprints') && (
        <div className="space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            <span className="flex items-center space-x-1.5 text-amber-400">
              <Trophy className="w-4 h-4" />
              <span>Grade 9 Sprints (5 Critical Milestones)</span>
            </span>
            <span>Allocated: 10 Months (320 Total Hours)</span>
          </div>

          <div className="space-y-3">
            {sprints.map((sprint, idx) => {
              const sprintKey = `sprint-1-${idx + 1}`;
              const isExpanded = !!expandedSprints[sprintKey];
              const isDone = sprint.completed;
              const isActive = idx === 1; // Sprint 1.2 is currently active

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDone
                      ? 'bg-emerald-950/15 border-emerald-500/40 shadow-md'
                      : isActive
                      ? 'pubg-panel border-amber-500/70 shadow-xl pubg-glow-gold'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div
                    onClick={() => toggleSprint(sprintKey)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-850/40 transition"
                  >
                    <div className="flex items-start sm:items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 border ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : isActive
                            ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : `#${idx + 1}`}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-slate-100 uppercase">
                            {sprint.title}
                          </span>
                          {isDone && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              COMPLETED
                            </span>
                          )}
                          {isActive && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 border border-amber-400">
                              ACTIVE NOW
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-3">
                          <span className="text-amber-400 font-semibold">{sprint.duration}</span>
                          <span>•</span>
                          <span className="text-slate-300">{sprint.targetPeriod}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <span className="text-xs text-amber-400 font-bold hidden sm:inline">
                        {isExpanded ? 'Hide Details' : 'View Objectives'}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-amber-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Objectives & Loot */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-300 uppercase">
                        Milestone Deliverables:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {sprint.objectives.map((obj, oIdx) => (
                          <div
                            key={oIdx}
                            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 flex items-start space-x-2"
                          >
                            <span className="text-amber-400 font-bold mt-0.5">•</span>
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center space-x-2.5 text-xs">
                        <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-slate-300">
                          <strong className="text-amber-300">Milestone Airdrop: </strong>
                          {sprint.lootDrop}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4-Year Grand Roadmap View */}
      {(activeFilter === 'all' || activeFilter === '4year') && (
        <div className="space-y-4 font-mono">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1 pt-2">
            <span className="flex items-center space-x-1.5 text-cyan-400">
              <Compass className="w-4 h-4" />
              <span>4-Year Grand Campaign Map (Grades 9 to 12)</span>
            </span>
            <span>Target: 550+/600 AAU Admission</span>
          </div>

          {/* Interactive Satellite Flight Map */}
          <PubgErangelMap
            activePhase={selectedPhase}
            onSelectPhase={(phaseYear) => setSelectedPhase(phaseYear)}
          />

          {/* 4 Campaign Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FOUR_YEAR_ROADMAP.map((step) => {
              const isActive = step.year === 1;

              return (
                <div
                  key={step.year}
                  className={`p-5 rounded-2xl border transition-all ${
                    isActive
                      ? 'pubg-panel border-amber-500/60 shadow-xl'
                      : 'bg-slate-900/70 border-slate-800 opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-black uppercase ${
                        isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step.grade}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400">
                      {step.totalDuration}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase mb-1">
                    {step.phaseTitle}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans mb-3 leading-relaxed">
                    {step.focus}
                  </p>

                  <div className="text-[11px] text-slate-400 space-y-1 border-t border-slate-800 pt-2 font-mono">
                    <div>Pacing: <strong className="text-slate-200">{step.targetPace}</strong></div>
                    <div>Drop Zone: <strong className="text-cyan-300">{step.pubgZoneName}</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
