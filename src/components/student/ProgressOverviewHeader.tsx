import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  Shield,
  Zap,
} from 'lucide-react';
import {
  NarutoAvatar,
  PubgHelmetAvatar,
  KonohaWillOfFireBadge,
} from '../common/Avatars';
import { PubgRankEmblem } from '../common/PubgRankEmblem';
import { PubgBoostBar } from '../common/PubgBoostBar';

export const ProgressOverviewHeader: React.FC = () => {
  const { curriculum, calculatePredictedScore, studentProfile } = useApp();
  const {
    completedUnits,
    totalUnits,
    inProgressUnits,
    completedChaptersCount,
    totalChapters,
    predictedScore,
    quizAverage,
    currentRank,
  } = calculatePredictedScore();

  const percent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  const chaptersPercent = totalChapters > 0 ? Math.round((completedChaptersCount / totalChapters) * 100) : 0;

  // Semester breakdown
  let sem1Total = 0;
  let sem1Completed = 0;
  let sem2Total = 0;
  let sem2Completed = 0;

  curriculum.forEach((subj) => {
    subj.units.forEach((u) => {
      if (u.semester === 1) {
        sem1Total++;
        if (u.status === 'verified_completed') sem1Completed++;
      } else {
        sem2Total++;
        if (u.status === 'verified_completed') sem2Completed++;
      }
    });
  });

  const sem1Percent = sem1Total > 0 ? Math.round((sem1Completed / sem1Total) * 100) : 0;
  const sem2Percent = sem2Total > 0 ? Math.round((sem2Completed / sem2Total) * 100) : 0;

  return (
    <div className="pubg-panel border-2 border-amber-500/60 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-6">
      {/* Tactical Hazard Diagonal Stripe Accent along the top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

      {/* Top Banner: Royale Pass & Tactical Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30">
              ROYALE PASS S9
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-amber-300 border border-amber-500/30">
              ETHIOPIAN MOE CURRICULUM
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OVERWATCH LINK: ACTIVE</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-mono uppercase tracking-wide text-slate-100 flex items-center space-x-2">
            <span>BENOHEL'S COMBAT PROGRESS CENTER</span>
          </h1>

          <p className="text-xs font-mono text-slate-300 max-w-2xl leading-relaxed">
            [OPERATIONAL PACING]: Allocated 10 Months (320 Total Hours) • ~9.5 Hours Per Unit • Target Pace: 1.25 Hours/Day. All units verified by Master Dagiyosi across 700 miles.
          </p>
        </div>

        {/* Tactical Rank Card / Naruto Genin x PUBG Level 3 Badge & Military Crest */}
        <div className="flex items-center space-x-3 sm:space-x-4 bg-slate-950/95 p-3.5 sm:p-4 rounded-xl border border-amber-500/50 shadow-2xl flex-shrink-0 font-mono">
          {/* 3D Military Rank Shield Emblem */}
          <PubgRankEmblem
            category={currentRank.rankCategory}
            tierNumber={
              currentRank.tierName.includes('V')
                ? 'V'
                : currentRank.tierName.includes('IV')
                ? 'IV'
                : currentRank.tierName.includes('III')
                ? 'III'
                : currentRank.tierName.includes('II')
                ? 'II'
                : 'I'
            }
            isHonorBoosted={currentRank.isHonorBoosted}
            size={58}
          />

          <div className="relative flex-shrink-0 hidden xs:block">
            <NarutoAvatar size={48} className="border-2 border-amber-400 pubg-glow-gold" />
            <div className="absolute -bottom-1 -right-1">
              <PubgHelmetAvatar size={20} className="border border-black shadow" />
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center space-x-1">
              <span>CURRENT RANK (GRADE 9)</span>
              {currentRank.isHonorBoosted && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-black font-black animate-pulse">
                  ★ 90%+ BOOST
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg font-black text-amber-300">
              {currentRank.tierName}
            </div>
            <div className="text-[11px] text-cyan-300 font-semibold">
              {currentRank.shinobiTitle}
            </div>
            <div className="text-[10px] text-slate-400">
              Next: <strong className="text-amber-400">{currentRank.nextMilestone}</strong>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              EST. ENTRANCE: {predictedScore}/600 (QUIZ AVG: {quizAverage}%)
            </div>
          </div>
        </div>
      </div>

      {/* The Nindo Creed Banner */}
      <div className="bg-amber-950/30 border-l-4 border-amber-400 px-3.5 py-2 rounded-r-xl flex items-center space-x-2 text-xs font-mono">
        <KonohaWillOfFireBadge size={22} className="flex-shrink-0 animate-pulse" />
        <p className="text-amber-200 leading-snug">
          <strong>NINDO CREED: </strong>
          <span className="italic">"I never go back on my word, and I never run away from my studies... that's my Nindo, that's my Ninja Way! There are no shortcuts to becoming Hokage!"</span>
        </p>
      </div>

      {/* Segmented Combat HUD Gauges: HEALTH (Units), ARMOR (Chapters), & BOOST (Sprint) */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* HEALTH GAUGE: Syllabus Units Mastered */}
        <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-slate-200 flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>COMBAT HP: SYLLABUS UNITS CLEARED</span>
            </span>
            <span className="text-amber-400 font-black">
              {completedUnits} / {totalUnits} UNITS ({percent}%)
            </span>
          </div>

          {/* Segmented Health Bar (10 Blocks) */}
          <div className="grid grid-cols-10 gap-1 h-3.5 bg-slate-900 p-0.5 rounded border border-slate-700">
            {Array.from({ length: 10 }).map((_, i) => {
              const threshold = (i + 1) * 10;
              const isFilled = percent >= threshold;
              const isPartial = percent >= threshold - 5 && !isFilled;

              return (
                <div
                  key={i}
                  className={`h-full rounded-xs transition-all duration-500 ${
                    isFilled
                      ? 'bg-gradient-to-t from-amber-500 to-yellow-400 shadow-sm shadow-amber-500/50'
                      : isPartial
                      ? 'bg-amber-600/60'
                      : 'bg-slate-800'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>{inProgressUnits} Units Currently In Progress</span>
            <span>Allocated: 320 Study Hours Total</span>
          </div>
        </div>

        {/* ARMOR VEST GAUGE: MoE Textbook Chapters Read */}
        <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-slate-200 flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>ARMOR VEST: CHAPTER OBJECTIVES SECURED</span>
            </span>
            <span className="text-cyan-400 font-black">
              {completedChaptersCount} / {totalChapters} SECTORS ({chaptersPercent}%)
            </span>
          </div>

          {/* Segmented Armor Bar (10 Blocks) */}
          <div className="grid grid-cols-10 gap-1 h-3.5 bg-slate-900 p-0.5 rounded border border-slate-700">
            {Array.from({ length: 10 }).map((_, i) => {
              const threshold = (i + 1) * 10;
              const isFilled = chaptersPercent >= threshold;

              return (
                <div
                  key={i}
                  className={`h-full rounded-xs transition-all duration-500 ${
                    isFilled
                      ? 'bg-gradient-to-t from-cyan-500 to-blue-400 shadow-sm shadow-cyan-500/50'
                      : 'bg-slate-800'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Authentic MoE Textbook Sections Read</span>
            <span>Focus Pacing: 3 Sectors / Week</span>
          </div>
        </div>
      </div>

      {/* PUBG Mobile Energy Boost / Study Adrenaline Sprint Bar */}
      <PubgBoostBar
        currentStreak={studentProfile.currentStreak}
        totalStudyMinutes={studentProfile.totalStudyMinutes}
      />
    </div>

      {/* 6 Tactical Divisions / Subject Mastery Breakdown */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center space-x-1.5 text-amber-400">
            <Target className="w-4 h-4" />
            <span>TACTICAL DIVISIONS (6 CORE SUBJECTS • ETHIOPIAN MOE)</span>
          </span>
          <span className="hidden sm:inline text-slate-400">ALLOCATED TIME: 1.5–2 WEEKS PER UNIT</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {curriculum.map((subj) => {
            const completedCount = subj.units.filter((u) => u.status === 'verified_completed').length;
            const inProgCount = subj.units.filter((u) => u.status === 'in_progress').length;
            const subjPercent = Math.round((completedCount / subj.units.length) * 100);

            return (
              <div
                key={subj.id}
                className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 hover:border-amber-500/50 transition-all font-mono"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-slate-200 truncate">{subj.name}</span>
                  <span className="text-[10px] text-amber-400 font-bold">
                    {completedCount}/{subj.units.length}
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-xs overflow-hidden flex border border-slate-700">
                  <div
                    className="h-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${subjPercent}%` }}
                  />
                  <div
                    className="h-full bg-amber-600/60 transition-all duration-500"
                    style={{ width: `${Math.round((inProgCount / subj.units.length) * 100)}%` }}
                  />
                </div>

                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>{subjPercent}% CLEARED</span>
                  <span className="text-cyan-400">~{subj.units.length * 9}H</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Semester Sprints with Reasonable Time Allocations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Semester 1 Sprint */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="font-black text-amber-300 uppercase tracking-wider">
              SEMESTER 1 OPERATION // 16 WEEKS (140 HOURS)
            </span>
            <span className="font-bold text-slate-200">
              {sem1Completed} / {sem1Total} UNITS ({sem1Percent}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-xs overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
              style={{ width: `${sem1Percent}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            [Meskerem – Tahsas]: Units 1–3 in Math, Physics, Chemistry, Bio, IT & English. Goal: Clear all 17 units with Master Dagiyosi's decree approval before Mid-Year.
          </p>
        </div>

        {/* Semester 2 Sprint */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="font-black text-cyan-300 uppercase tracking-wider">
              SEMESTER 2 OPERATION // 18 WEEKS (180 HOURS)
            </span>
            <span className="font-bold text-slate-200">
              {sem2Completed} / {sem2Total} UNITS ({sem2Percent}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-xs overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500"
              style={{ width: `${sem2Percent}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            [Tir – Ginbot]: Units 4–6 advanced mechanics, chemical bonding, logo & relations. Prepares for Grade 9 Finals and Grade 10 Natural Science stream criteria.
          </p>
        </div>
      </div>
    </div>
  );
};
