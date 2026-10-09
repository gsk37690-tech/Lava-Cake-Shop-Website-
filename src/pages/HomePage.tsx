import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Star } from 'lucide-react';
import { Branch, CategoryId } from '../types/bakery';
import { PageId } from '../types/navigation';
import { HeroSection } from '../components/HeroSection';
import { CATEGORIES } from '../data/categories';
import { CUSTOMER_REVIEWS } from '../data/reviewsAndGallery';
import { BakeryVisual } from '../components/BakeryVisual';
import { FounderSection } from '../components/FounderSection';

interface HomePageProps {
  selectedBranch: Branch;
  onNavigatePage: (pageId: PageId, extra?: { categoryId?: CategoryId; flavor?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  selectedBranch,
  onNavigatePage,
}) => {
  const homeReviews = CUSTOMER_REVIEWS.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section selling the craving */}
      <HeroSection
        selectedBranch={selectedBranch}
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
            const catImage =
              cat.id === 'cakes'
                ? '/images/home-cake.png'
                : cat.id === 'cookies'
                ? '/images/why-cake.png'
                : cat.id === 'bread'
                ? '/images/product2.png'
                : '/images/product3.png';

            return (
              <div
                key={cat.id}
                onClick={() => onNavigatePage('menu', { categoryId: cat.id })}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
                  <BakeryVisual src={catImage} title={cat.name} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
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

      {/* 3. Bespoke Custom Cake CTA Banner */}
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

      {/* 4. Meet the Founder Section (Mr. Selvaraju Story) */}
      <FounderSection onNavigatePage={onNavigatePage} />

      {/* 5. Customer Proof Snippets */}
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
