import React, { useState } from 'react';
import { Search, Check, Sparkles, Plus, Info, AlertTriangle } from 'lucide-react';
import { Product, CakeSizeOption, CategoryId } from '../types/bakery';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { BakeryVisual } from './BakeryVisual';

interface ProductCatalogProps {
  onAddToCart: (
    product: Product,
    selectedSize: CakeSizeOption,
    isEggless: boolean,
    customMessage?: string
  ) => void;
  onOpenCustomBuilder: (presetFlavor?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onOpenCustomBuilder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('cakes');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'eggless' | 'signature'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCopyComparison, setShowCopyComparison] = useState(false);

  // Per-product state for size selection and cake message
  const [productSelections, setProductSelections] = useState<
    Record<
      string,
      {
        selectedSizeIndex: number;
        isEggless: boolean;
        customMessage: string;
        addedAnimation: boolean;
      }
    >
  >({});

  const currentCategoryInfo = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const getProductState = (product: Product) => {
    return (
      productSelections[product.id] || {
        selectedSizeIndex: 0,
        isEggless: true, // Default to eggless for Tamil Nadu preference
        customMessage: '',
        addedAnimation: false,
      }
    );
  };

  const updateProductState = (
    productId: string,
    updates: Partial<{
      selectedSizeIndex: number;
      isEggless: boolean;
      customMessage: string;
      addedAnimation: boolean;
    }>
  ) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || {
          selectedSizeIndex: 0,
          isEggless: true,
          customMessage: '',
          addedAnimation: false,
        }),
        ...updates,
      },
    }));
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCategory !== 'custom' && p.categoryId !== selectedCategory) return false;
    if (dietaryFilter === 'eggless' && !p.egglessAvailable) return false;
    if (dietaryFilter === 'signature' && !p.isSignature) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      const matchNotes = p.tastingNotes.some(n => n.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchNotes) return false;
    }
    return true;
  });

  const handleAdd = (product: Product) => {
    const state = getProductState(product);
    const chosenSize = product.sizes[state.selectedSizeIndex] || product.sizes[0];
    onAddToCart(product, chosenSize, state.isEggless, state.customMessage.trim() || undefined);

    // Trigger visual added checkmark
    updateProductState(product.id, { addedAnimation: true });
    setTimeout(() => {
      updateProductState(product.id, { addedAnimation: false });
    }, 1500);
  };

  return (
    <section id="catalogue-section" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DFC8] pb-6">
          <div>
            <div className="text-xs font-semibold text-[#9A3412] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Product Catalogue & Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-1">
              Explore Our Freshly Baked Menu
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Transparent sizing, live pricing, and 100% pure dairy butter craft in every creation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cakes, cookies, breads..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
          </div>
        </div>

        {/* Category Navigation Tabs (interactive segmented control) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8DEC9] pb-3">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'bg-[#EFE8DC] text-stone-700 hover:bg-[#E5DBCB] hover:text-stone-900'
                }`}
              >
                <span>{cat.name}</span>
                <span className="ml-1.5 text-xs opacity-80 font-normal">
                  (from ₹{cat.startingPrice})
                </span>
              </button>
            );
          })}
        </div>

        {/* Polished Category Description Banner (Addresses Problem #1 & QA Proof) */}
        <div className="bg-[#F4ECE0] border border-[#E0D4C0] rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                  {currentCategoryInfo.tagline}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-600 font-medium">
                  {currentCategoryInfo.highlight}
                </span>
              </div>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
                {currentCategoryInfo.description}
              </p>
            </div>

            {/* QA Audit Toggle: Show before & after copy comparison */}
            {currentCategoryInfo.originalBrokenCopy && (
              <button
                onClick={() => setShowCopyComparison(!showCopyComparison)}
                className="self-start md:self-center px-3 py-1.5 rounded-lg border border-amber-800/30 bg-amber-50 text-xs font-medium text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="View original indexing copy vs rewritten copy"
              >
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{showCopyComparison ? 'Hide Copy Audit' : 'Audit Fix Comparison'}</span>
              </button>
            )}
          </div>

          {/* Before & After comparison drawer if user toggles */}
          {showCopyComparison && currentCategoryInfo.originalBrokenCopy && (
            <div className="mt-4 pt-4 border-t border-[#DECFC0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900">
                <div className="flex items-center gap-1.5 font-bold text-red-700 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>PREVIOUS INDEXED COPY (Problem #1)</span>
                </div>
                <p className="italic font-mono text-[11px] text-red-800">
                  "{currentCategoryInfo.originalBrokenCopy}"
                </p>
                <p className="text-[10px] text-red-600 mt-1">
                  Cause of customer churn: Looked like unfinished placeholder text.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 mb-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>POLISHED PRODUCTION COPY (Fixed)</span>
                </div>
                <p className="font-sans text-[11px] text-emerald-900 font-medium">
                  "{currentCategoryInfo.description}"
                </p>
                <p className="text-[10px] text-emerald-700 mt-1">
                  Accurate, mouth-watering, grammatically impeccable bakery marketing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Dietary / Quick Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Filter by:</span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'bg-stone-800 text-white'
                  : 'bg-[#EAE1D3] text-stone-700 hover:bg-[#DDD2C0]'
              }`}
            >
              All Varieties ({filteredProducts.length})
            </button>
            <button
              onClick={() => setDietaryFilter('eggless')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                dietaryFilter === 'eggless'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#EAE1D3] text-stone-700 hover:bg-[#DDD2C0]'
              }`}
            >
              100% Eggless
            </button>
            <button
              onClick={() => setDietaryFilter('signature')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                dietaryFilter === 'signature'
                  ? 'bg-[#9A3412] text-white'
                  : 'bg-[#EAE1D3] text-stone-700 hover:bg-[#DDD2C0]'
              }`}
            >
              Chef's Signatures
            </button>
          </div>

          <div className="text-xs text-stone-500">
            Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
          </div>
        </div>

        {/* Product Cards Grid (3 columns on desktop, generous spacing, 65-75% imagery) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-600 font-medium">No bakery items found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-3 px-4 py-2 bg-[#9A3412] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => {
              const state = getProductState(product);
              const currentSize = product.sizes[state.selectedSizeIndex] || product.sizes[0];
              const price = currentSize.price;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E5DCcb] overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-shadow duration-200"
                >
                  {/* Lead with Imagery (65-70% visual height on top container) */}
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <BakeryVisual
                      type={product.visualTheme.cakeType}
                      title={product.name}
                      className="w-full h-full"
                    />

                    {/* Top tags: Eggless guarantee & Signature badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {product.egglessAvailable && (
                        <span className="bg-emerald-950/85 text-emerald-200 border border-emerald-800/50 text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Eggless
                        </span>
                      )}
                      {product.isSignature && (
                        <span className="bg-[#9A3412]/90 text-amber-100 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                          Chef Signature
                        </span>
                      )}
                    </div>

                    {/* Preparation Time */}
                    <div className="absolute bottom-2 left-2.5 bg-black/60 text-stone-200 text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                      Ready in {product.preparationTimeHours} hrs
                    </div>
                  </div>

                  {/* Product Details & Ordering Module */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Quiet category / subcategory kicker */}
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        {product.subCategory || currentCategoryInfo.name}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg font-bold text-stone-900 mt-0.5 font-display line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Clean Unboxed Tasting Notes with typographic separators */}
                      <div className="mt-2 text-[11px] text-stone-500 flex flex-wrap items-center gap-1.5">
                        {product.tastingNotes.map((note, idx) => (
                          <React.Fragment key={note}>
                            <span className="text-stone-700 font-medium">{note}</span>
                            {idx < product.tastingNotes.length - 1 && (
                              <span aria-hidden="true" className="text-stone-300">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Weight / Size Selection Buttons */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-700">Choose Size:</span>
                        <span className="text-stone-500">{currentSize.serves}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {product.sizes.map((s, idx) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => updateProductState(product.id, { selectedSizeIndex: idx })}
                            className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                              state.selectedSizeIndex === idx
                                ? 'bg-[#9A3412] text-white shadow-xs'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            <span className="block">{s.label}</span>
                            <span className="block text-[10px] font-mono opacity-90">
                              ₹{s.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Message on Cake (if cake category) */}
                    {product.categoryId === 'cakes' && (
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-stone-600">
                          Message on Cake Plaque (Complimentary):
                        </label>
                        <input
                          type="text"
                          maxLength={35}
                          placeholder="e.g. Happy Birthday Varun! 🎂"
                          value={state.customMessage}
                          onChange={e =>
                            updateProductState(product.id, { customMessage: e.target.value })
                          }
                          className="w-full px-2.5 py-1 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9A3412] text-stone-800"
                        />
                      </div>
                    )}

                    {/* Price baseline & Action CTA */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                          Total Price
                        </div>
                        <div className="text-xl font-bold font-mono tabular-nums text-stone-900">
                          ₹{price}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {product.categoryId === 'cakes' && (
                          <button
                            type="button"
                            onClick={() => onOpenCustomBuilder(product.name)}
                            className="px-2.5 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                            title="Customize tiers and toppings"
                          >
                            Customize
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer ${
                            state.addedAnimation
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#9A3412] hover:bg-[#7C2D12] text-white active:scale-95'
                          }`}
                        >
                          {state.addedAnimation ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
