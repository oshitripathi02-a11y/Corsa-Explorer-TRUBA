import React from 'react';
import { Route as RouteIcon, Clock, Zap, MapPin, ChevronRight, Navigation } from 'lucide-react';
import { CURATED_ROUTES, SPOTS } from '../data/spots';
import { CuratedRoute, Spot } from '../types';

interface RoutesViewProps {
  onSelectSpot: (spot: Spot) => void;
  onLaunchRoute: (route: CuratedRoute) => void;
}

export const RoutesView: React.FC<RoutesViewProps> = ({
  onSelectSpot,
  onLaunchRoute,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 pt-3 pb-28 flex flex-col gap-6 font-['Plus_Jakarta_Sans']">
      {/* Editorial Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 bg-[#b61a00] rounded-full" />
          <span className="text-[10px] tracking-widest text-[#b61a00] uppercase font-bold font-['Inter']">
            Speed & Taste Itineraries
          </span>
        </div>
        <h2 className="font-['Outfit'] text-[26px] tracking-tight text-[#1a1c1c] uppercase font-bold">
          Curated Milan Loops
        </h2>
        <p className="text-[13px] text-[#5f5e5e] leading-normal">
          Engineered walking circuits connecting specialty roasteries, architectural viewpoints, and culinary sanctuaries.
        </p>
      </div>

      {/* Routes Cards List */}
      <div className="flex flex-col gap-5">
        {CURATED_ROUTES.map((route) => {
          const routeSpots = SPOTS.filter((s) => route.spotIds.includes(s.id));

          return (
            <article
              key={route.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#eeeeee] shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Media banner */}
              <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-neutral-900">
                <img
                  src={route.heroImage}
                  alt={route.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#b61a00] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm font-['Inter']">
                    {route.distanceKm} KM • {route.checkpointsCount} CHECKPOINTS
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-[11px] text-[#ffdad3] font-['Inter'] font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{route.estimatedMinutes} min walking circuit</span>
                    <span>•</span>
                    <span className="truncate">{route.neighborhoods.join(' ➔ ')}</span>
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-[19px] sm:text-[21px] text-white leading-tight mt-1">
                    {route.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex flex-col gap-4">
                <p className="text-[13px] text-[#333333] leading-relaxed">
                  {route.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 font-['Inter']">
                  {route.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#1a1c1c] text-[10px] font-semibold border border-[#eeeeee]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Checkpoint waypoints preview */}
                <div className="bg-[#f9f9f9] rounded-xl p-3 border border-[#eeeeee] flex flex-col gap-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] flex items-center justify-between">
                    <span>Circuit Checkpoints</span>
                    <span className="text-[#b61a00] font-mono">{routeSpots.length} Total</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {routeSpots.map((sp, idx) => (
                      <div
                        key={sp.id}
                        onClick={() => onSelectSpot(sp)}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#eeeeee] hover:border-[#b61a00]/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-[#1a1c1c] text-white text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-[13px] font-semibold text-[#1a1c1c] truncate">
                            {sp.name}
                          </span>
                          <span className="text-[10px] text-[#b61a00] font-bold uppercase hidden sm:inline">
                            {sp.neighborhood}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#5f5e5e] flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onLaunchRoute(route)}
                  className="w-full py-3 px-4 rounded-full bg-[#b61a00] text-white font-['Inter'] font-bold text-[14px] shadow-[0_4px_14px_rgba(182,26,0,0.3)] hover:bg-[#991600] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Start Circuit Navigation</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
