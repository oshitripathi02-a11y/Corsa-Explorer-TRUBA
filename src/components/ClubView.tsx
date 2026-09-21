import React, { useState } from 'react';
import { ShieldCheck, Zap, Award, Sparkles, Send, Check, Download, Lock } from 'lucide-react';

export const ClubView: React.FC = () => {
  const [conciergeMsg, setConciergeMsg] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'concierge'; text: string; time: string }>>([
    {
      sender: 'concierge',
      text: 'Benvenuto to Corsa Scuderia. I am your Milan private desk. Need a hidden terrace table or roaster cupping access?',
      time: '10:05 AM',
    },
  ]);
  const [gpxDownloaded, setGpxDownloaded] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeMsg.trim()) return;

    const userText = conciergeMsg.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setConciergeMsg('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: `Request logged for "${userText}". Our Milan Duomo liaison is securing your priority access. A confirmation pass has been added to your dossier.`,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 pt-3 pb-28 flex flex-col gap-6 font-['Plus_Jakarta_Sans']">
      {/* Editorial Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 bg-[#b61a00] rounded-full" />
          <span className="text-[10px] tracking-widest text-[#b61a00] uppercase font-bold font-['Inter']">
            Scuderia Privé
          </span>
        </div>
        <h2 className="font-['Outfit'] text-[26px] tracking-tight text-[#1a1c1c] uppercase font-bold">
          Member Concierge
        </h2>
        <p className="text-[13px] text-[#5f5e5e]">
          Exclusive insider perks, secret barista passwords, and dedicated urban exploration telemetry.
        </p>
      </div>

      {/* Scuderia VIP Digital Pass Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1b1b] via-[#111111] to-[#2a0802] p-6 text-white border border-[#b61a00]/30 shadow-2xl">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#b61a00]/20 blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#b61a00] flex items-center justify-center font-bold text-white shadow-[0_2px_10px_rgba(182,26,0,0.5)]">
              C
            </div>
            <div>
              <div className="text-[14px] font-['Outfit'] font-bold tracking-wider uppercase">
                CORSA SCUDERIA
              </div>
              <div className="text-[10px] text-[#ffdad3] font-['Inter'] font-semibold tracking-widest uppercase">
                MILAN ZONE 1 PASS
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#b61a00]/30 border border-[#b61a00]/50 text-[#ffdad3] text-[10px] font-bold tracking-wider uppercase font-['Inter']">
            TIER 2 • ORO
          </span>
        </div>

        <div className="flex items-end justify-between font-mono pt-2">
          <div>
            <div className="text-[10px] text-white/50 tracking-wider uppercase">MEMBER ID</div>
            <div className="text-[15px] font-bold text-white tracking-widest">
              CS-MIL-84920
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/50 tracking-wider uppercase">VALID THROUGH</div>
            <div className="text-[13px] text-[#ffdad3]">DEC 2026</div>
          </div>
        </div>

        {/* Telemetry quick metrics */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-['Inter']">
          <div>
            <div className="text-[18px] font-['Outfit'] font-bold text-white">42</div>
            <div className="text-[10px] text-white/60 uppercase">Checkpoints</div>
          </div>
          <div>
            <div className="text-[18px] font-['Outfit'] font-bold text-[#ffdad3]">18.4 km</div>
            <div className="text-[10px] text-white/60 uppercase">Distance</div>
          </div>
          <div>
            <div className="text-[18px] font-['Outfit'] font-bold text-white">98/100</div>
            <div className="text-[10px] text-white/60 uppercase">Speed Index</div>
          </div>
        </div>
      </div>

      {/* Secret Insider Passwords Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eeeeee] shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#b61a00]" />
          <h3 className="font-['Outfit'] font-bold text-[17px] text-[#1a1c1c]">
            Active Secret Passwords & Perks
          </h3>
        </div>
        <div className="flex flex-col gap-2 font-['Inter'] text-[12px]">
          <div className="p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee] flex items-start gap-3">
            <span className="w-1.5 self-stretch bg-[#b61a00] rounded-full flex-shrink-0" />
            <div>
              <div className="font-bold text-[#1a1c1c]">Orso Nero Roasters: Secret Batch</div>
              <div className="text-[#5f5e5e] mt-0.5">
                Quote pass-phrase <span className="font-mono text-[#b61a00] font-bold">"CORSA VELOCE"</span> to unlock off-menu competition Geisha single origins.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#f9f9f9] border border-[#eeeeee] flex items-start gap-3">
            <span className="w-1.5 self-stretch bg-[#b61a00] rounded-full flex-shrink-0" />
            <div>
              <div className="font-bold text-[#1a1c1c]">Terrazza Duomo Apex: Spire High-Top Priority</div>
              <div className="text-[#5f5e5e] mt-0.5">
                Guaranteed window table hold during sunset aperitivo window (18:30 - 20:00) with Scuderia digital pass.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Concierge Interactive Dispatch */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eeeeee] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#b61a00]" />
            <h3 className="font-['Outfit'] font-bold text-[17px] text-[#1a1c1c]">
              Milan Private Concierge Desk
            </h3>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-['Inter']">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Online
          </span>
        </div>

        {/* Chat History Box */}
        <div className="bg-[#f9f9f9] rounded-xl p-3.5 flex flex-col gap-2.5 max-h-52 overflow-y-auto border border-[#eeeeee]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed font-['Plus_Jakarta_Sans'] ${
                  m.sender === 'user'
                    ? 'bg-[#b61a00] text-white rounded-br-none'
                    : 'bg-white text-[#1a1c1c] border border-[#eeeeee] rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#888888] px-1 mt-0.5 font-['Inter']">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={conciergeMsg}
            onChange={(e) => setConciergeMsg(e.target.value)}
            placeholder="Ask concierge for table holds, cupping events..."
            className="flex-1 bg-[#f3f3f3] border border-[#eeeeee] rounded-full px-4 py-2.5 text-[13px] text-[#1a1c1c] placeholder:text-[#5f5e5e] focus:outline-none focus:border-[#b61a00] font-['Plus_Jakarta_Sans']"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-[#b61a00] text-white flex items-center justify-center hover:bg-[#991600] active:scale-95 transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Offline GPX Trails Package */}
      <div className="p-4 rounded-2xl bg-[#f9f9f9] border border-[#eeeeee] flex items-center justify-between gap-3">
        <div>
          <div className="font-['Outfit'] font-bold text-[15px] text-[#1a1c1c]">
            Download Milan Zone 1 GPX Package
          </div>
          <div className="text-[12px] text-[#5f5e5e] font-['Plus_Jakarta_Sans']">
            Offline turn-by-turn waypoints for Garmin, Apple Watch, and Komoot.
          </div>
        </div>
        <button
          onClick={() => {
            setGpxDownloaded(true);
            setTimeout(() => setGpxDownloaded(false), 3000);
          }}
          className="py-2 px-3.5 rounded-full bg-[#1a1c1c] text-white font-['Inter'] font-bold text-[12px] flex items-center gap-1.5 hover:bg-black active:scale-95 transition-all flex-shrink-0"
        >
          {gpxDownloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
          <span>{gpxDownloaded ? 'Downloaded' : 'GPX Pack'}</span>
        </button>
      </div>
    </div>
  );
};
