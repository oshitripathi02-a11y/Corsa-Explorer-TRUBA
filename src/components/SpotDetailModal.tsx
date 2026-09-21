import React, { useState } from 'react';
import { 
  X, Bookmark, Star, Zap, Navigation, Clock, MapPin, 
  Wifi, Volume2, Plug, Users, Calendar, Share2, Check, ArrowRight
} from 'lucide-react';
import { Spot } from '../types';

interface SpotDetailModalProps {
  spot: Spot | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (spotId: string) => void;
  onStartRoute: (spot: Spot) => void;
  onOpenReserve: (spot: Spot) => void;
  onShare: (spot: Spot) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  isSaved,
  onClose,
  onToggleSave,
  onStartRoute,
  onOpenReserve,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'telemetry'>('overview');
  const [orderToast, setOrderToast] = useState<string | null>(null);

  if (!spot) return null;

  const handleTasteOrder = (itemName: string) => {
    setOrderToast(`Added "${itemName}" to your tasting checklist`);
    setTimeout(() => setOrderToast(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#eeeeee] relative animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast feedback */}
        {orderToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1a1c1c] text-white px-4 py-2 rounded-full text-[12px] font-['Inter'] shadow-lg flex items-center gap-2 border border-white/20">
            <Check className="w-4 h-4 text-[#b61a00]" />
            <span>{orderToast}</span>
          </div>
        )}

        {/* Hero Media Header */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-neutral-900 flex-shrink-0">
          <img
            src={spot.imageUrl}
            alt={spot.altText || spot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              id="modal-close-btn"
              onClick={onClose}
              aria-label="Close details"
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                id="modal-share-btn"
                onClick={() => onShare(spot)}
                aria-label="Share spot"
                className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                id="modal-bookmark-btn"
                onClick={() => onToggleSave(spot.id)}
                aria-label="Bookmark spot"
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1a1c1c] flex items-center justify-center hover:bg-white transition-colors"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isSaved ? 'text-[#b61a00] fill-[#b61a00]' : 'text-[#1a1c1c]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Hero Bottom Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#b61a00] text-white text-[10px] font-bold uppercase tracking-wider font-['Inter']">
                {spot.categoryLabel}
              </span>
              <span className="text-[11px] font-['Inter'] font-semibold text-white/90 uppercase tracking-wide">
                📍 {spot.neighborhood}
              </span>
            </div>
            <h2 className="font-['Outfit'] text-[24px] font-bold tracking-tight text-white leading-tight">
              {spot.name}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-[12px] font-['Inter']">
              <div className="flex items-center gap-1 text-[#ffb4a5]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-white">{spot.rating}</span>
                <span className="text-white/70">({spot.reviewCount})</span>
              </div>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1 text-white/90 font-bold">
                <Zap className="w-3.5 h-3.5 text-[#ffdad3] fill-current" />
                {spot.distanceLabel} ({spot.walkingMinutes} min walk)
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#eeeeee] bg-[#f9f9f9] px-4 font-['Inter'] text-[13px] font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#b61a00] text-[#b61a00]'
                : 'border-transparent text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            Overview & Tips
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'menu'
                ? 'border-[#b61a00] text-[#b61a00]'
                : 'border-transparent text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            Signature Menu ({spot.menuHighlights.length})
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'telemetry'
                ? 'border-[#b61a00] text-[#b61a00]'
                : 'border-transparent text-[#5f5e5e] hover:text-[#1a1c1c]'
            }`}
          >
            Acoustics & Data
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar flex flex-col gap-4 text-[#1a1c1c] font-['Plus_Jakarta_Sans']">
          {activeTab === 'overview' && (
            <>
              {/* Insider Tip Highlight */}
              <div className="flex items-start gap-3 bg-[#f3f3f3] p-3 rounded-xl border border-[#eeeeee]">
                <span className="w-1.5 self-stretch bg-[#b61a00] rounded-full flex-shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#b61a00] font-bold font-['Inter'] mb-0.5">
                    Curated Insider Tip
                  </div>
                  <p className="text-[13px] leading-relaxed text-[#1a1c1c]">
                    {spot.insiderTip}
                  </p>
                </div>
              </div>

              {/* Bio & Story */}
              <div>
                <h4 className="text-[12px] uppercase font-bold text-[#5f5e5e] tracking-wider font-['Inter'] mb-1">
                  About Checkpoint
                </h4>
                <p className="text-[14px] leading-relaxed text-[#333333]">
                  {spot.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 font-['Inter']">
                {spot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#f3f3f3] text-[#1a1c1c] text-[11px] font-semibold rounded-full border border-[#eeeeee]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Address & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[13px] font-['Inter']">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee]">
                  <MapPin className="w-4 h-4 text-[#b61a00] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#5f5e5e] uppercase font-bold">Address</div>
                    <div className="text-[#1a1c1c] font-medium">{spot.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee]">
                  <Clock className="w-4 h-4 text-[#b61a00] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#5f5e5e] uppercase font-bold">Service Hours</div>
                    <div className="text-[#1a1c1c] font-medium">{spot.openHours}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'menu' && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#5f5e5e] font-bold font-['Inter']">
                <span>Selected Artisanal Offerings</span>
                <span>EUR (€)</span>
              </div>
              {spot.menuHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[#eeeeee] bg-[#fdfdfd] hover:border-[#b61a00]/30 transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[14px] text-[#1a1c1c] font-['Plus_Jakarta_Sans']">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#b61a00]/10 text-[#b61a00] font-['Inter']">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#5f5e5e] mt-0.5 font-['Plus_Jakarta_Sans']">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="font-['Outfit'] font-bold text-[14px] text-[#b61a00]">
                      {item.price}
                    </span>
                    <button
                      onClick={() => handleTasteOrder(item.name)}
                      className="text-[10px] uppercase font-bold tracking-wider text-[#b61a00] hover:underline font-['Inter']"
                    >
                      + Save Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="flex flex-col gap-3">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee]">
                  <div className="flex items-center gap-1.5 text-[#5f5e5e] text-[11px] font-bold font-['Inter'] uppercase mb-1">
                    <Wifi className="w-3.5 h-3.5 text-[#b61a00]" />
                    <span>Wi-Fi Infrastructure</span>
                  </div>
                  <div className="font-['Outfit'] text-[16px] font-bold text-[#1a1c1c]">
                    {spot.wifiSpeed || '100 Mbps standard'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee]">
                  <div className="flex items-center gap-1.5 text-[#5f5e5e] text-[11px] font-bold font-['Inter'] uppercase mb-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#b61a00]" />
                    <span>Acoustic Profile</span>
                  </div>
                  <div className="font-['Outfit'] text-[16px] font-bold text-[#1a1c1c]">
                    {spot.noiseLevel || '45 dB (Ambient)'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee]">
                  <div className="flex items-center gap-1.5 text-[#5f5e5e] text-[11px] font-bold font-['Inter'] uppercase mb-1">
                    <Plug className="w-3.5 h-3.5 text-[#b61a00]" />
                    <span>Power Availability</span>
                  </div>
                  <div className="text-[12px] font-semibold text-[#1a1c1c]">
                    {spot.powerOutlets || 'Wall plugs available'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee]">
                  <div className="flex items-center gap-1.5 text-[#5f5e5e] text-[11px] font-bold font-['Inter'] uppercase mb-1">
                    <Users className="w-3.5 h-3.5 text-[#b61a00]" />
                    <span>Live Occupancy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-['Outfit'] text-[15px] font-bold text-[#1a1c1c]">
                      {spot.crowdLevel} ({spot.crowdPercentage}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* GPS Coordinates */}
              <div className="p-3 rounded-xl bg-[#1a1c1c] text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-white/60 uppercase font-bold tracking-wider font-['Inter']">
                    GPS Sector Fix
                  </div>
                  <div className="font-mono text-[12px] text-white/90">
                    {spot.coordinates.lat.toFixed(4)}° N, {spot.coordinates.lng.toFixed(4)}° E
                  </div>
                </div>
                <span className="text-[11px] font-['Inter'] font-bold text-[#ffb4a5] uppercase">
                  Milan Zone 1
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-4 bg-white border-t border-[#eeeeee] flex items-center gap-3">
          {spot.tableReservationsAvailable ? (
            <button
              onClick={() => onOpenReserve(spot)}
              className="flex-1 py-3 px-4 rounded-full bg-[#1a1c1c] text-white font-['Inter'] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#ffb4a5]" />
              <span>Reserve Table / Spot</span>
            </button>
          ) : null}

          <button
            onClick={() => onStartRoute(spot)}
            className="flex-1 py-3 px-4 rounded-full bg-[#b61a00] text-white font-['Inter'] font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(182,26,0,0.35)] hover:bg-[#991600] transition-all active:scale-[0.98]"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Launch Quick Route</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
