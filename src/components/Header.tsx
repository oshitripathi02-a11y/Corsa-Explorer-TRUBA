import React from 'react';
import { Search, User } from 'lucide-react';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenProfile?: () => void;
  activeTabTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenProfile,
  activeTabTitle = 'Discovery Feed',
}) => {
  return (
    <header
      id="corsa-header"
      className="fixed top-0 w-full z-50 pt-safe bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#eeeeee]/80 shadow-[0_1px_12px_rgba(0,0,0,0.04)] transition-all"
    >
      <div className="h-16 px-4 sm:px-5 flex items-center justify-between gap-2 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          <img
            id="corsa-logo-img"
            alt="Corsa Explorer Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VpLvf0PhAvZ3-WIVAs0SCueCpK07xeIyzpH1ZSNI2BB0jMLua42IvnRrsQDcMwvJscLKcVsbYzlON5s36FGo7gMOWhqnG72oUP2eHWHiljx4r1lXlS9ZYtEGx2g7DCe3o62jnKuWcPX1pqkGFyTKHMtIMCO17-cSesvykY0_Jp9wwzNbOhV8M2w_Ltkx4341ChCi855NZIxV8kPoNUVkCwFmI0przicW74Q0vDGM1SWQ7FhkQ33LmggJ0B"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-['Outfit'] font-bold text-[18px] tracking-tight text-[#1a1c1c] uppercase truncate leading-none">
              CORSA EXPLORER
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center text-[10px] uppercase tracking-wider text-[#b61a00] font-bold bg-[#b61a00]/10 px-2 py-0.5 rounded-full font-['Inter']">
                📍 Milan, Duomo
              </span>
              <span className="text-[11px] text-[#5f5e5e] truncate font-['Inter'] hidden sm:inline">
                • {activeTabTitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            id="header-search-btn"
            aria-label="Search spots"
            onClick={onOpenSearch}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#1a1c1c] hover:text-[#b61a00] hover:bg-[#f3f3f3] transition-colors focus:outline-none"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            id="header-profile-btn"
            aria-label="Member Profile"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#b61a00] flex items-center justify-center shadow-[0_2px_8px_rgba(182,26,0,0.35)] text-white hover:scale-105 active:scale-95 transition-all"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
