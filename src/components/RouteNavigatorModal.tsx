import React, { useState, useEffect } from 'react';
import { X, Navigation, Compass, CheckCircle2, Volume2, VolumeX, Flame } from 'lucide-react';
import { Spot } from '../types';

interface RouteNavigatorModalProps {
  spot: Spot;
  onClose: () => void;
  onArrived: (spot: Spot) => void;
}

export const RouteNavigatorModal: React.FC<RouteNavigatorModalProps> = ({
  spot,
  onClose,
  onArrived,
}) => {
  const [distanceRemaining, setDistanceRemaining] = useState(spot.distanceMeters);
  const [stepIndex, setStepIndex] = useState(0);
  const [voiceGuide, setVoiceGuide] = useState(true);
  const [arrived, setArrived] = useState(false);

  const steps = [
    { instruction: 'Head northeast on Via Silvio Pellico toward Piazza del Duomo', distance: 60, icon: 'straight' },
    { instruction: 'Turn slight right onto Galleria Vittorio Emanuele II passage', distance: 70, icon: 'right' },
    { instruction: `Arrive at checkpoint: ${spot.name} (${spot.neighborhood})`, distance: 0, icon: 'destination' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDistanceRemaining((prev) => {
        if (prev <= 20) {
          clearInterval(timer);
          setArrived(true);
          return 0;
        }
        if (prev <= 80 && stepIndex === 0) setStepIndex(1);
        if (prev <= 30 && stepIndex === 1) setStepIndex(2);
        return Math.max(0, prev - 15);
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [stepIndex]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#111111] text-white animate-in slide-in-from-bottom duration-300">
      {/* Navigation HUD Header */}
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 bg-[#161616]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#b61a00] animate-pulse" />
          <span className="font-['Outfit'] font-bold text-[16px] tracking-tight uppercase">
            CORSA TELEMETRY NAV
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceGuide(!voiceGuide)}
            aria-label="Toggle voice guidance"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          >
            {voiceGuide ? <Volume2 className="w-4 h-4 text-[#ffdad3]" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Exit navigation"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Guidance Banner */}
      <div className="bg-[#b61a00] text-white p-5 sm:p-6 shadow-xl flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
          <Navigation className="w-7 h-7 text-white fill-white rotate-45" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] uppercase font-bold tracking-wider font-['Inter'] text-white/80">
            {arrived ? 'Destination Reached' : `Next Turn in ${Math.min(distanceRemaining, 50)}m`}
          </div>
          <div className="font-['Outfit'] font-bold text-[18px] sm:text-[20px] leading-tight mt-0.5">
            {steps[stepIndex]?.instruction}
          </div>
        </div>
      </div>

      {/* Live Route Visualizer Canvas */}
      <div className="flex-1 relative overflow-hidden bg-[#0e1013] flex flex-col items-center justify-center p-6">
        {/* Radar concentric circles */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-[#b61a00]/30 animate-pulse" />

        {/* Dynamic Nav Compass */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Compass className="w-24 h-24 text-[#b61a00] animate-spin" style={{ animationDuration: '16s' }} />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-white">
              042°
            </div>
          </div>

          <div className="font-['Outfit'] font-extrabold text-[44px] sm:text-[52px] leading-none text-white tracking-tight">
            {distanceRemaining}m
          </div>
          <div className="text-[14px] text-white/70 font-['Inter'] mt-1">
            Approx. {Math.ceil(distanceRemaining / 80)} min walking pace
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="w-full max-w-xs mt-6 bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#b61a00] h-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(5, 100 - (distanceRemaining / spot.distanceMeters) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Target Destination Drawer */}
      <div className="bg-[#181818] border-t border-white/10 p-4 sm:p-5">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              src={spot.imageUrl}
              alt={spot.name}
              className="w-12 h-12 rounded-xl object-cover border border-white/15"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-bold text-[#ffdad3] font-['Inter']">
                Target Checkpoint
              </div>
              <h4 className="font-['Outfit'] font-bold text-[16px] text-white truncate">
                {spot.name}
              </h4>
              <p className="text-[11px] text-white/60 truncate font-['Plus_Jakarta_Sans']">
                {spot.address}
              </p>
            </div>
          </div>

          {/* Prompt Tip Reminder */}
          <div className="bg-black/40 border border-white/10 p-2.5 rounded-xl flex items-start gap-2 text-[12px] text-white/90">
            <Flame className="w-4 h-4 text-[#b61a00] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#ffdad3]">Insider Order Tip:</strong> {spot.insiderTip}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                onArrived(spot);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-full bg-[#b61a00] text-white font-['Inter'] font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(182,26,0,0.4)] active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{arrived ? 'Check In to Checkpoint (+25 XP)' : 'Mark as Arrived'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
