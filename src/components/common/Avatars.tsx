import React from 'react';

interface AvatarProps {
  className?: string;
  size?: number;
}

/**
 * High-detail, authentic Naruto Uzumaki Avatar
 * Features Konoha metal forehead protector, spiky golden hair, whisker marks, and determined ninja smirk
 */
export const NarutoAvatar: React.FC<AvatarProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`rounded-full shadow-lg ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Chakra Aura */}
      <circle cx="50" cy="50" r="48" fill="#1e140a" stroke="#f59e0b" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="44" fill="url(#narutoBgGlow)" />

      <defs>
        <radialGradient id="narutoBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="70%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
      </defs>

      {/* Spiky Blonde Hair Behind Headband */}
      {/* Top and side spikes */}
      <polygon points="50,6 42,22 58,22" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="32,10 30,26 44,22" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="68,10 56,22 70,26" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="18,20 22,36 34,30" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="82,20 66,30 78,36" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="12,35 18,50 28,42" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
      <polygon points="88,35 72,42 82,50" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />

      {/* Face & Ears */}
      <ellipse cx="28" cy="56" rx="6" ry="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
      <ellipse cx="72" cy="56" rx="6" ry="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
      <path
        d="M30,42 Q28,72 50,82 Q72,72 70,42 Z"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="1.5"
      />

      {/* Naruto's Signature Orange Jacket Collar */}
      <path
        d="M26,80 Q50,96 74,80 L78,98 L22,98 Z"
        fill="#ea580c"
        stroke="#c2410c"
        strokeWidth="1.5"
      />
      {/* White fur collar rim */}
      <path
        d="M28,80 C36,88 64,88 72,80"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Konoha Headband Cloth (Blue) */}
      <rect x="25" y="32" width="50" height="15" rx="3" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />

      {/* Metal Metal Plate */}
      <rect x="33" y="34" width="34" height="11" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      {/* 3 Rivets on each side */}
      <circle cx="36" cy="37" r="1" fill="#475569" />
      <circle cx="36" cy="42" r="1" fill="#475569" />
      <circle cx="64" cy="37" r="1" fill="#475569" />
      <circle cx="64" cy="42" r="1" fill="#475569" />

      {/* Konoha Hidden Leaf Spiral Insignia */}
      <path
        d="M50,42 C47,42 46,40 48,38 C51,36 53,39 52,41 C51,43 47,44 47,40"
        stroke="#1e293b"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <polygon points="53,41 57,39 54,42" fill="#1e293b" />

      {/* Eyebrows */}
      <path d="M35,50 Q41,47 46,50" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M65,50 Q59,47 54,50" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />

      {/* Blue Determined Eyes */}
      <ellipse cx="41" cy="54" rx="4" ry="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="41" cy="54" r="2.2" fill="#0284c7" />
      <circle cx="42" cy="53" r="0.8" fill="#ffffff" />

      <ellipse cx="59" cy="54" rx="4" ry="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="59" cy="54" r="2.2" fill="#0284c7" />
      <circle cx="60" cy="53" r="0.8" fill="#ffffff" />

      {/* Nose */}
      <path d="M49,59 L51,62" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whisker Marks (3 on each cheek) */}
      <line x1="32" y1="62" x2="38" y2="61" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="31" y1="65" x2="38" y2="65" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="33" y1="68" x2="39" y2="69" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />

      <line x1="68" y1="62" x2="62" y2="61" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="69" y1="65" x2="62" y2="65" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="67" y1="68" x2="61" y2="69" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />

      {/* Confident Grin */}
      <path d="M43,72 Q50,77 57,72" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
};

/**
 * Kakashi Hatake Sensei Avatar (The Mentor / Master Dagiyosi)
 * Silver spiky hair, mask over nose/mouth, tilted Konoha headband over left eye
 */
export const KakashiAvatar: React.FC<AvatarProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`rounded-full shadow-lg ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#0b132b" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Silver / Grey Spiky Hair swept to side */}
      <polygon points="50,6 40,24 60,22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="68,8 52,24 72,24" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="84,18 64,28 78,36" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="32,12 36,26 48,22" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="18,24 28,36 38,28" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />

      {/* Face & Mask */}
      <path
        d="M32,40 Q28,70 50,80 Q72,70 68,40 Z"
        fill="#fed7aa"
        stroke="#ea580c"
        strokeWidth="1.2"
      />

      {/* Blue / Navy Mask covering nose, mouth and neck */}
      <path
        d="M32,54 Q50,56 68,54 L66,85 Q50,96 34,85 Z"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="1.5"
      />

      {/* Konoha Headband Tilted Diagonally over Left Eye */}
      <polygon
        points="22,34 78,44 76,54 20,44"
        fill="#1e3a8a"
        stroke="#172554"
        strokeWidth="1.5"
      />
      {/* Metal Plate tilted */}
      <polygon
        points="32,37 66,43 64,50 30,44"
        fill="#cbd5e1"
        stroke="#475569"
        strokeWidth="1"
      />
      {/* Konoha Leaf Symbol */}
      <path
        d="M47,43 C45,43 44,41 46,40 C48,39 50,41 49,42 C48,43 45,44 45,41"
        stroke="#1e293b"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Right Eye Only (Wise, relaxed / half-lidded) */}
      <path d="M54,50 Q60,47 64,50" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="59" cy="53" rx="3.5" ry="3" fill="#1e293b" />
      <circle cx="60" cy="52" r="0.8" fill="#ffffff" />
    </svg>
  );
};

