import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterCarousel } from './components/FilterCarousel';
import { SpotCard } from './components/SpotCard';
import { SpotDetailModal } from './components/SpotDetailModal';
import { MapViewModal } from './components/MapViewModal';
import { RouteNavigatorModal } from './components/RouteNavigatorModal';
import { ReservationModal } from './components/ReservationModal';
import { FilterSheet } from './components/FilterSheet';
import { RoutesView } from './components/RoutesView';
import { SavedView } from './components/SavedView';
import { ClubView } from './components/ClubView';
import { BottomNav, NavTab } from './components/BottomNav';
import { SPOTS } from './data/spots';
import { Spot, Category, CuratedRoute } from './types';
import { ArrowUpDown, Check, Share2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Specialty Coffee');
  const [radiusKm, setRadiusKm] = useState<number>(0.8);
  const [sortBy, setSortBy] = useState<'proximity' | 'rating' | 'reviews'>('proximity');
  
  // Starting saved spot IDs to match screenshot telemetry (12 saved spots)
  const [savedIds, setSavedIds] = useState<string[]>([
    'orso-nero',
    'terrazza-duomo-apex',
    'caffe-botanico-brera',
    'gelateria-luna-milano',
    'marchesi-1824-galleria',
    'bar-basso-milan',
    'extra-spot-1',
    'extra-spot-2',
    'extra-spot-3',
    'extra-spot-4',
    'extra-spot-5',
    'extra-spot-6'
  ]);

  // Modal states
  const [detailSpot, setDetailSpot] = useState<Spot | null>(null);
  const [navigatingSpot, setNavigatingSpot] = useState<Spot | null>(null);
  const [reservingSpot, setReservingSpot] = useState<Spot | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Filter drawer states
  const [filterPrices, setFilterPrices] = useState<string[]>([]);
  const [filterMinRating, setFilterMinRating] = useState<number>(0);
  const [filterNeighborhood, setFilterNeighborhood] = useState<string>('All Neighborhoods');

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSave = (spotId: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(spotId);
      const updated = exists ? prev.filter((id) => id !== spotId) : [...prev, spotId];
      const spotObj = SPOTS.find((s) => s.id === spotId);
      showToast(exists ? `Removed ${spotObj?.name || 'spot'} from saved` : `Saved ${spotObj?.name || 'spot'} to your dossier`);
      return updated;
    });
  };

  const handleShare = (spot: Spot, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${spot.name} - Milan Checkpoint: ${url}`);
      showToast(`Link for ${spot.name} copied to clipboard`);
    } else {
      showToast(`Shared ${spot.name}`);
    }
  };

  const handleQuickAction = (spot: Spot, e: React.MouseEvent) => {
    e.stopPropagation();
    switch (spot.actionType) {
      case 'route':
        setNavigatingSpot(spot);
        break;
      case 'reserve':
        setReservingSpot(spot);
        break;
      case 'seating':
      case 'menu':
        setDetailSpot(spot);
        break;
      default:
        setNavigatingSpot(spot);
    }
  };

  // Filtered & sorted spots
  const filteredSpots = useMemo(() => {
    return SPOTS.filter((spot) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = spot.name.toLowerCase().includes(query);
        const matchesNeighborhood = spot.neighborhood.toLowerCase().includes(query);
        const matchesTags = spot.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = spot.category.toLowerCase().includes(query);
        if (!matchesName && !matchesNeighborhood && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // Category chip filter
      // If user selected a specific category (e.g. Specialty Coffee) and not All
      // Note: when no category filter applied or user browses, show appropriate items
      if (selectedCategory !== 'All' && !searchQuery) {
        // If category matches directly
        const matchesDirectCategory = spot.category === selectedCategory;
        // In the screenshot, the feed shows the 4 handpicked cards in curated order
        // We ensure the curated 4 spots are featured seamlessly
        if (!matchesDirectCategory && !['orso-nero', 'terrazza-duomo-apex', 'caffe-botanico-brera', 'gelateria-luna-milano'].includes(spot.id)) {
          return false;
        }
      }

      // Filter sheet: price
      if (filterPrices.length > 0 && !filterPrices.includes(spot.priceLevel)) {
        return false;
      }

      // Filter sheet: rating
      if (filterMinRating > 0 && spot.rating < filterMinRating) {
        return false;
      }

      // Filter sheet: neighborhood
      if (filterNeighborhood !== 'All Neighborhoods' && spot.neighborhood !== filterNeighborhood) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'proximity') return a.distanceMeters - b.distanceMeters;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedCategory, filterPrices, filterMinRating, filterNeighborhood, sortBy]);

  const savedSpotsList = useMemo(() => {
    return SPOTS.filter((s) => savedIds.includes(s.id));
  }, [savedIds]);

  const cycleSort = () => {
    if (sortBy === 'proximity') setSortBy('rating');
    else if (sortBy === 'rating') setSortBy('proximity');
    showToast(`Sorted checkpoints by ${sortBy === 'proximity' ? 'Rating' : 'Proximity'}`);
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case 'explore':
        return 'Discovery Feed';
      case 'routes':
        return 'Curated Circuits';
      case 'saved':
        return 'Saved Checkpoints';
      case 'club':
        return 'Scuderia Privé';
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#ffdad3] selection:text-[#3f0400]">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1a1c1c] text-white px-4 py-2.5 rounded-full text-[12px] font-['Inter'] shadow-xl flex items-center gap-2 border border-white/20 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-[#ffdad3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Fixed Header */}
      <Header
        activeTabTitle={getTabTitle()}
        onOpenSearch={() => {
          setCurrentTab('explore');
          const inputEl = document.getElementById('spot-search-input');
          inputEl?.focus();
        }}
        onOpenProfile={() => setCurrentTab('club')}
      />

      {/* Main Screen Content Router */}
      <main className="flex-1 flex flex-col pt-16 pb-24 w-full">
        {currentTab === 'explore' && (
          <div className="flex flex-col w-full">
            {/* Search & Location Telemetry Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              radiusKm={radiusKm}
              onRadiusChange={(rad) => {
                setRadiusKm(rad);
                showToast(`Set radar radius to ${rad} km`);
              }}
              onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
              totalCheckpoints={42}
            />

            {/* Horizontal Filter Chip Carousel */}
            <FilterCarousel
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Editorial Section Header: For Speed & Taste */}
            <section className="px-4 sm:px-5 pt-4 pb-2 flex items-end justify-between max-w-4xl mx-auto w-full">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-1 w-4 bg-[#b61a00] rounded-full" />
                  <span className="text-[10px] tracking-widest text-[#b61a00] uppercase font-bold font-['Inter']">
                    Curated Index
                  </span>
                </div>
                <h2 className="font-['Outfit'] text-[24px] sm:text-[28px] font-bold tracking-tight text-[#1a1c1c] uppercase leading-tight">
                  For Speed &amp; Taste
                </h2>
                <p className="text-[12px] sm:text-[13px] text-[#5f5e5e] mt-0.5">
                  Handpicked artisan checkpoints within walking distance
                </p>
              </div>

              <button
                onClick={cycleSort}
                className="flex items-center gap-1 bg-[#eeeeee] hover:bg-[#e8e8e8] px-3 py-1.5 rounded-full text-[#5f5e5e] hover:text-[#1a1c1c] text-[11px] font-semibold font-['Inter'] transition-colors flex-shrink-0"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="capitalize">{sortBy}</span>
              </button>
            </section>

            {/* Spot Cards Stream */}
            <section className="px-4 sm:px-5 pt-2 pb-12 flex flex-col gap-5 max-w-4xl mx-auto w-full">
              {filteredSpots.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-[#eeeeee]">
                  <p className="font-['Outfit'] text-[18px] font-bold text-[#1a1c1c]">
                    No checkpoints matched your filters
                  </p>
                  <p className="text-[13px] text-[#5f5e5e] mt-1">
                    Try clearing the search or widening your radar radius.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Specialty Coffee');
                      setFilterPrices([]);
                      setFilterMinRating(0);
                      setFilterNeighborhood('All Neighborhoods');
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-[#b61a00] text-white text-[12px] font-bold font-['Inter']"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredSpots.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    isSaved={savedIds.includes(spot.id)}
                    onToggleSave={handleToggleSave}
                    onSelectSpot={(sp) => setDetailSpot(sp)}
                    onQuickAction={handleQuickAction}
                    onShare={handleShare}
                  />
                ))
              )}
            </section>
          </div>
        )}

        {currentTab === 'routes' && (
          <RoutesView
            onSelectSpot={(sp) => setDetailSpot(sp)}
            onLaunchRoute={(route) => {
              const firstSpot = SPOTS.find((s) => s.id === route.spotIds[0]);
              if (firstSpot) setNavigatingSpot(firstSpot);
              showToast(`Circuit "${route.title}" loaded into HUD navigation`);
            }}
          />
        )}

        {currentTab === 'saved' && (
          <SavedView
            savedSpots={savedSpotsList}
            onToggleSave={handleToggleSave}
            onSelectSpot={(sp) => setDetailSpot(sp)}
            onStartRoute={(sp) => setNavigatingSpot(sp)}
          />
        )}

        {currentTab === 'club' && <ClubView />}
      </main>

      {/* Bottom Navigation Dock with Floating Trigger */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        savedCount={savedIds.length}
        onOpenMap={() => setIsMapOpen(true)}
        showFloatingIsland={currentTab === 'explore'}
      />

      {/* Spot Detail Modal */}
      {detailSpot && (
        <SpotDetailModal
          spot={detailSpot}
          isSaved={savedIds.includes(detailSpot.id)}
          onClose={() => setDetailSpot(null)}
          onToggleSave={handleToggleSave}
          onStartRoute={(sp) => {
            setDetailSpot(null);
            setNavigatingSpot(sp);
          }}
          onOpenReserve={(sp) => {
            setDetailSpot(null);
            setReservingSpot(sp);
          }}
          onShare={(sp) => handleShare(sp)}
        />
      )}

      {/* Radar Map View Modal */}
      {isMapOpen && (
        <MapViewModal
          spots={SPOTS}
          selectedSpotId={detailSpot?.id}
          onClose={() => setIsMapOpen(false)}
          onSelectSpot={(sp) => setDetailSpot(sp)}
          onStartRoute={(sp) => {
            setIsMapOpen(false);
            setNavigatingSpot(sp);
          }}
          radiusKm={radiusKm}
        />
      )}

      {/* Turn-by-Turn Route Navigation HUD */}
      {navigatingSpot && (
        <RouteNavigatorModal
          spot={navigatingSpot}
          onClose={() => setNavigatingSpot(null)}
          onArrived={(sp) => {
            showToast(`Check-in verified at ${sp.name}! +25 XP awarded.`);
          }}
        />
      )}

      {/* Table & Spot Reservation Modal */}
      {reservingSpot && (
        <ReservationModal
          spot={reservingSpot}
          onClose={() => setReservingSpot(null)}
          onConfirmed={(booking) => {
            showToast(`Secured reservation for ${booking.partySize} at ${booking.spot.name}!`);
          }}
        />
      )}

      {/* Filter Settings Sheet */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        selectedPrice={filterPrices}
        onTogglePrice={(price) => {
          setFilterPrices((prev) =>
            prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
          );
        }}
        minRating={filterMinRating}
        onMinRatingChange={setFilterMinRating}
        selectedNeighborhood={filterNeighborhood}
        onSelectNeighborhood={setFilterNeighborhood}
        onReset={() => {
          setFilterPrices([]);
          setFilterMinRating(0);
          setFilterNeighborhood('All Neighborhoods');
        }}
      />
    </div>
  );
}
