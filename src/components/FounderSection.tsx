import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types/navigation';

interface FounderSectionProps {
  onNavigatePage: (pageId: PageId) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onNavigatePage }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#F6EFE6] border border-[#E2D5C3] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs overflow-hidden relative">
        {/* Subtle decorative background watermark */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#9A3412]/5 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Founder Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-stone-900 aspect-[4/5] group">
                <img
                  src="/images/owner.png"
                  alt="Mr. K. Selvaraju - Founder of Lava Cakes"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/10" />

                {/* Overlaid founder identity badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/90 text-stone-950 font-bold text-[10px] tracking-wider uppercase backdrop-blur-xs">
                    <Award className="w-3 h-3" />
                    <span>Founder & Master Confectioner</span>
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">
                    Mr. K. Selvaraju
                  </h4>
                  <p className="text-xs text-stone-200">
                    18+ Years Craftsmanship · Established 2013
                  </p>
                </div>
              </div>

              {/* Floating trust badge on desktop */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-xs border border-[#DFD4C2] rounded-xl px-4 py-2.5 shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">100% Pure Butter</div>
                  <div className="text-[10px] text-stone-500">Zero Artificial Palm Fats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Commitments */}
          <div className="lg:col-span-7 space-y-6 text-stone-800">
            {/* Header with pill tag */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E0D4C0] text-[#9A3412] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-[#9A3412]" />
                <span>The Heart Behind Lava Cakes</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-stone-900 leading-tight">
                Crafted with Passion by Mr. Selvaraju
              </h2>

              <p className="text-xs sm:text-sm font-medium text-[#9A3412]">
                18+ years of confectionery mastery dedicated to every celebration across Tamil Nadu.
              </p>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>
                In August 2013, confectioner <strong className="text-stone-900">Mr. K. Selvaraju</strong> founded <strong className="text-stone-900">Lava Cakes</strong> with a clear promise: to bring premium, international-quality cakes and signature molten lava pastries to families across Tamil Nadu at transparent, accessible pricing.
              </p>
              <p>
                With over 18 years of hands-on confectionery experience domestically and abroad, he personally perfected our signature recipes using <strong className="text-stone-900">100% pure churned dairy butter</strong>, rich Belgian chocolate, and freshly whipped cream—strictly rejecting artificial chemical preservatives or industrial premixes.
              </p>
            </div>

            {/* Commitments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">Dedicated Eggless Facility</span>
                  <span className="text-stone-600">Strict physical separation of ovens and mixing utensils.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">Daily Morning Batch Baking</span>
                  <span className="text-stone-600">Fresh from our certified Tamil Nadu kitchens every single day.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">9+ Outlets in Tamil Nadu</span>
                  <span className="text-stone-600">Serving Chennai, Coimbatore, Vellore, Potheri & beyond.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#E8DFC8]">
                <CheckCircle2 className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-stone-900 block">Specialty Choco Lava Line</span>
                  <span className="text-stone-600">Signature molten center cakes crafted to pure perfection.</span>
                </div>
              </div>
            </div>

            {/* Founder Quote */}
            <div className="p-4 rounded-xl bg-[#24140D] text-white space-y-1.5 border border-stone-800 shadow-sm">
              <p className="text-xs sm:text-[13px] italic text-stone-200 leading-relaxed">
                “A celebration cake is never just a sweet dessert—it is the centerpiece of your family’s most precious memories. We bake every single cake with love, respect, and zero shortcuts.”
              </p>
              <div className="text-[11px] text-amber-400 font-semibold tracking-wide">
                — Mr. K. Selvaraju, Founder & CEO
              </div>
            </div>

            {/* Navigation CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onNavigatePage('menu')}
                className="px-5 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Explore His Signature Cakes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigatePage('standards')}
                className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-semibold border border-stone-300 transition-colors cursor-pointer"
              >
                Our 100% Pure Butter Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
