import React from 'react';
import { Sparkles, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { Branch, CartItem } from '../types/bakery';
import { CustomCakeBuilder } from '../components/CustomCakeBuilder';

interface CustomBuilderPageProps {
  selectedBranch: Branch;
  presetFlavor?: string;
  onAddToCart: (customItem: CartItem) => void;
  onOpenBranchModal: () => void;
  onNavigateHome: () => void;
}

export const CustomBuilderPage: React.FC<CustomBuilderPageProps> = ({
  selectedBranch,
  presetFlavor,
  onAddToCart,
  onOpenBranchModal,
  onNavigateHome,
}) => {
  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="bg-[#FAF7F2] border-b border-[#E8DFC8] pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="text-xs text-stone-500 flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-semibold">Custom Cake Studio</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Artisanal Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
              Interactive Custom Cake Builder
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Design your dream celebration centerpiece. Pick your sponge flavors, size & tiers, custom plaque inscription, and upload your reference theme photo.
              Get live price estimates and direct coordination with master cake decorators at your local branch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-600 border-t border-stone-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Eggless Separation Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Orders Accepted for Today, Tomorrow & Advance Dates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Pure Belgian Cocoa & Dairy Cream Butter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Custom Cake Builder */}
      <CustomCakeBuilder
        selectedBranch={selectedBranch}
        presetFlavor={presetFlavor}
        onAddToCart={onAddToCart}
        onOpenBranchModal={onOpenBranchModal}
      />
    </div>
  );
};
