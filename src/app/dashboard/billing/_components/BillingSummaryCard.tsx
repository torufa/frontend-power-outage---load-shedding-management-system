import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface BillingSummaryCardProps {
  totalUSD: number;
}

export const BillingSummaryCard: React.FC<BillingSummaryCardProps> = ({ totalUSD }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Stripe Billing & Payment Ledger
          </h2>
          <p className="text-xs text-slate-500">
            Real-time subscriber transactions processed strictly through Stripe Payments.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
            $
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Processed (Stripe)</span>
            <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ${totalUSD.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            PCI DSS Level 1 Certified Stripe Merchant Account
          </span>
        </div>
        <span className="text-slate-400">Direct Webhook Integration</span>
      </div>
    </>
  );
};
