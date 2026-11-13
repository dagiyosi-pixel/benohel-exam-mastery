import React from 'react';
import { soundFX } from '../../utils/audio';

interface PubgErangelMapProps {
  activePhase: number;
  onSelectPhase: (phaseYear: number) => void;
}

export const PubgErangelMap: React.FC<PubgErangelMapProps> = ({
  activePhase,
  onSelectPhase,
}) => {
  const dropZones = [
    {
      year: 1,
      grade: 'Grade 9',
      zoneName: 'POCHINKI (DZ-1)',
      coord: { x: 120, y: 160 },
      hours: '320h',
      status: 'active',
      desc: 'Foundations & Habits',
    },
    {
      year: 2,
      grade: 'Grade 10',
      zoneName: 'ROZHOK (DZ-2)',
      coord: { x: 260, y: 120 },
      hours: '340h',
      status: 'locked',
      desc: 'Calculus & Vectors',
    },
    {
      year: 3,
      grade: 'Grade 11',
      zoneName: 'MILITARY BASE (DZ-3)',
      coord: { x: 400, y: 155 },
      hours: '420h',
      status: 'locked',
      desc: '45% Exam Weight',
    },
    {
      year: 4,
      grade: 'Grade 12',
      zoneName: 'AAU TITAN (DZ-4)',
      coord: { x: 530, y: 85 },
      hours: '480h',
      status: 'locked',
      desc: '550+/600 Victory',
    },
  ];

  return (
    <div className="relative rounded-2xl border-2 border-amber-500/50 bg-slate-950/95 overflow-hidden shadow-2xl p-3 sm:p-5 font-mono">
      {/* Background Grid Pattern & Radar Sweep */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] uppercase text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-amber-300 font-bold">TACTICAL SATELLITE MAP // ERANGEL 700M GRID</span>
        </div>
        <div className="text-slate-500 hidden sm:block">SCALE 1:50,000 • TAP DROP ZONE TO INSPECT</div>
      </div>

      {/* Responsive SVG Map Canvas */}
      <div className="relative w-full aspect-[2.4/1] min-h-[180px] sm:min-h-[220px]">
        <svg
          viewBox="0 0 640 240"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
            </pattern>

            {/* Flight Path Glow */}
            <linearGradient id="flightPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Safe Zone Circle Glow */}
            <radialGradient id="safeZonePulse" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="rgba(255, 255, 255, 0.02)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect width="640" height="240" fill="#060913" />
          <rect width="640" height="240" fill="url(#tacticalGrid)" />

          {/* Faint Island Landmass Contours (Erangel Style) */}
          <path
            d="M 50,200 Q 120,230 220,210 Q 340,240 460,220 Q 580,210 610,140 Q 620,60 520,30 Q 380,20 280,40 Q 140,20 70,70 Q 20,120 50,200 Z"
            fill="#0b1326"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Inner River Waterway */}
          <path
            d="M 80,180 Q 220,150 360,180 Q 480,170 590,190"
            fill="none"
            stroke="rgba(6, 182, 212, 0.25)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* White Safe Zone Circle */}
          <circle
            cx="140"
            cy="150"
            r="80"
            fill="url(#safeZonePulse)"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="animate-pulse opacity-70"
          />

          {/* Blue Electric Playzone Barrier */}
          <circle
            cx="320"
            cy="120"
            r="165"
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* The C-130 Flight Path Trajectory Line */}
          <line
            x1="40"
            y1="190"
            x2="600"
            y2="60"
            stroke="url(#flightPathGrad)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />

          {/* Moving Airplane Icon along Flight Path */}
          <g transform="translate(120, 160)">
            <circle cx="0" cy="0" r="14" fill="rgba(245, 158, 11, 0.2)" className="animate-ping" />
            <polygon points="0,-8 6,6 0,3 -6,6" fill="#f59e0b" transform="rotate(70)" />
          </g>

          {/* 4 Interactive Drop Zones */}
          {dropZones.map((dz) => {
            const isSelected = activePhase === dz.year;
            const isDZ1 = dz.year === 1;

            return (
              <g
                key={dz.year}
                transform={`translate(${dz.coord.x}, ${dz.coord.y})`}
                onClick={() => {
                  soundFX.playTacticalClick();
                  onSelectPhase(dz.year);
                }}
                className="cursor-pointer group"
              >
                {/* Ping Ring for Active / Selected Zone */}
                {(isSelected || isDZ1) && (
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '24' : '18'}
                    fill="none"
                    stroke={isSelected ? '#f59e0b' : '#10b981'}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="animate-spin-slow"
                  />
                )}

                {/* Drop Marker Pin */}
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill={isSelected ? '#f59e0b' : isDZ1 ? '#10b981' : '#1e293b'}
                  stroke={isSelected ? '#ffffff' : isDZ1 ? '#34d399' : '#475569'}
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-125"
                />

                {/* Year Digit Inside Pin */}
                <text
                  x="0"
                  y="4"
                  fill={isSelected || isDZ1 ? '#090d16' : '#94a3b8'}
                  fontSize="10"
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {dz.year}
                </text>

                {/* Callout Label Tag */}
                <g transform="translate(0, -22)">
                  <rect
                    x="-48"
                    y="-12"
                    width="96"
                    height="18"
                    rx="3"
                    fill={isSelected ? '#f59e0b' : '#090d16'}
                    stroke={isSelected ? '#fbbf24' : isDZ1 ? '#10b981' : '#334155'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="0"
                    fill={isSelected ? '#090d16' : isSelected ? '#ffffff' : isDZ1 ? '#34d399' : '#cbd5e1'}
                    fontSize="7.5"
                    fontWeight="800"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {dz.grade} • {dz.hours}
                  </text>
                </g>

                {/* Zone Subtitle */}
                <text
                  x="0"
                  y="24"
                  fill={isSelected ? '#fde047' : '#64748b'}
                  fontSize="7.5"
                  fontWeight="700"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {dz.zoneName}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Pacing Legend */}
      <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-300 font-bold">DZ-1: Grade 9 (ACTIVE)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-300 font-bold">Safe Zone: 1.25h/day</span>
          </span>
        </div>
        <div className="text-slate-500">
          Target: 320h Grade 9 • 340h Grade 10 • 420h Grade 11 • 480h Grade 12
        </div>
      </div>
    </div>
  );
};
