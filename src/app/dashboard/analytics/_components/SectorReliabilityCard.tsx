import React from 'react';
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react';

interface SectorReliabilityProps {
  sectors?: { name: string; reliability: number; deficit: number; customers: number }[];
}

export const SectorReliabilityCard: React.FC<SectorReliabilityProps> = ({ sectors }) => {
  const defaultSectors = sectors || [
    { name: 'Gulshan / Banani Zone', reliability: 98.4, deficit: 8, customers: 48000 },
    { name: 'Dhanmondi / Mohammadpur Zone', reliability: 94.1, deficit: 14, customers: 62000 },
    { name: 'Uttara Sector 1-14 Zone', reliability: 96.8, deficit: 10, customers: 55000 },
    { name: 'Motijheel Commercial Zone', reliability: 99.2, deficit: 2, customers: 31000 },
    { name: 'Mirpur Industrial Belt', reliability: 89.5, deficit: 28, customers: 85000 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            Regional Sector Reliability Index
          </h3>
          <p className="text-xs text-slate-500 mt-1">Real-time availability percentage and load shedding burden</p>
        </div>
        <span className="text-xs font-mono bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
          Updated: Live SCADA Feed
        </span>
      </div>

      <div className="space-y-4">
        {defaultSectors.map((sector) => (
          <div key={sector.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-800 dark:text-slate-200">{sector.name}</span>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-slate-500">Deficit: <strong className="text-amber-500">{sector.deficit} MW</strong></span>
                <span className={`font-bold ${sector.reliability >= 95 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {sector.reliability}%
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  sector.reliability >= 95 ? 'bg-emerald-500' : sector.reliability >= 90 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${sector.reliability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
