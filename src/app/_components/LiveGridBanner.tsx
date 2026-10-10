import React from 'react';
import { Activity, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GridMetrics } from '@/src/types';

interface LiveGridBannerProps {
  metrics: GridMetrics;
}

export const LiveGridBanner: React.FC<LiveGridBannerProps> = ({ metrics }) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2.5 px-4 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">NATIONAL SCADA TELEMETRY:</span>
          <span className="text-emerald-400">ACTIVE FEED LIVE</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Demand: <strong className="text-white">{metrics.totalDemandMW} MW</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Supply: <strong className="text-white">{metrics.totalSupplyMW} MW</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Deficit: <strong className="text-rose-400">{metrics.loadSheddingDeficitMW} MW</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Freq: <strong className="text-emerald-400">{metrics.gridFrequencyHz} Hz</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
