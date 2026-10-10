import React from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';

export const MissionCard: React.FC = () => {
  const pillars = [
    {
      icon: Zap,
      title: 'Real-time Grid Transparency',
      desc: 'Instant SCADA feeder updates and predictive outage schedules delivered directly to citizens and industries.',
    },
    {
      icon: Shield,
      title: 'Cryptographic Code Verification',
      desc: 'Tamper-proof 6-digit verification codes guaranteeing authentic incident auditing and field crew dispatch.',
    },
    {
      icon: Users,
      title: 'Citizen-Centric Collaboration',
      desc: 'Crowdsourced micro-outage reporting with automated deduplication and geofenced severity routing.',
    },
    {
      icon: Award,
      title: 'Stripe Instant Billing',
      desc: 'Frictionless, PCI-compliant Stripe billing for industrial high-priority notification channels.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {pillars.map((p) => {
        const Icon = p.icon;
        return (
          <div key={p.title} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{p.desc}</p>
          </div>
        );
      })}
    </div>
  );
};
