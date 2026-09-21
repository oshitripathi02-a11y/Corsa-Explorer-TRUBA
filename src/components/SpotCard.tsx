import React from 'react';
import { Bookmark, Star, Zap, Navigation, Calendar, Armchair, UtensilsCrossed, Share2 } from 'lucide-react';
import { Spot } from '../types';

interface SpotCardProps {
  spot: Spot;
  isSaved: boolean;
  onToggleSave: (spotId: string) => void;
  onSelectSpot: (spot: Spot) => void;
  onQuickAction: (spot: Spot, e: React.MouseEvent) => void;
  onShare: (spot: Spot, e: React.MouseEvent) => void;
}

export const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  isSaved,
  onToggleSave,
  onSelectSpot,
  onQuickAction,
  onShare,
}) => {
  const getActionIcon = () => {
    switch (spot.actionType) {
      case 'route':
        return <Navigation className="w-4 h-4 fill-current" />;
      case 'reserve':
        return <Calendar className="w-4 h-4" />;
      case 'seating':
        return <Armchair className="w-4 h-4" />;
      case 'menu':
        return <UtensilsCrossed className="w-4 h-4" />;
      default:
        return <Navigation className="w-4 h-4 fill-current" />;
    }
  };

  return (
    <article
      id={`spot-card-${spot.id}`}
      onClick={() => onSelectSpot(spot)}
      className="w-full bg-[#ffffff] rounded-2xl overflow-hidden border border-[#eeeeee] shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
    >
      {/* Media Aspect Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#e8e8e8]">
        <img
          src={spot.imageUrl}
          alt={spot.altText || spot.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#b61a00] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm font-['Inter']">
            {spot.categoryLabel}
          </span>
        </div>

        {/* Bookmark Trigger */}
        <button
          id={`bookmark-btn-${spot.id}`}
          type="button"
          aria-label={`Bookmark ${spot.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(spot.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#1a1c1c] active:scale-90 transition-transform shadow-sm"
        >
          <Bookmark
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'text-[#b61a00] fill-[#b61a00]' : 'text-[#1a1c1c]'
            }`}
          />
        </button>

        {/* Image Bottom Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-shadow font-['Inter']">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Star className="w-3.5 h-3.5 text-[#ffb4a5] fill-[#ffb4a5]" />
            <span className="text-[12px] font-bold">{spot.rating.toFixed(1)}</span>
            <span className="text-[11px] text-white/80 font-['Plus_Jakarta_Sans']">
              ({spot.reviewCount})
            </span>
          </div>

          <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Zap className="w-3 h-3 text-[#ffdad3] fill-[#ffdad3]" />
            {spot.distanceLabel}
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-4.5 flex flex-col gap-3">
        {/* Title & Neighborhood */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-['Outfit'] text-[18px] text-[#1a1c1c] font-bold tracking-tight leading-snug group-hover:text-[#b61a00] transition-colors">
            {spot.name}
          </h3>
          <span className="text-[10px] font-['Inter'] text-[#b61a00] font-bold uppercase tracking-wider flex-shrink-0">
            {spot.neighborhood}
          </span>
        </div>

        {/* Characteristic Tags */}
        <div className="flex flex-wrap gap-1.5 font-['Inter']">
          {spot.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                idx === 0
                  ? 'bg-[#b61a00]/10 text-[#b61a00] font-bold'
                  : 'bg-[#eeeeee] text-[#5f5e5e] font-medium'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Insider Tip Box with Red Leading Accent */}
        <div className="flex items-start gap-2.5 bg-[#f3f3f3] p-2.5 rounded-xl border border-[#eeeeee]/60">
          <span className="w-1 self-stretch bg-[#b61a00] rounded-full flex-shrink-0" />
          <p className="text-[12px] text-[#1a1c1c] font-['Plus_Jakarta_Sans'] leading-relaxed">
            <strong className="text-[#b61a00] font-semibold">Tip: </strong>
            {spot.insiderTip}
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 pt-1">
          <button
            id={`primary-action-${spot.id}`}
            type="button"
            onClick={(e) => onQuickAction(spot, e)}
            className={`flex-1 py-2.5 px-4 rounded-full text-[14px] text-center font-bold tracking-wide font-['Inter'] shadow-[0_4px_12px_rgba(182,26,0,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              spot.actionType === 'seating'
                ? 'bg-[#1a1c1c] text-white hover:bg-black'
                : 'bg-[#b61a00] text-white hover:bg-[#991600]'
            }`}
          >
            {getActionIcon()}
            <span>{spot.primaryActionLabel}</span>
          </button>

          <button
            id={`share-btn-${spot.id}`}
            type="button"
            aria-label={`Share ${spot.name}`}
            onClick={(e) => onShare(spot, e)}
            className="w-10 h-10 rounded-full bg-[#eeeeee] flex items-center justify-center text-[#1a1c1c] hover:bg-[#e8e8e8] active:scale-95 transition-all flex-shrink-0"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
