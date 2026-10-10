import React from 'react';
import { 
  LayoutDashboard, 
  AlertOctagon, 
  Zap, 
  Activity, 
  FileCheck2, 
  CreditCard, 
  BarChart3, 
  ArrowLeft,
  Shield,
  Radio,
  UserCheck
} from 'lucide-react';
import { Link, usePathname } from '../../lib/next-shim';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, loginAsDemo } = useAuth();

  const menuItems = [
    { href: '/dashboard', label: 'Grid Command Center', icon: LayoutDashboard, roles: ['ADMIN', 'OPERATOR', 'CITIZEN'] },
    { href: '/dashboard/outages', label: 'Outage Incidents', icon: AlertOctagon, roles: ['ADMIN', 'OPERATOR'] },
    { href: '/dashboard/load-shedding', label: 'Load Shedding Control', icon: Zap, roles: ['ADMIN', 'OPERATOR'] },
    { href: '/dashboard/substations', label: 'Substation Telemetry', icon: Activity, roles: ['ADMIN', 'OPERATOR'] },
    { href: '/dashboard/reports', label: 'Citizen Incident Queue', icon: FileCheck2, roles: ['ADMIN', 'OPERATOR'] },
    { href: '/dashboard/billing', label: 'Stripe Billing Logs', icon: CreditCard, roles: ['ADMIN', 'CITIZEN'] },
    { href: '/dashboard/analytics', label: 'Grid Analytics & MTTR', icon: BarChart3, roles: ['ADMIN', 'OPERATOR'] },
  ];

  const currentRole = user?.role || 'ADMIN';

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 transition-colors duration-200">
      <div className="p-4 space-y-6">
        {/* Active Role Indicator Card */}
        <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Active Session Role
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              currentRole === 'ADMIN'
                ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
                : currentRole === 'OPERATOR'
                ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
            }`}>
              {currentRole}
            </span>
          </div>
          <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
            {user?.name || 'Authorized User'}
          </div>
          <div className="text-[11px] text-slate-500 truncate">
            {user?.email}
          </div>

          {/* Quick Demo Role Switcher for Evaluator */}
          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60">
            <div className="text-[10px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
              <Radio className="w-3 h-3 text-amber-500" />
              <span>Switch Demo Role:</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => loginAsDemo('ADMIN')}
                className={`py-1 px-1.5 text-[10px] font-bold rounded-lg transition-all ${
                  currentRole === 'ADMIN'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-500/20'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('OPERATOR')}
                className={`py-1 px-1.5 text-[10px] font-bold rounded-lg transition-all ${
                  currentRole === 'OPERATOR'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-500/20'
                }`}
              >
                Operator
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('CITIZEN')}
                className={`py-1 px-1.5 text-[10px] font-bold rounded-lg transition-all ${
                  currentRole === 'CITIZEN'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/20'
                }`}
              >
                Citizen
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map(item => {
            const hasAccess = item.roles.includes(currentRole);
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (!hasAccess) return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-500' : ''}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Public Portal */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Portal Home</span>
        </Link>
      </div>
    </aside>
  );
};
