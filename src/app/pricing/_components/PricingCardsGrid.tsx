import React from 'react';
import { Sparkles, Check, CreditCard } from 'lucide-react';
import { StripePlan } from '@/src/types';

interface PricingCardsGridProps {
  plans: StripePlan[];
  onSelectPlan: (plan: StripePlan) => void;
  hasActiveSubscription?: boolean;
}

export const PricingCardsGrid: React.FC<PricingCardsGridProps> = ({
  plans,
  onSelectPlan,
  hasActiveSubscription
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {plans.map(plan => {
        const isSubscribed = hasActiveSubscription && plan.id === 'plan_citizen';

        return (
          <div
            key={plan.id}
            className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-200 relative ${
              plan.popular
                ? 'border-2 border-amber-500 bg-white dark:bg-slate-900 shadow-2xl scale-[1.02] ring-8 ring-amber-500/5'
                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>Most Popular for Retail & Homes</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                  {plan.tagline}
                </p>
              </div>

              <div className="flex items-baseline gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ${plan.priceUSD.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500">
                  {plan.interval === 'month' ? '/month' : 'one-time'}
                </span>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>{isSubscribed ? 'Active on Account (Manage)' : `Subscribe via Stripe ($${plan.priceUSD.toFixed(2)})`}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
