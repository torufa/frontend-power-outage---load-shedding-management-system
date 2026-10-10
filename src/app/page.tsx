'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  AlertTriangle, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  Radio, 
  BellRing,
  ExternalLink,
  ChevronRight,
  Flame,
  PowerOff
} from 'lucide-react';
import { Link, useRouter } from '../lib/next-shim';
import { MockBackendService } from '../lib/mock-backend';
import { GridStatusIndicator } from '../components/ui/GridStatusIndicator';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { OutageIncident, Feeder, Substation } from '../types';
import { LiveGridBanner } from './_components/LiveGridBanner';
import { QuickActionCards } from './_components/QuickActionCards';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubstation, setSelectedSubstation] = useState<string>('all');

  const metrics = MockBackendService.getGridMetrics();
  const outages = MockBackendService.getOutages();
  const feeders = MockBackendService.getFeeders();
  const substations = MockBackendService.getSubstations();
  const schedules = MockBackendService.getSchedules().filter(s => s.status === 'ACTIVE_SHEDDING');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchQuery.toUpperCase().startsWith('PO-') || searchQuery.toUpperCase().startsWith('MTR-')) {
      router.push(`/verify-report?code=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/outages?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredFeeders = selectedSubstation === 'all' 
    ? feeders 
    : feeders.filter(f => f.substationId === selectedSubstation);

  return (
    <div className="space-y-12 pb-16">
      {/* Live SCADA Telemetry Banner */}
      <LiveGridBanner metrics={metrics} />

      {/* Top Banner Alert Ticker */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-xs font-semibold text-amber-700 dark:text-amber-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold uppercase tracking-wider text-[11px] bg-amber-500 text-white px-1.5 py-0.5 rounded">
              Active Rotation
            </span>
            <span className="truncate">
              Zone 2 (Industrial) & Zone 4 (Western Hills) undergoing scheduled 2-hour relief load shedding.
            </span>
          </div>
          <Link
            href="/schedule"
            className="hidden sm:inline-flex items-center gap-1 shrink-0 text-amber-700 dark:text-amber-300 hover:underline font-bold"
          >
            <span>Full Timetable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>National Load Dispatch Center • Live SCADA Synchronized</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Smart Power Outage &{' '}
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Load Shedding
              </span>{' '}
              Intelligence
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Track real-time electrical grid stability, automated feeder shed rotations, report localized power failures with verification codes, and receive priority emergency restoration notifications.
            </p>

            {/* Quick Search Box */}
            <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Feeder, Area, or Ticket (e.g. PO-84921)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Track Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/report-outage"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow-md transition-all hover:opacity-90"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Report Outage Incident</span>
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>View Shedding Timetable</span>
              </Link>
              <Link
                href="/verify-report"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Verify Code</span>
              </Link>
            </div>
          </div>

          {/* Real-time Grid Monitor Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Grid Telemetry Core
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {metrics.gridFrequencyHz.toFixed(2)} Hz
                </span>
              </div>

              {/* Grid Bar */}
              <div className="py-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Peak Demand vs Generation</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {metrics.currentDemandMW} MW / {metrics.totalCapacityMW} MW
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${(metrics.currentGenerationMW / metrics.totalCapacityMW) * 100}%` }}
                    title="Active Generation"
                  />
                  <div 
                    className="bg-amber-500 h-full transition-all duration-500" 
                    style={{ width: `${(metrics.sheddingDeficitMW / metrics.totalCapacityMW) * 100}%` }}
                    title="Load Shed Deficit"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Gen: {metrics.currentGenerationMW} MW</span>
                  <span className="text-amber-500 font-bold">Deficit: -{metrics.sheddingDeficitMW} MW</span>
                </div>
              </div>

              {/* Live Status Details */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Shedding Feeders</span>
                  <span className="text-xl font-extrabold text-amber-500">{metrics.activeSheddingFeeders} Active</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Automated rotation</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Unscheduled Outages</span>
                  <span className="text-xl font-extrabold text-rose-500">{metrics.activeOutagesCount} Incidents</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Emergency crews active</span>
                </div>
              </div>

              {/* Stripe Priority Subscription Callout */}
              <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Never get surprised in the dark
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Get SMS warnings 30-min before your feeder sheds.
                  </span>
                </div>
                <Link
                  href="/pricing"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-sm hover:bg-amber-600 transition-colors shrink-0"
                >
                  Join via Stripe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Metrics Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Grid Stability Index"
            value={`${metrics.gridStabilityIndex}%`}
            subtitle="National Transmission Grid"
            icon={Activity}
            accentColor="emerald"
            trend={{ value: 'Nominal', isPositive: true }}
          />
          <StatCard
            title="Load Shed Relief"
            value={`${metrics.sheddingDeficitMW} MW`}
            subtitle="Rotating across 2 zones"
            icon={Zap}
            accentColor="amber"
            trend={{ value: 'Controlled', isWarning: true }}
          />
          <StatCard
            title="Mean Repair Time (MTTR)"
            value={`${metrics.mttrMinutes} min`}
            subtitle="Average dispatch restoration"
            icon={Clock}
            accentColor="blue"
            trend={{ value: '-12% this week', isPositive: true }}
          />
          <StatCard
            title="Active Field Crews"
            value="8 Units"
            subtitle="Bucket trucks & substation teams"
            icon={Radio}
            accentColor="purple"
          />
        </div>
      </section>

      {/* Quick Action Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuickActionCards />
      </section>

      {/* Interactive Feeder Status Map / Visual Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                <Layers className="w-4 h-4" />
                <span>SCADA Live Visualizer</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Substations & Regional Feeder Grid
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Click any substation filter below to inspect feeder load, status, and connected consumers.
              </p>
            </div>

            {/* Substation Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedSubstation('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedSubstation === 'all'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All Feeders ({feeders.length})
              </button>
              {substations.map(sub => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubstation(sub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedSubstation === sub.id
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sub.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Feeder Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredFeeders.map(feeder => {
              const isOnline = feeder.status === 'ONLINE';
              const isShedding = feeder.status === 'LOAD_SHEDDING';
              const isOutage = feeder.status === 'OUTAGE';

              return (
                <div
                  key={feeder.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                    isOutage
                      ? 'border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/20'
                      : isShedding
                      ? 'border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                        {feeder.zone} • {feeder.priorityLevel.replace('_', ' ')}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                        {feeder.name}
                      </h4>
                    </div>
                    <StatusBadge status={feeder.status} />
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 truncate">
                    Terminal: {feeder.substationName}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Load / Cap</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {feeder.currentLoadMW} MW / {feeder.capacityMW} MW
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Consumers</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {feeder.connectedConsumers.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Updated: {feeder.lastStatusChanged}</span>
                    <Link
                      href={`/schedule?feeder=${encodeURIComponent(feeder.name)}`}
                      className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-0.5"
                    >
                      Schedule <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Outages List & Public Verification Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Incidents */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recent Outage Incidents
                </h3>
                <p className="text-xs text-slate-500">
                  Field verified incidents with tracking codes & restoration estimates
                </p>
              </div>
              <Link
                href="/outages"
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>View All Outages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {outages.slice(0, 3).map(outage => (
                <div
                  key={outage.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {outage.trackingCode}
                      </span>
                      <StatusBadge status={outage.status} />
                      <StatusBadge status={outage.severity} size="sm" />
                    </div>
                    <span className="text-xs text-slate-400">
                      Reported: {outage.reportedAt}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {outage.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {outage.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{outage.area}</span>
                    </div>

                    <div className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Est. Restoration: {outage.estimatedRestoration}</span>
                    </div>

                    <Link
                      href={`/verify-report?code=${encodeURIComponent(outage.trackingCode)}`}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Track Live Ticket →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Verification & Reporting Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Instant Code Verification
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Have an incident tracking code (e.g. PO-84921) or meter number? Verify its authenticity directly.
                </p>
              </div>

              <Link
                href="/verify-report"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Launch Verification Tool</span>
              </Link>
            </div>

            <div className="p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-950/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <BellRing className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Stripe Priority Alerts
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Subscribe to receive dedicated SMS/Email dispatch alerts 30 minutes before load shedding.
                </p>
              </div>

              <Link
                href="/pricing"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>View Plans ($4.99/mo)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
