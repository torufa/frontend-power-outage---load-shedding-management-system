'use client';

import React from 'react';
import { MockBackendService } from '@/src/lib/mock-backend';
import { SubstationTelemetryCard } from './_components/SubstationTelemetryCard';

export default function DashboardSubstationsPage() {
  const substations = MockBackendService.getSubstations();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Primary Substation & Transformer Telemetry
        </h2>
        <p className="text-xs text-slate-500">
          Live thermal monitoring, MVA transformer utilization, and operational health scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {substations.map(sub => (
          <SubstationTelemetryCard key={sub.id} sub={sub} />
        ))}
      </div>
    </div>
  );
}
