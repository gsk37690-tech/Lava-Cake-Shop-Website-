import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ReviewsAndGallery } from '../components/ReviewsAndGallery';

interface GalleryPageProps {
  onNavigateCustomBuilder: () => void;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigateCustomBuilder,
  onNavigateHome,
  onNavigateMenu,
}) => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
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
            <span className="text-stone-900 font-semibold">Cake Gallery & Verified Reviews</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real Customer Proof & Masterpieces</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
                Celebration Gallery & Reviews
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed">
                Explore real cakes crafted for milestone birthdays, silver jubilees, weddings, and parties across Tamil Nadu with authentic customer feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onNavigateCustomBuilder}
                className="px-4 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Build Similar Custom Cake
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reviews & Gallery component */}
      <ReviewsAndGallery />
    </div>
  );
};
