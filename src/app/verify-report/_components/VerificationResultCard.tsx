import React from 'react';
import { CheckCircle2, AlertTriangle, Gauge } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface VerificationResultCardProps {
  code: string;
  result: any;
}

export const VerificationResultCard: React.FC<VerificationResultCardProps> = ({ code, result }) => {
  if (!result) return null;

  if (!result.isValid) {
    return (
      <div className="p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/20 shadow-xl space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Verification Failed: Code Not Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            {result.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              Cryptographically Verified
            </span>
            <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {code.toUpperCase()}
            </h3>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs">
          Official Record Found
        </div>
      </div>

      {result.type === 'OUTAGE_REPORT' && result.data && (
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {result.data.title || `Incident Report ${result.data.verificationCode}`}
              </h4>
              <StatusBadge status={result.data.status} />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {result.data.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Feeder Node</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{result.data.feederName}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Location</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{result.data.area}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Reported Timestamp</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{result.data.reportedAt || result.data.createdAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Restoration Status</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  {result.data.estimatedRestoration || 'Under Active Repair'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              Restoration Dispatch Timeline
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                1. Reported
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                2. Verified
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 font-bold border border-amber-500/20 animate-pulse">
                3. En Route
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium">
                4. Restored
              </div>
            </div>
          </div>
        </div>
      )}

      {result.type === 'METER' && result.data && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Gauge className="w-4 h-4 text-emerald-500" />
            <span>Smart Electricity Meter Profile Verified</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Meter ID</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{result.data.meterNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Feeder</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{result.data.assignedFeeder}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
