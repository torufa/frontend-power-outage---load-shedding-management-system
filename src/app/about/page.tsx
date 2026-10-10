'use client';

import React from 'react';
import { Zap, ShieldCheck, Cpu, Activity, Network, Award, ArrowRight } from 'lucide-react';
import { Link } from '../../lib/next-shim';
import { MissionCard } from './_components/MissionCard';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <Zap className="w-3.5 h-3.5" />
          <span>National Grid Dispatch Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About VoltWatch Smart Grid Management
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          VoltWatch is an integrated supervisory control, load shedding scheduling, and power outage resolution platform designed for grid reliability.
        </p>
      </div>

      {/* Grid Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Automated Load Shedding
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            When grid frequency deviates below 49.80 Hz, our dynamic shedding algorithms isolate non-essential industrial and residential feeders to protect bulk transformers from cascade blackouts.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            SCADA Feeder Telemetry
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Continuous temperature, megawatt load, and breaker telemetry streaming from all primary substations (SS-DWT-01, SS-NGT-02, SS-SVR-03, and SS-HLR-04).
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Verified Incident Tracking
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every citizen power cut report receives an encrypted tracking token (PO-XXXXX) cross-referenced against smart smart meters to prevent duplicate dispatch.
          </p>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <MissionCard />

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/20 text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Explore the Public Grid Network
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Access real-time power outage maps or check today's rotational load shedding schedule in your neighborhood.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/outages"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
          >
            View Active Outages
          </Link>
          <Link
            href="/schedule"
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Check Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
