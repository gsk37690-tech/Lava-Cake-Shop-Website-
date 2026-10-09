import React, { useState } from 'react';
import { X, Check, MapPin, Calendar, Clock, CreditCard, ShieldCheck, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { CartItem, Branch, OrderRecord } from '../types/bakery';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  selectedBranch: Branch;
  addOnSparkleCandles: boolean;
  addOnLuxuryBox: boolean;
  onOrderConfirmed: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  selectedBranch,
  addOnSparkleCandles,
  addOnLuxuryBox,
  onOrderConfirmed,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState('05:00 PM – 08:00 PM (Evening)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('600040');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing math
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const candleFee = addOnSparkleCandles ? 30 : 0;
  const boxFee = addOnLuxuryBox ? 45 : 0;
  const subtotalWithAddons = itemsSubtotal + candleFee + boxFee;
  const isFreeDelivery = fulfillmentType === 'pickup' || subtotalWithAddons >= 999;
  const deliveryFee = fulfillmentType === 'pickup' ? 0 : isFreeDelivery ? 0 : 40;
  const gstTax = Math.round(subtotalWithAddons * 0.05);
  const grandTotal = subtotalWithAddons + deliveryFee + gstTax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorNotice('Please provide your name and WhatsApp contact number.');
      return;
    }
    if (fulfillmentType === 'delivery' && (!streetAddress.trim() || !pincode.trim())) {
      setErrorNotice('Please provide your complete delivery street address and PIN code.');
      return;
    }

    setErrorNotice(null);
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderRecord = {
      orderId: `LAVA-TN-${randomNum}`,
      items: cartItems,
      branch: selectedBranch,
      fulfillmentType,
      deliveryAddress:
        fulfillmentType === 'delivery'
          ? {
              street: streetAddress,
              area: selectedBranch.area,
              pinCode: pincode,
              landmark: landmark.trim() || undefined,
            }
          : undefined,
      deliveryDate,
      deliveryTimeSlot: deliverySlot,
      customerName,
      customerPhone,
      subtotal: subtotalWithAddons,
      deliveryFee,
      packagingFee: boxFee,
      gstTax,
      discount: 0,
      grandTotal,
      status: 'confirmed',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderConfirmed(newOrder);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-3xl w-full shadow-2xl border border-[#E2D8C6] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#24140D] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Checkout & Order Confirmation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display mt-0.5">
              Complete Your Celebration Order
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Serving from {selectedBranch.name} ({selectedBranch.city})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorNotice && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Step 1: Fulfillment Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              1. Choose Fulfillment Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  fulfillmentType === 'delivery'
                    ? 'bg-amber-50/80 border-[#9A3412] ring-1 ring-[#9A3412]'
                    : 'bg-white border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-xs text-stone-900">Doorstep Delivery</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Direct to your home or celebration venue
                </div>
                <div className="text-[11px] font-semibold text-[#9A3412] mt-1 font-mono">
                  {isFreeDelivery ? 'FREE (Eligible)' : '₹40 Delivery Fee'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  fulfillmentType === 'pickup'
                    ? 'bg-amber-50/80 border-[#9A3412] ring-1 ring-[#9A3412]'
                    : 'bg-white border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-xs text-stone-900">Express Store Pickup</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Pick up at {selectedBranch.name}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                  Ready in 45–60 mins · ₹0 Fee
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Date & Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Delivery / Pickup Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Preferred Time Slot
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={deliverySlot}
                  onChange={e => setDeliverySlot(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                >
                  <option value="10:00 AM – 01:00 PM (Morning)">10:00 AM – 01:00 PM (Morning)</option>
                  <option value="01:00 PM – 05:00 PM (Afternoon)">01:00 PM – 05:00 PM (Afternoon)</option>
                  <option value="05:00 PM – 08:00 PM (Evening)">05:00 PM – 08:00 PM (Evening)</option>
                  <option value="11:30 PM – 12:15 AM (Midnight Surprise)">11:30 PM – 12:15 AM (Midnight Surprise)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Customer Details & Address */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              2. Contact & Delivery Address
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vignesh Ram"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98401 54321"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            </div>

            {fulfillmentType === 'delivery' && (
              <div className="space-y-2 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Doorstep Address & Street *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Flat / House No, Apartment Name, Street..."
                    value={streetAddress}
                    onChange={e => setStreetAddress(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Prominent Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Roundtana Metro Gate 2"
                      value={landmark}
                      onChange={e => setLandmark(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 600040"
                      value={pincode}
                      onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Payment Terms */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              3. Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-50/80 border-[#9A3412] ring-1 ring-[#9A3412]'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="font-semibold text-xs text-stone-900 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>Instant UPI / Cards / Netbanking</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Google Pay, PhonePe, Paytm, Cards
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-50/80 border-[#9A3412] ring-1 ring-[#9A3412]'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="font-semibold text-xs text-stone-900">
                  {fulfillmentType === 'pickup' ? 'Pay at Branch Counter' : 'Cash on Delivery (COD)'}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Pay upon handoff at delivery or pickup
                </div>
              </button>
            </div>
          </div>

          {/* Pricing Confirmation Receipt */}
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Transparent Cost Breakdown
            </div>
            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal ({cartItems.length} items):</span>
                <span className="font-mono tabular-nums text-stone-900">₹{subtotalWithAddons}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE (₹0)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>5% GST:</span>
                <span className="font-mono tabular-nums text-stone-900">₹{gstTax}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100 text-sm font-bold text-stone-900">
                <span>Final Payable Total:</span>
                <span className="text-xl font-mono text-[#9A3412] tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>
          </div>

          {/* Action Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-[#9A3412] hover:bg-[#7C2D12] active:scale-[0.99] text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order with Bakery...</span>
              ) : (
                <>
                  <span>Place Celebration Order (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
