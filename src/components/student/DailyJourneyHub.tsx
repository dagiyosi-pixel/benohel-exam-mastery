import React, { useState } from 'react';
import type { DailyQuest } from '../../types';
import { useApp } from '../../context/AppContext';
import { DailyQuestHero } from './DailyQuestHero';
import { DailyQuestQuizModal } from './DailyQuestQuizModal';
import { soundFX } from '../../utils/audio';
import {
  Trophy,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface DailyJourneyHubProps {
  onOpenTimer: () => void;
}

export const DailyJourneyHub: React.FC<DailyJourneyHubProps> = ({ onOpenTimer }) => {
  const { dailyQuests, activeDailyQuest, verifyDailyQuest } = useApp();

  const [selectedSprint, setSelectedSprint] = useState<number | 'all'>(
    activeDailyQuest?.sprintNumber || 1
  );
  const [quizModalQuest, setQuizModalQuest] = useState<DailyQuest | null>(null);

  const completedCount = dailyQuests.filter((q) => q.status === 'completed').length;
  const overallPercentage = Math.round((completedCount / dailyQuests.length) * 100);

  const filteredQuests =
    selectedSprint === 'all'
      ? dailyQuests
      : dailyQuests.filter((q) => q.sprintNumber === selectedSprint);

  const handleStartVerification = (quest: DailyQuest) => {
    soundFX.playTacticalClick();
    setQuizModalQuest(quest);
  };

  const handleQuizSuccess = (dayNumber: number, score: number) => {
    verifyDailyQuest(dayNumber, score);
  };

  const sprints = [
    { id: 1, name: 'Sprint 1', title: 'Semester 1 Foundations', days: 'Days 1–36' },
    { id: 2, name: 'Sprint 2', title: 'Semester 1 Core', days: 'Days 37–72' },
    { id: 3, name: 'Sprint 3', title: 'Mid-Year Arena', days: 'Days 73–90' },
    { id: 4, name: 'Sprint 4', title: 'Semester 2 Expansion', days: 'Days 91–135' },
    { id: 5, name: 'Sprint 5', title: 'Capstone & Matriculation', days: 'Days 136–180' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Today's Unmissable Hero Quest */}
      {activeDailyQuest && (
        <DailyQuestHero
          quest={activeDailyQuest}
          onStartVerification={() => handleStartVerification(activeDailyQuest)}
          onStartTimer={onOpenTimer}
        />
      )}

      {/* 2. Progress Overview & Sprint Tabs */}
      <div className="pubg-panel border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 font-mono">
        {/* Progress Metric Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 font-bold uppercase">
              Overall Grade 9 Progress:
            </span>
            <span className="text-amber-400 font-black">
              {completedCount} of {dailyQuests.length} Days Verified ({overallPercentage}%)
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Target: Finish before Ethiopian National University Entrance
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full pubg-glow-gold"
            style={{ width: `${Math.max(overallPercentage, 1)}%` }}
          />
        </div>

        {/* Sprint Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 no-scrollbar">
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              setSelectedSprint('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              selectedSprint === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All 180 Days
          </button>

          {sprints.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                soundFX.playTacticalClick();
                setSelectedSprint(s.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 ${
                selectedSprint === s.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{s.name}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({s.days})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 180-Day Progression Grid */}
      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="uppercase font-bold tracking-wider">
            {selectedSprint === 'all'
              ? 'Complete 180-Day Journey Roadmap'
              : `Sprint ${selectedSprint} Daily Missions`}
          </span>
          <span>{filteredQuests.length} Quests</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredQuests.map((quest) => {
            const isCompleted = quest.status === 'completed';
            const isActive = quest.status === 'active';

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'pubg-panel border-2 border-amber-400 shadow-xl pubg-glow-gold'
                    : isCompleted
                    ? 'bg-slate-950/90 border-emerald-500/50 hover:border-emerald-400'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        isActive
                          ? 'bg-amber-500 text-slate-950'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      DAY {quest.dayNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      {quest.subjectName}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {isCompleted ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{quest.quizScore}% VERIFIED</span>
                    </span>
                  ) : isActive ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>ACTIVE TODAY</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-slate-500 font-bold">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>LOCKED</span>
                    </span>
                  )}
                </div>

                {/* Topic & Pages */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-sans text-slate-100 line-clamp-1">
                    {quest.chapterCode}: {quest.chapterTitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 font-sans mt-0.5">
                    {quest.microGoal}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {quest.estimatedMinutes}m • {quest.textbookPages}
                  </span>

                  {isActive ? (
                    <button
                      onClick={() => handleStartVerification(quest)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center space-x-1 hover:brightness-110 active:scale-95 shadow-md"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verify with Quiz</span>
                    </button>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleStartVerification(quest)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center space-x-1 transition"
                    >
                      <span>Review / Retake</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-600 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Locked until Day {quest.dayNumber - 1}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Quiz Modal */}
      {quizModalQuest && (
        <DailyQuestQuizModal
          quest={quizModalQuest}
          isOpen={true}
          onClose={() => setQuizModalQuest(null)}
          onVerifiedSuccess={handleQuizSuccess}
        />
      )}
    </div>
  );
};
