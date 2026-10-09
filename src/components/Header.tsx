import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import { Branch } from '../types/bakery';
import { PageId } from '../types/navigation';

interface HeaderProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activePage: PageId;
  onNavigatePage: (pageId: PageId) => void;
  onOpenQAChecklist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedBranch,
  onOpenBranchModal,
  cartCount,
  cartTotal,
  onOpenCart,
  activePage,
  onNavigatePage,
  onOpenQAChecklist,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/70 transition-colors">
      {/* Slim announcement bar for branch delivery promise */}
      <div className="bg-[#26150F] text-[#F5EDE0] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-stone-300">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>9+ Gourmet Branches across Tamil Nadu</span>
        </div>
        <div className="mx-auto md:mx-0 flex items-center gap-3">
          <span>Freshly Baked Daily · Same-Day Delivery available until 9:00 PM</span>
          <span className="hidden sm:inline text-stone-400">·</span>
          <span className="hidden sm:inline text-amber-300">100% Eggless Options</span>
        </div>
        <button
          onClick={onOpenQAChecklist}
          className="hidden lg:flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
          title="Open Website QA Checklist & Redesign Audit"
        >
          <span>QA Audit Checklist</span>
        </button>
      </div>

      {/* Main 3-Zone Top Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in Playfair Display serif) */}
        <button
          onClick={() => onNavigatePage('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2B1810] font-display hover:text-[#9A3412] transition-colors whitespace-nowrap">
            Lava Cakes
          </span>
          <span className="block text-[10px] tracking-wider uppercase text-stone-500 font-sans font-medium -mt-1">
            Artisanal Tamil Nadu
          </span>
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links (Navigates between dedicated pages) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => onNavigatePage('home')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
              activePage === 'home'
                ? 'text-[#9A3412] font-bold border-[#9A3412]'
                : 'text-stone-700 hover:text-[#9A3412] border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigatePage('menu')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
              activePage === 'menu'
                ? 'text-[#9A3412] font-bold border-[#9A3412]'
                : 'text-stone-700 hover:text-[#9A3412] border-transparent'
            }`}
          >
            Menu & Cakes
          </button>
          <button
            onClick={() => onNavigatePage('custom-builder')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
              activePage === 'custom-builder'
                ? 'text-[#9A3412] font-bold border-[#9A3412]'
                : 'text-stone-700 hover:text-[#9A3412] border-transparent'
            }`}
          >
            Custom Cake Studio
          </button>
          <button
            onClick={() => onNavigatePage('branches')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
              activePage === 'branches'
                ? 'text-[#9A3412] font-bold border-[#9A3412]'
                : 'text-stone-700 hover:text-[#9A3412] border-transparent'
            }`}
          >
            Branches & Hours
          </button>
          <button
            onClick={() => onNavigatePage('gallery')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
              activePage === 'gallery'
                ? 'text-[#9A3412] font-bold border-[#9A3412]'
                : 'text-stone-700 hover:text-[#9A3412] border-transparent'
            }`}
          >
            Gallery & Reviews
          </button>
          <button
            onClick={() => onNavigatePage('tracker')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
              activePage === 'tracker'
                ? 'text-[#9A3412] font-bold border-[#9A3412]'
                : 'text-stone-700 hover:text-[#9A3412] border-transparent'
            }`}
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: 1 Primary Actions Group (Active Branch pill + Cart button) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Active Branch Selector button */}
          <button
            onClick={onOpenBranchModal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-800 bg-[#EFE8DC] hover:bg-[#E5DCCF] border border-[#DDD3C2] rounded-lg transition-colors cursor-pointer max-w-[170px] sm:max-w-none"
            title="Change your ordering branch"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
            <span className="truncate whitespace-nowrap font-semibold text-stone-900">
              {selectedBranch.area}
            </span>
            <span className="text-stone-400 text-[10px] hidden sm:inline">Change</span>
          </button>

          {/* Cart Primary CTA */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] active:scale-[0.98] rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            aria-label={`View shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <span className="inline-flex items-center justify-center bg-white text-[#9A3412] text-xs font-bold px-1.5 py-0.2 rounded-full min-w-5">
                {cartCount}
              </span>
            ) : null}
            {cartTotal > 0 && (
              <span className="hidden md:inline font-mono tabular-nums text-amber-100 border-l border-amber-800/60 pl-2">
                ₹{cartTotal}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Page Navigation Sub-Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#F3ECE1] border-t border-[#E5DBCA] gap-2 text-xs font-medium no-scrollbar">
        <button
          onClick={() => onNavigatePage('home')}
          className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
            activePage === 'home' ? 'bg-[#9A3412] text-white font-bold' : 'text-stone-700 bg-white/70'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigatePage('menu')}
          className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
            activePage === 'menu' ? 'bg-[#9A3412] text-white font-bold' : 'text-stone-700 bg-white/70'
          }`}
        >
          Menu & Cakes
        </button>
        <button
          onClick={() => onNavigatePage('custom-builder')}
          className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
            activePage === 'custom-builder' ? 'bg-[#9A3412] text-white font-bold' : 'text-stone-700 bg-white/70'
          }`}
        >
          Custom Builder
        </button>
        <button
          onClick={() => onNavigatePage('branches')}
          className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
            activePage === 'branches' ? 'bg-[#9A3412] text-white font-bold' : 'text-stone-700 bg-white/70'
          }`}
        >
          Branches
        </button>
        <button
          onClick={() => onNavigatePage('gallery')}
          className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
            activePage === 'gallery' ? 'bg-[#9A3412] text-white font-bold' : 'text-stone-700 bg-white/70'
          }`}
        >
          Gallery & Reviews
        </button>
        <button
          onClick={() => onNavigatePage('tracker')}
          className={`px-3 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
            activePage === 'tracker' ? 'bg-[#9A3412] text-white font-bold' : 'text-stone-700 bg-white/70'
          }`}
        >
          Track Order
        </button>
      </div>
    </header>
  );
};
