import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Crown,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  Sparkles,
  Scroll,
  Gift,
  Clock,
  History,
  HeartHandshake,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MasterDashboard: React.FC = () => {
  const {
    studentProfile,
    curriculum,
    decrees,
    rewards,
    auditLogs,
    dailyLogs,
    approveUnit,
    rejectUnit,
    postDecree,
    deleteDecree,
    addReward,
    grantMastersGraceStreakFreeze,
  } = useApp();

  // Decree Form State
  const [decreeTitle, setDecreeTitle] = useState('');
  const [decreeMessage, setDecreeMessage] = useState('');
  const [decreeUrgency, setDecreeUrgency] = useState<'normal' | 'high' | 'celebration'>('normal');

  // Reward Form State
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');
  const [rewardType, setRewardType] = useState<'streak' | 'unit_completion' | 'focus_hours'>('streak');
  const [rewardTarget, setRewardTarget] = useState(15);
  const [showRewardForm, setShowRewardForm] = useState(false);

  // Collect all pending units across all subjects
  const pendingUnits: { subjectName: string; unit: any }[] = [];
  curriculum.forEach((subj) => {
    subj.units.forEach((u) => {
      if (u.status === 'pending_approval') {
        pendingUnits.push({ subjectName: subj.name, unit: u });
      }
    });
  });

  const handlePostDecree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decreeTitle.trim() || !decreeMessage.trim()) return;

    postDecree(decreeTitle.trim(), decreeMessage.trim(), decreeUrgency);
    setDecreeTitle('');
    setDecreeMessage('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#d97706'],
    });
  };

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim() || !rewardDescription.trim()) return;

    addReward({
      title: rewardTitle.trim(),
      rewardDescription: rewardDescription.trim(),
      conditionType: rewardType,
      targetValue: rewardTarget,
      progressValue: 0,
    });

    setRewardTitle('');
    setRewardDescription('');
    setShowRewardForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Mentor Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-xl flex items-center justify-center text-slate-950 flex-shrink-0">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                  Command Center • Mentor View
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40">
                  700-Mile Remote Telemetry
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">
                Master Dagiyosi's Oversight Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Mentoring <strong className="text-amber-300">Benohel Yosef</strong> from Grade 9 foundation to Grade 12 national exam victory.
              </p>
            </div>
          </div>

          {/* Master's Grace Action Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                grantMastersGraceStreakFreeze();
                confetti({
                  particleCount: 60,
                  spread: 70,
                  origin: { y: 0.5 },
                  colors: ['#3b82f6', '#10b981', '#f59e0b'],
                });
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition active:scale-95"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Grant Master's Grace (+1 Day Freeze)</span>
            </button>
          </div>
        </div>

        {/* Quick Student Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-amber-500/20">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400">Current Daily Streak</div>
            <div className="text-xl font-bold font-mono text-amber-400 flex items-center space-x-1 mt-0.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{studentProfile.currentStreak} Days</span>
            </div>
            <div className="text-[10px] text-slate-500">Longest: {studentProfile.longestStreak} days</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400">Total Focus Time</div>
            <div className="text-xl font-bold font-mono text-blue-400 flex items-center space-x-1 mt-0.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{Math.floor(studentProfile.totalStudyMinutes / 60)}h {studentProfile.totalStudyMinutes % 60}m</span>
            </div>
            <div className="text-[10px] text-slate-500">Verified study logs</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400">Student Rank & XP</div>
            <div className="text-xl font-bold font-mono text-emerald-400 flex items-center space-x-1 mt-0.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Lvl {studentProfile.level}</span>
            </div>
            <div className="text-[10px] text-slate-500">{studentProfile.xp} Total XP</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400">Pending Review Queue</div>
            <div className="text-xl font-bold font-mono text-amber-300 flex items-center space-x-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{pendingUnits.length} Units</span>
            </div>
            <div className="text-[10px] text-slate-500">Needs your verification</div>
          </div>
        </div>
      </div>

      {/* Verification Queue (Approve / Reject Units) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-serif text-slate-100">
              Unit Verification Queue ("No Lies" Gate)
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
            {pendingUnits.length} Awaiting Approval
          </span>
        </div>

        {pendingUnits.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-400/50 mx-auto mb-2" />
            All submitted units have been reviewed! Benohel has no pending approval requests.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingUnits.map(({ subjectName, unit }) => (
              <div
                key={unit.id}
                className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {subjectName}
                    </span>
                    <span className="text-xs text-slate-400">• Unit {unit.unitNumber}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                      Mini-Quiz Score: {unit.quizScore}%
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-serif">
                    {unit.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{unit.description}</p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      approveUnit(unit.id);
                      confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.6 },
                        colors: ['#10b981', '#f59e0b'],
                      });
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Award XP</span>
                  </button>

                  <button
                    onClick={() => rejectUnit(unit.id, 'Score needs reinforcement.')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 text-xs font-semibold transition"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Request Retake</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Column Section: Decree Composer & Reward Promiser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decree Composer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Scroll className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-serif text-slate-100">
                Broadcast Master's Decree
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Live in Benohel's Header
            </span>
          </div>

          <form onSubmit={handlePostDecree} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Decree Title / Headline
              </label>
              <input
                type="text"
                value={decreeTitle}
                onChange={(e) => setDecreeTitle(e.target.value)}
                placeholder="e.g. Focus on Physics Vectors This Weekend"
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Motivational Message / Directive
              </label>
              <textarea
                value={decreeMessage}
                onChange={(e) => setDecreeMessage(e.target.value)}
                rows={3}
                placeholder="Write your personal words of guidance, advice, or expectations..."
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Tone:</span>
                {(['normal', 'high', 'celebration'] as const).map((urg) => (
                  <button
                    type="button"
                    key={urg}
                    onClick={() => setDecreeUrgency(urg)}
                    className={`px-2 py-1 rounded text-[10px] font-mono capitalize transition ${
                      decreeUrgency === urg
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {urg}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!decreeTitle.trim() || !decreeMessage.trim()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Decree</span>
              </button>
            </div>
          </form>

          {/* Active Decrees List */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Active Decrees ({decrees.length})
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {decrees.map((d) => (
                <div
                  key={d.id}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-200">{d.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 italic">
                      "{d.message}"
                    </div>
                  </div>
                  <button
                    onClick={() => deleteDecree(d.id)}
                    className="text-slate-500 hover:text-rose-400 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promised Reward Manager */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-serif text-slate-100">
                Promised Milestone Rewards
              </h3>
            </div>
            <button
              onClick={() => setShowRewardForm(!showRewardForm)}
              className="flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showRewardForm ? 'Cancel' : 'Add Reward'}</span>
            </button>
          </div>

          {showRewardForm && (
            <form onSubmit={handleAddReward} className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Milestone Name
                </label>
                <input
                  type="text"
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  placeholder="e.g. 50-Day Unbroken Streak Prize"
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Reward Description / Gift Promised
                </label>
                <input
                  type="text"
                  value={rewardDescription}
                  onChange={(e) => setRewardDescription(e.target.value)}
                  placeholder="e.g. Master Dagiyosi will gift Casio fx-991EX Scientific Calculator or noise-cancelling study headphones..."
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Condition Type</label>
                  <select
                    value={rewardType}
                    onChange={(e: any) => setRewardType(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-amber-500"
                  >
                    <option value="streak">Streak Days</option>
                    <option value="unit_completion">Completed Units</option>
                    <option value="focus_hours">Study Hours</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Target Value</label>
                  <input
                    type="number"
                    value={rewardTarget}
                    onChange={(e) => setRewardTarget(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!rewardTitle.trim() || !rewardDescription.trim()}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition"
              >
                Save Promised Reward
              </button>
            </form>
          )}

          {/* Existing Rewards */}
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {rewards.map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200">{r.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 italic">
                    {r.rewardDescription}
                  </div>
                  <div className="text-[10px] font-mono text-amber-400 mt-0.5">
                    Target: {r.targetValue} • Progress: {r.progressValue}
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    r.isClaimed
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : r.isUnlocked
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {r.isClaimed ? 'Claimed' : r.isUnlocked ? 'Unlocked' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Lower Section: Integrity Audit & Daily Reflections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrity & Anti-Cheat Audit Log */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-serif text-slate-100">
                Integrity Telemetry & Anti-Cheat Log
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Real-Time Audit Records
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {auditLogs.map((log) => {
              const isCritical = log.severity === 'critical';
              const isWarning = log.severity === 'warning';

              return (
                <div
                  key={log.id}
                  className={`p-3 rounded-xl border text-xs flex items-start space-x-3 ${
                    isCritical
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : isWarning
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isCritical ? (
                      <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span className="font-bold uppercase tracking-wider text-amber-300">
                        {log.type.replace('_', ' ')}
                      </span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="leading-relaxed">{log.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benohel's Daily Study Reflections */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Scroll className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-serif text-slate-100">
                Benohel's Daily Reflections
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {dailyLogs.length} Entries Logged
            </span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto">
            {dailyLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No daily logs recorded yet. Once Benohel checks in, his thoughts appear here.
              </div>
            ) : (
              dailyLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-amber-300 font-mono">{log.date}</span>
                    <span className="text-slate-400">{log.studyMinutes}m in {log.subjects.join(', ')}</span>
                  </div>
                  <div className="text-slate-300 space-y-1">
                    <div>
                      <strong className="text-emerald-400">Concept Clicked: </strong>
                      <span className="italic text-slate-200">"{log.reflectionEasy}"</span>
                    </div>
                    <div>
                      <strong className="text-amber-400">Challenge / Next Focus: </strong>
                      <span className="italic text-slate-200">"{log.reflectionChallenging}"</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
