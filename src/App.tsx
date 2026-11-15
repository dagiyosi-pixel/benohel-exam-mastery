import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BannerDecree } from './components/layout/BannerDecree';
import { DailyJourneyHub } from './components/student/DailyJourneyHub';
import { SyllabusTracker } from './components/student/SyllabusTracker';
import { PredictorDashboard } from './components/student/PredictorDashboard';
import { StudyTimer } from './components/student/StudyTimer';
import { RewardsWall } from './components/student/RewardsWall';
import { DailyCheckInModal } from './components/student/DailyCheckInModal';
import { MasterDashboard } from './components/mentor/MasterDashboard';
import { PubgLobbyBackground } from './components/layout/PubgLobbyBackground';
import { soundFX } from './utils/audio';
import {
  BookOpen,
  Target,
  Clock,
  Gift,
  Flame,
  Play,
  Trophy,
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentUserRole, studentProfile } = useApp();
  const [activeTab, setActiveTab] = useState<
    'journey' | 'syllabus' | 'predictor' | 'timer' | 'rewards'
  >('journey');
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);

  const handleTabChange = (tabId: typeof activeTab) => {
    soundFX.playTacticalClick();
    setActiveTab(tabId);
  };

  const navTabs = [
    { id: 'journey', label: 'Daily Quests (180 Days)', icon: Target },
    { id: 'syllabus', label: 'Textbooks & Units (34)', icon: BookOpen },
    { id: 'timer', label: 'Focus Chamber', icon: Clock },
    { id: 'rewards', label: 'Airdrop Rewards', icon: Gift },
    { id: 'predictor', label: 'Rank & Cutoffs', icon: Trophy },
  ] as const;

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Atmosphere */}
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
          <div className="space-y-4 pt-3">
            {/* Master's Active Decree Banner */}
            <BannerDecree />

            {/* Top Navigation Tabs Bar (Desktop / Tablet) */}
            <div className="px-3 sm:px-6 lg:px-8 hidden sm:block">
              <div className="flex items-center space-x-2 overflow-x-auto p-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md shadow-xl no-scrollbar font-mono">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold'
                          : 'bg-slate-900/80 text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 border border-slate-800'
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
              {activeTab === 'journey' && (
                <DailyJourneyHub onOpenTimer={() => setActiveTab('timer')} />
              )}
              {activeTab === 'syllabus' && <SyllabusTracker />}
              {activeTab === 'timer' && <StudyTimer />}
              {activeTab === 'rewards' && <RewardsWall />}
              {activeTab === 'predictor' && <PredictorDashboard />}
            </div>
          </div>
        )}
      </main>

      {/* Floating Tactical Action Controls */}
      {currentUserRole === 'student' && (
        <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center space-x-2 font-mono">
          {/* Quick Focus Button */}
          <button
            onClick={() => {
              soundFX.playChakraSurge();
              setActiveTab('timer');
            }}
            title="Deploy to Focus Chamber"
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-black uppercase tracking-wider shadow-xl backdrop-blur-md transition active:scale-95"
          >
            <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>FOCUS TIMER</span>
          </button>

          {/* Daily Check-In Button */}
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              setShowDailyCheckIn(true);
            }}
            className="flex items-center space-x-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl border-2 border-amber-300 transition-all active:scale-95 group pubg-glow-gold"
          >
            <Flame className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>DAILY NINDO</span>
            <span className="bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
              {studentProfile.currentStreak}D
            </span>
          </button>
        </div>
      )}

      {/* Mobile Bottom Dock (5 Core Tabs) */}
      {currentUserRole === 'student' && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t-2 border-amber-500/50 backdrop-blur-xl px-1 py-1 flex items-center justify-between shadow-2xl font-mono"
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const mobileLabel =
              tab.id === 'journey'
                ? 'Quests'
                : tab.id === 'syllabus'
                ? 'Books'
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
