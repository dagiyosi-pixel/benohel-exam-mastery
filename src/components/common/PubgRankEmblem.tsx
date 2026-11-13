import React from 'react';

interface PubgRankEmblemProps {
  category: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Crown' | 'Ace' | 'Conqueror';
  tierNumber?: string;
  isHonorBoosted?: boolean;
  size?: number;
  className?: string;
}

export const PubgRankEmblem: React.FC<PubgRankEmblemProps> = ({
  category,
  tierNumber = 'V',
  isHonorBoosted = false,
  size = 64,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Radial Backing Glow */}
          <radialGradient id="rankGlowBronze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#92400e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="rankGlowSilver" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#64748b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="rankGlowGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#eab308" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#713f12" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="rankGlowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0891b2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#164e63" stopOpacity="0" />
          </radialGradient>

          {/* Metallic Gradients */}
          <linearGradient id="bronzeShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="45%" stopColor="#b45309" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="silverShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="goldShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="metalRim" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Outer Pulsing Honor Aura if Boosted */}
        {isHonorBoosted && (
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 3"
            className="animate-spin-slow opacity-80"
          />
        )}

        {/* Ambient Backlight */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill={
            category === 'Bronze'
              ? 'url(#rankGlowBronze)'
              : category === 'Silver'
              ? 'url(#rankGlowSilver)'
              : category === 'Gold'
              ? 'url(#rankGlowGold)'
              : 'url(#rankGlowCyan)'
          }
        />

        {/* Outer Military Shield Base (PUBG Combat Crest) */}
        <path
          d="M50,8 L82,22 L82,54 C82,74 50,92 50,92 C50,92 18,74 18,54 L18,22 Z"
          fill="#090d16"
          stroke={
            category === 'Bronze'
              ? '#b45309'
              : category === 'Silver'
              ? '#94a3b8'
              : category === 'Gold'
              ? '#f59e0b'
              : '#06b6d4'
          }
          strokeWidth="3"
        />

        {/* Inner Faceted Shield Body */}
        <path
          d="M50,14 L76,26 L76,52 C76,68 50,84 50,84 C50,84 24,68 24,52 L24,26 Z"
          fill={
            category === 'Bronze'
              ? 'url(#bronzeShieldGrad)'
              : category === 'Silver'
              ? 'url(#silverShieldGrad)'
              : category === 'Gold'
              ? 'url(#goldShieldGrad)'
              : 'url(#cyanShieldGrad)'
          }
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* Left Bevel Shadow for 3D Chiseled Depth */}
        <path
          d="M50,14 L24,26 L24,52 C24,68 50,84 50,84 Z"
          fill="#000000"
          fillOpacity="0.22"
        />

        {/* Crossed Combat Bayonets / Kunai Behind Central Emblem */}
        <line x1="28" y1="28" x2="72" y2="72" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <line x1="28" y1="28" x2="72" y2="72" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="28" x2="28" y2="72" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <line x1="72" y1="28" x2="28" y2="72" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

        {/* Center Emblem Details by Rank Category */}
        {category === 'Bronze' && (
          <g>
            {/* Bronze Military Star */}
            <polygon
              points="50,28 55,40 68,40 57,48 61,61 50,53 39,61 43,48 32,40 45,40"
              fill="#fbbf24"
              stroke="#78350f"
              strokeWidth="1.2"
            />
            {/* Inner Bronze Emblem */}
            <circle cx="50" cy="47" r="5" fill="#78350f" />
            <circle cx="50" cy="47" r="3" fill="#f59e0b" />
          </g>
        )}

        {category === 'Silver' && (
          <g>
            {/* Silver Wings */}
            <path
              d="M32,44 C40,40 46,46 50,52 C54,46 60,40 68,44 C62,54 56,58 50,64 C44,58 38,54 32,44 Z"
              fill="#e2e8f0"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <polygon
              points="50,28 54,39 66,39 56,46 60,57 50,50 40,57 44,46 34,39 46,39"
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="1"
            />
          </g>
        )}

        {(category === 'Gold' || category === 'Platinum' || category === 'Diamond' || category === 'Crown' || category === 'Ace' || category === 'Conqueror') && (
          <g>
            {/* Golden Falcon / Eagle Head Crest */}
            <polygon
              points="50,24 56,38 71,38 59,47 63,61 50,52 37,61 41,47 29,38 44,38"
              fill="#fef08a"
              stroke="#b45309"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="46" r="6" fill="#78350f" />
            <polygon points="50,42 53,48 47,48" fill="#fbbf24" />
          </g>
        )}

        {/* Lower Banner Plaque for Tier (V, IV, III, II, I) */}
        <polygon
          points="32,68 68,68 64,78 50,82 36,78"
          fill="#090d16"
          stroke={category === 'Bronze' ? '#f59e0b' : '#38bdf8'}
          strokeWidth="1.2"
        />
        <text
          x="50"
          y="77"
          fill="#fef08a"
          fontSize="9"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {tierNumber}
        </text>

        {/* Small Bottom Star Pin */}
        <circle cx="50" cy="85" r="2" fill="#f59e0b" />
      </svg>
    </div>
  );
};