/**
 * Authentic PUBG Mobile Level 3 Spetsnaz Helmet Avatar
 * Dark obsidian steel, horizontal eye-slit visor, side air filter, and brass rivets
 */
export const PubgHelmetAvatar: React.FC<AvatarProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`rounded-full shadow-lg ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#080e18" stroke="#f59e0b" strokeWidth="2.5" />

      {/* Dome Top of Spetsnaz Helmet */}
      <path
        d="M20,52 C20,24 80,24 80,52 L82,66 C82,78 68,85 50,85 C32,85 18,78 18,66 Z"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="2"
      />

      {/* Reinforced Dark Outer Shell */}
      <path
        d="M23,48 C23,28 77,28 77,48 Z"
        fill="#334155"
        opacity="0.9"
      />

      {/* Titanium Face Shield Faceplate */}
      <path
        d="M24,50 L76,50 L74,74 C74,80 62,82 50,82 C38,82 26,80 26,74 Z"
        fill="#0f172a"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Narrow Heavy Glass Eye Visor Slit */}
      <rect x="30" y="55" width="40" height="9" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="32" y1="58" x2="68" y2="58" stroke="#7dd3fc" strokeWidth="1" strokeLinecap="round" />

      {/* Steel Hinges & Rivets */}
      <circle cx="26" cy="52" r="3" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
      <circle cx="74" cy="52" r="3" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
      <circle cx="50" cy="74" r="2" fill="#64748b" />

      {/* PUBG Level 3 Yellow Stencil Tag */}
      <rect x="38" y="68" width="24" height="6" rx="1" fill="#f59e0b" />
      <text
        x="50"
        y="73"
        fill="#090d16"
        fontSize="5"
        fontWeight="900"
        fontFamily="monospace"
        textAnchor="middle"
      >
        LVL. 3
      </text>
    </svg>
  );
};

/**
 * Authentic PUBG Mobile Airdrop Supply Crate Avatar
 * Red fabric cover, blue metal container base, yellow straps, smoke beacon
 */
export const PubgAirdropAvatar: React.FC<AvatarProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`rounded-full shadow-lg ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#130a0a" stroke="#ef4444" strokeWidth="2.5" />

      {/* Red Smoke Plume in background */}
      <path
        d="M50,40 C44,30 58,20 48,10 C40,4 60,0 50,0"
        stroke="rgba(239, 68, 68, 0.7)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Top Red Fabric Tarp */}
      <path
        d="M20,38 L50,22 L80,38 L80,50 L50,62 L20,50 Z"
        fill="#ef4444"
        stroke="#b91c1c"
        strokeWidth="1.5"
      />
      <line x1="50" y1="22" x2="50" y2="62" stroke="#dc2626" strokeWidth="1.5" />

      {/* Bottom Blue Container Body */}
      <path
        d="M20,50 L50,62 L50,78 L20,66 Z"
        fill="#0369a1"
        stroke="#075985"
        strokeWidth="1.5"
      />
      <path
        d="M50,62 L80,50 L80,66 L50,78 Z"
        fill="#0284c7"
        stroke="#075985"
        strokeWidth="1.5"
      />

      {/* Yellow Straps */}
      <line x1="35" y1="30" x2="35" y2="72" stroke="#f59e0b" strokeWidth="3" />
      <line x1="65" y1="30" x2="65" y2="72" stroke="#f59e0b" strokeWidth="3" />

      {/* Pulsing Flare Light on top */}
      <circle cx="50" cy="22" r="3.5" fill="#f87171" className="animate-ping" />
      <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
    </svg>
  );
};

/**
 * Konoha Hidden Leaf Shinobi Crest with Will of Fire Aura
 */
export const KonohaWillOfFireBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="18" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
      {/* Konoha Leaf Spiral */}
      <path
        d="M20,27 C15,27 13,23 16,19 C20,15 24,20 23,24 C22,27 16,28 16,22"
        stroke="#f59e0b"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <polygon points="24,24 29,20 26,26" fill="#f59e0b" />
    </svg>
  );
};
