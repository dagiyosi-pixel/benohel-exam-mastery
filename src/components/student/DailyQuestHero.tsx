import React from 'react';
import type { DailyQuest } from '../../types';
import { soundFX } from '../../utils/audio';
import {
  BookOpen,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Play,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface DailyQuestHeroProps {
  quest: DailyQuest;
  onStartVerification: () => void;
  onStartTimer: () => void;
}

export const DailyQuestHero: React.FC<DailyQuestHeroProps> = ({
  quest,
  onStartVerification,
  onStartTimer,
}) => {
  const getSubjectColor = (subjectId: string) => {
    switch (subjectId) {
      case 'g9-math':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'g9-physics':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'g9-chem':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'g9-bio':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'g9-eng':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'g9-it':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const isVerified = quest.status === 'completed';

  return (
    <div className="pubg-panel border-2 border-amber-400/90 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-5 font-mono pubg-glow-gold">
      <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center space-x-2.5">
          <div className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
            DAY {quest.dayNumber} OF 180
          </div>
          <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase ${getSubjectColor(quest.subjectId)}`}>
            {quest.subjectName}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            • {quest.sprintTitle}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 font-bold">{quest.estimatedMinutes} Min Target</span>
        </div>
      </div>

      {/* Main Focus Title */}
      <div className="space-y-2">
        <div className="text-[11px] text-amber-400 uppercase font-bold tracking-wider">
          Unit {quest.unitNumber}: {quest.unitTitle}
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-100 font-sans tracking-tight">
          Section {quest.chapterCode}: {quest.chapterTitle}
        </h2>
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="font-semibold text-amber-200">{quest.textbookPages}</span>
        </div>
      </div>

      {/* Daily Micro-Goal Card */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>TODAY'S ACTIONABLE MICRO-GOAL:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
          {quest.microGoal}
        </p>
      </div>

      {/* Verification Callout & Actions */}
      <div className="p-4 rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transition-all">
        {isVerified ? (
          /* Already Verified */
          <div className="flex items-center space-x-3 text-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                MILESTONE VERIFIED & COMPLETED
              </div>
              <div className="text-xs text-slate-300 font-sans">
                Score: <strong>{quest.quizScore}%</strong> • Day {quest.dayNumber + 1} is now unlocked!
              </div>
            </div>
          </div>
        ) : (
          /* Pending Verification */
          <div className="flex items-center space-x-3 text-amber-300">
            <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0 animate-pulse" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                VERIFICATION REQUIRED TO PROGRESS
              </div>
              <div className="text-xs text-slate-300 font-sans">
                Pass closed-book quiz (≥75%) to verify you completed today's study.
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2.5 flex-shrink-0">
          {/* Focus Timer Launch */}
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              onStartTimer();
            }}
            className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black uppercase tracking-wider transition active:scale-95 flex items-center space-x-2 border border-slate-700"
            title="Launch Focus Chamber Timer"
          >
            <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span className="hidden sm:inline">Focus Timer</span>
          </button>

          {/* Primary Verification Quiz Button */}
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              onStartVerification();
            }}
            className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl transition-all active:scale-95 flex items-center space-x-2 ${
              isVerified
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
                : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 border-2 border-amber-300 shadow-amber-500/30 pubg-glow-gold'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>{isVerified ? 'RETAKE FOR PRACTICE' : 'VERIFY TODAY (TAKE QUIZ)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
