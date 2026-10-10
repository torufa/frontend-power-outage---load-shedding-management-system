import React from 'react';
import { Power } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Feeder } from '@/src/types';

interface FeederSwitchboardProps {
  feeders: Feeder[];
  onToggle: (feederId: string, currentStatus: Feeder['status']) => void;
}

export const FeederSwitchboard: React.FC<FeederSwitchboardProps> = ({ feeders, onToggle }) => {
  return (
    <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          SCADA Feeder Breaker Switchboard
        </h3>
        <p className="text-xs text-slate-500">
          Click switch to instantly isolate or reconnect feeder lines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {feeders.map(feeder => {
          const isOnline = feeder.status === 'ONLINE';

          return (
            <div
              key={feeder.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[170px]">
                  {feeder.name}
                </div>
                <div className="text-[11px] text-slate-400">{feeder.substationName}</div>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status={feeder.status} size="sm" />
                  <span className="font-mono text-[11px] text-slate-500">{feeder.capacityMW} MW</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggle(feeder.id, feeder.status)}
                disabled={feeder.status === 'OUTAGE'}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors ${
                  feeder.status === 'OUTAGE'
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-700 text-slate-400'
                    : isOnline
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isOnline ? 'Cut Feed' : 'Restore'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
