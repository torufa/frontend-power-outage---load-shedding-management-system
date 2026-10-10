import React from 'react';
import { PhoneCall, AlertTriangle, Clock, Radio } from 'lucide-react';

export const EmergencyHotlineCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-rose-950 to-slate-900 border border-rose-500/30 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-2.5 text-rose-400 font-semibold text-sm mb-3">
        <AlertTriangle className="w-5 h-5 animate-pulse" />
        <span>24/7 CRITICAL GRID DISPATCH HOTLINES</span>
      </div>
      
      <p className="text-slate-300 text-sm mb-6">
        For hazardous electrical emergencies (fallen transformers, arcing power lines, or fire risk), call immediately.
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-rose-400" />
            <div>
              <p className="text-xs text-slate-400">Toll-Free Emergency Dispatch</p>
              <p className="font-mono font-bold text-lg text-white">16120 / 999</p>
            </div>
          </div>
          <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded-full font-mono">24/7 LIVE</span>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-xs text-slate-400">National SCADA Grid Center</p>
              <p className="font-mono font-bold text-lg text-white">+880 2 955 6000</p>
            </div>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full font-mono">PRIORITY</span>
        </div>
      </div>
    </div>
  );
};
