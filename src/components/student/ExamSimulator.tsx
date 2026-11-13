import React, { useState } from 'react';
import { PAST_ENTRANCE_EXAMS } from '../../data/pastEntranceExams';
import {
  CheckCircle2,
  XCircle,
  Filter,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExamSimulator: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const years = ['All', 2016, 2015];

  const filteredQuestions = PAST_ENTRANCE_EXAMS.filter((q) => {
    const matchSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const matchYear = selectedYear === 'All' || q.year === selectedYear;
    return matchSubject && matchYear;
  });

  const handleSelectAnswer = (questionId: string, optionIndex: number, correctIndex: number) => {
    if (userAnswers[questionId] !== undefined) return; // already answered

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    setShowExplanations((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    if (optionIndex === correctIndex) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b'],
      });
    }
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = Object.entries(userAnswers).filter(
    ([qId, ans]) => {
      const q = PAST_ENTRANCE_EXAMS.find((item) => item.id === qId);
      return q && q.correctIndex === ans;
    }
  ).length;

  const currentScorePercentage =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Grade 12 National University Entrance Exam Archive
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Authentic Past Papers
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100 mt-1">
              Test Your Strength on Real Entrance Papers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Solve real matriculation questions from 2015 & 2016 E.C. Early practice in Grade 9 desensitizes exam anxiety and reveals the exact analytical rigor expected by university examiners.
            </p>
          </div>

          {/* Quick Score Card */}
          <div className="flex-shrink-0 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-semibold mb-0.5">
              Accuracy on Past Exams
            </div>
            <div className="text-2xl font-black font-mono text-amber-300">
              {totalCorrect} / {totalAnswered}
              <span className="text-xs text-slate-400 ml-1">({currentScorePercentage}%)</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {totalAnswered} of {PAST_ENTRANCE_EXAMS.length} attempted
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-5 mt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filter Subject:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedSubject === s
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center space-x-2 text-xs text-slate-400">
            <span>Year:</span>
            <div className="flex gap-1">
              {years.map((y) => (
                <button
                  key={String(y)}
                  onClick={() => setSelectedYear(y as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                    selectedYear === y
                      ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {y === 'All' ? 'All Years' : `${y} E.C.`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, qIndex) => {
          const selectedAnswer = userAnswers[q.id];
          const hasAnswered = selectedAnswer !== undefined;
          const isCorrect = selectedAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 transition shadow-md ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-950/15 border-emerald-500/30'
                    : 'bg-rose-950/15 border-rose-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Meta Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold">
                      {q.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 font-mono text-xs text-slate-300">
                      {q.year} E.C.
                    </span>
                    <span className="text-xs text-slate-400">• {q.topic}</span>
                  </div>

                  {hasAnswered && (
                    <div className="flex items-center space-x-1.5 text-xs font-bold font-mono">
                      {isCorrect ? (
                        <span className="flex items-center space-x-1 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct (+20 XP)</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-rose-400">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question */}
                <h3 className="text-base font-serif font-bold text-slate-100 leading-relaxed">
                  {qIndex + 1}. {q.question}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedAnswer === optIndex;
                    const isTheCorrectOne = optIndex === q.correctIndex;

                    let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750';
                    if (hasAnswered) {
                      if (isTheCorrectOne) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isTheCorrectOne) {
                        btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectAnswer(q.id, optIndex, q.correctIndex)}
                        disabled={hasAnswered}
                        className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center space-x-2.5 transition ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-amber-300 flex-shrink-0">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {hasAnswered && showExplanations[q.id] && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 font-mono">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Official Solution & Concept Analysis:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
