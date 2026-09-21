import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { Spot } from '../types';

interface ReservationModalProps {
  spot: Spot;
  onClose: () => void;
  onConfirmed: (booking: { spot: Spot; date: string; time: string; partySize: number; table: string }) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  spot,
  onClose,
  onConfirmed,
}) => {
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState('Today, Sunset');
  const [selectedTime, setSelectedTime] = useState('19:15');
  const [selectedTable, setSelectedTable] = useState('Table 14 - Unobstructed Duomo Spire View');
  const [confirmed, setConfirmed] = useState(false);

  const times = ['18:00', '18:45 (Golden Hour)', '19:15', '20:00', '21:00'];
  const tables = [
    'Table 14 - Unobstructed Duomo Spire View',
    'Table 08 - Front Terrace Marble High-Top',
    'Table 02 - Cozy Lounge Sofa Under Bougainvillea'
  ];

  const handleBooking = () => {
    setConfirmed(true);
    setTimeout(() => {
      onConfirmed({
        spot,
        date: selectedDate,
        time: selectedTime,
        partySize,
        table: selectedTable,
      });
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#eeeeee] relative animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eeeeee] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#b61a00]/10 flex items-center justify-center text-[#b61a00]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Outfit'] font-bold text-[18px] text-[#1a1c1c] leading-none">
                Reserve Spot / Table
              </h3>
              <p className="text-[11px] text-[#5f5e5e] font-['Inter'] mt-0.5">
                {spot.name} • {spot.neighborhood}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close reservation"
            className="w-8 h-8 rounded-full hover:bg-[#f3f3f3] flex items-center justify-center text-[#5f5e5e]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Outfit'] font-bold text-[20px] text-[#1a1c1c]">
              Reservation Confirmed!
            </h4>
            <p className="text-[13px] text-[#5f5e5e] mt-1 max-w-xs font-['Plus_Jakarta_Sans']">
              Your table for {partySize} at {spot.name} has been secured for {selectedTime}.
            </p>
            <div className="mt-4 px-3 py-1.5 rounded-full bg-[#b61a00]/10 text-[#b61a00] font-['Inter'] text-[11px] font-bold">
              VIP Code: CORSA-DUOMO-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 flex flex-col gap-4 font-['Plus_Jakarta_Sans'] text-[#1a1c1c]">
            {/* Party Size */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] mb-1.5">
                Guests / Party Size
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPartySize(num)}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-['Inter'] font-semibold transition-all ${
                      partySize === num
                        ? 'bg-[#b61a00] text-white shadow-sm'
                        : 'bg-[#f3f3f3] text-[#1a1c1c] hover:bg-[#eeeeee]'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] mb-1.5">
                Select Time Slot (Duomo Golden Hour)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-2.5 rounded-xl text-[12px] font-['Inter'] font-semibold border transition-all text-center ${
                      selectedTime === time
                        ? 'bg-[#1a1c1c] text-white border-[#1a1c1c] shadow-sm'
                        : 'bg-white text-[#1a1c1c] border-[#eeeeee] hover:bg-[#f9f9f9]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Preference */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5f5e5e] font-['Inter'] mb-1.5">
                Table Seating Preference
              </label>
              <div className="flex flex-col gap-1.5">
                {tables.map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    className={`p-2.5 rounded-xl text-left text-[12px] font-['Inter'] border transition-all flex items-center justify-between ${
                      selectedTable === tbl
                        ? 'border-[#b61a00] bg-[#b61a00]/5 text-[#b61a00] font-bold'
                        : 'border-[#eeeeee] bg-[#f9f9f9] text-[#333333] hover:bg-white'
                    }`}
                  >
                    <span>{tbl}</span>
                    {selectedTable === tbl && <Sparkles className="w-3.5 h-3.5 text-[#b61a00]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                onClick={handleBooking}
                className="w-full py-3 px-4 rounded-full bg-[#b61a00] text-white font-['Inter'] font-bold text-[14px] shadow-[0_4px_16px_rgba(182,26,0,0.35)] hover:bg-[#991600] active:scale-[0.98] transition-all"
              >
                Confirm Table Reservation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
