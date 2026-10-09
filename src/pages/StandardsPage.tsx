import React from 'react';
import { ShieldCheck, Heart, Sparkles, AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { Branch } from '../types/bakery';
import { TrustAndFoodClaims } from '../components/TrustAndFoodClaims';

interface StandardsPageProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
}

export const StandardsPage: React.FC<StandardsPageProps> = ({
  selectedBranch,
  onOpenBranchModal,
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
            <span className="text-stone-900 font-semibold">Baking Standards & Allergen Policy</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Substantiated Food Quality</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
              Ingredients, Freshness & Safety Commitment
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Why our cakes taste different: 100% pure dairy butter, 64% Belgian couverture chocolate, dedicated eggless kitchen lines, and zero chemical preservatives.
            </p>
          </div>
        </div>
      </div>

      {/* Main Trust and Food Claims component */}
      <TrustAndFoodClaims
        selectedBranch={selectedBranch}
        onOpenBranchModal={onOpenBranchModal}
      />
    </div>
  );
};
