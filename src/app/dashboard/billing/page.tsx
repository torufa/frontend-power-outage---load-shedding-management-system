'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { MockBackendService } from '@/src/lib/mock-backend';
import { DataTable, Column } from '@/components/ui/DataTable';
import { useToast } from '@/src/context/ToastContext';
import { StripeTransaction } from '@/src/types';
import { BillingSummaryCard } from './_components/BillingSummaryCard';

export default function DashboardBillingPage() {
  const { showToast } = useToast();
  const [transactions] = useState<StripeTransaction[]>(() => MockBackendService.getTransactions());

  const totalUSD = transactions.reduce((sum, t) => sum + t.amountUSD, 0);

  const columns: Column<StripeTransaction>[] = [
    {
      header: 'Stripe Receipt Number',
      accessorKey: 'receiptNumber',
      sortable: true,
      cell: row => (
        <div>
          <span className="font-mono font-bold text-xs text-slate-900 dark:text-white block">{row.receiptNumber}</span>
          <span className="font-mono text-[10px] text-slate-400">{row.paymentIntentId}</span>
        </div>
      )
    },
    {
      header: 'Subscriber Email',
      accessorKey: 'userEmail',
      sortable: true,
      cell: row => <span className="text-xs font-semibold">{row.userEmail}</span>
    },
    {
      header: 'Plan Purchased',
      accessorKey: 'planName',
      cell: row => <span className="text-xs text-slate-700 dark:text-slate-300">{row.planName}</span>
    },
    {
      header: 'Card Used',
      accessorKey: 'last4',
      cell: row => (
        <span className="font-mono text-xs uppercase text-slate-600 dark:text-slate-300">
          {row.cardBrand} •••• {row.last4}
        </span>
      )
    },
    {
      header: 'Amount',
      accessorKey: 'amountUSD',
      sortable: true,
      cell: row => (
        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
          ${row.amountUSD.toFixed(2)} USD
        </span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: row => (
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
          {row.status}
        </span>
      )
    },
    {
      header: 'Invoice',
      cell: row => (
        <button
          onClick={() => showToast(`Invoice PDF downloaded for ${row.receiptNumber}`, 'info')}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          title="Download Stripe Tax Invoice"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <BillingSummaryCard totalUSD={totalUSD} />

      <DataTable
        data={transactions}
        columns={columns}
        pageSize={6}
        emptyTitle="No Stripe transactions found"
      />
    </div>
  );
}
