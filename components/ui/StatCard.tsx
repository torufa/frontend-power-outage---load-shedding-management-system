import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    isWarning?: boolean;
  };
  accentColor?: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'amber',
  onClick
}) => {
  const accentStyles = {
    amber: 'from-amber-500/10 to-transparent text-amber-500 border-amber-500/20',
    emerald: 'from-emerald-500/10 to-transparent text-emerald-500 border-emerald-500/20',
    blue: 'from-blue-500/10 to-transparent text-blue-500 border-blue-500/20',
    rose: 'from-rose-500/10 to-transparent text-rose-500 border-rose-500/20',
    purple: 'from-purple-500/10 to-transparent text-purple-500 border-purple-500/20',
  };

  const iconBgStyles = {
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700' : ''
      }`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${accentStyles[accentColor]} pointer-events-none rounded-bl-full opacity-60`} />

      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBgStyles[accentColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
          {value}
        </div>

        {(subtitle || trend) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={`font-semibold px-1.5 py-0.5 rounded ${
                  trend.isWarning
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                    : trend.isPositive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {trend.value}
              </span>
            )}
            {subtitle && (
              <span className="text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
