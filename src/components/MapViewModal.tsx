import React, { useState } from 'react';
import { X, Navigation, Star, Zap, Layers, Compass, Crosshair, ArrowRight } from 'lucide-react';
import { Spot } from '../types';

interface MapViewModalProps {
  spots: Spot[];
  selectedSpotId?: string;
  onClose: () => void;
  onSelectSpot: (spot: Spot) => void;
  onStartRoute: (spot: Spot) => void;
  radiusKm: number;
}

export const MapViewModal: React.FC<MapViewModalProps> = ({
  spots,
  selectedSpotId,
  onClose,
  onSelectSpot,
  onStartRoute,
  radiusKm,
}) => {
  const [activeSpot, setActiveSpot] = useState<Spot>(
    spots.find((s) => s.id === selectedSpotId) || spots[0]
  );
  const [mapMode, setMapMode] = useState<'radar' | 'satellite'>('radar');

  // Relative visual positions for pins on Milan grid representation
  const getCoordinatesPos = (spotId: string) => {
    switch (spotId) {
      case 'orso-nero':
        return { top: '35%', left: '72%' };
      case 'terrazza-duomo-apex':
        return { top: '52%', left: '50%' };
      case 'caffe-botanico-brera':
        return { top: '38%', left: '42%' };
      case 'gelateria-luna-milano':
        return { top: '78%', left: '32%' };
      case 'marchesi-1824-galleria':
        return { top: '48%', left: '48%' };
      case 'bar-basso-milan':
        return { top: '30%', left: '80%' };
      default:
        return { top: '50%', left: '50%' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#111111] text-white animate-in fade-in duration-200">
      {/* Map Top Bar */}
      <header className="h-16 px-4 sm:px-6 flex items-center justify-between z-20 bg-[#111111]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            aria-label="Back to feed"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Outfit'] font-bold text-[17px] tracking-tight uppercase">
                Milan Radar Telemetry
              </span>
              <span className="w-2 h-2 rounded-full bg-[#b61a00] animate-ping" />
            </div>
            <div className="text-[11px] text-white/60 font-['Inter']">
              Duomo Sector • {spots.length} checkpoints in {radiusKm}km range
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapMode(mapMode === 'radar' ? 'satellite' : 'radar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-['Inter'] font-semibold hover:bg-white/20"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="capitalize">{mapMode}</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Map Stage */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#0d0f12]">
        {/* Map Grid Background Graphics */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(182,26,0,0.15) 0%, transparent 70%),
              linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* Radar Range Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-[#b61a00]/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/5 pointer-events-none" />

        {/* Sector Landmarks Watermarks */}
        <div className="absolute top-[54%] left-[47%] text-white/30 text-[11px] font-mono tracking-widest pointer-events-none uppercase">
          ✦ DUOMO DI MILANO
        </div>
        <div className="absolute top-[32%] left-[38%] text-white/30 text-[11px] font-mono tracking-widest pointer-events-none uppercase">
          ✦ BRERA
        </div>
        <div className="absolute top-[32%] left-[68%] text-white/30 text-[11px] font-mono tracking-widest pointer-events-none uppercase">
          ✦ PORTA VENEZIA
        </div>
        <div className="absolute top-[75%] left-[25%] text-white/30 text-[11px] font-mono tracking-widest pointer-events-none uppercase">
          ✦ NAVIGLI
        </div>

        {/* User GPS Center Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-[#b61a00]/40 animate-ping" />
            <div className="w-5 h-5 rounded-full bg-[#b61a00] border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-[#ffdad3] border border-[#b61a00]/40">
            YOU ARE HERE
          </span>
        </div>

        {/* Dynamic Route Line from User to Selected Spot */}
        {activeSpot && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1="50%"
              y1="50%"
              x2={getCoordinatesPos(activeSpot.id).left}
              y2={getCoordinatesPos(activeSpot.id).top}
              stroke="#b61a00"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Checkpoint Pins */}
        {spots.map((spot) => {
          const pos = getCoordinatesPos(spot.id);
          const isCurrentActive = activeSpot.id === spot.id;

          return (
            <div
              key={spot.id}
              onClick={() => {
                setActiveSpot(spot);
                onSelectSpot(spot);
              }}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group select-none"
            >
              <div
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isCurrentActive
                    ? 'bg-[#b61a00] text-white shadow-[0_0_20px_rgba(182,26,0,0.8)] scale-110 border-2 border-white'
                    : 'bg-[#1a1c1c]/90 text-white hover:bg-black border border-white/20 hover:scale-105'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isCurrentActive ? 'bg-white' : 'bg-[#ffdad3]'
                  }`}
                />
                <span className="text-[11px] font-['Outfit'] font-bold tracking-tight whitespace-nowrap">
                  {spot.name}
                </span>
                <span className="text-[9px] font-mono text-white/70">
                  {spot.distanceMeters}m
                </span>
              </div>
            </div>
          );
        })}

        {/* Compass & Telemetry Widgets in Corners */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#b61a00] animate-spin" style={{ animationDuration: '12s' }} />
            <span>BEARING 042° NE</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setActiveSpot(spots[0])}
            aria-label="Re-center GPS"
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black text-white active:scale-95"
          >
            <Crosshair className="w-5 h-5 text-[#b61a00]" />
          </button>
        </div>
      </div>

      {/* Floating Active Spot Preview Bottom Sheet */}
      {activeSpot && (
        <div className="p-4 bg-[#1a1c1c] border-t border-white/10 z-30">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <img
              src={activeSpot.imageUrl}
              alt={activeSpot.name}
              className="w-16 h-16 rounded-xl object-cover border border-white/15 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-[#ffb4a5] font-['Inter']">
                  {activeSpot.neighborhood}
                </span>
                <span className="text-white/40 text-[10px]">•</span>
                <span className="flex items-center gap-0.5 text-[11px] text-white font-bold">
                  <Star className="w-3 h-3 text-[#ffb4a5] fill-current" />
                  {activeSpot.rating}
                </span>
              </div>
              <h4 className="font-['Outfit'] font-bold text-[16px] text-white truncate leading-tight mt-0.5">
                {activeSpot.name}
              </h4>
              <p className="text-[11px] text-white/70 truncate mt-0.5">
                ⚡ {activeSpot.distanceLabel} • {activeSpot.tags.slice(0, 2).join(' • ')}
              </p>
            </div>

            <button
              onClick={() => onStartRoute(activeSpot)}
              className="py-2.5 px-4 rounded-full bg-[#b61a00] text-white font-['Inter'] font-bold text-[12px] flex items-center gap-1.5 shadow-[0_4px_14px_rgba(182,26,0,0.5)] active:scale-95 flex-shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 fill-current" />
              <span>Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
