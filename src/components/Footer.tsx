import React from 'react';
import { PageId } from '../types/navigation';

interface FooterProps {
  onOpenBranchModal: () => void;
  onNavigatePage: (pageId: PageId) => void;
  onOpenQAChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBranchModal,
  onNavigatePage,
  onOpenQAChecklist,
}) => {
  return (
    <footer className="bg-[#1F100B] text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Promise */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigatePage('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <img
                src="/images/logo-lavacakes.png"
                alt="Lava Cakes Logo"
                className="h-10 w-auto object-contain bg-white/10 rounded p-1"
              />
              <span className="text-2xl font-bold font-display text-white tracking-tight group-hover:text-amber-400 transition-colors">
                Lava Cakes
              </span>
            </button>
            <p className="text-xs text-stone-400 leading-relaxed">
              Tamil Nadu's premier artisanal bakery specializing in molten chocolate lava cakes, handcrafted celebration cakes, artisan breads, and gourmet cookies.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div>Baking Fresh Daily · 09:00 AM – 10:30 PM</div>
              <div className="text-emerald-400">100% Eggless Kitchen Lines Available</div>
            </div>
          </div>

          {/* Col 2: Dedicated Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Explore Pages
            </h4>
            <ul className="text-xs space-y-2 text-stone-300">
              <li>
                <button
                  onClick={() => onNavigatePage('menu')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Full Menu & Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('custom-builder')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Cake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('branches')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Branches & Hours Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('gallery')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Celebration Gallery & Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('tracker')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Existing Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('standards')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Baking Standards & Allergen Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tamil Nadu Branches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Our 9+ Branches
              </h4>
              <button
                onClick={() => onNavigatePage('branches')}
                className="text-[11px] text-amber-300 hover:underline cursor-pointer"
              >
                View Directory
              </button>
            </div>
            <ul className="text-xs space-y-1.5 text-stone-300">
              <li className="flex items-center gap-1.5">
                <span className="text-stone-500 font-medium">Chennai:</span>
                <span>Anna Nagar · T. Nagar · Velachery · OMR</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-stone-500 font-medium">Coimbatore:</span>
                <span>R.S. Puram · Peelamedu</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-stone-500 font-medium">Madurai:</span>
                <span>K.K. Nagar</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-stone-500 font-medium">Salem:</span>
                <span>Fairlands</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-stone-500 font-medium">Trichy:</span>
                <span>Thillai Nagar</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Ordering Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quality Assurance
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every celebration order is protected with temperature-controlled thermal delivery packaging and hygiene seals.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenQAChecklist}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-medium rounded-lg border border-stone-700 transition-colors cursor-pointer text-center"
              >
                Website Launch QA Checklist
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Lava Cakes (lavacakes.in). All rights reserved across Tamil Nadu.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onNavigatePage('standards')}
              className="hover:underline text-stone-400"
            >
              100% Pure Butter Commitment
            </button>
            <span>·</span>
            <span>FSSAI Certified Bakery</span>
            <span>·</span>
            <button
              onClick={() => onNavigatePage('menu')}
              className="hover:underline text-stone-400"
            >
              Transparent Pricing
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
