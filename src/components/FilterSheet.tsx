import React from 'react';
import { X, Check } from 'lucide-react';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPrice: string[];
  onTogglePrice: (price: string) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  selectedNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
  onReset: () => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  isOpen,
  onClose,
  selectedPrice,
  onTogglePrice,
  minRating,
  onMinRatingChange,
  selectedNeighborhood,
  onSelectNeighborhood,
  onReset,
}) => {
  if (!isOpen) return null;

  const neighborhoods = ['All Neighborhoods', 'Duomo Centro', 'Porta Venezia', 'Brera Arts', 'Navigli Grande'];
  const prices = ['$', '$$', '$$$', '$$$$'];
  const ratings = [4.5, 4.8, 5.0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#eeeeee] relative animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-[#eeeeee] flex items-center justify-between">
          <div>
            <h3 className="font-['Outfit'] font-bold text-[18px] text-[#1a1c1c] leading-none">
              Telemetry & Filters
            </h3>
            <p className="text-[11px] text-[#5f5e5e] font-['Inter'] mt-0.5">
              Refine checkpoints by speed, price, and sector
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f3f3f3] flex items-center justify-center text-[#5f5e5e]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4.5 font-['Plus_Jakarta_Sans']">
          {/* Price Tier */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] mb-2">
              Price Tier
            </label>
            <div className="grid grid-cols-4 gap-2">
              {prices.map((p) => {
                const active = selectedPrice.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => onTogglePrice(p)}
                    className={`py-2 rounded-xl text-[13px] font-['Outfit'] font-bold border transition-all ${
                      active
                        ? 'bg-[#b61a00] text-white border-[#b61a00] shadow-sm'
                        : 'bg-[#f9f9f9] text-[#1a1c1c] border-[#eeeeee] hover:bg-[#f3f3f3]'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {ratings.map((r) => (
                <button
                  key={r}
                  onClick={() => onMinRatingChange(r === minRating ? 0 : r)}
                  className={`flex-1 py-2 rounded-xl text-[12px] font-['Inter'] font-semibold border transition-all ${
                    minRating === r
                      ? 'bg-[#1a1c1c] text-white border-[#1a1c1c]'
                      : 'bg-[#f9f9f9] text-[#1a1c1c] border-[#eeeeee] hover:bg-[#f3f3f3]'
                  }`}
                >
                  ★ {r}+
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhood */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] mb-2">
              Milan Sector
            </label>
            <div className="flex flex-wrap gap-1.5 font-['Inter']">
              {neighborhoods.map((n) => {
                const active = selectedNeighborhood === n;
                return (
                  <button
                    key={n}
                    onClick={() => onSelectNeighborhood(n)}
                    className={`px-3 py-1.5 rounded-full text-[12px] transition-all font-semibold ${
                      active
                        ? 'bg-[#b61a00] text-white shadow-sm'
                        : 'bg-[#f3f3f3] text-[#333333] hover:bg-[#eeeeee]'
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#eeeeee]">
            <button
              onClick={onReset}
              className="py-2.5 px-4 rounded-full text-[13px] font-['Inter'] font-semibold text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-full bg-[#b61a00] text-white font-['Inter'] font-bold text-[14px] shadow-[0_4px_14px_rgba(182,26,0,0.3)] hover:bg-[#991600] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
