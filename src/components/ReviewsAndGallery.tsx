import React, { useState } from 'react';
import { Star, CheckCircle, Sparkles, Filter, MapPin } from 'lucide-react';
import { CUSTOMER_REVIEWS, REAL_CAKE_GALLERY } from '../data/reviewsAndGallery';
import { BakeryVisual } from './BakeryVisual';

export const ReviewsAndGallery: React.FC = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('All');

  const filteredGallery = REAL_CAKE_GALLERY.filter(item => {
    if (selectedOccasion !== 'All' && item.occasion !== selectedOccasion) return false;
    return true;
  });

  const filteredReviews = CUSTOMER_REVIEWS.filter(rev => {
    if (selectedBranchFilter !== 'All' && !rev.branchName.includes(selectedBranchFilter)) return false;
    return true;
  });

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-[#F5EFE6] border-t border-[#E2D8C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Proof & Cake Showcases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
            Real Celebrations Across Tamil Nadu
          </h2>
          <p className="text-sm text-stone-600">
            Real birthday cakes, anniversaries, and feedback delivered by our 9+ bakery branches in Chennai, Coimbatore, Madurai, Salem, and Trichy.
          </p>
        </div>

        {/* Part 1: Real Customer Cake Gallery Showcase */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-lg font-bold font-display text-stone-900">
                Freshly Baked Showcases Gallery
              </h3>
              <p className="text-xs text-stone-500">
                Handcrafted for recent clients with their permission
              </p>
            </div>

            {/* Occasion Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {['All', 'Birthday', 'Anniversary', 'Kids Theme', 'Wedding', 'Minimalist'].map(occ => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedOccasion === occ
                      ? 'bg-[#9A3412] text-white shadow-xs'
                      : 'bg-[#EAE1D2] text-stone-700 hover:bg-[#DDD2C0]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map(cake => (
              <div
                key={cake.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                  <BakeryVisual
                    src={cake.imageUrl}
                    title={cake.title}
                    className="w-full h-full"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {cake.badge}
                  </div>
                  <div className="absolute bottom-2 right-2.5 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                    {cake.weight}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#9A3412] font-semibold">
                      <MapPin className="w-3 h-3" />
                      <span>{cake.branch}</span>
                    </div>
                    <h4 className="text-base font-bold text-stone-900 mt-0.5 font-display">
                      {cake.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {cake.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">Flavor: {cake.flavor}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified Order
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Genuine Attributed Customer Reviews */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-lg font-bold font-display text-stone-900">
                Branch-Specific Customer Ratings
              </h3>
              <p className="text-xs text-stone-500">
                Over 2,800+ 5-star celebrations across Tamil Nadu
              </p>
            </div>

            {/* City / Branch Filter */}
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={selectedBranchFilter}
                onChange={e => setSelectedBranchFilter(e.target.value)}
                className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-800"
              >
                <option value="All">All Tamil Nadu Branches</option>
                <option value="Anna Nagar">Chennai (Anna Nagar)</option>
                <option value="R.S. Puram">Coimbatore (R.S. Puram)</option>
                <option value="Trichy">Trichy (Thillai Nagar)</option>
                <option value="Madurai">Madurai (K.K. Nagar)</option>
                <option value="Salem">Salem (Fairlands)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map(rev => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-stone-900 flex items-center gap-1">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span title="Verified Customer" aria-label="Verified Customer">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {rev.branchName} · {rev.city}
                    </div>
                  </div>

                  <span className="text-[10px] text-[#9A3412] font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                    {rev.occasion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
