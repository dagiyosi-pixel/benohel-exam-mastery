import React, { useState, useEffect, useRef } from 'react';
import type { DailyQuest } from '../../types';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

interface DailyQuestQuizModalProps {
  quest: DailyQuest;
  isOpen: boolean;
  onClose: () => void;
  onVerifiedSuccess: (dayNumber: number, score: number) => void;
}

const QUESTION_TIME_SECONDS = 60;
const PASSING_THRESHOLD_PERCENT = 75;

export const DailyQuestQuizModal: React.FC<DailyQuestQuizModalProps> = ({
  quest,
  isOpen,
  onClose,
  onVerifiedSuccess,
}) => {
  const { addStudyMinutes } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const [tabSwitchesCount, setTabSwitchesCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questions = quest.quizQuestions;

  // Anti-cheat tab switch detection
  useEffect(() => {
    if (!isOpen || isCompleted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchesCount((prev) => {
          const next = prev + 1;
          setShowWarning(true);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOpen, isCompleted]);

  // Question countdown timer
  useEffect(() => {
    if (!isOpen || isCompleted) return;

    setTimeLeft(QUESTION_TIME_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return QUESTION_TIME_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isOpen, isCompleted]);

  if (!isOpen) return null;

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isCompleted) return;
    soundFX.playTacticalClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    soundFX.playTacticalClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    setFinalScore(scorePct);
    setIsCompleted(true);

    const isPassed = scorePct >= PASSING_THRESHOLD_PERCENT;

    if (isPassed) {
      soundFX.playVictoryFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      // Add logged study minutes
      addStudyMinutes(quest.estimatedMinutes);
      // Callback to unlock progression
      onVerifiedSuccess(quest.dayNumber, scorePct);
    } else {
      soundFX.playAlertWarning();
    }
  };

  const handleRetry = () => {
    soundFX.playTacticalClick();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setTimeLeft(QUESTION_TIME_SECONDS);
    setIsCompleted(false);
    setFinalScore(null);
    setTabSwitchesCount(0);
    setShowWarning(false);
  };

  const isPassed = (finalScore ?? 0) >= PASSING_THRESHOLD_PERCENT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-xl bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden font-mono text-slate-100 max-h-[92vh] flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>VERIFICATION QUIZ • DAY {quest.dayNumber} OF 180</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase">
              {quest.subjectName} — {quest.chapterCode}: {quest.chapterTitle}
            </h3>
          </div>

          {!isCompleted && (
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono font-bold text-xs ${
              timeLeft <= 15
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse'
                : 'bg-slate-950 text-amber-300 border-amber-500/40'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>

        {/* Tab Switch Anti-Cheat Warning */}
        {showWarning && !isCompleted && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-center space-x-2 text-rose-300 text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 animate-bounce" />
            <span>
              <strong>Integrity Warning:</strong> Tab switch detected ({tabSwitchesCount}x). Closed-book rule enforced!
            </span>
          </div>
        )}

        {/* Main Quiz Flow */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {!isCompleted ? (
            /* Active Question */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-amber-400 font-bold">
                  Target: ≥{PASSING_THRESHOLD_PERCENT}% to unlock Day {quest.dayNumber + 1}
                </span>
              </div>

              <div className="text-sm sm:text-base font-sans font-semibold text-slate-100 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {currentQuestion.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl font-sans text-xs sm:text-sm transition-all border flex items-start space-x-3 active:scale-98 ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-md shadow-amber-500/20 font-medium'
                          : 'bg-slate-950/80 hover:bg-slate-800/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Quiz Results Screen */
            <div className="space-y-5 text-center py-2">
              <div className={`p-5 rounded-2xl border-2 flex flex-col items-center space-y-2 ${
                isPassed
                  ? 'bg-emerald-950/50 border-emerald-500/70 text-emerald-300'
                  : 'bg-rose-950/50 border-rose-500/70 text-rose-300'
              }`}>
                {isPassed ? (
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                ) : (
                  <XCircle className="w-12 h-12 text-rose-400 animate-pulse" />
                )}

                <div className="text-2xl font-black font-mono">
                  {finalScore}% SCORE
                </div>

                <div className="text-xs sm:text-sm font-sans font-bold">
                  {isPassed
                    ? `VICTORY! Milestone Verified. Day ${quest.dayNumber + 1} is now UNLOCKED!`
                    : `Threshold not met (Need ≥${PASSING_THRESHOLD_PERCENT}%). Review the material and retry to unlock progression.`}
                </div>
              </div>

              {/* Question Breakdown */}
              <div className="space-y-3 text-left">
                <div className="text-xs uppercase font-bold text-slate-400">
                  Question Review & Educational Explanations:
                </div>
                {questions.map((q, qIdx) => {
                  const userAnswer = selectedAnswers[qIdx];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={qIdx}
                      className={`p-3 rounded-xl border text-xs font-sans space-y-1.5 ${
                        isCorrect
                          ? 'bg-slate-950/80 border-emerald-500/40 text-slate-200'
                          : 'bg-slate-950/80 border-rose-500/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="font-semibold">{q.question}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 pl-6">
                        <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                      </div>
                      <div className="text-[11px] text-amber-300/90 pl-6 bg-slate-900/60 p-2 rounded-lg font-mono">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          {!isCompleted ? (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  onClose();
                }}
                className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentIndex] === undefined}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-2 shadow-lg"
              >
                <span>{currentIndex === questions.length - 1 ? 'Submit Verification' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              {!isPassed ? (
                <button
                  onClick={handleRetry}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Review Notes & Try Again</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFX.playTacticalClick();
                    onClose();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Claim Mastery & Continue Journey</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
