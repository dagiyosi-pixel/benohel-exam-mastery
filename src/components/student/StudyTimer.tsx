import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Pause, RotateCcw, Clock, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../../utils/audio';

export const StudyTimer: React.FC = () => {
  const { addStudyMinutes } = useApp();

  const presets = [
    { label: '25m Pomodoro', minutes: 25 },
    { label: '50m Deep Work', minutes: 50 },
    { label: '15m Quick Drill', minutes: 15 },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Information Technology'];

  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isRunning, selectedMinutes]);

  const handleSessionComplete = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setIsRunning(false);
    setCompletedSessions((prev) => prev + 1);

    addStudyMinutes(selectedMinutes);
    soundFX.playVictoryFanfare();

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#f59e0b', '#10b981'],
    });

    setSecondsLeft(selectedMinutes * 60);
  };

  const handleSelectPreset = (m: number) => {
    soundFX.playTacticalClick();
    setIsRunning(false);
    setSelectedMinutes(m);
    setSecondsLeft(m * 60);
  };

  const handleReset = () => {
    soundFX.playTacticalClick();
    setIsRunning(false);
    setSecondsLeft(selectedMinutes * 60);
  };

  const handleToggleTimer = () => {
    if (!isRunning) {
      soundFX.playChakraSurge();
    } else {
      soundFX.playTacticalClick();
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((selectedMinutes * 60 - secondsLeft) / (selectedMinutes * 60)) * 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Master Dagiyosi Focus Chamber</span>
          </div>
          <h3 className="text-lg font-bold font-serif text-slate-100 mt-0.5">
            Undistracted Deep Work Timer
          </h3>
          <p className="text-xs text-slate-300">
            Log real focus sessions. No phones, no multitasking. Builds mental endurance for 3-hour national exams.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {presets.map((p) => (
            <button
              key={p.minutes}
              onClick={() => handleSelectPreset(p.minutes)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedMinutes === p.minutes
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Pill Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Subject Focus:</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                soundFX.playTacticalClick();
                setSelectedSubject(sub);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                selectedSubject === sub
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Main Countdown Display */}
      <div className="flex flex-col items-center justify-center py-6 space-y-4">
        <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 rounded-full border-4 border-slate-800 bg-slate-950/70 shadow-2xl">
          {/* Circular progress highlight */}
          <div
            className="absolute inset-0 rounded-full border-4 border-amber-500 transition-all duration-1000 opacity-80"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${progressPercent > 25 ? '100% 0%,' : ''} ${
                progressPercent > 50 ? '100% 100%,' : ''
              } ${progressPercent > 75 ? '0% 100%,' : ''} 0% 0%)`,
            }}
          />

          <div className="text-center relative z-10 space-y-1">
            <div className="text-4xl sm:text-5xl font-mono font-black tracking-wider text-slate-100">
              {formatTime(secondsLeft)}
            </div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              {selectedSubject}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isRunning ? 'Session Active' : 'Chamber Paused'}
            </div>
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={handleToggleTimer}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition active:scale-95 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-amber-600/30'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isRunning ? 'Pause Focus' : 'Start Focus Session'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
        <span className="flex items-center space-x-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Awards +{Math.floor(selectedMinutes / 2)} XP on completion</span>
        </span>
        <span className="text-slate-400">
          Completed Today: <strong className="text-emerald-400">{completedSessions} Sessions</strong>
        </span>
      </div>
    </div>
  );
};
