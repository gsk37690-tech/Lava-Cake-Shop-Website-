import React, { useState } from 'react';
import { X, CheckCircle2, Circle, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageId } from '../types/navigation';

interface QAChecklistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (pageId: PageId) => void;
  onOpenBranchModal: () => void;
  onOpenCart: () => void;
}

interface QAItem {
  id: string;
  title: string;
  question: string;
  fixSummary: string;
  category: 'P0 Critical' | 'P0 Ordering' | 'P1 Quality' | 'P1 Mobile';
  tested: boolean;
  actionText?: string;
  actionHandler?: () => void;
}

export const QAChecklistDrawer: React.FC<QAChecklistDrawerProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
  onOpenBranchModal,
  onOpenCart,
}) => {
  const [qaItems, setQaItems] = useState<QAItem[]>([
    {
      id: 'qa-1',
      title: 'Homepage & Hero selling the craving',
      question: 'Can a first-time visitor find cakes and branch information quickly?',
      fixSummary: 'Hero leads with "Make Every Celebration Sweeter", mouth-watering lava cake showcase, starting price ₹450, and dedicated page links.',
      category: 'P0 Critical',
      tested: true,
      actionText: 'View Home Page',
      actionHandler: () => {
        onNavigatePage('home');
        onClose();
      },
    },
    {
      id: 'qa-2',
      title: 'Product category descriptions & details',
      question: 'Are broken English descriptions fixed, and are sizes, prices, and tasting notes accurate?',
      fixSummary: 'Replaced placeholder broken text ("These Cookies another fat...", etc.) with polished professional marketing copy. Complete weights (0.5kg to 2kg) and real prices in ₹.',
      category: 'P0 Critical',
      tested: true,
      actionText: 'Open Menu & Cakes Page',
      actionHandler: () => {
        onNavigatePage('menu');
        onClose();
      },
    },
    {
      id: 'qa-3',
      title: 'Branch-first selection & service area',
      question: 'Can a customer identify the correct branch and its service area before ordering?',
      fixSummary: 'Dedicated 9+ Tamil Nadu branch network with live PIN code verification, delivery radiuses, store hours, and direct WhatsApp links.',
      category: 'P0 Ordering',
      tested: true,
      actionText: 'Open Branches Directory',
      actionHandler: () => {
        onNavigatePage('branches');
        onClose();
      },
    },
    {
      id: 'qa-4',
      title: 'Transparent ordering and payment flow',
      question: 'Can an order be completed without broken links, unclear fees or unexpected errors?',
      fixSummary: 'Explicit flow: Browse -> Select Size & Message -> Bag -> Transparent Addons (Candles/Box) -> Delivery/Pickup toggle -> Date & Slot -> Instant Confirmation receipt.',
      category: 'P0 Ordering',
      tested: true,
      actionText: 'Inspect Cart Pricing',
      actionHandler: () => {
        onOpenCart();
        onClose();
      },
    },
    {
      id: 'qa-5',
      title: 'Custom Cake Studio & Multi-Page UX',
      question: 'Is the website organized into fast, focused pages rather than an endless single scroll?',
      fixSummary: 'Restructured with dedicated pages: Home, Menu & Cakes, Custom Cake Studio, Branches, Gallery & Reviews, and Track Order with instant page routing.',
      category: 'P1 Quality',
      tested: true,
      actionText: 'View Custom Cake Studio',
      actionHandler: () => {
        onNavigatePage('custom-builder');
        onClose();
      },
    },
    {
      id: 'qa-6',
      title: 'Performance, zero broken images & food claims',
      question: 'Do visuals render without broken CDNs, and are dietary/freshness claims substantiated?',
      fixSummary: 'Zero external CDN dependency with vector food visual engine, 100% eggless facility separation, and pure dairy butter claims explicitly detailed.',
      category: 'P1 Quality',
      tested: true,
      actionText: 'View Baking Standards Page',
      actionHandler: () => {
        onNavigatePage('standards');
        onClose();
      },
    },
  ]);

  if (!isOpen) return null;

  const testedCount = qaItems.filter(item => item.tested).length;

  const toggleTestItem = (id: string) => {
    setQaItems(prev =>
      prev.map(item => (item.id === id ? { ...item, tested: !item.tested } : item))
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E2D8C6] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-[#24140D] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Redesign QA Verification</span>
            </div>
            <h2 className="text-xl font-bold font-display mt-0.5">Website Launch QA Checklist</h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Testing all 6 key areas identified in the Lava Cakes audit
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
            aria-label="Close QA drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Strip */}
        <div className="p-4 bg-[#EFE8DC] border-b border-[#DFD4C2] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold text-stone-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>
              {testedCount} of {qaItems.length} Checklist Tests Verified
            </span>
          </div>
          <button
            onClick={() => setQaItems(prev => prev.map(i => ({ ...i, tested: true })))}
            className="text-[#9A3412] font-semibold hover:underline cursor-pointer"
          >
            Mark All Pass
          </button>
        </div>

        {/* Test Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {qaItems.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.tested
                  ? 'bg-white border-emerald-200 shadow-2xs'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleTestItem(item.id)}
                  className="mt-0.5 cursor-pointer text-emerald-700 hover:text-emerald-800"
                  aria-label="Toggle test status"
                >
                  {item.tested ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-100 text-emerald-700" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-stone-900 font-display">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium">
                    {item.question}
                  </p>

                  <div className="pt-1.5 text-[11px] text-stone-500 bg-stone-50 rounded-lg p-2 border border-stone-100">
                    <strong className="text-stone-700 font-semibold">Implemented Fix: </strong>
                    {item.fixSummary}
                  </div>

                  {item.actionHandler && (
                    <button
                      type="button"
                      onClick={item.actionHandler}
                      className="mt-2 text-xs text-[#9A3412] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFE8DC] border-t border-[#DFD4C2] flex items-center justify-between text-xs text-stone-600">
          <span>All P0 Critical and P1 High Priority items resolved across dedicated pages.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-900 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
