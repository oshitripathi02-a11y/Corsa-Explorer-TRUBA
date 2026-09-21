import React, { useState } from 'react';
import { Search, SlidersHorizontal, Navigation, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  radiusKm: number;
  onRadiusChange: (radius: number) => void;
  onOpenFilterSheet: () => void;
  totalCheckpoints: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  radiusKm,
  onRadiusChange,
  onOpenFilterSheet,
  totalCheckpoints,
}) => {
  const [showRadiusMenu, setShowRadiusMenu] = useState(false);
  const radiusOptions = [0.5, 0.8, 1.5, 3.0, 5.0];

  return (
    <section className="px-4 sm:px-5 pt-2 pb-2 flex flex-col gap-2.5 max-w-4xl mx-auto w-full">
      {/* Search Bar Capsule */}
      <div className="w-full bg-[#ffffff] border border-[#eeeeee] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center px-4 py-2 gap-2.5 transition-all focus-within:shadow-md focus-within:border-[#b61a00]/40">
        <Search className="w-5 h-5 text-[#5f5e5e] flex-shrink-0 select-none" />
        <input
          id="spot-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search cafes, roasters, terraces..."
          className="bg-transparent w-full text-[14px] text-[#1a1c1c] placeholder:text-[#5f5e5e] focus:outline-none min-w-0 font-['Plus_Jakarta_Sans']"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="w-6 h-6 flex items-center justify-center rounded-full text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-[#f3f3f3]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          id="filter-settings-btn"
          onClick={onOpenFilterSheet}
          aria-label="Open filter settings"
          className="w-8 h-8 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#1a1c1c] hover:bg-[#eeeeee] transition-transform active:scale-95 flex-shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Active Location & Telemetry Badge */}
      <div className="flex items-center justify-between px-1 relative">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#b61a00] animate-pulse flex-shrink-0" />
          <span className="text-[10px] uppercase tracking-wider text-[#1a1c1c] font-bold truncate font-['Inter']">
            Milan, Duomo Sector
          </span>
          <span className="text-[12px] text-[#5f5e5e] truncate font-['Plus_Jakarta_Sans']">
            • {totalCheckpoints} checkpoints active
          </span>
        </div>

        <div className="relative">
          <button
            id="radius-selector-btn"
            onClick={() => setShowRadiusMenu(!showRadiusMenu)}
            className="flex items-center gap-1 text-[#b61a00] hover:opacity-80 transition-opacity bg-[#b61a00]/5 px-2 py-0.5 rounded-full border border-[#b61a00]/15"
          >
            <Navigation className="w-3.5 h-3.5 rotate-45" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-['Inter']">
              {radiusKm} km rad
            </span>
          </button>

          {showRadiusMenu && (
            <div className="absolute right-0 top-7 z-40 bg-white border border-[#eeeeee] rounded-xl shadow-xl p-1.5 flex flex-col gap-1 min-w-[130px]">
              <div className="text-[10px] text-[#5f5e5e] px-2 py-1 font-semibold uppercase font-['Inter']">
                Radar Range
              </div>
              {radiusOptions.map((rad) => (
                <button
                  key={rad}
                  onClick={() => {
                    onRadiusChange(rad);
                    setShowRadiusMenu(false);
                  }}
                  className={`text-left px-2 py-1.5 text-[12px] rounded-lg font-['Inter'] flex items-center justify-between ${
                    radiusKm === rad
                      ? 'bg-[#b61a00] text-white font-bold'
                      : 'text-[#1a1c1c] hover:bg-[#f3f3f3]'
                  }`}
                >
                  <span>{rad} km</span>
                  {radiusKm === rad && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
