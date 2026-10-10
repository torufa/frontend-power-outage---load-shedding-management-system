import React from 'react';
import { AlertOctagon, Calendar, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from '@/src/lib/next-shim';

export const QuickActionCards: React.FC = () => {
  const actions = [
    {
      title: 'Report Outage',
      desc: 'Submit incident report with GPS coordinates and obtain tracking verification code.',
      href: '/report-outage',
      icon: AlertOctagon,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:border-rose-500',
    },
    {
      title: 'View Shedding Schedule',
      desc: 'Check area-wise load rotation slots and live feeder status.',
      href: '/schedule',
      icon: Calendar,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:border-amber-500',
    },
    {
      title: 'Code Verification',
      desc: 'Verify 6-digit OTP code or tracking number for registered incidents.',
      href: '/verify-report',
      icon: ShieldCheck,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:border-indigo-500',
    },
    {
      title: 'Stripe Priority Alert',
      desc: 'Subscribe to instant SMS/Email priority grid alerts via Stripe checkout.',
      href: '/pricing',
      icon: CreditCard,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:border-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.title}
            href={act.href}
            className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-slate-900 ${act.color}`}
          >
            <div className="p-3 rounded-xl inline-flex mb-4 bg-slate-100 dark:bg-slate-800">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center justify-between">
              {act.title}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {act.desc}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
