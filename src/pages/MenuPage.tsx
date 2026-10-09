import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { Product, CakeSizeOption, CategoryId, Branch } from '../types/bakery';
import { ProductCatalog } from '../components/ProductCatalog';

interface MenuPageProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  initialCategory?: CategoryId;
  onAddToCart: (
    product: Product,
    selectedSize: CakeSizeOption,
    isEggless: boolean,
    customMessage?: string
  ) => void;
  onOpenCustomBuilder: (presetFlavor?: string) => void;
  onNavigateHome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  selectedBranch,
  onOpenBranchModal,
  initialCategory,
  onAddToCart,
  onOpenCustomBuilder,
  onNavigateHome,
}) => {
  return (
    <div className="space-y-6 pb-16">
      {/* Page Header & Breadcrumb */}
      <div className="bg-[#FAF7F2] border-b border-[#E8DFC8] pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-500 flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-semibold">Menu & Cakes Catalogue</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted Fresh Daily</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-1">
                Lava Cakes Full Menu & Catalogue
              </h1>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                Browse our complete selection of artisanal celebration cakes, twice-baked cookies, slow-fermented breads, and warm dessert pots.
              </p>
            </div>

            {/* Serving Branch Badge */}
            <div className="bg-[#EFE7D8] border border-[#DFD3BE] rounded-xl px-4 py-2 text-xs flex items-center gap-3 self-start md:self-auto">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">
                  Ordering from
                </span>
                <span className="font-bold text-stone-900">{selectedBranch.name}</span>
                <span className="text-stone-500 text-[11px] block">{selectedBranch.city}</span>
              </div>
              <button
                onClick={onOpenBranchModal}
                className="px-2.5 py-1 bg-[#9A3412] text-white rounded-md text-[11px] font-semibold hover:bg-[#7C2D12] transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalogue Grid Component */}
      <ProductCatalog
        onAddToCart={onAddToCart}
        onOpenCustomBuilder={onOpenCustomBuilder}
      />
    </div>
  );
};
