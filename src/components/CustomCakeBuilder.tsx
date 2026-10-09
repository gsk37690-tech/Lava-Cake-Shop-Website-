import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MessageSquare, Check, Upload, Image, Calculator, ShoppingBag } from 'lucide-react';
import { Branch, CartItem, CakeSizeOption } from '../types/bakery';
import { TAMIL_NADU_BRANCHES } from '../data/branches';
import { BakeryVisual } from './BakeryVisual';

interface CustomCakeBuilderProps {
  selectedBranch: Branch;
  presetFlavor?: string;
  onAddToCart: (customItem: CartItem) => void;
  onOpenBranchModal: () => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  selectedBranch,
  presetFlavor,
  onAddToCart,
}) => {
  const [occasion, setOccasion] = useState('Birthday');
  const [flavor, setFlavor] = useState(presetFlavor || 'Belgian Dark Truffle');
  const [frosting, setFrosting] = useState('Satin Chocolate Ganache');
  const [size, setSize] = useState<'1.0 kg' | '1.5 kg' | '2.0 kg' | '3.0 kg 2-Tier' | '5.0 kg 3-Tier'>('1.5 kg');
  const [shape, setShape] = useState('Round Classic');
  const [isEggless, setIsEggless] = useState(true);
  const [cakeMessage, setCakeMessage] = useState('');
  const [selectedThemePreset, setSelectedThemePreset] = useState('Midnight Gold Ganache');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('04:00 PM – 07:00 PM (Evening)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeBranchId, setActiveBranchId] = useState(selectedBranch.id);
  const [isSubmittedToCart, setIsSubmittedToCart] = useState(false);

  // Price Calculation Logic
  const sizePricing: Record<string, { base: number; serves: string }> = {
    '1.0 kg': { base: 850, serves: '8–10 People' },
    '1.5 kg': { base: 1250, serves: '12–15 People' },
    '2.0 kg': { base: 1650, serves: '18–20 People' },
    '3.0 kg 2-Tier': { base: 2600, serves: '25–30 People (2-Tier)' },
    '5.0 kg 3-Tier': { base: 4500, serves: '45–50 People (3-Tier)' },
  };

  const flavorSurcharge: Record<string, number> = {
    'Belgian Dark Truffle': 100,
    'Dutch Molten Lava Core': 150,
    'Red Velvet Philadelphia': 120,
    'Alphonso Mango Mascarpone': 100,
    'Nutella Hazelnut Praline': 180,
    'Classic Butterscotch Caramel': 0,
  };

  const currentBranch = TAMIL_NADU_BRANCHES.find(b => b.id === activeBranchId) || selectedBranch;
  const currentBase = sizePricing[size]?.base || 1250;
  const currentFlavorAdd = flavorSurcharge[flavor] || 0;
  const customDecorFee = size.includes('Tier') ? 350 : 150;
  const estimatedTotal = currentBase + currentFlavorAdd + customDecorFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setUploadedPreviewUrl(URL.createObjectURL(file));
    }
  };

  const getCustomCakeImage = () => {
    if (uploadedPreviewUrl) return uploadedPreviewUrl;
    if (size.includes('Tier')) return '/images/product5.png';
    if (flavor.includes('Red Velvet')) return '/images/cupcake.png';
    if (flavor.includes('Fruit') || flavor.includes('Mango')) return '/images/product2.png';
    if (selectedThemePreset.includes('Gold') || flavor.includes('Lava')) return '/images/home-cake.png';
    return '/images/why-cake.png';
  };

  const handleAddCustomToCart = () => {
    const sizeOption: CakeSizeOption = {
      label: size,
      weight: size,
      serves: sizePricing[size]?.serves || 'Celebration',
      price: estimatedTotal,
    };

    const cartItem: CartItem = {
      id: `custom-${Date.now()}`,
      productId: 'custom-cake-builder',
      productName: `Custom ${size} ${flavor} (${occasion})`,
      category: 'custom',
      selectedSize: sizeOption,
      isEggless,
      customMessage: cakeMessage.trim() || undefined,
      quantity: 1,
      unitPrice: estimatedTotal,
      addOns: {},
    };

    onAddToCart(cartItem);
    setIsSubmittedToCart(true);
    setTimeout(() => setIsSubmittedToCart(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    const text = `*New Custom Cake Enquiry - Lava Cakes*\n` +
      `Branch: ${currentBranch.name} (${currentBranch.city})\n` +
      `Occasion: ${occasion}\n` +
      `Flavor: ${flavor}\n` +
      `Size: ${size} (${sizePricing[size]?.serves})\n` +
      `Shape: ${shape}\n` +
      `Dietary: ${isEggless ? '100% Eggless' : 'Classic with Eggs'}\n` +
      `Message on Cake: "${cakeMessage || 'None'}"\n` +
      `Theme/Design: ${uploadedFileName ? `Customer Reference Photo: ${uploadedFileName}` : selectedThemePreset}\n` +
      `Date & Slot: ${deliveryDate} (${deliveryTimeSlot})\n` +
      `Estimated Price: ₹${estimatedTotal}\n` +
      `Customer Name: ${customerName || 'Customer'}\n` +
      `Phone: ${customerPhone || 'Not provided'}\n` +
      `Special Notes: ${specialInstructions || 'None'}`;

    window.open(`https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="custom-builder" className="py-12 sm:py-16 bg-[#F5EFE6] border-y border-[#E2D8C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Bespoke Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
            Build Your Custom Celebration Cake
          </h2>
          <p className="text-sm text-stone-600">
            Configure your dream cake step-by-step with transparent live pricing.
            Upload your reference design photo and coordinate directly with your nearest Tamil Nadu branch.
          </p>
        </div>

        {/* Studio Grid: 2-Column Desktop Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configuration Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            {/* Step 1: Occasion */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                1. Select Occasion
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['Birthday', 'Anniversary', 'Kids Theme', 'Wedding', 'Milestone', 'Corporate'].map(occ => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                      occasion === occ
                        ? 'bg-[#9A3412] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor & Dietary */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. Choose Cake Flavor
                </label>
                {/* Eggless toggle */}
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={e => setIsEggless(e.target.checked)}
                    className="accent-emerald-700"
                  />
                  <span>100% Eggless (Vegetarian)</span>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Belgian Dark Truffle',
                  'Dutch Molten Lava Core',
                  'Red Velvet Philadelphia',
                  'Alphonso Mango Mascarpone',
                  'Nutella Hazelnut Praline',
                  'Classic Butterscotch Caramel',
                ].map(flv => (
                  <button
                    key={flv}
                    type="button"
                    onClick={() => setFlavor(flv)}
                    className={`p-2.5 text-xs font-medium rounded-lg text-left transition-all cursor-pointer ${
                      flavor === flv
                        ? 'bg-amber-100 border border-amber-800/40 text-amber-950 font-bold'
                        : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div>{flv}</div>
                    {flavorSurcharge[flv] ? (
                      <div className="text-[10px] text-[#9A3412] font-mono">
                        +₹{flavorSurcharge[flv]}
                      </div>
                    ) : (
                      <div className="text-[10px] text-stone-400">Included</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Size & Tiers */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                3. Size & Tiers
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.keys(sizePricing) as Array<keyof typeof sizePricing>).map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz as any)}
                    className={`p-2 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                      size === sz
                        ? 'bg-[#9A3412] text-white shadow-xs font-bold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <div className="font-semibold">{sz}</div>
                    <div className="text-[10px] opacity-80">{sizePricing[sz].serves.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Shape & Frosting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">Shape</label>
                <select
                  value={shape}
                  onChange={e => setShape(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                >
                  <option value="Round Classic">Round Classic</option>
                  <option value="Heart Shaped">Heart Shaped (Anniversary / Romantic)</option>
                  <option value="Square Modern">Square Modern</option>
                  <option value="Tiered Masterpiece">2-Tier / 3-Tier Layered</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">Frosting Finish</label>
                <select
                  value={frosting}
                  onChange={e => setFrosting(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                >
                  <option value="Satin Chocolate Ganache">Satin Belgian Ganache (Glossy)</option>
                  <option value="Whipped Chantilly Cream">Whipped Vanilla Chantilly</option>
                  <option value="Semi-Naked Rustic Floral">Semi-Naked Rustic Floral</option>
                  <option value="Velvet Crumb Textured">Velvet Crumb Textured</option>
                </select>
              </div>
            </div>

            {/* Step 5: Design Theme & Reference Photo Upload */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                5. Theme Style or Upload Reference Image
              </label>

              {/* Preset Theme Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  'Midnight Gold Ganache',
                  'Vintage Floral Lambeth',
                  'Kids Cartoon Theme',
                  'Minimalist Textured',
                ].map(theme => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => {
                      setSelectedThemePreset(theme);
                      setUploadedFileName(null);
                    }}
                    className={`p-2 text-xs rounded-lg transition-all text-center cursor-pointer ${
                      selectedThemePreset === theme && !uploadedFileName
                        ? 'bg-amber-100 border border-amber-800/40 text-amber-950 font-bold'
                        : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>

              {/* Photo Upload Input */}
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors">
                <input
                  type="file"
                  id="cake-photo-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="cake-photo-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-[#9A3412]">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-stone-800">
                    {uploadedFileName ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Uploaded: {uploadedFileName}
                      </span>
                    ) : (
                      <span>Upload your Pinterest or Instagram cake photo</span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500">
                    PNG, JPG up to 10MB · Our chefs will match piping & colors
                  </p>
                </label>
              </div>
            </div>

            {/* Step 6: Message on Cake Plaque */}
            <div className="space-y-1.5 pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-700">
                Custom Plaque Inscription (Included):
              </label>
              <input
                type="text"
                maxLength={45}
                placeholder="e.g. Happy 25th Anniversary Amma & Appa ❤️"
                value={cakeMessage}
                onChange={e => setCakeMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
              />
            </div>

            {/* Step 7: Branch & Delivery Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">Baking Branch</label>
                <select
                  value={activeBranchId}
                  onChange={e => setActiveBranchId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-medium"
                >
                  {TAMIL_NADU_BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">Delivery Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Contact details for rapid branch confirmation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sundaram"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  WhatsApp Contact Number:
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98401 23456"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Price Estimate & Summary Card */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            {/* Visual Preview */}
            <div className="bg-stone-950 rounded-2xl overflow-hidden shadow-lg border border-stone-800">
              <div className="aspect-[4/3] relative">
                <BakeryVisual
                  src={getCustomCakeImage()}
                  type={size.includes('Tier') ? 'custom-tier' : 'chocolate-lava'}
                  title="Custom Cake Preview"
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded">
                  {shape} · {size}
                </div>
                {cakeMessage && (
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs rounded p-2 text-center text-xs font-semibold text-stone-900 shadow">
                    "{cakeMessage}"
                  </div>
                )}
              </div>
            </div>

            {/* Price Transparency Breakdown Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#9A3412]" />
                  <h3 className="font-bold text-stone-900 text-sm">
                    Transparent Price Estimate
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  No Hidden Fees
                </span>
              </div>

              {/* Line items */}
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Base Handcrafted Cake ({size}):</span>
                  <span className="font-mono text-stone-900 tabular-nums">₹{currentBase}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flavor Premium ({flavor}):</span>
                  <span className="font-mono text-stone-900 tabular-nums">
                    {currentFlavorAdd > 0 ? `+₹${currentFlavorAdd}` : 'Included'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Piping & Theme Decor:</span>
                  <span className="font-mono text-stone-900 tabular-nums">
                    +₹{customDecorFee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Plaque Inscription & Box:</span>
                  <span className="font-medium text-emerald-700">Complimentary (₹0)</span>
                </div>
                <div className="flex justify-between">
                  <span>Dietary Preference:</span>
                  <span className="font-medium text-stone-700">
                    {isEggless ? '100% Eggless (₹0)' : 'Standard'}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">
                    Estimated Order Total
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#9A3412] tabular-nums">
                    ₹{estimatedTotal}
                  </div>
                </div>
                <div className="text-right text-[11px] text-stone-500">
                  <span>Serving {sizePricing[size]?.serves}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleAddCustomToCart}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSubmittedToCart
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#9A3412] hover:bg-[#7C2D12] text-white active:scale-[0.99]'
                  }`}
                >
                  {isSubmittedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Custom Cake Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Custom Cake to Cart (₹{estimatedTotal})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Specs to Branch WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 text-center leading-normal">
                Direct WhatsApp consultation with master decorator at{' '}
                <strong className="text-stone-700">{currentBranch.name}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
