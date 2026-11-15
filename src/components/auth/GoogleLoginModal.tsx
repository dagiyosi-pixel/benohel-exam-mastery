import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { soundFX } from '../../utils/audio';
import { Mail, LogIn, CheckCircle2 } from 'lucide-react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const [customEmail, setCustomEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen && user) return null;

  const handleQuickLogin = (email: string, name: string) => {
    soundFX.playTacticalClick();
    loginWithGoogle(email, name);
    if (onClose) onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.includes('@') || !customEmail.toLowerCase().endsWith('gmail.com')) {
      setError('Please enter a valid @gmail.com address');
      return;
    }
    setError('');
    soundFX.playTacticalClick();
    loginWithGoogle(customEmail);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/70 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden font-sans text-slate-100">
        <div className="absolute top-0 left-0 right-0 h-1.5 pubg-hazard-stripe opacity-90" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-slate-950 border border-amber-500/40 rounded-2xl shadow-lg">
            {/* Google Colorful G SVG */}
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-slate-100 tracking-wide">
            Sign In with Google
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Permanent Cloud Save • Grade 9–12 Mentorship Across 700 Miles
          </p>
        </div>

        {/* Current User Status (if logged in and modal opened for switching) */}
        {user && (
          <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-500/40 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-slate-300">Signed in as:</div>
                <div className="font-bold text-emerald-300">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => {
                soundFX.playTacticalClick();
                logout();
              }}
              className="px-2.5 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 rounded-lg text-[11px] font-bold transition"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* 1-Click Fast-Track Google Accounts */}
        <div className="space-y-3 font-mono">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            Select Your Google Account:
          </div>

          {/* Benohel (Student) */}
          <button
            onClick={() => handleQuickLogin('benohel.yosef@gmail.com', 'Benohel Yosef')}
            className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-amber-500/40 hover:border-amber-400 flex items-center justify-between transition-all active:scale-98 group"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black text-sm">
                B
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                  Benohel Yosef (Student)
                </div>
                <div className="text-[11px] text-slate-400">benohel.yosef@gmail.com</div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-bold">
              CADET
            </span>
          </button>

          {/* Master Dagiyosi (Admin / Hokage) */}
          <button
            onClick={() => handleQuickLogin('dagiyosi5321@gmail.com', 'Master Dagiyosi (Hokage)')}
            className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-between transition-all active:scale-98 group"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-black text-sm">
                D
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition">
                  Master Dagiyosi (Overwatch)
                </div>
                <div className="text-[11px] text-slate-400">dagiyosi5321@gmail.com</div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded font-bold">
              HOKAGE
            </span>
          </button>
        </div>

        {/* Or Custom Gmail */}
        <div className="pt-2 border-t border-slate-800">
          <form onSubmit={handleCustomSubmit} className="space-y-3 font-mono">
            <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Or Sign In with Any Gmail:
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="your.name@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-xs text-slate-100 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            </div>
            {error && <p className="text-[11px] text-rose-400">{error}</p>}
          </form>
        </div>

        {/* Close Button if user is already signed in */}
        {user && onClose && (
          <button
            onClick={() => {
              soundFX.playTacticalClick();
              onClose();
            }}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold rounded-xl transition"
          >
            Close & Continue Study
          </button>
        )}
      </div>
    </div>
  );
};
