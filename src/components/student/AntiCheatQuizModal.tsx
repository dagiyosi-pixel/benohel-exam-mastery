import React, { useState, useEffect, useRef } from 'react';
import type { QuizQuestion } from '../../types';
import { QUIZ_BANK_GRADE_9 } from '../../data/quizBankGrade9';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NarutoAvatar } from '../common/Avatars';
import { soundFX } from '../../utils/audio';

interface AntiCheatQuizModalProps {
  unitId: string;
  unitTitle: string;
  subjectName: string;
  onClose: () => void;
}

const QUESTION_TIME_SECONDS = 60;

export const AntiCheatQuizModal: React.FC<AntiCheatQuizModalProps> = ({
  unitId,
  unitTitle,
  subjectName,
  onClose,
}) => {
  const { submitQuizAttempt } = useApp();

  const questions: QuizQuestion[] = QUIZ_BANK_GRADE_9[unitId] || [
    {
      id: `${unitId}-fallback-1`,
      unitId,
      subjectId: 'general',
      question: `Core concept question for ${unitTitle}: Which statement best represents the fundamental scientific principle of this unit?`,
      options: [
        'Hypotheses must be empirically testable and verified by consistent experimental data.',
        'Scientific theories never undergo refinement regardless of new evidence.',
        'Units of measurement can be arbitrarily chosen without standardization.',
        'Qualitative descriptions are always sufficient without mathematical modeling.',
      ],
      correctIndex: 0,
      explanation: 'Empirical verification and testability form the bedrock of rigorous scientific inquiry.',
    },
    {
      id: `${unitId}-fallback-2`,
      unitId,
      subjectId: 'general',
      question: `Problem solving in ${unitTitle}: What is the first essential step in addressing numerical problems?`,
      options: [
        'Immediately guess the answer without writing down given values.',
        'Identify given quantities, specify required unknowns, and apply standard SI units.',
        'Skip the formula and perform random arithmetic calculations.',
        'Only solve problems if they match previous exact textbook numbers.',
      ],
      correctIndex: 1,
      explanation: 'Systematic listing of given variables, unknowns, and standard SI conversions guarantees accuracy.',
    },
    {
      id: `${unitId}-fallback-3`,
      unitId,
      subjectId: 'general',
      question: `Analytical thinking in ${subjectName}: How does mastery of this unit impact Grade 12 National Exam performance?`,
      options: [
        'Grade 9 foundations constitute up to 25% of conceptual scaffolding tested in national university entrance exams.',
        'Grade 9 subjects are completely excluded from national entrance questions.',
        'Only Grade 12 materials are ever tested on matriculation.',
        'Memorizing answers without comprehension is sufficient for top university cutoff.',
      ],
      correctIndex: 0,
      explanation: 'High school matriculation tests cumulative conceptual mastery starting from Grade 9 foundations.',
    },
    {
      id: `${unitId}-fallback-4`,
      unitId,
      subjectId: 'general',
      question: `Integrity and discipline: Why does Master Dagiyosi require timed, closed-book mini-quizzes?`,
      options: [
        'To simulate authentic national exam hall conditions with zero external aids.',
        'To make studying slow and complicated.',
        'Because AI tools are guaranteed to sit the exam for you.',
        'To discourage independent critical thinking.',
      ],
      correctIndex: 0,
      explanation: 'The real national exam hall allows zero phones, zero internet, and zero AI. True mastery is built in the mind.',
    },
    {
      id: `${unitId}-fallback-5`,
      unitId,
      subjectId: 'general',
      question: `Review and self-evaluation: What minimum score is required to unlock Master Dagiyosi's official approval?`,
      options: [
        '50%',
        '60%',
        '75%',
        '90%',
      ],
      correctIndex: 2,
      explanation: 'Master Dagiyosi maintains a strict 75% benchmark to ensure complete comprehension before moving forward.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const [isFinished, setIsFinished] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showCheatWarning, setShowCheatWarning] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Anti-Cheat: Tab Switch & Window Blur Detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isFinished) {
        setTabSwitchCount((prev) => {
          const updated = prev + 1;
          setShowCheatWarning(true);
          return updated;
        });
      }
    };

    const handleWindowBlur = () => {
      if (!isFinished) {
        setTabSwitchCount((prev) => {
          const updated = prev + 1;
          setShowCheatWarning(true);
          return updated;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isFinished]);

  // Per-Question Countdown Timer
  useEffect(() => {
    if (isFinished) return;

    setTimeLeft(QUESTION_TIME_SECONDS);

    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question, auto advance
          handleSelectOption(null);
          return QUESTION_TIME_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [currentIndex, isFinished]);

  const handleSelectOption = (optionIndex: number | null) => {
    soundFX.playTacticalClick();
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = optionIndex !== null ? optionIndex : -1;
    setSelectedAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: number[]) => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setIsFinished(true);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (finalAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const passed = scorePercentage >= 75;

    // Submit attempt to AppContext
    submitQuizAttempt(unitId, scorePercentage, passed, tabSwitchCount);

    if (passed) {
      soundFX.playVictoryFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6'],
      });
    }
  };

  const scorePercentage = selectedAnswers.reduce((acc, ans, idx) => {
    return ans === questions[idx]?.correctIndex ? acc + (100 / questions.length) : acc;
  }, 0);

  const passed = Math.round(scorePercentage) >= 75;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md quiz-protection-zone"
      role="dialog"
      aria-modal="true"
      aria-label="Unit Mini-Quiz"
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="pubg-panel border-2 border-amber-500/60 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Anti-Cheat & Chunin Exam Header Banner */}
        <div className="bg-slate-950 border-b border-amber-500/40 px-4 sm:px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <NarutoAvatar size={34} className="border border-amber-400 pubg-glow-gold flex-shrink-0" />
            <div>
              <span className="text-xs font-mono font-black tracking-wider uppercase text-amber-300 flex items-center space-x-1.5">
                <span>CHUNIN EXAM INTEGRITY GATE // NO GENJUTSU!</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono">
                "There are no shortcuts to becoming Hokage!" • Tab-switch monitored • 60s/target
              </p>
            </div>
          </div>

          {!isFinished && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/50 text-xs font-mono font-bold text-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>

        {/* Tab-Switch Warning Alert */}
        {showCheatWarning && !isFinished && (
          <div className="bg-rose-950/80 border-b border-rose-500/50 px-4 py-2 flex items-center justify-between text-rose-200 text-xs animate-pulse">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>
                <strong>Warning:</strong> Tab switch detected ({tabSwitchCount}x). Master Dagiyosi will receive an integrity flag on your log!
              </span>
            </div>
            <button
              onClick={() => setShowCheatWarning(false)}
              className="text-rose-400 font-bold hover:text-rose-200 ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {!isFinished ? (
            <>
              {/* Question Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    {subjectName} • {unitTitle}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-100 leading-snug">
                  {questions[currentIndex]?.question}
                </h3>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {questions[currentIndex]?.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className="w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all flex items-center space-x-3 bg-slate-800/80 hover:bg-slate-750 hover:border-amber-400/50 border border-slate-700 text-slate-200 shadow-sm group active:scale-[0.99]"
                  >
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-amber-400 text-amber-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Results & Explanations Screen */
            <div className="space-y-6 text-center">
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="inline-flex p-3 rounded-full bg-slate-900 border border-slate-700">
                  {passed ? (
                    <Award className="w-10 h-10 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 text-rose-400" />
                  )}
                </div>

                <h3 className="text-xl font-bold font-mono uppercase text-slate-100">
                  {passed ? '🏆 WINNER WINNER CHICKEN DINNER! // OBJECTIVE CLEARED' : 'MISSION FAILED // RETAKE REQUIRED (<75%)'}
                </h3>

                <div className="text-3xl font-extrabold font-mono text-amber-300">
                  {Math.round(scorePercentage)}%
                </div>

                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {passed ? (
                    <>
                      Congratulations, Benohel! You met Master Dagiyosi’s 75% standard. This unit has been submitted to your brother’s queue for final verification and bonus XP.
                    </>
                  ) : (
                    <>
                      You scored below the 75% threshold. Review the unit concepts below and retake the test. Master Dagiyosi expects thorough mastery before checkoff!
                    </>
                  )}
                </p>

                {tabSwitchCount > 0 && (
                  <div className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded-lg border border-rose-800/50">
                    ⚠️ {tabSwitchCount} tab switch(es) recorded during this test session.
                  </div>
                )}
              </div>

              {/* Question Review & Explanations */}
              <div className="text-left space-y-4">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">
                  Concept Breakdown & Explanations
                </h4>

                {questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                          : 'bg-rose-950/20 border-rose-500/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between font-semibold">
                        <span className="font-serif">
                          {idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                        )}
                      </div>

                      <div className="text-slate-400 space-y-0.5">
                        <div>
                          Your Answer:{' '}
                          <span className={isCorrect ? 'text-emerald-300' : 'text-rose-300 font-bold'}>
                            {userAnswer !== -1 && userAnswer !== undefined
                              ? q.options[userAnswer]
                              : 'Timed Out / Skipped'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-300">
                            Correct Answer: <strong>{q.options[q.correctIndex]}</strong>
                          </div>
                        )}
                      </div>

                      <div className="pt-1.5 border-t border-slate-800/60 text-[11px] text-amber-300/90 italic">
                        Explanation: {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-3 pt-2">
                {!passed && (
                  <button
                    onClick={() => {
                      soundFX.playChakraSurge();
                      setCurrentIndex(0);
                      setSelectedAnswers([]);
                      setIsFinished(false);
                      setTabSwitchCount(0);
                      setShowCheatWarning(false);
                    }}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Mini-Quiz</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    soundFX.playTacticalClick();
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition"
                >
                  <span>Close Window</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
