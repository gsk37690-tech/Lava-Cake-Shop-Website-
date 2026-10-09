import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react';
import { Branch } from '../types/bakery';
import { BakeryVisual } from './BakeryVisual';

interface HeroSectionProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  onExploreCakes: () => void;
  onOpenCustomBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedBranch,
  onOpenBranchModal,
  onExploreCakes,
  onOpenCustomBuilder,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] border-b border-[#E8DFC8]/70 pt-8 pb-12 sm:pt-14 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Branch Context Strip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#EFE7D8]/80 border border-[#DFD3BE] rounded-xl px-4 py-2.5 text-xs text-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-stone-900">Current Serving Branch:</span>
            <span className="text-[#9A3412] font-bold">{selectedBranch.name}</span>
            <span className="text-stone-400 hidden sm:inline">({selectedBranch.city})</span>
          </div>
          <div className="flex items-center gap-4 text-stone-600">
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              {selectedBranch.openingHours}
            </span>
            <button
              onClick={onOpenBranchModal}
              className="text-[#9A3412] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              Change Branch
            </button>
          </div>
        </div>

        {/* Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Direct Craving & Action Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A3412] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Artisanal Bakery · Tamil Nadu</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23150F] font-display tracking-tight leading-[1.12]">
              Make Every Celebration Sweeter.
            </h1>

            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed max-w-2xl">
              From everyday treats to unforgettable birthday cakes, find something special at Lava Cakes.
              Freshly baked with pure dairy butter, premium Belgian cocoa, and zero preservatives.
            </p>

            {/* Starting Price & Promise Callout */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="px-3.5 py-1.5 bg-[#EAE0CF] border border-[#DDD0BC] rounded-lg">
                <span className="text-xs text-stone-600 block">Artisanal Cakes from</span>
                <span className="text-xl font-bold font-mono text-[#9A3412] tabular-nums">
                  ₹450
                </span>
                <span className="text-xs text-stone-500 ml-1">· Same-Day Ready</span>
              </div>
              <div className="text-xs text-stone-600 space-y-0.5">
                <div className="flex items-center gap-1.5 font-medium text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% Eggless Options Available on Every Cake</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Express Store Pickup in 45–60 mins or Home Delivery</span>
                </div>
              </div>
            </div>

            {/* Direct High-Intent CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreCakes}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#9A3412] hover:bg-[#7C2D12] active:scale-[0.99] text-white font-semibold shadow-md transition-all cursor-pointer text-base"
              >
                <span>Explore Cakes & Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-900 font-semibold border border-stone-300 shadow-xs transition-all cursor-pointer text-base"
              >
                <span>Build Custom Cake</span>
              </button>
            </div>

            {/* Location & Quick Contact Subtitle */}
            <div className="pt-2 text-xs text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>9+ Branches: Chennai · Coimbatore · Madurai · Salem · Trichy · Erode</span>
              <a
                href={`tel:${selectedBranch.phone}`}
                className="text-[#9A3412] hover:underline font-medium inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Call {selectedBranch.area}: {selectedBranch.phone}
              </a>
            </div>
          </div>

          {/* Right Column: Mouth-Watering Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-stone-950 p-2 sm:p-3 shadow-2xl border border-stone-800">
              {/* Product Visual */}
              <div className="rounded-xl overflow-hidden relative aspect-[4/3] bg-stone-900">
                <BakeryVisual
                  src="/images/home-cake.png"
                  type="chocolate-lava"
                  title="Belgian Molten Chocolate Lava Cake"
                  className="w-full h-full"
                  isHero={true}
                />
                {/* Floating Highlight Banner */}
                <div className="absolute top-3 left-3 bg-[#1F0C06]/90 backdrop-blur-md border border-amber-900/60 rounded-lg px-3 py-1.5 text-xs text-amber-200">
                  <span className="font-bold text-white block">Signature Masterpiece</span>
                  <span className="text-[11px] text-amber-300">Belgian Molten Lava Cake · from ₹499</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/85 backdrop-blur-md rounded-lg p-2.5 flex items-center justify-between text-xs border border-stone-800">
                  <div className="text-stone-300">
                    <span className="font-semibold text-white">Warm Molten Ganache Core</span>
                    <span className="block text-[11px] text-stone-400">Serves 4–20 · 100% Eggless or Classic</span>
                  </div>
                  <button
                    onClick={onExploreCakes}
                    className="px-3 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded font-medium text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
