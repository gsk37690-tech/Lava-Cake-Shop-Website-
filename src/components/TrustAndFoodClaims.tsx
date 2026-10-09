import React from 'react';
import { ShieldCheck, Heart, Sparkles, AlertCircle, Phone, MessageSquare, Clock } from 'lucide-react';
import { Branch } from '../types/bakery';

interface TrustAndFoodClaimsProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
}

export const TrustAndFoodClaims: React.FC<TrustAndFoodClaimsProps> = ({
  selectedBranch,
  onOpenBranchModal,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Ingredient & Freshness Standards (Item 11) */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
              Transparent Baking Standards
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Our Freshness, Ingredients & Allergen Commitment
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Substantiated culinary standards backed by daily batch baking in certified Tamil Nadu kitchens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-[#9A3412]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-display">
                100% Pure Dairy Butter
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Zero cheap vegetable shortening or palm fats in our signature cakes and cookies. We use churned dairy cream butter for authentic mouthfeel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-display">
                Dedicated Eggless Facility
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear physical separation and dedicated mixing bowls for our 100% vegetarian cake lines, trusted by families across Tamil Nadu.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-display">
                Daily Fresh · No Artificial Preservatives
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our breads and cakes are baked every morning. Best enjoyed within 48 hours chilled (or 24 hours at room temperature for molten lava).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 font-display">
                Transparent Allergen Labeling
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every product page displays allergens (Tree Nuts, Dairy, Gluten, Soy). Nut-free baking requests can be specified in the custom cake builder.
              </p>
            </div>
          </div>
        </div>

        {/* Master Baker Craft Story with Real Photo */}
        <div className="bg-[#EFE8DC] rounded-2xl p-6 sm:p-8 border border-[#DFD4C2] flex flex-col md:flex-row items-center gap-6 sm:gap-8 shadow-2xs">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-stone-900 border-2 border-stone-300 shrink-0 shadow-sm">
            <img
              src="/images/owner.png"
              alt="Lava Cakes Master Baker"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
              Artisanal Dedication · Tamil Nadu
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
              Baked by Passionate Master Pastry Chefs
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
              At Lava Cakes, every recipe is personally formulated and calibrated by our master pastry chefs. We reject industrial premixes and chemical shelf-life extenders. Each cake that leaves our ovens is freshly frosted with real dairy cream, Belgian chocolate, and pure butter so your family celebrations taste authentically exceptional.
            </p>
            <div className="text-xs text-stone-500 font-medium pt-1">
              Serving Chennai, Coimbatore, Madurai, Salem, Trichy & Erode with pride.
            </div>
          </div>
        </div>

        {/* Effortless Contact & Support Route (Item 09) */}
        <div className="bg-[#24140D] rounded-2xl p-6 sm:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Effortless Customer Support
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Have an urgent delivery question or custom cake enquiry?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Connect instantly with the manager at your active branch ({selectedBranch.name}, {selectedBranch.city}). No IVR phone loops.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${selectedBranch.phone}`}
              className="px-4 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 text-xs font-semibold flex items-center gap-2 shadow transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#9A3412]" />
              <span>Call {selectedBranch.phone}</span>
            </a>

            <a
              href={`https://wa.me/${selectedBranch.whatsapp}?text=Hi%20Lava%20Cakes%20Support,%20I%20have%20an%20order%20enquiry.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Store Chat</span>
            </a>

            <button
              onClick={onOpenBranchModal}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
            >
              All 9+ Branch Contacts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
