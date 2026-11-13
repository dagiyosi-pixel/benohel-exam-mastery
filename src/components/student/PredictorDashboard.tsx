import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_BENCHMARKS } from '../../data/universitiesData';
import {
  Target,
  Building2,
  Compass,
  FileText,
} from 'lucide-react';
import { ExamSimulator } from './ExamSimulator';
import { soundFX } from '../../utils/audio';

export const PredictorDashboard: React.FC = () => {
  const [subView, setSubView] = useState<'predictor' | 'arena'>('predictor');
  const { calculatePredictedScore, studentProfile } = useApp();
  const { predictedScore, completionPercentage, quizAverage, consistencyScore } =
    calculatePredictedScore();

  return (
    <div className="space-y-6">
      {/* Sub-view Switcher: Predictor vs Arena */}
      <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 w-fit font-mono text-xs">
        <button
          onClick={() => {
            soundFX.playTacticalClick();
            setSubView('predictor');
          }}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
            subView === 'predictor'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>600-Point Entrance Predictor</span>
        </button>

        <button
          onClick={() => {
            soundFX.playTacticalClick();
            setSubView('arena');
          }}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
            subView === 'arena'
              ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Grade 12 Ranked Arena</span>
        </button>
      </div>

      {subView === 'arena' ? (
        <ExamSimulator />
      ) : (
        <>
          {/* Header Metric Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Grade 12 University Entrance Predictor
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                AI Prognosis Model
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">
              Benohel's Entrance Score & University Odds
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Based on your verified Grade 9 foundation, quiz accuracy, daily streak consistency, and focus hours, this model forecasts your performance on the National Entrance Examination (out of 600).
            </p>
          </div>

          {/* Big Forecast Score Card */}
          <div className="flex items-center space-x-4 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/30 shadow-inner">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Predicted Matric Score
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-300">
                {predictedScore}
                <span className="text-base text-slate-500 font-normal"> / 600</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                {predictedScore >= 520
                  ? '★ AAU Elite Program Caliber'
                  : predictedScore >= 480
                  ? '✔ Top National Tech Tier'
                  : '▲ Foundation Building Phase'}
              </div>
            </div>

            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Target className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* 4 Factor Sub-metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Curriculum Mastery</div>
            <div className="text-base font-bold font-mono text-slate-100 mt-0.5">
              {completionPercentage}%
            </div>
            <div className="text-[10px] text-slate-500">Grade 9 Units Done</div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Quiz Accuracy</div>
            <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
              {quizAverage}%
            </div>
            <div className="text-[10px] text-slate-500">First-try accuracy</div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Discipline Factor</div>
            <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
              {consistencyScore}%
            </div>
            <div className="text-[10px] text-slate-500">{studentProfile.currentStreak}-day streak</div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Focus Hours</div>
            <div className="text-base font-bold font-mono text-blue-400 mt-0.5">
              {(studentProfile.totalStudyMinutes / 60).toFixed(1)}h
            </div>
            <div className="text-[10px] text-slate-500">Verified study log</div>
          </div>
        </div>
      </div>

      {/* University Cutoff Targets List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-serif text-slate-100 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Top University & Department Placement Odds</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            National Benchmarks (Natural Science)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNIVERSITY_BENCHMARKS.map((bench, idx) => {
            const diff = predictedScore - bench.requiredCutoff;
            let status: 'High' | 'Competitive' | 'Reach' = 'Reach';
            if (diff >= 15) status = 'High';
            else if (diff >= -15) status = 'Competitive';

            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4.5 space-y-3 transition shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {bench.city}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 font-serif">
                      {bench.university}
                    </h4>
                    <p className="text-xs font-semibold text-amber-300 mt-0.5">
                      {bench.program}
                    </p>
                  </div>

                  {/* Odds Badge */}
                  <div
                    className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${
                      status === 'High'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : status === 'Competitive'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    }`}
                  >
                    {status === 'High'
                      ? '★ Safe Target'
                      : status === 'Competitive'
                      ? '⚡ In Strike Zone'
                      : '▲ Aspire & Reach'}
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {bench.description}
                </p>

                {/* Score vs Cutoff Comparison Bar */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Required Cutoff: {bench.requiredCutoff}</span>
                    <span
                      className={
                        diff >= 0 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'
                      }
                    >
                      {diff >= 0 ? `+${diff} Pts Above` : `${Math.abs(diff)} Pts to Target`}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 ${
                        diff >= 0
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                          : 'bg-gradient-to-r from-amber-500 to-indigo-500'
                      }`}
                      style={{
                        width: `${Math.min(Math.max((predictedScore / bench.requiredCutoff) * 100, 10), 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        {/* Strategic Master Advice */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-amber-400 uppercase">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Master Dagiyosi's Tactical Guidance for Benohel</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Benohel: To guarantee admission to <strong>AAU Medicine (545+)</strong> or <strong>AAiT Software Engineering (525+)</strong>, your Grade 9 objective is completing all 29 units with zero failed mini-quizzes and keeping your daily streak active. The students who stumble in Grade 12 are those who ignored Grade 9 physics vectors and chemistry stoichiometry. Master them now!"
          </p>
        </div>
      </>
    )}
    </div>
  );
};
