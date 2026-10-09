import React from 'react';

interface BakeryVisualProps {
  type: 'chocolate-lava' | 'truffle' | 'fruit-gateau' | 'red-velvet' | 'butterscotch' | 'cookie' | 'bread' | 'cheesecake' | 'brownie' | 'custom-tier';
  title?: string;
  className?: string;
  isHero?: boolean;
}

export const BakeryVisual: React.FC<BakeryVisualProps> = ({
  type,
  title,
  className = 'w-full h-48',
  isHero = false,
}) => {
  // Artistic, mouth-watering SVG renderings with textures, gradients, chocolate drips, berries, and gold accents
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}
      aria-label={title || 'Artisanal Bakery Creation'}
    >
      {/* Dynamic ambient backdrop */}
      {type === 'chocolate-lava' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="lavaGlow" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#4A2016" />
              <stop offset="60%" stopColor="#2A120B" />
              <stop offset="100%" stopColor="#170A06" />
            </radialGradient>
            <linearGradient id="ganacheDrip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E120A" />
              <stop offset="40%" stopColor="#4A2014" />
              <stop offset="100%" stopColor="#1E0B06" />
            </linearGradient>
            <linearGradient id="spongeCake" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3D1A10" />
              <stop offset="50%" stopColor="#542517" />
              <stop offset="100%" stopColor="#38170D" />
            </linearGradient>
            <linearGradient id="moltenCore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8C2C13" />
              <stop offset="50%" stopColor="#BA3B18" />
              <stop offset="100%" stopColor="#661C0B" />
            </linearGradient>
            <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0A0402" floodOpacity="0.8" />
            </filter>
          </defs>
          <rect width="400" height="300" fill="url(#lavaGlow)" />
          {/* Subtle marble table edge */}
          <ellipse cx="200" cy="275" rx="160" ry="24" fill="#0C0503" opacity="0.9" />

          {/* Stand / Plate */}
          <ellipse cx="200" cy="235" rx="130" ry="22" fill="#E8E2D8" opacity="0.15" />
          <ellipse cx="200" cy="232" rx="120" ry="18" fill="#1A0D08" />

          {/* Cake Body */}
          <g filter="url(#shadowBlur)">
            {/* Base Sponge */}
            <path d="M100,165 C100,195 300,195 300,165 L300,140 C300,115 100,115 100,140 Z" fill="url(#spongeCake)" />
            {/* Molten Core Cutout Reveal if hero or card */}
            <path d="M150,150 Q200,190 250,150 Q200,210 150,150 Z" fill="url(#moltenCore)" opacity="0.95" />
            <path d="M170,165 Q200,205 230,165 Q200,195 170,165 Z" fill="#E85D36" opacity="0.7" />

            {/* Cake Top Ganache Crown */}
            <ellipse cx="200" cy="135" rx="100" ry="28" fill="url(#ganacheDrip)" />

            {/* Glossy Drips */}
            <path d="M102,142 C108,165 116,170 120,150 C124,175 132,185 138,145 C146,180 154,192 162,148 C185,198 198,205 210,146 C225,188 238,190 248,144 C260,178 272,175 280,145 C288,168 295,160 298,140" fill="none" stroke="#250F07" strokeWidth="9" strokeLinecap="round" />
            <path d="M102,142 C108,165 116,170 120,150 C124,175 132,185 138,145 C146,180 154,192 162,148 C185,198 198,205 210,146 C225,188 238,190 248,144 C260,178 272,175 280,145 C288,168 295,160 298,140" fill="none" stroke="#3F190D" strokeWidth="6" strokeLinecap="round" />

            {/* Chocolate Curls & Raspberries on Top */}
            <circle cx="160" cy="130" r="10" fill="#991B1B" />
            <circle cx="157" cy="127" r="3" fill="#DC2626" opacity="0.7" />
            <circle cx="235" cy="128" r="9" fill="#991B1B" />
            <circle cx="233" cy="125" r="2.5" fill="#DC2626" opacity="0.7" />
            {/* Chocolate Curl Shavings */}
            <path d="M185,122 C195,115 210,118 215,126 C205,124 195,130 185,122" fill="#5A281A" />
            <path d="M170,126 C180,118 192,122 195,130" fill="#2E120A" />

            {/* Gold Flake Accent */}
            <circle cx="178" cy="122" r="2" fill="#FBBF24" />
            <circle cx="220" cy="120" r="1.5" fill="#FBBF24" />
          </g>

          {/* Steaming warm aroma wisps if hero */}
          {isHero && (
            <g opacity="0.25">
              <path d="M170,110 C165,90 180,75 175,55" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M200,105 C205,85 195,70 200,50" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M225,112 C230,95 220,80 225,60" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </svg>
      )}

      {type === 'truffle' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="truffleBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#301A13" />
              <stop offset="100%" stopColor="#140A06" />
            </radialGradient>
            <linearGradient id="mirrorGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C0C07" />
              <stop offset="50%" stopColor="#3D180D" />
              <stop offset="100%" stopColor="#120603" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#truffleBg)" />
          {/* Plate */}
          <ellipse cx="200" cy="235" rx="125" ry="20" fill="#1C100B" />
          {/* Truffle Cake Body */}
          <path d="M110,165 C110,195 290,195 290,165 L290,140 C290,115 110,115 110,140 Z" fill="#241009" />
          <ellipse cx="200" cy="135" rx="90" ry="25" fill="url(#mirrorGlaze)" />
          {/* Rosette swirls */}
          <circle cx="140" cy="132" r="12" fill="#3D1A10" />
          <circle cx="170" cy="125" r="14" fill="#482015" />
          <circle cx="200" cy="122" r="15" fill="#3D1A10" />
          <circle cx="230" cy="125" r="14" fill="#482015" />
          <circle cx="260" cy="132" r="12" fill="#3D1A10" />
          {/* Gold Leaf Flakes */}
          <polygon points="195,116 198,122 204,120 199,125 201,131 196,127 191,130 193,124 188,121 194,120" fill="#F59E0B" opacity="0.9" />
          <circle cx="165" cy="122" r="2.5" fill="#FBBF24" />
          <circle cx="235" cy="123" r="2" fill="#FBBF24" />
        </svg>
      )}

      {type === 'fruit-gateau' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="fruitBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="60%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </radialGradient>
            <linearGradient id="creamBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="100%" stopColor="#F5EDE0" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#fruitBg)" />
          {/* Shadow & Base */}
          <ellipse cx="200" cy="235" rx="125" ry="18" fill="#D97706" opacity="0.25" />
          {/* Cake Body */}
          <path d="M110,165 C110,195 290,195 290,165 L290,140 C290,115 110,115 110,140 Z" fill="url(#creamBody)" stroke="#E5D9C4" strokeWidth="1" />
          {/* Top Cream Layer */}
          <ellipse cx="200" cy="135" rx="90" ry="25" fill="#FFFDF8" />
          {/* Glazed Mango slices */}
          <path d="M140,130 C155,115 175,120 180,132 C165,138 145,136 140,130" fill="#F59E0B" />
          <path d="M165,125 C185,110 205,114 212,126 C195,134 175,132 165,125" fill="#D97706" />
          <path d="M195,122 C215,112 235,118 240,130 C220,136 200,132 195,122" fill="#F59E0B" />
          {/* Fresh Strawberries / Berries */}
          <circle cx="150" cy="138" r="8" fill="#DC2626" />
          <circle cx="215" cy="136" r="8.5" fill="#DC2626" />
          <circle cx="245" cy="134" r="7" fill="#1E3A8A" />
          {/* Mint leaf */}
          <path d="M185,118 Q195,110 200,115 Q195,122 185,118" fill="#15803D" />
        </svg>
      )}

      {type === 'red-velvet' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="velvetBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#4C0519" />
              <stop offset="100%" stopColor="#1F0208" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#velvetBg)" />
          <ellipse cx="200" cy="235" rx="120" ry="18" fill="#170105" />
          {/* Red velvet crumb base */}
          <path d="M110,165 C110,195 290,195 290,165 L290,140 C290,115 110,115 110,140 Z" fill="#881337" />
          <ellipse cx="200" cy="135" rx="90" ry="25" fill="#FFFBF5" />
          {/* Tangy cream cheese rosettes with red crumb dusting */}
          <circle cx="140" cy="130" r="13" fill="#FFF1F2" />
          <circle cx="170" cy="125" r="14" fill="#FFFFFF" />
          <circle cx="200" cy="122" r="15" fill="#FFF1F2" />
          <circle cx="230" cy="125" r="14" fill="#FFFFFF" />
          <circle cx="260" cy="130" r="13" fill="#FFF1F2" />
          {/* Red crumb dust */}
          <circle cx="155" cy="134" r="1.5" fill="#9F1239" />
          <circle cx="185" cy="128" r="2" fill="#9F1239" />
          <circle cx="215" cy="127" r="1.5" fill="#9F1239" />
          <circle cx="245" cy="132" r="2" fill="#BE123C" />
        </svg>
      )}

      {type === 'butterscotch' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="butterBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#1C0A02" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#butterBg)" />
          <ellipse cx="200" cy="235" rx="120" ry="18" fill="#140601" />
          <path d="M110,165 C110,195 290,195 290,165 L290,140 C290,115 110,115 110,140 Z" fill="#B45309" />
          <ellipse cx="200" cy="135" rx="90" ry="25" fill="#FEF3C7" />
          {/* Caramel drip & praline crunch */}
          <path d="M115,142 Q140,165 160,140 Q180,175 210,142 Q240,170 270,140 Q285,155 288,140" fill="none" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
          {/* Praline nuts */}
          <ellipse cx="160" cy="130" rx="4" ry="3" fill="#D97706" />
          <ellipse cx="190" cy="124" rx="5" ry="3" fill="#B45309" />
          <ellipse cx="230" cy="128" rx="4" ry="3" fill="#D97706" />
          <ellipse cx="210" cy="132" rx="3" ry="2" fill="#F59E0B" />
        </svg>
      )}

      {type === 'cookie' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="cookieBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#3F2212" />
              <stop offset="100%" stopColor="#190D06" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#cookieBg)" />
          <ellipse cx="200" cy="225" rx="110" ry="16" fill="#100703" />
          {/* Stacked Cookies */}
          {/* Cookie 1 (Bottom) */}
          <ellipse cx="170" cy="175" rx="55" ry="32" fill="#92400E" />
          <ellipse cx="170" cy="172" rx="53" ry="30" fill="#B45309" />
          {/* Cookie 2 (Top Stack) */}
          <ellipse cx="215" cy="145" rx="60" ry="35" fill="#78350F" />
          <ellipse cx="215" cy="141" rx="58" ry="33" fill="#B45309" />
          {/* Molten Chocolate Chunks */}
          <polygon points="190,132 198,128 202,136 195,140" fill="#2E120A" />
          <polygon points="225,130 238,126 242,135 230,139" fill="#1F0B05" />
          <polygon points="210,148 220,145 224,155 212,158" fill="#2E120A" />
          <polygon points="180,145 188,142 192,150 182,152" fill="#1F0B05" />
          <polygon points="235,150 245,148 247,156 238,158" fill="#2E120A" />
          {/* Sea salt flake specks */}
          <circle cx="205" cy="138" r="1.5" fill="#FEF3C7" />
          <circle cx="228" cy="144" r="1.5" fill="#FEF3C7" />
        </svg>
      )}

      {type === 'bread' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="breadBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#2E1D13" />
              <stop offset="100%" stopColor="#120A06" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#breadBg)" />
          <ellipse cx="200" cy="225" rx="120" ry="18" fill="#0E0603" />
          {/* Artisan Sourdough Boule */}
          <path d="M120,185 C115,130 285,130 280,185 C280,200 120,200 120,185 Z" fill="#92400E" />
          <path d="M125,180 C125,135 275,135 275,180 Z" fill="#B45309" />
          {/* Flour dusting and ear slash */}
          <path d="M140,155 Q200,135 260,158" fill="none" stroke="#FDE68A" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          <path d="M145,153 Q200,133 255,156" fill="none" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="200" cy="142" rx="40" ry="12" fill="#FDF4DC" opacity="0.3" />
        </svg>
      )}

      {type === 'cheesecake' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="cheeseBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#3B2618" />
              <stop offset="100%" stopColor="#170E08" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#cheeseBg)" />
          <ellipse cx="200" cy="225" rx="110" ry="16" fill="#100804" />
          {/* Triangular slice */}
          <polygon points="120,195 270,165 240,130 110,150" fill="#FEF3C7" />
          <polygon points="120,195 270,165 285,180 135,210" fill="#92400E" />
          {/* Berry coulis waterfall */}
          <path d="M210,138 Q225,150 215,165 Q235,175 228,190" fill="none" stroke="#991B1B" strokeWidth="8" strokeLinecap="round" />
          <circle cx="218" cy="142" r="6" fill="#DC2626" />
        </svg>
      )}

      {type === 'brownie' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="brownieBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#2E140C" />
              <stop offset="100%" stopColor="#120603" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#brownieBg)" />
          <ellipse cx="200" cy="225" rx="110" ry="16" fill="#0C0301" />
          {/* Dense brownie cube */}
          <polygon points="140,160 210,130 270,145 200,180" fill="#38170D" />
          <polygon points="140,160 200,180 200,215 140,195" fill="#1F0B05" />
          <polygon points="200,180 270,145 270,180 200,215" fill="#290E06" />
          {/* Crackly glossy top skin */}
          <path d="M165,160 L185,152 M220,148 L240,142" stroke="#5C2616" strokeWidth="1.5" />
          {/* Caramel drip line */}
          <path d="M195,145 Q210,165 205,185" stroke="#D97706" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="185" cy="162" r="1.5" fill="#FEF3C7" />
          <circle cx="230" cy="155" r="1.5" fill="#FEF3C7" />
        </svg>
      )}

      {type === 'custom-tier' && (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="customBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#381D17" />
              <stop offset="100%" stopColor="#170A06" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#customBg)" />
          <ellipse cx="200" cy="245" rx="125" ry="18" fill="#120704" />
          {/* Tier 1 (Bottom) */}
          <path d="M120,195 C120,215 280,215 280,195 L280,175 C280,155 120,155 120,175 Z" fill="#4A2016" />
          <ellipse cx="200" cy="175" rx="80" ry="20" fill="#5F2B1F" />
          {/* Tier 2 (Top) */}
          <path d="M150,150 C150,168 250,168 250,150 L250,130 C250,112 150,112 150,130 Z" fill="#753526" />
          <ellipse cx="200" cy="130" rx="50" ry="14" fill="#8C3F2E" />
          {/* Gold pearls & floral cascade */}
          <circle cx="200" cy="115" r="8" fill="#F59E0B" />
          <circle cx="175" cy="145" r="6" fill="#FBBF24" />
          <circle cx="225" cy="148" r="6" fill="#FBBF24" />
          <circle cx="155" cy="180" r="7" fill="#F59E0B" />
          <circle cx="245" cy="185" r="7" fill="#F59E0B" />
        </svg>
      )}

      {/* Subtle brand watermark & guarantee badge */}
      <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded text-[10px] font-medium tracking-wide bg-black/40 text-stone-200 backdrop-blur-xs">
        Lava Cakes Studio
      </div>
    </div>
  );
};
