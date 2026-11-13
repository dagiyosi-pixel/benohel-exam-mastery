import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CurriculumUnit } from '../../types';
import { AntiCheatQuizModal } from './AntiCheatQuizModal';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Layers,
  PlayCircle,
  GraduationCap,
  Award,
} from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const SyllabusTracker: React.FC = () => {
  const { curriculum, toggleChapterCompletion, startUnit } = useApp();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(curriculum[0]?.id || 'g9-math');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'phys-u1': true,
    'math-u1': true,
  });
  const [activeQuizUnit, setActiveQuizUnit] = useState<{
    unit: CurriculumUnit;
    subjectName: string;
  } | null>(null);

  const selectedSubject = curriculum.find((s) => s.id === selectedSubjectId) || curriculum[0];

  const filteredUnits = selectedSubject?.units.filter((u) => {
    if (selectedSemester === 'all') return true;
    return u.semester === selectedSemester;
  }) || [];

  const toggleExpand = (unitId: string) => {
    soundFX.playTacticalClick();
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const handleSelectSemester = (sem: number | 'all') => {
    soundFX.playTacticalClick();
    setSelectedSemester(sem);
  };

  const handleSelectSubject = (subjId: string) => {
    soundFX.playTacticalClick();
    setSelectedSubjectId(subjId);
  };

  return (
    <div className="space-y-6">
      {/* Subject Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-300 uppercase">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Select Ethiopian Curriculum Subject:</span>
          </div>

          {/* Semester Toggle */}
          <div className="flex items-center space-x-1.5 self-start sm:self-auto bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 px-2 font-mono">Semester:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 1, label: 'Sem 1' },
              { id: 2, label: 'Sem 2' },
            ].map((s) => (
              <button
                key={String(s.id)}
                onClick={() => handleSelectSemester(s.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedSemester === s.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {curriculum.map((subj) => {
            const isSelected = subj.id === selectedSubjectId;
            const completedInSubj = subj.units.filter((u) => u.status === 'verified_completed').length;

            return (
              <button
                key={subj.id}
                onClick={() => handleSelectSubject(subj.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{subj.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-950 text-amber-300'
                  }`}
                >
                  {completedInSubj}/{subj.units.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Units & Chapters List */}
      <div className="space-y-4">
        {filteredUnits.map((unit) => {
          const isVerified = unit.status === 'verified_completed';
          const isPending = unit.status === 'pending_approval';
          const isInProgress = unit.status === 'in_progress';
          const isExpanded = !!expandedUnits[unit.id];
          const chaptersReadCount = unit.completedChapters.length;
          const totalChaptersInUnit = unit.chapters.length;

          return (
            <div
              key={unit.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isVerified
                  ? 'bg-emerald-950/15 border-emerald-500/30 shadow-lg shadow-emerald-950/10'
                  : isPending
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-950/20'
                  : isInProgress
                  ? 'bg-slate-900 border-amber-500/40 shadow-md'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Unit Card Header */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 font-mono text-xs font-bold text-amber-300">
                        Unit {unit.unitNumber}
                      </span>

                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400 font-semibold">
                        Sem {unit.semester}
                      </span>

                      {/* Allocated Reasonable Study Duration */}
                      {unit.targetWeeks && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-amber-500/30 text-[10px] text-amber-400 font-mono flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Allocated: {unit.targetWeeks}</span>
                        </span>
                      )}

                      {/* PUBG Loot Tier Badge */}
                      {unit.pubgLootTier && (
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-black uppercase flex items-center space-x-1 border ${
                            unit.pubgLootTier === 'Airdrop'
                              ? 'bg-red-500/20 text-red-300 border-red-500/50 pubg-glow-crimson'
                              : unit.pubgLootTier === 'Legendary'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 pubg-glow-gold'
                              : unit.pubgLootTier === 'Epic'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          <span>{unit.pubgLootTier} Tier</span>
                        </span>
                      )}

                      {unit.textbookPageRange && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono">
                          {unit.textbookPageRange}
                        </span>
                      )}

                      {/* Status Badges */}
                      {isVerified ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified by Master Dagiyosi</span>
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-semibold text-amber-300">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>Pending Approval</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-[11px] font-semibold text-blue-300">
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Currently Studying</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] text-slate-500 font-medium">
                          Not Started
                        </span>
                      )}

                      {unit.quizScore !== null && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-bold">
                          Mini-Quiz: {unit.quizScore}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-100">
                      {unit.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {unit.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex-shrink-0 flex items-center space-x-2 self-start sm:self-center">
                    {!isVerified && !isPending && !isInProgress && (
                      <button
                        onClick={() => {
                          soundFX.playChakraSurge();
                          startUnit(unit.id);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition"
                      >
                        Start Unit
                      </button>
                    )}

                    <button
                      onClick={() => {
                        soundFX.playTacticalClick();
                        setActiveQuizUnit({
                          unit,
                          subjectName: selectedSubject.name,
                        });
                      }}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition active:scale-95 ${
                        isVerified
                          ? 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300'
                          : isPending
                          ? 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isVerified ? 'Review Quiz' : isPending ? 'Retake Quiz' : 'Take Mini-Quiz'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Chapter Reading Progress Bar */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>
                      Chapters Read:{' '}
                      <strong className="text-slate-200">
                        {chaptersReadCount} of {totalChaptersInUnit}
                      </strong>
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpand(unit.id)}
                    className="flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    <span>{isExpanded ? 'Hide Chapters' : 'View Chapters & Competencies'}</span>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Chapters & Competencies Accordion */}
              {isExpanded && (
                <div className="bg-slate-950/70 border-t border-slate-800 p-5 space-y-4">
                  {/* Authentic Textbook Chapters Checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Authentic Textbook Chapters & Subsections</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {unit.chapters.map((chap, idx) => {
                        const isChapterDone = unit.completedChapters.includes(chap);

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              soundFX.playTacticalClick();
                              toggleChapterCompletion(unit.id, chap);
                            }}
                            className={`p-2.5 rounded-xl border text-xs flex items-center space-x-2.5 cursor-pointer transition ${
                              isChapterDone
                                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChapterDone}
                              onChange={() => {}} // handled by parent div onClick
                              className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                            />
                            <span className="flex-1 font-medium leading-relaxed">{chap}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Official Learning Outcomes */}
                  {unit.learningOutcomes && unit.learningOutcomes.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                        <span>Ministry of Education Expected Competencies</span>
                      </div>

                      <ul className="space-y-1 text-xs text-slate-300">
                        {unit.learningOutcomes.map((outcome, oIdx) => (
                          <li key={oIdx} className="flex items-start space-x-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Anti-Cheat Quiz Modal */}
      {activeQuizUnit && (
        <AntiCheatQuizModal
          unitId={activeQuizUnit.unit.id}
          unitTitle={activeQuizUnit.unit.title}
          subjectName={activeQuizUnit.subjectName}
          onClose={() => setActiveQuizUnit(null)}
        />
      )}
    </div>
  );
};
