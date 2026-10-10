import React from 'react';
import { UserCheck } from 'lucide-react';
import { Substation } from '@/src/types';

interface SubstationTelemetryCardProps {
  sub: Substation;
}

export const SubstationTelemetryCard: React.FC<SubstationTelemetryCardProps> = ({ sub }) => {
  const loadPercent = Math.round((sub.currentLoadMVA / sub.capacityMVA) * 100);
  const isHighTemp = sub.temperatureCelsius >= 75;

  return (
    <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-xs font-bold text-amber-500 block">
            {sub.code} • {sub.zone}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            {sub.name}
          </h3>
        </div>

        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
          sub.status === 'OPTIMAL'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        }`}>
          {sub.status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Health Score</span>
          <span className="text-xl font-extrabold text-emerald-500">{sub.healthScore}%</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Temp Core</span>
          <span className={`text-xl font-extrabold ${isHighTemp ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}`}>
            {sub.temperatureCelsius}°C
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Feeders</span>
          <span className="text-xl font-extrabold text-indigo-500">{sub.feedersCount} Units</span>
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-500">Transformer Capacity Utilization</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono">
            {sub.currentLoadMVA} MVA / {sub.capacityMVA} MVA ({loadPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              loadPercent > 85 ? 'bg-rose-500' : loadPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${loadPercent}%` }}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>{sub.operatorInCharge}</span>
        </span>
        <span className="text-emerald-600 font-semibold">SCADA Online</span>
      </div>
    </div>
  );
};
