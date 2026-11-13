import React from 'react';
import { Flame, Zap } from 'lucide-react';

interface PubgBoostBarProps {
  currentStreak: number;
  totalStudyMinutes: number;
}

export const PubgBoostBar: React.FC<PubgBoostBarProps> = ({
  currentStreak,
  totalStudyMinutes,
}) => {
  // Calculate boost level 0 - 100% based on streak and daily focus
  // Streak of 5 days + recent study gives max 100% boost!
  const streakPoints = Math.min(currentStreak * 15, 60);
  const hourPoints = Math.min(Math.floor(totalStudyMinutes / 10), 40);
  const boostPercent = Math.min(streakPoints + hourPoints, 100);

  // 4 Boost Stages (PUBG Mobile style)
  // Stage 1: 0-20%
  // Stage 2: 20-60%
  // Stage 3: 60-90%
  // Stage 4: 90-100%
  const isStage1 = boostPercent > 0;
  const isStage2 = boostPercent >= 20;
  const isStage3 = boostPercent >= 60;
  const isStage4 = boostPercent >= 90;

  return (
    <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 space-y-2 font-mono">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-200 flex items-center space-x-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>ADRENALINE BOOST: STUDY SPRINT SPEED</span>
        </span>
        <span className="text-amber-400 font-black flex items-center space-x-1">
          {isStage4 && <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />}
          <span>
            {boostPercent}% {isStage4 ? 'MAX SPRINT' : isStage3 ? 'BOOSTED' : 'CHARGING'}
          </span>
        </span>
      </div>

      {/* 4 PUBG Segmented Boost Blocks with Diagonal Slant */}
      <div className="flex space-x-1.5 h-3.5 bg-slate-900 p-1 rounded border border-slate-700">
        {/* Stage 1 (20% width) */}
        <div className="w-[20%] h-full bg-slate-800 rounded-xs overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isStage1 ? 'bg-gradient-to-r from-amber-600 to-amber-500 shadow-sm shadow-amber-500/50' : ''
            }`}
            style={{ width: `${Math.min((boostPercent / 20) * 100, 100)}%` }}
          />
        </div>

        {/* Stage 2 (40% width) */}
        <div className="w-[40%] h-full bg-slate-800 rounded-xs overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isStage2
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-sm shadow-amber-400/50'
                : ''
            }`}
            style={{
              width: `${
                boostPercent <= 20
                  ? 0
                  : Math.min(((boostPercent - 20) / 40) * 100, 100)
              }%`,
            }}
          />
        </div>

        {/* Stage 3 (30% width) */}
        <div className="w-[30%] h-full bg-slate-800 rounded-xs overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isStage3
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-sm shadow-yellow-300/60'
                : ''
            }`}
            style={{
              width: `${
                boostPercent <= 60
                  ? 0
                  : Math.min(((boostPercent - 60) / 30) * 100, 100)
              }%`,
            }}
          />
        </div>

        {/* Stage 4 (10% width - Max Speed Sprint) */}
        <div className="w-[10%] h-full bg-slate-800 rounded-xs overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isStage4
                ? 'bg-gradient-to-r from-yellow-300 to-white shadow-md shadow-white/80 animate-pulse'
                : ''
            }`}
            style={{
              width: `${
                boostPercent <= 90
                  ? 0
                  : Math.min(((boostPercent - 90) / 10) * 100, 100)
              }%`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400">
        <span>Will of Fire: {currentStreak}-Day Streak</span>
        <span className="text-amber-300 font-bold">
          {isStage4
            ? '⚡ +6.2% Mental Sprint Buff Active'
            : isStage3
            ? '🔥 High Cognitive Stamina'
            : 'Maintain daily log to max boost'}
        </span>
      </div>
    </div>
  );
};
