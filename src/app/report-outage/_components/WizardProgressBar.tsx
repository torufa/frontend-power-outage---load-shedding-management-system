import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface WizardProgressBarProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const WizardProgressBar: React.FC<WizardProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Location' },
    { num: 2, label: 'Outage Details' },
    { num: 3, label: 'Photos & Safety' },
    { num: 4, label: 'Verification & Submit' }
  ];

  return (
    <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        {steps.map(s => (
          <div key={s.num} className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                currentStep === s.num
                  ? 'bg-amber-500 text-white ring-4 ring-amber-500/20'
                  : currentStep > s.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {currentStep > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
            </div>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 hidden sm:block">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  );
};
