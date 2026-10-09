import React from 'react';
import { Clock, ShieldCheck, Thermometer, MapPin } from 'lucide-react';
import { Branch, OrderRecord } from '../types/bakery';
import { OrderStatusTracker } from '../components/OrderStatusTracker';

interface TrackerPageProps {
  currentOrder: OrderRecord | null;
  activeBranch: Branch;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
}

export const TrackerPage: React.FC<TrackerPageProps> = ({
  currentOrder,
  activeBranch,
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
            <span className="text-stone-900 font-semibold">Track Live Order</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Kitchen Dispatch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
              Track Your Celebration Cake
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Monitor your order through every stage: oven baking, delicate piping, thermal packaging, and final doorstep delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Order Tracker Component */}
      <OrderStatusTracker currentOrder={currentOrder} activeBranch={activeBranch} />

      {/* Protection & Transit FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-base text-stone-900 font-display">
            How Your Cake Reaches You In Pristine Condition
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600 pt-2">
            <div className="space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-700" />
                <span>Thermal Insulation</span>
              </div>
              <p>
                Every cake is packed with high-grade food-safe insulation liners to prevent melting under Tamil Nadu weather.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Level-Transit Guarantee</span>
              </div>
              <p>
                Our delivery executives use specialized rigid base carriers to prevent any tipping, sliding, or edge smudges.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#9A3412]" />
                <span>Sharp Slot Delivery</span>
              </div>
              <p>
                Dispatched exactly 45–60 minutes prior to your chosen celebration slot so the cake arrives cool, fresh, and ready to serve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
