import React, { useState } from 'react';

interface BakeryVisualProps {
  type?: 'chocolate-lava' | 'truffle' | 'fruit-gateau' | 'red-velvet' | 'butterscotch' | 'cookie' | 'bread' | 'cheesecake' | 'brownie' | 'custom-tier';
  src?: string;
  title?: string;
  className?: string;
  isHero?: boolean;
}

const TYPE_TO_IMAGE: Record<string, string> = {
  'chocolate-lava': '/images/home-cake.png',
  'truffle': '/images/why-cake.png',
  'fruit-gateau': '/images/product2.png',
  'red-velvet': '/images/cupcake.png',
  'butterscotch': '/images/product1.png',
  'cookie': '/images/cookies.png',
  'bread': '/images/product2.png',
  'cheesecake': '/images/product4.png',
  'brownie': '/images/product3.png',
  'custom-tier': '/images/product5.png',
};

export const BakeryVisual: React.FC<BakeryVisualProps> = ({
  type = 'chocolate-lava',
  src,
  title,
  className = 'w-full h-48',
  isHero = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Resolved real image path
  const imageSource = src || TYPE_TO_IMAGE[type] || '/images/home-cake.png';

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-stone-900 ${className}`}
      aria-label={title || 'Artisanal Bakery Creation'}
    >
      {!imageError ? (
        <img
          src={imageSource}
          alt={title || 'Lava Cakes Artisanal Creation'}
          loading={isHero ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
          className={`w-full h-full object-contain ${
            isHero ? 'p-2 scale-100 hover:scale-105 transition-transform duration-500' : 'p-1 hover:scale-105 transition-transform duration-300'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#2A160F] text-amber-200 p-4 text-center">
          <div className="text-2xl mb-1">🍰</div>
          <span className="text-xs font-semibold">{title || 'Artisanal Cake'}</span>
          <span className="text-[10px] text-stone-400">Freshly Baked Daily</span>
        </div>
      )}

      {/* Subtle warm vignette for aesthetic finish */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </div>
  );
};
