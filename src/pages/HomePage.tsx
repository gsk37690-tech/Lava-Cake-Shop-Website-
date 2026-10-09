import React from 'react';
import { ArrowRight, Sparkles, MapPin, Clock, ShieldCheck, Star } from 'lucide-react';
import { Branch, Product, CakeSizeOption, CategoryId } from '../types/bakery';
import { PageId } from '../types/navigation';
import { HeroSection } from '../components/HeroSection';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/reviewsAndGallery';
import { BakeryVisual } from '../components/BakeryVisual';

interface HomePageProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  onNavigatePage: (pageId: PageId, extra?: { categoryId?: CategoryId; flavor?: string }) => void;
  onAddToCart: (
    product: Product,
    selectedSize: CakeSizeOption,
    isEggless: boolean,
    customMessage?: string
  ) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  selectedBranch,
  onOpenBranchModal,
  onNavigatePage,
  onAddToCart,
}) => {
  // Top 3 Signature cakes for home spotlight
  const signatureCakes = PRODUCTS.filter(p => p.isSignature && p.categoryId === 'cakes').slice(0, 3);
  const homeReviews = CUSTOMER_REVIEWS.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section selling the craving */}
      <HeroSection
        selectedBranch={selectedBranch}
        onOpenBranchModal={onOpenBranchModal}
        onExploreCakes={() => onNavigatePage('menu')}
        onOpenCustomBuilder={() => onNavigatePage('custom-builder')}
      />

      {/* 2. Category Exploration Gateway (Direct Links to Dedicated Menu Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8DFC8] pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gourmet Bakery Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Explore What We Bake Daily
            </h2>
          </div>
          <button
            onClick={() => onNavigatePage('menu')}
            className="text-xs font-bold text-[#9A3412] hover:text-[#7C2D12] flex items-center gap-1 cursor-pointer group"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Clean Category Cards with Polished Copy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.filter(c => c.id !== 'custom').map(cat => {
            const visualType =
              cat.id === 'cakes'
                ? 'chocolate-lava'
                : cat.id === 'cookies'
                ? 'cookie'
                : cat.id === 'bread'
                ? 'bread'
                : 'brownie';

            return (
              <div
                key={cat.id}
                onClick={() => onNavigatePage('menu', { categoryId: cat.id })}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
                  <BakeryVisual type={visualType as any} title={cat.name} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                    from ₹{cat.startingPrice}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 font-display group-hover:text-[#9A3412] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#9A3412] font-semibold">
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Chef's Bestseller Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8DFC8] pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
              Celebration Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              Most Loved Signature Cakes
            </h2>
          </div>
          <button
            onClick={() => onNavigatePage('menu')}
            className="text-xs font-bold text-[#9A3412] hover:text-[#7C2D12] flex items-center gap-1 cursor-pointer"
          >
            <span>See All {PRODUCTS.length} Treats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {signatureCakes.map(product => {
            const defaultSize = product.sizes[0];
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                  <BakeryVisual
                    type={product.visualTheme.cakeType}
                    title={product.name}
                    className="w-full h-full"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#9A3412] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Chef's Signature
                  </div>
                  <div className="absolute bottom-2 right-2.5 bg-black/60 text-stone-200 text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                    Ready in {product.preparationTimeHours} hrs
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 font-display">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                    <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
                      <span>{product.tastingNotes.slice(0, 2).join(' · ')}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">100% Eggless Option</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-medium">
                        Starts at
                      </span>
                      <span className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                        ₹{defaultSize.price}
                      </span>
                      <span className="text-[10px] text-stone-500 ml-1">({defaultSize.label})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigatePage('menu')}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#9A3412] hover:bg-[#7C2D12] text-white rounded-lg shadow-2xs transition-colors cursor-pointer"
                      >
                        Order Cake
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Bespoke Custom Cake CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24140D] rounded-2xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Bespoke Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight">
              Planning a Milestone Birthday, Wedding, or Anniversary?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Design your multi-tiered showstopper with our interactive 7-step builder.
              Pick your flavors, shape, upload reference photos, and see instant transparent pricing with zero surprise charges.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Eggless Separation
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Direct Master Baker Consultation
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigatePage('custom-builder')}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer text-center"
            >
              Open Custom Cake Studio
            </button>
            <button
              onClick={() => onNavigatePage('gallery')}
              className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all cursor-pointer text-center"
            >
              View Client Cake Gallery
            </button>
          </div>
        </div>
      </section>

      {/* 5. Quick Branch & Trust Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-[#EFE8DC] border border-[#DFD4C2] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-[#9A3412]">
              <MapPin className="w-4 h-4" />
              <span>Serving You Across Tamil Nadu</span>
            </div>
            <h3 className="text-xl font-bold font-display text-stone-900">
              Selected Branch: {selectedBranch.name} ({selectedBranch.city})
            </h3>
            <p className="text-xs text-stone-600 max-w-xl">
              {selectedBranch.address} · Open today {selectedBranch.openingHours}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBranchModal}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Change Ordering Branch
            </button>
            <button
              onClick={() => onNavigatePage('branches')}
              className="px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              All 9+ Branch Locations
            </button>
          </div>
        </div>
      </section>

      {/* 6. Customer Proof Snippets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-4">
          <div>
            <h3 className="text-xl font-bold font-display text-stone-900">
              Verified Celebration Reviews
            </h3>
            <p className="text-xs text-stone-500">From our customers across Chennai, Coimbatore, and Madurai</p>
          </div>
          <button
            onClick={() => onNavigatePage('gallery')}
            className="text-xs font-semibold text-[#9A3412] hover:underline"
          >
            Read All Reviews →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeReviews.map(r => (
            <div key={r.id} className="bg-white rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-amber-500">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-400">{r.branchName}</span>
              </div>
              <p className="text-stone-700 italic">"{r.comment}"</p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-bold text-stone-900">{r.author}</span>
                <span className="text-[#9A3412] font-semibold">{r.occasion}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
