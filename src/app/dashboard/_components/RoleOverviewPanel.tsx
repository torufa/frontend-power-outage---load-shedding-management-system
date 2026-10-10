import React from 'react';
import { Power } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from '@/src/lib/next-shim';
import { User, Feeder } from '@/src/types';

interface RoleOverviewPanelProps {
  user: User | null;
  feeders: Feeder[];
  onToggleFeeder: (feederId: string, currentStatus: Feeder['status']) => void;
}

export const RoleOverviewPanel: React.FC<RoleOverviewPanelProps> = ({
  user,
  feeders,
  onToggleFeeder
}) => {
  if (user?.role === 'CITIZEN') {
    return (
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            My Household Meter Status
          </h3>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Meter ID: {user.meterNumber || 'MTR-8849-012'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 uppercase font-bold block text-[10px]">Registered Address</span>
            <span className="font-semibold text-slate-900 dark:text-white mt-1 block">
              {user.address || '428 Greenfield Lane, Cedar Meadows'}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 uppercase font-bold block text-[10px]">Connected Feeder</span>
            <span className="font-semibold text-slate-900 dark:text-white mt-1 block">
              F-301 Cedar Meadows (South Valley SS)
            </span>
            <span className="text-rose-500 font-bold block mt-0.5">Currently Outage (Repair In Progress)</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 uppercase font-bold block text-[10px]">Stripe Alert Plan</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
              {user.hasActiveAlertSubscription ? 'Citizen Shield Active ($4.99/mo)' : 'No Active Pass'}
            </span>
            <Link href="/pricing" className="text-amber-500 hover:underline font-bold block mt-0.5">
              Manage via Stripe →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Live Substation Feeder Controls
          </h3>
          <p className="text-xs text-slate-500">
            Direct SCADA breaker toggle for emergency load shedding & isolation
          </p>
        </div>
        <Link
          href="/dashboard/load-shedding"
          className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
        >
          Manage Full Schedule →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {feeders.slice(0, 6).map(feeder => {
          const isOnline = feeder.status === 'ONLINE';

          return (
            <div
              key={feeder.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[160px]">
                  {feeder.name}
                </div>
                <div className="text-[11px] text-slate-400">{feeder.substationName.split(' ')[0]}</div>
                <div className="mt-1">
                  <StatusBadge status={feeder.status} size="sm" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleFeeder(feeder.id, feeder.status)}
                disabled={feeder.status === 'OUTAGE'}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm ${
                  feeder.status === 'OUTAGE'
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-700 text-slate-400'
                    : isOnline
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isOnline ? 'Shed Feeder' : 'Restore'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
