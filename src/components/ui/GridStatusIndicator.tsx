import React from 'react';
import { Zap, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GridMetrics } from '../../types';

interface GridStatusIndicatorProps {
  metrics: GridMetrics;
  compact?: boolean;
}

export const GridStatusIndicator: React.FC<GridStatusIndicatorProps> = ({ metrics, compact = false }) => {
  const isOptimal = metrics.gridStabilityIndex >= 90;
  const isStressed = metrics.sheddingDeficitMW > 0;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Grid Frequency: {metrics.gridFrequencyHz.toFixed(2)} Hz</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-6 py-2 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isStressed ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isStressed ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
        </span>
        <div className="text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
            {isStressed ? 'Rotational Load Shedding Active' : 'National Grid Synchronized'}
          </span>
          <span className="text-slate-400 text-[11px]">
            {metrics.gridFrequencyHz.toFixed(2)} Hz • {metrics.gridStabilityIndex}% Stability
          </span>
        </div>
      </div>

      <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Demand / Supply</span>
          <span className="font-mono font-semibold">{metrics.currentDemandMW} MW / {metrics.currentGenerationMW} MW</span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Deficit</span>
          <span className={`font-mono font-semibold ${metrics.sheddingDeficitMW > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
            {metrics.sheddingDeficitMW > 0 ? `-${metrics.sheddingDeficitMW} MW` : '0 MW'}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Outages</span>
          <span className="font-mono font-semibold text-rose-500">{metrics.activeOutagesCount} Incidents</span>
        </div>
      </div>
    </div>
  );
};
