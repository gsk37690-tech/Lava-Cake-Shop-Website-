import React, { useState } from 'react';
import { X, MapPin, Phone, MessageSquare, Clock, CheckCircle2, Search, AlertCircle } from 'lucide-react';
import { Branch } from '../types/bakery';
import { TAMIL_NADU_BRANCHES } from '../data/branches';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
}

export const BranchModal: React.FC<BranchModalProps> = ({
  isOpen,
  onClose,
  selectedBranch,
  onSelectBranch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    tested: boolean;
    branch?: Branch;
    eligible: boolean;
  }>({ tested: false, eligible: false });

  if (!isOpen) return null;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!cleanPin) return;

    const matchedBranch = TAMIL_NADU_BRANCHES.find(b =>
      b.servicedPinCodes.includes(cleanPin)
    );

    if (matchedBranch) {
      setPincodeResult({ tested: true, branch: matchedBranch, eligible: true });
    } else {
      // Find fallback nearest city
      setPincodeResult({ tested: true, eligible: false });
    }
  };

  const filteredBranches = TAMIL_NADU_BRANCHES.filter(branch => {
    const q = searchQuery.toLowerCase();
    return (
      branch.name.toLowerCase().includes(q) ||
      branch.city.toLowerCase().includes(q) ||
      branch.area.toLowerCase().includes(q) ||
      branch.address.toLowerCase().includes(q) ||
      branch.servicedPinCodes.some(pin => pin.includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E2D8C7] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#24140D] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Branch-First Ordering</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display mt-1">
              Select Your Local Lava Cakes Branch
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Choose your branch to view accurate local stock, delivery timing, and pickup slots.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
            aria-label="Close branch selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pin Code Quick Checker */}
        <div className="p-4 bg-[#EFE8DC] border-b border-[#DFD4C2]">
          <form onSubmit={handlePincodeCheck} className="space-y-2">
            <label className="block text-xs font-semibold text-stone-800">
              Check delivery eligibility for your 6-digit postal code:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter PIN Code (e.g. 600040, 641002, 625020)"
                  value={pincodeInput}
                  onChange={e => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Check PIN
              </button>
            </div>

            {/* PIN check response */}
            {pincodeResult.tested && (
              <div className="pt-1">
                {pincodeResult.eligible && pincodeResult.branch ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">
                        Delivery available to PIN {pincodeInput}!
                      </p>
                      <p className="text-emerald-700">
                        Served by <strong className="font-semibold">{pincodeResult.branch.name}</strong> ({pincodeResult.branch.area}). Same-day delivery & store pickup active.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectBranch(pincodeResult.branch!);
                          onClose();
                        }}
                        className="mt-1.5 px-3 py-1 bg-emerald-700 text-white rounded text-xs font-medium hover:bg-emerald-800 transition-colors cursor-pointer"
                      >
                        Set as My Branch
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        Direct doorstep delivery might be outside our standard radius for PIN {pincodeInput}.
                      </p>
                      <p className="text-amber-800">
                        You can still order for Express Store Pickup from any of our Tamil Nadu branches below, or contact branch WhatsApp for special courier delivery.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Search filter for branch list */}
        <div className="p-4 border-b border-[#E8DEC9] flex items-center gap-2 bg-[#F7F2E8]">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by city (Chennai, Coimbatore, Madurai, Salem, Trichy) or area..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Branch Cards List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredBranches.map(branch => {
            const isCurrent = selectedBranch.id === branch.id;
            return (
              <div
                key={branch.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-50/70 border-amber-800/40 ring-1 ring-amber-800/20'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                        {branch.city}
                      </span>
                      {isCurrent && (
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          Active Branch
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mt-0.5">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {branch.address}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Landmark: {branch.landmark}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectBranch(branch);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-stone-900 text-white hover:bg-stone-800'
                        : 'bg-[#9A3412] hover:bg-[#7C2D12] text-white'
                    }`}
                  >
                    {isCurrent ? 'Current' : 'Select Branch'}
                  </button>
                </div>

                {/* Operations & Contact Details */}
                <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{branch.openingHours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Delivering within {branch.deliveryRadiusKm} km radius</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-3 text-xs">
                  <a
                    href={`tel:${branch.phone}`}
                    className="inline-flex items-center gap-1 text-stone-700 hover:text-[#9A3412] font-medium"
                  >
                    <Phone className="w-3 h-3 text-[#9A3412]" />
                    <span>{branch.phone}</span>
                  </a>
                  <span className="text-stone-300">·</span>
                  <a
                    href={`https://wa.me/${branch.whatsapp}?text=Hi%20Lava%20Cakes%20${encodeURIComponent(branch.name)},%20I%20would%20like%20to%20order%20a%20cake.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>Branch WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#EFE8DC] border-t border-[#DFD4C2] flex items-center justify-between text-xs text-stone-600">
          <span>All 9+ branches maintain identical premium ingredient standards.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
