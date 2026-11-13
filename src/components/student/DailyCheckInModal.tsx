import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Sparkles, CheckCircle2, Clock, BookOpen, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NarutoAvatar, KonohaWillOfFireBadge } from '../common/Avatars';
import { soundFX } from '../../utils/audio';

interface DailyCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, submitDailyCheckIn, hasCheckedInToday } = useApp();

  const [studyMinutes, setStudyMinutes] = useState(45);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [reflectionEasy, setReflectionEasy] = useState('');
  const [reflectionChallenging, setReflectionChallenging] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const subjectsList = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Information Technology',
  ];

  const handleToggleSubject = (sub: string) => {
    soundFX.playTacticalClick();
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) return;

    soundFX.playChakraSurge();
    submitDailyCheckIn({
      studyMinutes,
      subjects: selectedSubjects,
      reflectionEasy: reflectionEasy.trim() || 'Covered essential concepts smoothly.',
      reflectionChallenging: reflectionChallenging.trim() || 'Reviewed problem sets for reinforcement.',
    });

    setIsSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#6366f1'],
    });

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Daily Study Accountability Log"
    >
      <div className="pubg-panel border-2 border-amber-500/60 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header with Naruto Avatar & Nindo Creed */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <NarutoAvatar size={42} className="border-2 border-amber-400 pubg-glow-gold" />
              <div className="absolute -bottom-1 -right-1">
                <KonohaWillOfFireBadge size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
                Daily Nindo Training Log
              </h3>
              <p className="text-[11px] text-amber-300 font-mono italic">
                "I never run away, that's my Ninja Way!" • No Skipping Days
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-200 text-sm font-bold p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {hasCheckedInToday ? (
          <div className="text-center py-6 space-y-4 font-mono">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 pubg-glow-cyan">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-slate-100 uppercase">
              Today's Nindo Training Completed!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-sans">
              You showed up and trained your intellect. Your Will of Fire streak is glowing at{' '}
              <strong className="text-amber-400 font-mono">{studentProfile.currentStreak} Days</strong>! Keep up the momentum for tomorrow.
            </p>
            <button
              onClick={() => {
                soundFX.playTacticalClick();
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider transition min-h-[44px]"
            >
              Continue Mission
            </button>
          </div>
        ) : isSubmitted ? (
          <div className="text-center py-8 space-y-3 font-mono">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-100 uppercase">
              Nindo Training Recorded!
            </h4>
            <p className="text-xs text-amber-300 font-mono">
              +50 Base XP • Streak Extended to {studentProfile.currentStreak + 1} Days
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            {/* Streak Motivation Banner */}
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center space-x-3">
              <Flame className="w-5 h-5 text-amber-400 flex-shrink-0 animate-pulse" />
              <div className="text-slate-200 text-[11px]">
                Current Streak:{' '}
                <strong className="text-amber-300">{studentProfile.currentStreak} Days</strong>.
                Completing today's log boosts streak to{' '}
                <strong className="text-emerald-400 font-bold">{studentProfile.currentStreak + 1} Days</strong>!
              </div>
            </div>

            {/* Study Minutes Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Focus Study Time Today</span>
                </span>
                <span className="text-amber-400 font-mono text-sm font-bold">
                  {studyMinutes} Minutes
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="180"
                step="5"
                value={studyMinutes}
                onChange={(e) => setStudyMinutes(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>15m Quick</span>
                <span>45m Standard</span>
                <span>90m Deep Work</span>
                <span>180m Marathon</span>
              </div>
            </div>

            {/* Subjects Studied Selector */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Which subjects did you work on today?</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {subjectsList.map((sub) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      type="button"
                      key={sub}
                      onClick={() => handleToggleSubject(sub)}
                      className={`p-2 rounded-lg text-left text-[11px] font-semibold border transition ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-sm'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Honest Reflection: What was easy? */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center space-x-1">
                <span>What concept clicked and felt easy today?</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mastered the displacement vs distance graphs..."
                value={reflectionEasy}
                onChange={(e) => setReflectionEasy(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Honest Reflection: What was challenging? */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>What was challenging that you will review next?</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Solving systems of equations with negative fractions..."
                value={reflectionChallenging}
                onChange={(e) => setReflectionChallenging(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={selectedSubjects.length === 0}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 transition active:scale-[0.99]"
              >
                Submit Daily Check-In & Claim +50 XP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
