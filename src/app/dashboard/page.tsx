'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  AlertOctagon, 
  Activity, 
  Radio, 
  CreditCard, 
  Flame 
} from 'lucide-react';
import { Link } from '@/src/lib/next-shim';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
import { MockBackendService } from '@/src/lib/mock-backend';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Feeder } from '@/src/types';
import { RoleOverviewPanel } from './_components/RoleOverviewPanel';
import { toggleDashboardFeederAction } from './_actions/dashboard.action';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const metrics = MockBackendService.getGridMetrics();
  const outages = MockBackendService.getOutages();
  const feeders = MockBackendService.getFeeders();
  const transactions = MockBackendService.getTransactions();

  const [feederList, setFeederList] = useState<Feeder[]>(feeders);

  const handleQuickToggleFeeder = async (feederId: string, currentStatus: Feeder['status']) => {
    const nextStatus = currentStatus === 'ONLINE' ? 'LOAD_SHEDDING' : 'ONLINE';
    const updated = await toggleDashboardFeederAction(feederId, nextStatus);
    setFeederList(prev => prev.map(f => f.id === feederId ? updated : f));
    showToast(`Feeder ${updated.name} switched to ${nextStatus}`, 'info');
  };

  const handleBroadcastAlert = () => {
    showToast('Emergency Grid Advisory broadcasted to 28,500 subscriber phones via SMS!', 'warning');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white">
              {user?.role} Session
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              National SCADA Grid Node: SS-01-CENTRAL
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Welcome back, {user?.name}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {user?.role === 'ADMIN'
              ? 'Executive overview of national generation, regional load shedding rotas, and critical outages.'
              : user?.role === 'OPERATOR'
              ? 'Substation feeder telemetry, breaker isolation controls, and repair unit coordination.'
              : 'Your household meter status, personal incident verification tickets, and Stripe alerts.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user?.role === 'ADMIN' && (
            <button
              onClick={handleBroadcastAlert}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Radio className="w-4 h-4" />
              <span>Broadcast Emergency SMS</span>
            </button>
          )}

          {user?.role === 'CITIZEN' && (
            <Link
              href="/report-outage"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4" />
              <span>Report Outage at my Home</span>
            </Link>
          )}

          <Link
            href="/verify-report"
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Verify Code
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Grid Frequency"
          value={`${metrics.gridFrequencyHz.toFixed(2)} Hz`}
          subtitle="Frequency Synchronized"
          icon={Activity}
          accentColor="emerald"
          trend={{ value: 'Normal 50Hz Band', isPositive: true }}
        />
        <StatCard
          title="Active Load Shedding"
          value={`${metrics.sheddingDeficitMW} MW`}
          subtitle={`${metrics.activeSheddingFeeders} isolated feeders`}
          icon={Zap}
          accentColor="amber"
          trend={{ value: 'Scheduled Rotation', isWarning: true }}
        />
        <StatCard
          title="Unscheduled Outages"
          value={metrics.activeOutagesCount}
          subtitle="Under repair / Investigation"
          icon={AlertOctagon}
          accentColor="rose"
          trend={{ value: '3 Active Units', isWarning: true }}
        />
        <StatCard
          title={user?.role === 'CITIZEN' ? 'Stripe Alert Pass' : 'Stripe Payments Log'}
          value={user?.role === 'CITIZEN' ? (user.hasActiveAlertSubscription ? 'ACTIVE' : 'INACTIVE') : `$${transactions.reduce((acc, t) => acc + t.amountUSD, 0).toFixed(2)}`}
          subtitle={user?.role === 'CITIZEN' ? 'Priority 30-min SMS' : `${transactions.length} Verified Subscriptions`}
          icon={CreditCard}
          accentColor="purple"
        />
      </div>

      <RoleOverviewPanel
        user={user}
        feeders={feederList}
        onToggleFeeder={handleQuickToggleFeeder}
      />

      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Dispatch Incident Feed
            </h3>
            <p className="text-xs text-slate-500">
              Latest field repair units and citizen reports
            </p>
          </div>
          <Link
            href="/dashboard/outages"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Manage Outages Table →
          </Link>
        </div>

        <div className="space-y-3">
          {outages.slice(0, 3).map(outage => (
            <div
              key={outage.id}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {outage.trackingCode}
                  </span>
                  <StatusBadge status={outage.status} size="sm" />
                  <StatusBadge status={outage.severity} size="sm" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {outage.title}
                </h4>
                <p className="text-slate-500">
                  {outage.feederName} • {outage.area}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Restoration ETA</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{outage.estimatedRestoration}</span>
                <Link
                  href={`/verify-report?code=${outage.trackingCode}`}
                  className="text-indigo-600 dark:text-indigo-400 font-bold block mt-1 hover:underline"
                >
                  Verify Ticket →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
