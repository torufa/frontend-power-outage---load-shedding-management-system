'use client';

import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Download, Receipt } from 'lucide-react';
import { StripePlan, StripeTransaction } from '@/src/types';
import { StripePaymentModal } from '@/components/ui/StripePaymentModal';
import { MockBackendService } from '@/src/lib/mock-backend';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
import { PricingCardsGrid } from './_components/PricingCardsGrid';

export default function PricingPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [selectedPlan, setSelectedPlan] = useState<StripePlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<StripeTransaction[]>(() => MockBackendService.getTransactions());

  const plans: StripePlan[] = [
    {
      id: 'plan_citizen',
      name: 'Citizen Shield Alerts',
      tagline: 'Stay ahead of darkness with instant mobile warnings',
      priceUSD: 4.99,
      interval: 'month',
      stripePriceId: 'price_citizen_monthly',
      features: [
        '30-minute early SMS warning before scheduled load shedding',
        'Direct automated feeder restoration notifications',
        'Priority incident reporting queue escalation',
        'Personalized household meter tracking dashboard',
        '24/7 automated SCADA power recovery status ping'
      ]
    },
    {
      id: 'plan_business',
      name: 'Commercial Feeder SLA',
      tagline: 'Protect business uptime, restaurants, IT infrastructure & retail',
      priceUSD: 19.99,
      interval: 'month',
      popular: true,
      stripePriceId: 'price_business_monthly',
      features: [
        'Everything in Citizen Shield for up to 5 facilities',
        'Direct connection to Substation SCADA status API',
        'Dedicated dispatch hotline with local field engineer',
        '45-minute guaranteed technician triage response SLA',
        'Automated monthly outage impact audit report for insurance'
      ]
    },
    {
      id: 'plan_emergency',
      name: 'Emergency Mobile Dispatch Pass',
      tagline: 'One-time rapid field inspection and mobile generator support',
      priceUSD: 49.00,
      interval: 'one_time',
      stripePriceId: 'price_emergency_dispatch',
      features: [
        'Priority high-voltage line truck field inspection',
        'Expedited fuse/transformer isolation unit dispatch',
        'Direct phone line to On-Duty Grid Dispatch Director',
        'Zero waiting in standard citizen verification queue',
        'Official incident certification for equipment damage claims'
      ]
    }
  ];

  const handleSelectPlan = (plan: StripePlan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handlePaymentSuccess = (tx: StripeTransaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Stripe-Powered Priority Grid Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Predict Power Cuts Before They Happen
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Subscribe with Stripe for instant SMS warnings before your feeder is load-shed, or purchase emergency mobile generator response passes.
        </p>

        <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Exclusively processed via Stripe • Test Mode Enabled • PCI Level 1</span>
        </div>
      </div>

      <PricingCardsGrid
        plans={plans}
        onSelectPlan={handleSelectPlan}
        hasActiveSubscription={user?.hasActiveAlertSubscription}
      />

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Stripe Verified Transactions & Invoices
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {transactions.length} Payment Intents Processed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3">Receipt / PaymentIntent</th>
                <th className="py-2.5 px-3">Plan Description</th>
                <th className="py-2.5 px-3">Card Used</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white block">{tx.receiptNumber}</span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[120px] block">{tx.paymentIntentId}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                    {tx.planName}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 uppercase">
                    {tx.cardBrand} •••• {tx.last4}
                  </td>
                  <td className="py-3 px-3 font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    ${tx.amountUSD.toFixed(2)} USD
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {tx.createdAt}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showToast(`Receipt ${tx.receiptNumber} downloaded!`, 'info')}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Download Invoice"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StripePaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
