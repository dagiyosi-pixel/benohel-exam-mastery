import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PubgLobbyBackground: React.FC = () => {
  const { themeMode } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [themeWallpaper, setThemeWallpaper] = useState<'erangel' | 'cyber' | 'storm'>(() => {
    return (localStorage.getItem('benohel_wallpaper_theme') as any) || 'erangel';
  });

  const wallpapers = {
    erangel: '/assets/pubg_erangel_dusk.jpg',
    cyber: '/assets/cyber_chakra_neon.jpg',
    storm: '/assets/stormy_mountains_dusk.jpg',
  };

  useEffect(() => {
    localStorage.setItem('benohel_wallpaper_theme', themeWallpaper);
  }, [themeWallpaper]);

  useEffect(() => {
    const handleThemeEvent = (e: any) => {
      if (e.detail) setThemeWallpaper(e.detail);
    };
    window.addEventListener('benohel_theme_change', handleThemeEvent);
    return () => window.removeEventListener('benohel_theme_change', handleThemeEvent);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle drifting amber sparks and cyan chakra motes
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.7 + 0.25,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.8 + 0.2,
      type: Math.random() > 0.4 ? 'gold' : Math.random() > 0.5 ? 'cyan' : 'crimson',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.type === 'gold') {
          ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
          ctx.shadowColor = '#f59e0b';
        } else if (p.type === 'cyan') {
          ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
          ctx.shadowColor = '#06b6d4';
        } else {
          ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity * 0.8})`;
          ctx.shadowColor = '#ef4444';
        }

        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Layer 1: High-Resolution Photographic Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url('${wallpapers[themeWallpaper]}')`,
          filter:
            themeMode === 'light'
              ? 'brightness(0.92) contrast(1.05) saturate(1.15) opacity(0.35)'
              : 'brightness(0.38) contrast(1.15) saturate(1.25)',
        }}
      />

      {/* Layer 2: Atmospheric Color Grading & Radial Vignette */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          themeMode === 'light'
            ? 'bg-gradient-to-t from-slate-100/95 via-slate-100/80 to-slate-200/90'
            : 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80'
        }`}
      />
      <div
        className={`absolute inset-0 ${
          themeMode === 'light' ? 'bg-radial-vignette-light' : 'bg-radial-vignette'
        }`}
      />

      {/* Layer 3: PUBG Airdrop Smoke & Searchlights Overlay */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <linearGradient id="searchlightAmber" x1="15%" y1="100%" x2="40%" y2="0%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)" />
            <stop offset="50%" stopColor="rgba(245, 158, 11, 0.05)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
          </linearGradient>

          <linearGradient id="searchlightCyan" x1="85%" y1="100%" x2="60%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.05)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>

          <linearGradient id="airdropSmokePlume" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.85)" />
            <stop offset="30%" stopColor="rgba(220, 38, 38, 0.6)" />
            <stop offset="70%" stopColor="rgba(185, 28, 28, 0.25)" />
            <stop offset="100%" stopColor="rgba(153, 27, 27, 0)" />
          </linearGradient>
        </defs>

        {/* Volumetric Searchlight Beams */}
        <polygon points="120,1080 200,1080 580,0 420,0" fill="url(#searchlightAmber)" />
        <polygon points="1800,1080 1720,1080 1280,0 1440,0" fill="url(#searchlightCyan)" />

        {/* Airdrop Supply Crate in the Distance */}
        <g transform="translate(940, 500)" opacity="0.85">
          <path
            d="M50,150 C40,110 70,80 45,40 C20,0 75,-40 50,-90 C30,-140 65,-180 50,-240 C35,-180 25,-140 10,-90 C-10,-40 15,0 0,40 C-15,80 15,110 5,150 Z"
            fill="url(#airdropSmokePlume)"
          />
          {/* Crate Box */}
          <rect x="22" y="-60" width="18" height="10" fill="#ef4444" rx="1" />
          <rect x="22" y="-50" width="18" height="8" fill="#0284c7" rx="1" />
          <line x1="31" y1="-60" x2="31" y2="-42" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="31" cy="-60" r="4" fill="#f87171" className="animate-ping" />
        </g>
      </svg>

      {/* Layer 4: Floating Chakra & Dust Embers Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />

      {/* Layer 5: Cyber-Shinobi Holographic HUD Corner Markings */}
      <div className="absolute top-3 left-3 text-cyan-400/40 font-mono text-[9px] tracking-widest hidden sm:block">
        ┌── [ HUD: SATELLITE 700M // WILL OF FIRE ] ──
      </div>
      <div className="absolute top-3 right-3 text-cyan-400/40 font-mono text-[9px] tracking-widest hidden sm:block">
        ── [ CHUNIN EXAM GATE // ACTIVE ] ──┐
      </div>
      <div className="absolute bottom-3 left-3 text-amber-400/40 font-mono text-[9px] tracking-widest hidden sm:block">
        └── [ BATTLE ROYALE // BENOHEL YOSEF ] ──
      </div>
      <div className="absolute bottom-3 right-3 text-amber-400/40 font-mono text-[9px] tracking-widest hidden sm:block">
        ── [ WINNER WINNER TOP ADMISSION ] ──┘
      </div>

      {/* Theme Switcher Pill (Top Right, pointer-events-auto) */}
      <div className="absolute top-10 right-4 pointer-events-auto z-30 hidden md:flex items-center space-x-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
        <span className="text-slate-400 px-1.5">View:</span>
        <button
          onClick={() => setThemeWallpaper('erangel')}
          className={`px-2 py-0.5 rounded transition ${
            themeWallpaper === 'erangel'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Erangel
        </button>
        <button
          onClick={() => setThemeWallpaper('cyber')}
          className={`px-2 py-0.5 rounded transition ${
            themeWallpaper === 'cyber'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Cyber
        </button>
        <button
          onClick={() => setThemeWallpaper('storm')}
          className={`px-2 py-0.5 rounded transition ${
            themeWallpaper === 'storm'
              ? 'bg-indigo-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Storm
        </button>
      </div>
    </div>
  );
};
