import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, MapPin, Gift } from 'lucide-react';
import { CartItem, Branch } from '../types/bakery';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  onOpenCheckout: () => void;
  addOnSparkleCandles: boolean;
  onToggleSparkleCandles: () => void;
  addOnLuxuryBox: boolean;
  onToggleLuxuryBox: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  selectedBranch,
  onOpenBranchModal,
  onOpenCheckout,
  addOnSparkleCandles,
  onToggleSparkleCandles,
  addOnLuxuryBox,
  onToggleLuxuryBox,
}) => {
  if (!isOpen) return null;

  // Pricing math
  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const candleFee = addOnSparkleCandles ? 30 : 0;
  const boxFee = addOnLuxuryBox ? 45 : 0;
  const subtotalWithAddons = itemsSubtotal + candleFee + boxFee;

  // Free delivery threshold above ₹999
  const isFreeDelivery = subtotalWithAddons >= 999;
  const deliveryFee = itemsSubtotal > 0 ? (isFreeDelivery ? 0 : 40) : 0;
  const gstTax = Math.round(subtotalWithAddons * 0.05); // 5% GST
  const grandTotal = subtotalWithAddons + deliveryFee + gstTax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E2D8C6] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#24140D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-display">Your Celebration Order</h2>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Branch Strip */}
        <div className="p-3 bg-[#EFE8DC] border-b border-[#DFD4C2] flex items-center justify-between text-xs text-stone-800">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
            <span>Fulfilling from: </span>
            <strong className="text-stone-900 truncate">{selectedBranch.name}</strong>
          </div>
          <button
            onClick={onOpenBranchModal}
            className="text-[#9A3412] font-semibold hover:underline shrink-0 ml-2 cursor-pointer"
          >
            Change
          </button>
        </div>

        {/* Free Delivery Progress */}
        {itemsSubtotal > 0 && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/80 text-xs">
            {isFreeDelivery ? (
              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Congratulations! You qualified for Free Doorstep Delivery.
              </span>
            ) : (
              <span className="text-amber-900 font-medium">
                Add ₹{999 - subtotalWithAddons} more for{' '}
                <strong className="font-semibold text-[#9A3412]">Free Delivery</strong> (Current fee: ₹40)
              </span>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-stone-500">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-200/80 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-medium text-stone-700">Your shopping bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Discover our signature Belgian chocolate lava cakes, artisan cookies and celebration gateaux.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#9A3412] text-white text-xs font-semibold rounded-lg hover:bg-[#7C2D12] transition-colors cursor-pointer"
              >
                Browse Cakes & Treats
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-2 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-stone-900 font-display">
                      {item.productName}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-500">
                      <span>Size: {item.selectedSize.label}</span>
                      <span>·</span>
                      <span className={item.isEggless ? 'text-emerald-700 font-semibold' : ''}>
                        {item.isEggless ? '100% Eggless' : 'Regular'}
                      </span>
                    </div>

                    {item.customMessage && (
                      <p className="text-[10px] text-amber-900 bg-amber-50 rounded px-2 py-0.5 mt-1 border border-amber-200/50">
                        Inscription: "{item.customMessage}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                    aria-label={`Remove ${item.productName}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 hover:bg-stone-200 rounded text-stone-700 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold px-2 font-mono tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 hover:bg-stone-200 rounded text-stone-700 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-xs font-bold font-mono text-stone-900 tabular-nums">
                    ₹{item.unitPrice * item.quantity}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Celebration Add-ons (Compliant with P0 Price Transparency) */}
          {cartItems.length > 0 && (
            <div className="pt-3 border-t border-stone-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>Celebration Add-ons</span>
              </div>

              {/* Sparkle Candle Add-on */}
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs cursor-pointer hover:bg-stone-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addOnSparkleCandles}
                    onChange={onToggleSparkleCandles}
                    className="accent-[#9A3412]"
                  />
                  <div>
                    <span className="font-semibold text-stone-800">Gold Sparkle Candle</span>
                    <span className="block text-[10px] text-stone-500">
                      Indoor-safe celebration flare
                    </span>
                  </div>
                </div>
                <span className="font-mono font-semibold text-stone-700">+₹30</span>
              </label>

              {/* Luxury Box Add-on */}
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs cursor-pointer hover:bg-stone-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addOnLuxuryBox}
                    onChange={onToggleLuxuryBox}
                    className="accent-[#9A3412]"
                  />
                  <div>
                    <span className="font-semibold text-stone-800">Thermal Luxury Gift Packaging</span>
                    <span className="block text-[10px] text-stone-500">
                      Chilled insulation + ribbon wrap
                    </span>
                  </div>
                </div>
                <span className="font-mono font-semibold text-stone-700">+₹45</span>
              </label>
            </div>
          )}
        </div>

        {/* Pricing Summary & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3">
            {/* Complete Itemized Pricing breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono text-stone-900 tabular-nums">₹{itemsSubtotal}</span>
              </div>
              {addOnSparkleCandles && (
                <div className="flex justify-between text-stone-500">
                  <span>Sparkle Candles:</span>
                  <span className="font-mono tabular-nums">+₹30</span>
                </div>
              )}
              {addOnLuxuryBox && (
                <div className="flex justify-between text-stone-500">
                  <span>Thermal Gift Packaging:</span>
                  <span className="font-mono tabular-nums">+₹45</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee ({selectedBranch.area}):</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE (Order &gt; ₹999)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5% Confectionery):</span>
                <span className="font-mono text-stone-900 tabular-nums">₹{gstTax}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100 text-sm font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-lg font-mono text-[#9A3412] tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Direct Checkout Trigger */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-[#9A3412] hover:bg-[#7C2D12] active:scale-[0.99] text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-stone-400 text-center">
              COD & UPI accepted · Transparent fees before order confirmation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
