import React from 'react';
import { Sparkles } from 'lucide-react';
import { UserRole } from '@/src/types';

interface DemoLoginButtonsProps {
  onSelectRole: (role: UserRole) => void;
}

export const DemoLoginButtons: React.FC<DemoLoginButtonsProps> = ({ onSelectRole }) => {
  return (
    <div className="pt-2">
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        <span className="flex-shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          One-Click Demo Roles
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
      </div>

      <div className="grid grid-cols-1 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onSelectRole('ADMIN')}
          className="flex items-center justify-between p-3 rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
              ADM
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Demo Admin</span>
                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded">
                  Full Access
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block">admin@voltwatch.gov</span>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-purple-500" />
        </button>

        <button
          type="button"
          onClick={() => onSelectRole('OPERATOR')}
          className="flex items-center justify-between p-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              OPR
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Demo Operator</span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded">
                  Feeder Control
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block">operator@voltwatch.gov</span>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-blue-500" />
        </button>

        <button
          type="button"
          onClick={() => onSelectRole('CITIZEN')}
          className="flex items-center justify-between p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              CIT
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Demo Citizen / Consumer</span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                  Reports & Alerts
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block">citizen@voltwatch.gov</span>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-emerald-500" />
        </button>
      </div>
    </div>
  );
};
