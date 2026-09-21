import React from 'react';
import { Compass, Route, Bookmark, ShieldCheck, Map, Heart } from 'lucide-react';

export type NavTab = 'explore' | 'routes' | 'saved' | 'club';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  savedCount: number;
  onOpenMap: () => void;
  showFloatingIsland?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onOpenMap,
  showFloatingIsland = true,
}) => {
  return (
    <>
      {/* Floating Navigation Island Trigger */}
      {showFloatingIsland && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center pointer-events-auto animate-in fade-in zoom-in duration-300">
          <div className="flex items-center bg-[#b61a00] text-white rounded-full px-5 py-2.5 shadow-[0_8px_28px_rgba(182,26,0,0.45)] backdrop-blur-md gap-4 select-none border border-white/20">
            <button
              id="floating-map-view-btn"
              onClick={onOpenMap}
              className="flex items-center gap-1.5 text-white font-['Inter'] text-[12px] font-bold tracking-wide active:scale-95 transition-transform hover:opacity-95"
            >
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </button>
            <div className="w-[1px] h-4 bg-white/30" />
            <button
              id="floating-saved-btn"
              onClick={() => onSelectTab('saved')}
              className="flex items-center gap-1.5 text-white font-['Inter'] text-[12px] font-bold tracking-wide active:scale-95 transition-transform hover:opacity-95"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Saved</span>
              <span className="px-1.5 py-0.5 bg-white text-[#b61a00] text-[10px] font-extrabold rounded-full ml-0.5">
                {savedCount}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Dock Bar */}
      <nav
        id="corsa-bottom-nav"
        className="fixed bottom-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl border-t border-[#eeeeee] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      >
        <div className="flex items-center justify-around h-16 max-w-4xl mx-auto px-4">
          {/* Explore */}
          <button
            id="nav-tab-explore"
            aria-current={currentTab === 'explore' ? 'page' : undefined}
            onClick={() => onSelectTab('explore')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all focus:outline-none ${
              currentTab === 'explore'
                ? 'text-[#b61a00] font-bold'
                : 'text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="font-['Inter'] text-[10px] tracking-wide uppercase">
              Explore
            </span>
          </button>

          {/* Routes */}
          <button
            id="nav-tab-routes"
            aria-current={currentTab === 'routes' ? 'page' : undefined}
            onClick={() => onSelectTab('routes')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all focus:outline-none ${
              currentTab === 'routes'
                ? 'text-[#b61a00] font-bold'
                : 'text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            <Route className="w-5 h-5" />
            <span className="font-['Inter'] text-[10px] tracking-wide uppercase">
              Routes
            </span>
          </button>

          {/* Saved */}
          <button
            id="nav-tab-saved"
            aria-current={currentTab === 'saved' ? 'page' : undefined}
            onClick={() => onSelectTab('saved')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all focus:outline-none relative ${
              currentTab === 'saved'
                ? 'text-[#b61a00] font-bold'
                : 'text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="font-['Inter'] text-[10px] tracking-wide uppercase">
              Saved
            </span>
            {savedCount > 0 && (
              <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-[#b61a00]" />
            )}
          </button>

          {/* Club */}
          <button
            id="nav-tab-club"
            aria-current={currentTab === 'club' ? 'page' : undefined}
            onClick={() => onSelectTab('club')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all focus:outline-none ${
              currentTab === 'club'
                ? 'text-[#b61a00] font-bold'
                : 'text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="font-['Inter'] text-[10px] tracking-wide uppercase">
              Club
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
