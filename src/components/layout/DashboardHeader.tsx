import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { MockBackendService } from '../../lib/mock-backend';
import { usePathname } from '../../lib/next-shim';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const outages = MockBackendService.getOutages().filter(o => o.status !== 'RESOLVED');

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Grid Command Center';
      case '/dashboard/outages':
        return 'Active Outage Incidents';
      case '/dashboard/load-shedding':
        return 'Rotational Load Shedding Manager';
      case '/dashboard/substations':
        return 'Substations & Feeder Telemetry';
      case '/dashboard/reports':
        return 'Citizen Incident Reports Queue';
      case '/dashboard/billing':
        return 'Stripe Billing & Subscription Logs';
      case '/dashboard/analytics':
        return 'Grid Load Analytics & MTTR';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      <div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {getPageTitle(pathname)}
        </h1>
        <p className="text-[11px] text-slate-500 hidden sm:block">
          VoltWatch National SCADA Feeder Grid Interconnect
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Real-time Frequency Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>49.98 Hz Synced</span>
        </div>

        {/* Notifications dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {outages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {outages.length}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Live Dispatch Alerts
                </span>
                <span className="text-[10px] text-slate-400">
                  {outages.length} Active Incidents
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {outages.slice(0, 4).map(o => (
                  <div
                    key={o.id}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                      <span className="truncate">{o.trackingCode}</span>
                      <span className="text-[10px] text-rose-500 font-bold uppercase">{o.severity}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{o.title}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Feeder: {o.feederName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User avatar chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs ring-2 ring-amber-500/30">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden lg:block text-left text-xs leading-tight">
            <span className="font-bold text-slate-800 dark:text-white block truncate max-w-[120px]">
              {user?.name?.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
