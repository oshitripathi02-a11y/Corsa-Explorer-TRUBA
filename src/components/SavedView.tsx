import React, { useState } from 'react';
import { Bookmark, Star, Zap, Navigation, Trash2, ArrowRight } from 'lucide-react';
import { Spot, Category } from '../types';

interface SavedViewProps {
  savedSpots: Spot[];
  onToggleSave: (spotId: string) => void;
  onSelectSpot: (spot: Spot) => void;
  onStartRoute: (spot: Spot) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedSpots,
  onToggleSave,
  onSelectSpot,
  onStartRoute,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredSpots = activeFilter === 'All'
    ? savedSpots
    : savedSpots.filter((s) => s.category === activeFilter);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 pt-3 pb-28 flex flex-col gap-6 font-['Plus_Jakarta_Sans']">
      {/* Editorial Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 bg-[#b61a00] rounded-full" />
          <span className="text-[10px] tracking-widest text-[#b61a00] uppercase font-bold font-['Inter']">
            Personal Dossier
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-['Outfit'] text-[26px] tracking-tight text-[#1a1c1c] uppercase font-bold">
            Saved Checkpoints
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#b61a00] text-white text-[11px] font-bold font-['Inter']">
            {savedSpots.length} Bookmarked
          </span>
        </div>
        <p className="text-[13px] text-[#5f5e5e]">
          Your curated shortlist of artisanal bars, work sanctuaries, and secret Milan viewpoints.
        </p>
      </div>

      {savedSpots.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#eeeeee] flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#5f5e5e] mb-3">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-['Outfit'] font-bold text-[18px] text-[#1a1c1c]">
            No Bookmarked Spots Yet
          </h3>
          <p className="text-[13px] text-[#5f5e5e] max-w-xs mt-1">
            Tap the bookmark icon on any spot card in the Explore feed to pin your favorites.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredSpots.map((spot) => (
            <article
              key={spot.id}
              onClick={() => onSelectSpot(spot)}
              className="bg-white rounded-2xl p-3 sm:p-4 border border-[#eeeeee] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer group"
            >
              <div className="relative w-full sm:w-32 h-36 sm:h-28 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#b61a00] text-white text-[9px] font-bold uppercase font-['Inter']">
                  {spot.priceLevel}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1.5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#b61a00] font-['Inter']">
                    {spot.neighborhood}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-['Inter'] font-semibold text-[#1a1c1c]">
                    <Star className="w-3.5 h-3.5 text-[#ffb4a5] fill-[#ffb4a5]" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                <h4 className="font-['Outfit'] font-bold text-[17px] text-[#1a1c1c] leading-tight group-hover:text-[#b61a00] transition-colors">
                  {spot.name}
                </h4>

                <p className="text-[12px] text-[#5f5e5e] truncate">
                  {spot.insiderTip}
                </p>

                <div className="flex items-center gap-2 pt-1 font-['Inter']">
                  <span className="text-[10px] font-bold text-[#5f5e5e] bg-[#f3f3f3] px-2 py-0.5 rounded-full">
                    ⚡ {spot.distanceLabel}
                  </span>
                  <span className="text-[10px] font-bold text-[#5f5e5e] bg-[#f3f3f3] px-2 py-0.5 rounded-full">
                    {spot.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#eeeeee]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartRoute(spot);
                  }}
                  className="flex-1 sm:flex-none py-2 px-3.5 rounded-full bg-[#b61a00] text-white text-[12px] font-bold font-['Inter'] flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#991600] active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current" />
                  <span>Route</span>
                </button>

                <button
                  type="button"
                  aria-label="Remove bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(spot.id);
                  }}
                  className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-red-50 hover:text-red-600 text-[#5f5e5e] flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
