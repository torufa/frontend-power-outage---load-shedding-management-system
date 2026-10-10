'use client';

import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Clock, Zap, Activity, ShieldCheck } from 'lucide-react';
import { MockBackendService } from '../../../lib/mock-backend';
import { StatCard } from '../../../components/ui/StatCard';
import { SectorReliabilityCard } from './_components/SectorReliabilityCard';

export default function DashboardAnalyticsPage() {
  const metrics = MockBackendService.getGridMetrics();
  const substations = MockBackendService.getSubstations();

  const hourlyDemand = [
    { hour: '06:00', demand: 280, generation: 320, shed: 0 },
    { hour: '08:00', demand: 360, generation: 350, shed: 10 },
    { hour: '10:00', demand: 410, generation: 380, shed: 30 },
    { hour: '12:00', demand: 430, generation: 390, shed: 40 },
    { hour: '14:00', demand: 420, generation: 385, shed: 35 },
    { hour: '16:00', demand: 440, generation: 390, shed: 50 },
    { hour: '18:00', demand: 460, generation: 410, shed: 50 },
    { hour: '20:00', demand: 430, generation: 400, shed: 30 },
    { hour: '22:00', demand: 340, generation: 360, shed: 0 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Grid Load Analytics & MTTR Performance
        </h2>
        <p className="text-xs text-slate-500">
          Peak generation deficit tracking, sector load shedding distribution, and repair resolution metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Peak Demand"
          value="460 MW"
          subtitle="Occurs 18:00 Evening Surge"
          icon={TrendingUp}
          accentColor="rose"
        />
        <StatCard
          title="Average Deficit"
          value="31.2 MW"
          subtitle="Controlled rotational shed"
          icon={TrendingDown}
          accentColor="amber"
        />
        <StatCard
          title="Average MTTR"
          value="48 mins"
          subtitle="From incident report to live power"
          icon={Clock}
          accentColor="blue"
          trend={{ value: 'Within 60m SLA', isPositive: true }}
        />
        <StatCard
          title="System Reliability"
          value="99.2%"
          subtitle="Annual transmission uptime"
          icon={ShieldCheck}
          accentColor="emerald"
          trend={{ value: 'ISO Standard', isPositive: true }}
        />
      </div>

      {/* Hourly Demand vs Generation Visual Bar Chart */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Hourly Grid Demand (MW) vs Available Generation
            </h3>
            <p className="text-xs text-slate-500">
              Yellow bar highlights required rotational load shedding to maintain grid stability.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded bg-indigo-500" /> Demand
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded bg-emerald-500" /> Generation
            </span>
            <span className="flex items-center gap-1.5 text-amber-500">
              <span className="w-3 h-3 rounded bg-amber-500" /> Shed Deficit
            </span>
          </div>
        </div>

        {/* Visual Bar Columns */}
        <div className="grid grid-cols-9 gap-2 sm:gap-4 items-end h-56 pt-6 border-b border-slate-200 dark:border-slate-800">
          {hourlyDemand.map(item => {
            const demandHeight = (item.demand / 500) * 100;
            const genHeight = (item.generation / 500) * 100;
            const shedHeight = (item.shed / 500) * 100;

            return (
              <div key={item.hour} className="flex flex-col items-center gap-1 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div
                    style={{ height: `${demandHeight}%` }}
                    className="w-3 sm:w-4 rounded-t bg-indigo-500/80 group-hover:bg-indigo-500 transition-all"
                    title={`Demand: ${item.demand} MW`}
                  />
                  <div
                    style={{ height: `${genHeight}%` }}
                    className="w-3 sm:w-4 rounded-t bg-emerald-500/80 group-hover:bg-emerald-500 transition-all"
                    title={`Gen: ${item.generation} MW`}
                  />
                  {item.shed > 0 && (
                    <div
                      style={{ height: `${shedHeight}%` }}
                      className="w-2 sm:w-2.5 rounded-t bg-amber-500 transition-all animate-pulse"
                      title={`Shed Deficit: ${item.shed} MW`}
                    />
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Substation Reliability Index */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Substation Health & Reliability Ranking
        </h3>

        <div className="space-y-3">
          {substations.map(s => (
            <div key={s.id} className="space-y-1 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-slate-900 dark:text-white font-bold">{s.name} ({s.code})</span>
                <span className="font-mono text-emerald-600 font-bold">{s.healthScore}% Health Score</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${s.healthScore > 85 ? 'bg-emerald-500' : s.healthScore > 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${s.healthScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Sector Reliability */}
      <SectorReliabilityCard />
    </div>
  );
}
