import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Search, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Branch } from '../types/bakery';
import { TAMIL_NADU_BRANCHES } from '../data/branches';

interface BranchesPageProps {
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({
  selectedBranch,
  onSelectBranch,
  onNavigateHome,
  onNavigateMenu,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    tested: boolean;
    branch?: Branch;
    eligible: boolean;
  }>({ tested: false, eligible: false });

  const cities = ['All', 'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Erode'];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = pincodeInput.trim();
    if (!pin) return;

    const matchedBranch = TAMIL_NADU_BRANCHES.find(b => b.servicedPinCodes.includes(pin));
    if (matchedBranch) {
      setPincodeResult({ tested: true, branch: matchedBranch, eligible: true });
    } else {
      setPincodeResult({ tested: true, eligible: false });
    }
  };

  const filteredBranches = TAMIL_NADU_BRANCHES.filter(branch => {
    if (selectedCity !== 'All' && branch.city !== selectedCity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        branch.name.toLowerCase().includes(q) ||
        branch.city.toLowerCase().includes(q) ||
        branch.area.toLowerCase().includes(q) ||
        branch.address.toLowerCase().includes(q) ||
        branch.servicedPinCodes.some(p => p.includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
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
            <span className="text-stone-900 font-semibold">Tamil Nadu Branches & Hours</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>9+ Locations Across Tamil Nadu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
              Find Your Nearest Lava Cakes Branch
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every Lava Cakes branch houses an on-site master bakery team for express pickup and temperature-controlled doorstep delivery. Check your delivery PIN code or choose a location below.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Postal PIN Code Checker Tool */}
        <div className="bg-[#EFE8DC] border border-[#DFD4C2] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-base sm:text-lg font-bold font-display text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9A3412]" />
              <span>Check Delivery Eligibility for Your PIN Code</span>
            </h2>
            <p className="text-xs text-stone-600">
              Enter your 6-digit postal code to discover which branch serves your address and see instant delivery feasibility.
            </p>
          </div>

          <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 600040, 641002, 625020"
              value={pincodeInput}
              onChange={e => setPincodeInput(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              Verify PIN Code
            </button>
          </form>

          {/* Feedback Result */}
          {pincodeResult.tested && (
            <div className="pt-2">
              {pincodeResult.eligible && pincodeResult.branch ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3 max-w-2xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="font-bold text-emerald-950">
                      Great news! PIN code {pincodeInput} is eligible for Doorstep Delivery!
                    </div>
                    <div className="text-emerald-800">
                      Served by <strong>{pincodeResult.branch.name}</strong> ({pincodeResult.branch.area}). Same-day delivery and express store pickup are active.
                    </div>
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => {
                          onSelectBranch(pincodeResult.branch!);
                          onNavigateMenu();
                        }}
                        className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
                      >
                        Set as Active & Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3 max-w-2xl">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-amber-950">
                      PIN code {pincodeInput} is outside standard doorstep delivery radius
                    </div>
                    <div className="text-amber-800">
                      You can still order for Express Store Pickup from any branch below, or contact branch WhatsApp for special outstation courier packaging.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-4">
          {/* City Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#9A3412] text-white shadow-2xs'
                    : 'bg-[#EAE1D2] text-stone-700 hover:bg-[#DDD2C0]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search branch, street, landmark..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9A3412]"
            />
          </div>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map(branch => {
            const isCurrent = selectedBranch.id === branch.id;
            return (
              <div
                key={branch.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-50/70 border-amber-800/40 ring-1 ring-amber-800/20 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                      {branch.city}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Active Ordering Branch
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display text-stone-900">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {branch.address}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      <strong>Landmark:</strong> {branch.landmark}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{branch.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Delivery radius: {branch.deliveryRadiusKm} km · Pickup in {branch.pickupReadyMinutes}m</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3 mt-4">
                  {/* Phone & WhatsApp links */}
                  <div className="flex items-center justify-between text-xs">
                    <a
                      href={`tel:${branch.phone}`}
                      className="inline-flex items-center gap-1 text-stone-800 hover:text-[#9A3412] font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#9A3412]" />
                      <span>{branch.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=Hi%20${encodeURIComponent(branch.name)},%20I%20am%20inquiring%20about%20a%20cake.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  {/* Primary Selection Action */}
                  <button
                    onClick={() => {
                      onSelectBranch(branch);
                      onNavigateMenu();
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                      isCurrent
                        ? 'bg-stone-900 text-white hover:bg-stone-800'
                        : 'bg-[#9A3412] hover:bg-[#7C2D12] text-white shadow-2xs'
                    }`}
                  >
                    {isCurrent ? 'Order from This Branch →' : 'Set as My Branch & Order'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
