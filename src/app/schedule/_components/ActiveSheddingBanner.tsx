import React from 'react';
import { LoadSheddingSchedule } from '@/src/types';

interface ActiveSheddingBannerProps {
  activeShedding: LoadSheddingSchedule[];
}

export const ActiveSheddingBanner: React.FC<ActiveSheddingBannerProps> = ({ activeShedding }) => {
  if (activeShedding.length === 0) return null;

  return (
    <div className="p-5 rounded-3xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/30 backdrop-blur-md">
      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <span>Currently Active Load Shedding Rotations ({activeShedding.length} Feeders Isolated)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeShedding.map(item => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-500/20 flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block">
                {item.startTime} - {item.endTime} ({item.zone})
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                {item.feederName}
              </span>
              <span className="text-xs text-slate-500">{item.area}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block">
                -{item.expectedReliefMW} MW
              </span>
              <span className="text-[10px] text-slate-400">relieved</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
