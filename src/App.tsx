import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BannerDecree } from './components/layout/BannerDecree';
import { SyllabusTracker } from './components/student/SyllabusTracker';
import { PredictorDashboard } from './components/student/PredictorDashboard';
import { StudyTimer } from './components/student/StudyTimer';
import { RewardsWall } from './components/student/RewardsWall';
import { DailyCheckInModal } from './components/student/DailyCheckInModal';
import { MasterDashboard } from './components/mentor/MasterDashboard';
import { ProgressOverviewHeader } from './components/student/ProgressOverviewHeader';
import { PubgLobbyBackground } from './components/layout/PubgLobbyBackground';
import { MilestonesHub } from './components/student/MilestonesHub';
import { soundFX } from './utils/audio';
import {
  BookOpen,
  Target,
  Clock,
  Gift,
  Flame,
  Play,
  Trophy,
  ChevronRight,
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentUserRole, hasCheckedInToday, studentProfile } = useApp();
  const [activeTab, setActiveTab] = useState<
    'milestones' | 'syllabus' | 'predictor' | 'timer' | 'rewards'
  >('milestones');
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(!hasCheckedInToday);

  const handleTabChange = (tabId: typeof activeTab) => {
    soundFX.playTacticalClick();
    setActiveTab(tabId);
  };

  const navTabs = [
    { id: 'milestones', label: 'Milestones & Roadmap', icon: Trophy },
    { id: 'syllabus', label: 'Grade 9 Mission Checklist', icon: BookOpen },
    { id: 'timer', label: 'Combat Focus Chamber', icon: Clock },
    { id: 'rewards', label: 'Airdrop Arsenal', icon: Gift },
    { id: 'predictor', label: 'Rank Predictor & Arena', icon: Target },
  ] as const;

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* PUBG Mobile Atmospheric Lobby Background (Erangel Sky, Airdrop Smoke & Embers) */}
      <PubgLobbyBackground />

      {/* Top Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto pb-28 sm:pb-24 relative z-10">
        {currentUserRole === 'master_admin' ? (
          /* Master Dagiyosi Command Center */
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <MasterDashboard />
          </div>
        ) : (
          /* Benohel Yosef Student Experience */
          <div className="space-y-5">
            {/* Master's Active Decree Banner */}
            <BannerDecree />

            {/* High-Impact Grade 9 Progress & Mastery Overview Meter */}
            <div className="px-4 sm:px-6 lg:px-8">
              <ProgressOverviewHeader />
            </div>

            {/* Active Milestone Spotlight Banner (Prominent & Immediate) */}
            <div className="mx-4 sm:mx-6 lg:mx-8 p-4 rounded-xl pubg-panel border-2 border-amber-400/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl relative overflow-hidden font-mono pubg-glow-gold">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/40">
                  <Trophy className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-400">
                    🎯 ACTIVE SPRINT MILESTONE
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase">
                    Sprint 1.2: Semester 1 Consolidation (Hidar – Tahsas)
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    Target: 70 Focus Hours • Clear Bio, IT & English Units • Mid-Year Audit Call
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleTabChange('milestones')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 flex items-center space-x-1.5 flex-shrink-0 min-h-[44px]"
              >
                <span>EXPLORE ALL MILESTONES</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Daily Accountability Callout Banner (if not yet checked in today) */}
            {!hasCheckedInToday && (
              <div className="mx-4 sm:mx-6 lg:mx-8 p-4 rounded-xl pubg-panel border-2 border-amber-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xl relative overflow-hidden font-mono">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 pubg-hazard-stripe" />
                <div className="flex items-center space-x-3 pl-2">
                  <div className="p-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/40">
                    <Flame className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                      SAFE ZONE SHRINKING // DAILY CHECK-IN DUE!
                    </h4>
                    <p className="text-xs text-slate-300 font-sans">
                      Record today's study minutes to hold your{' '}
                      <strong className="text-amber-300 font-mono">{studentProfile.currentStreak}-day safe zone streak</strong>. Rule of Commander Dagiyosi: No skipping!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFX.playTacticalClick();
                    setShowDailyCheckIn(true);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition flex-shrink-0 uppercase tracking-wider min-h-[44px]"
                >
                  LOG COMBAT STUDY (+50 BP)
                </button>
              </div>
            )}

            {/* Top Navigation Tabs Bar (Desktop / Tablet) */}
            <div className="px-4 sm:px-6 lg:px-8 hidden sm:block">
              <div className="flex items-center space-x-2 overflow-x-auto p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md shadow-2xl no-scrollbar font-mono">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider transition-all transform ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/30 border-b-2 border-amber-300 scale-102'
                          : 'bg-slate-900/90 text-slate-400 hover:text-amber-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tab Content Area */}
            <div className="px-3 sm:px-6 lg:px-8 pt-1">
              {activeTab === 'milestones' && <MilestonesHub />}
              {activeTab === 'syllabus' && <SyllabusTracker />}
              {activeTab === 'timer' && <StudyTimer />}
              {activeTab === 'rewards' && <RewardsWall />}
              {activeTab === 'predictor' && <PredictorDashboard />}
            </div>
          </div>
        )}
      </main>

      {/* PUBG Mobile Tactical Action Controls (Bottom Floating, above bottom dock on phones) */}
      {currentUserRole === 'student' && (
        <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center space-x-2 sm:space-x-3 font-mono">
          {/* Quick Focus Button */}
          <button
            onClick={() => {
              soundFX.playChakraSurge();
              setActiveTab('timer');
            }}
            title="Deploy to Focus Chamber"
            className="hidden sm:flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-cyan-300 border-2 border-cyan-500/40 text-xs font-black uppercase tracking-wider shadow-xl backdrop-blur-md transition active:scale-95 min-h-[48px]"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>START FOCUS</span>
          </button>

          {/* PUBG Mobile Yellow START Button for Daily Nindo Check-In */}
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              setShowDailyCheckIn(true);
            }}
            className="flex items-center space-x-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/40 border-2 border-amber-300 transition-all active:scale-95 group pubg-glow-gold min-h-[48px]"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>DAILY NINDO</span>
            <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
              {studentProfile.currentStreak}D
            </span>
          </button>
        </div>
      )}

      {/* Mobile-Only Thumb-Zone Navigation Dock (5 Core Tabs - Zero Clutter) */}
      {currentUserRole === 'student' && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t-2 border-amber-500/50 backdrop-blur-xl px-1 py-1 flex items-center justify-between shadow-2xl font-mono"
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const mobileLabel =
              tab.id === 'milestones'
                ? 'Milestones'
                : tab.id === 'syllabus'
                ? 'Missions'
                : tab.id === 'timer'
                ? 'Focus'
                : tab.id === 'rewards'
                ? 'Airdrops'
                : 'Rank';

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all min-h-[48px] ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/20 border border-amber-500/50 pubg-glow-gold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="text-[10px] font-black tracking-tight">{mobileLabel}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Daily Check-In Modal */}
      <DailyCheckInModal
        isOpen={showDailyCheckIn}
        onClose={() => setShowDailyCheckIn(false)}
      />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
