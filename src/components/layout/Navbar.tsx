import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { GoogleLoginModal } from '../auth/GoogleLoginModal';
import {
  Flame,
  Award,
  Sparkles,
  Clock,
  Volume2,
  VolumeX,
  Palette,
  Sun,
  Moon,
  LogIn,
  UserCheck,
  RefreshCw,
  Download,
  Upload,
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

  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b-2 border-amber-500/40 shadow-2xl">
      {/* Tactical Top Ribbon */}
      <div className="bg-black/95 border-b border-amber-500/20 px-3 py-1 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase text-slate-400 select-none overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
            <span>CLOUD SYNC ACTIVE</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-bold">ETHIOPIA MOE GRADE 9 // 700M LINK</span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-300">COORDINATOR: MASTER DAGIYOSI</span>
        </div>

        {/* Google User Status */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              setShowLoginModal(true);
            }}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-[10px] text-slate-200 transition"
          >
            {user ? (
              <>
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span className="font-bold text-amber-300 max-w-[130px] truncate">{user.email}</span>
              </>
            ) : (
              <>
                <LogIn className="w-3 h-3 text-amber-400" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand & Crest */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="relative flex-shrink-0">
              <NarutoAvatar size={40} className="border-2 border-amber-400 pubg-glow-gold" />
              <div className="absolute -bottom-1 -right-1">
                <PubgHelmetAvatar size={18} className="border border-black shadow" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono font-black tracking-wider text-sm sm:text-lg text-slate-100 uppercase flex items-center space-x-1">
                  <span>BENOHEL YOSEF</span>
                  <KonohaWillOfFireBadge size={14} className="inline animate-spin-slow" />
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono font-black uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  GENIN CADET
                </span>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center space-x-1 font-mono">
                <span className="text-amber-400 font-bold hidden xs:inline">NINDO:</span>
                <span className="text-slate-300">"Never Give Up!"</span>
                <span className="text-slate-500 hidden sm:inline">• Master Dagi 700M Overwatch</span>
              </p>
            </div>
          </div>

          {/* Quick Stats: Streak, Hours, Level */}
          <div className="hidden lg:flex items-center space-x-4 font-mono">
            {/* Streak Counter */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <div className="text-[9px] text-slate-400 uppercase leading-none">Streak</div>
                <div className="text-xs font-black text-amber-300">
                  {studentProfile.currentStreak} DAYS
                </div>
              </div>
            </div>

            {/* Total Study Hours */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/30">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[9px] text-slate-400 uppercase leading-none">Study Hours</div>
                <div className="text-xs font-black text-cyan-300">
                  {Math.floor(studentProfile.totalStudyMinutes / 60)}H {studentProfile.totalStudyMinutes % 60}M
                </div>
              </div>
            </div>

            {/* Level & XP */}
            <div className="flex items-center space-x-2.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-amber-500/20">
              <Award className="w-4 h-4 text-amber-400" />
              <div className="w-24">
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="font-bold text-amber-300">LVL {studentProfile.level}</span>
                  <span className="text-slate-400 text-[9px]">{currentLevelXp}/{300}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Role Switcher Pill */}
            <div className="inline-flex rounded-lg p-0.5 bg-slate-950/90 border border-slate-800 shadow-inner">
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  setCurrentUserRole('student');
                }}
                data-testid="btn-role-student"
                className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                  currentUserRole === 'student'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <NarutoAvatar size={16} />
                <span className="hidden xs:inline">Student</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  setCurrentUserRole('master_admin');
                }}
                data-testid="btn-role-master"
                className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                  currentUserRole === 'master_admin'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                <KakashiAvatar size={16} />
                <span className="hidden xs:inline">Master</span>
              </button>
            </div>

            {/* Light / Dark Mode */}
            <button
              onClick={() => {
                soundFX.playTacticalClick();
                toggleThemeMode();
              }}
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 text-amber-400 transition"
            >
              {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Wallpaper Theme Switcher */}
            <button
              onClick={handleCycleTheme}
              title="Cycle Theme (Erangel / Cyber / Storm)"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-400 hover:text-amber-300 transition"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>

            {/* Audio Mute */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute' : 'Mute'}
              className={`p-1.5 sm:p-2 rounded-lg border text-xs ${
                isMuted
                  ? 'bg-slate-900 border-slate-800 text-slate-500'
                  : 'bg-amber-500/20 border-amber-400 text-amber-300'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Backup / Sync */}
            <button
              onClick={() => {
                soundFX.playTacticalClick();
                setShowDataModal(true);
              }}
              title="Cloud Sync & Backup"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cloud Sync & Backup Modal */}
      {showDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-mono">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-slate-100 uppercase">
                  700-Mile Cloud Sync & Backup
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

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              All 180 daily quests, verified quiz scores, and focus hours are continuously preserved and saved to your Google account. You can export a snapshot backup file or paste an update package between devices across the distance.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  soundFX.playTacticalClick();
                  handleExport();
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition uppercase"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
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
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 text-xs font-bold transition uppercase"
              >
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
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
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Apply & Synchronize Database</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
};
