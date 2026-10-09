import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Phone, MessageSquare, Truck, ChefHat, Sparkles } from 'lucide-react';
import { OrderRecord, Branch } from '../types/bakery';

interface OrderStatusTrackerProps {
  currentOrder?: OrderRecord | null;
  activeBranch: Branch;
}

export const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({
  currentOrder,
  activeBranch,
}) => {
  const [searchOrderId, setSearchOrderId] = useState(currentOrder?.orderId || 'LAVA-TN-4829');
  const [activeStep, setActiveStep] = useState<number>(3); // Sample is at 'Out for Delivery'

  const stages = [
    {
      title: 'Order Confirmed',
      description: 'Logged at branch kitchen & ingredients reserved.',
      icon: CheckCircle2,
      time: '04:15 PM',
    },
    {
      title: 'Master Baker Prepping & Oven Baking',
      description: 'Slow-baked with pure butter & 64% Belgian chocolate.',
      icon: ChefHat,
      time: '04:45 PM',
    },
    {
      title: 'Freshly Frosted & Thermal Packed',
      description: 'Gourmet ganache piping, custom plaque, thermal box.',
      icon: Sparkles,
      time: '05:30 PM',
    },
    {
      title: 'Out for Doorstep Delivery',
      description: 'Courier en route with temperature-controlled insulated bag.',
      icon: Truck,
      time: '06:10 PM',
    },
    {
      title: 'Celebration Delivered',
      description: 'Handed over in pristine condition for your celebration.',
      icon: CheckCircle2,
      time: 'Estimated 06:45 PM',
    },
  ];

  const displayOrder = currentOrder || {
    orderId: 'LAVA-TN-4829',
    customerName: 'Praveen Venkatesh',
    customerPhone: '+91 98401 99283',
    placedAt: '04:15 PM',
    deliveryDate: 'Today',
    deliveryTimeSlot: '05:00 PM – 08:00 PM',
    grandTotal: 944,
    branch: activeBranch,
    fulfillmentType: 'delivery' as const,
    items: [
      {
        id: 'sample-1',
        productName: 'Belgian Molten Chocolate Lava Cake (1.0 kg)',
        customMessage: 'Happy 10th Birthday Shreya! 🎉',
      },
    ],
  };

  return (
    <section id="tracker" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9A3412]">
            <Clock className="w-3.5 h-3.5" />
            <span>Live Bakery Kitchen Updates</span>
          </div>
          <h2 className="text-3xl font-bold font-display text-stone-900">
            Real-Time Order & Delivery Tracker
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto">
            Stay updated at every baking stage without repeatedly calling the shop.
          </p>
        </div>

        {/* Order Lookup Search */}
        <div className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. LAVA-TN-4829)"
              value={searchOrderId}
              onChange={e => setSearchOrderId(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
          </div>
          <button
            onClick={() => setActiveStep(prev => (prev === 4 ? 1 : prev + 1))}
            className="px-4 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            title="Simulate next kitchen stage"
          >
            Advance Stage
          </button>
        </div>

        {/* Status Tracker Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Order Snapshot Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-[#9A3412]">
                  {searchOrderId}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Active in Kitchen
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-0.5">
                {displayOrder.items[0]?.productName || 'Celebration Cake Order'}
              </h3>
              {displayOrder.items[0]?.customMessage && (
                <p className="text-xs text-stone-500 italic mt-0.5">
                  "{displayOrder.items[0].customMessage}"
                </p>
              )}
            </div>

            <div className="text-left sm:text-right text-xs text-stone-600">
              <div>Fulfilling Branch: <strong>{displayOrder.branch.name}</strong></div>
              <div>Slot: <strong>{displayOrder.deliveryTimeSlot}</strong></div>
            </div>
          </div>

          {/* Stepper Visual Timeline */}
          <div className="space-y-6 pt-2">
            {stages.map((st, idx) => {
              const isPast = idx < activeStep;
              const isCurrent = idx === activeStep;
              const Icon = st.icon;

              return (
                <div key={st.title} className="flex items-start gap-4 relative">
                  {/* Vertical connector line */}
                  {idx < stages.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-10 -ml-px ${
                        isPast ? 'bg-[#9A3412]' : 'bg-stone-200'
                      }`}
                    />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      isCurrent
                        ? 'bg-[#9A3412] text-white ring-4 ring-amber-100'
                        : isPast
                        ? 'bg-[#9A3412] text-white'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent
                            ? 'text-[#9A3412] text-sm'
                            : isPast
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {st.title}
                      </h4>
                      <span className="text-[11px] font-mono text-stone-400">{st.time}</span>
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        isCurrent ? 'text-stone-700 font-medium' : 'text-stone-500'
                      }`}
                    >
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Support Contacts */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-stone-50/70 p-3.5 rounded-xl">
            <span className="text-stone-600">
              Need to adjust delivery time or address for this order?
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${displayOrder.branch.phone}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-800 font-semibold hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3 h-3 text-[#9A3412]" />
                <span>Call Branch</span>
              </a>
              <a
                href={`https://wa.me/${displayOrder.branch.whatsapp}?text=Hi,%20inquiring%20about%20Order%20${searchOrderId}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp Dispatch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
