import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Award,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  Clock,
  Volume2,
  VolumeX,
  Palette,
  Sun,
  Moon,
} from 'lucide-react';
import {
  NarutoAvatar,
  KakashiAvatar,
  PubgHelmetAvatar,
  KonohaWillOfFireBadge,
} from '../common/Avatars';
import { soundFX } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const {
    currentUserRole,
    setCurrentUserRole,
    studentProfile,
    exportDatabaseJSON,
    importDatabaseJSON,
    resetAllDataToDefaults,
    themeMode,
    toggleThemeMode,
  } = useApp();

  const [showDataModal, setShowDataModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());

  const handleToggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFX.playTacticalClick();
    }
  };

  const handleCycleTheme = () => {
    soundFX.playTacticalClick();
    const current = (localStorage.getItem('benohel_wallpaper_theme') as any) || 'erangel';
    const next = current === 'erangel' ? 'cyber' : current === 'cyber' ? 'storm' : 'erangel';
    localStorage.setItem('benohel_wallpaper_theme', next);
    window.dispatchEvent(new CustomEvent('benohel_theme_change', { detail: next }));
  };

  const currentLevelXp = studentProfile.xp % 300;
  const xpPercentage = Math.min(Math.round((currentLevelXp / 300) * 100), 100);

  const handleExport = () => {
    const jsonStr = exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benohel_mastery_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importDatabaseJSON(importText);
    if (success) {
      setImportStatus('Database successfully synchronized!');
      setTimeout(() => {
        setShowDataModal(false);
        setImportStatus(null);
        setImportText('');
      }, 1200);
    } else {
      setImportStatus('Invalid JSON data. Please check format.');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b-2 border-amber-500/40 shadow-2xl">
      {/* PUBG Mobile Tactical Top HUD Ribbon */}
      <div className="bg-black/90 border-b border-amber-500/20 px-3 py-1 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase text-slate-400 select-none overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
            <span>18ms [SATELLITE LINK]</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-bold">DROP ZONE: ETHIOPIA // 700M LINK</span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-300">COORDINATOR: MASTER DAGIYOSI</span>
        </div>

        {/* Center Compass Ribbon */}
        <div className="hidden lg:flex items-center space-x-2 text-slate-400 font-bold px-3 py-0.5 bg-slate-900/80 rounded border border-slate-800 tracking-widest text-[9px]">
          <span className="text-slate-600">270</span>
          <span className="text-amber-400 font-black">W</span>
          <span className="text-slate-600">300</span>
          <span className="text-amber-300 font-black">NW</span>
          <span className="text-slate-600">330</span>
          <span className="text-amber-400 font-black">N</span>
          <span className="text-slate-600">030</span>
          <span className="text-amber-300 font-black">NE</span>
          <span className="text-slate-600">090</span>
          <span className="text-amber-400 font-black">E</span>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="text-amber-300 font-bold">SQUAD: 2/2 ALIVE</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400 font-bold">RP S9: ACTIVE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Crest - Naruto x PUBG Mobile Hybrid Style */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              {/* Naruto Uzumaki Avatar */}
              <NarutoAvatar size={46} className="border-2 border-amber-400 pubg-glow-gold" />
              {/* Overlaid PUBG Level 3 Helmet Badge */}
              <div className="absolute -bottom-1 -right-1">
                <PubgHelmetAvatar size={22} className="border border-black shadow" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-black tracking-wider text-base sm:text-xl text-slate-100 uppercase flex items-center space-x-1.5">
                  <span>BENOHEL YOSEF</span>
                  <KonohaWillOfFireBadge size={16} className="inline animate-spin-slow" />
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono font-black uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  GENIN • CROWN CADET
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center space-x-1 font-mono">
                <span className="text-amber-400 font-bold hidden xs:inline">NINDO:</span>
                <span className="text-slate-300">"Never Run Away!"</span>
                <span className="text-slate-500 hidden md:inline">• Master Dagiyosi 700M Overwatch</span>
              </p>
            </div>
          </div>

          {/* Quick Stats: Streak, Level, Hours */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Streak Counter */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/30 shadow-inner">
              <div className="relative">
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase leading-none">Will of Fire Streak</div>
                <div className="text-sm font-mono font-black text-amber-300">
                  {studentProfile.currentStreak} DAYS
                </div>
              </div>
            </div>

            {/* Total Study Hours */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase leading-none">Chakra Focus</div>
                <div className="text-sm font-mono font-black text-cyan-300">
                  {Math.floor(studentProfile.totalStudyMinutes / 60)}H {studentProfile.totalStudyMinutes % 60}M
                </div>
              </div>
            </div>

            {/* Level & XP / Royale Pass Meter */}
            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/20">
              <Award className="w-5 h-5 text-amber-400" />
              <div className="w-28">
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="font-bold text-amber-300">RP LVL {studentProfile.level}</span>
                  <span className="text-slate-400 text-[10px]">{currentLevelXp}/{300} BP</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-xs overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 shadow-sm shadow-amber-400"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Controls: Role Switcher & Sync */}
          <div className="flex items-center space-x-2">
            {/* Role Switcher Pill with Naruto and Kakashi Avatars */}
            <div className="inline-flex rounded-lg p-1 bg-slate-950/90 border border-slate-800 shadow-inner">
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  setCurrentUserRole('student');
                }}
                data-testid="btn-role-student"
                aria-label="Switch to Benohel Student View"
                className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                  currentUserRole === 'student'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <NarutoAvatar size={18} />
                <span>Benohel</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  setCurrentUserRole('master_admin');
                }}
                data-testid="btn-role-master"
                aria-label="Switch to Master Dagiyosi Mentor View"
                className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                  currentUserRole === 'master_admin'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                <KakashiAvatar size={18} />
                <span className="hidden xs:inline">Master Dagi</span>
                <span className="xs:hidden">Dagi</span>
              </button>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => {
                soundFX.playTacticalClick();
                toggleThemeMode();
              }}
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 text-amber-400 hover:text-amber-300 transition-colors"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Battleground Theme Switcher (Erangel / Cyber / Storm) */}
            <button
              onClick={handleCycleTheme}
              title="Switch Battleground Theme (Erangel / Cyber / Storm)"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Audio SFX Toggle Button */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                isMuted
                  ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  : 'bg-amber-500/20 border-amber-400 text-amber-300 pubg-glow-gold'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
            </button>

            {/* Cloud Sync & Backup Modal Toggle */}
            <button
              onClick={() => {
                soundFX.playTacticalClick();
                setShowDataModal(true);
              }}
              title="Cloud Sync & Backup"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cloud Sync & Backup Modal */}
      {showDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-slate-100 font-serif">
                  700-Mile Cloud Sync & Database
                </h3>
              </div>
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  setShowDataModal(false);
                }}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Progress is continuously preserved in local storage and synced. You can export a snapshot backup file or paste an update package between devices across the distance.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  handleExport();
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold transition"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export Backup</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  if (window.confirm('Reset local progress back to factory defaults?')) {
                    resetAllDataToDefaults();
                    setShowDataModal(false);
                  }
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 text-sm font-semibold transition"
              >
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Import Database JSON</span>
                {importStatus && <span className="text-emerald-400">{importStatus}</span>}
              </label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste JSON snapshot here..."
                rows={3}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  soundFX.playChakraSurge();
                  handleImport();
                }}
                disabled={!importText.trim()}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition"
              >
                <Upload className="w-4 h-4" />
                <span>Apply & Synchronize Database</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
