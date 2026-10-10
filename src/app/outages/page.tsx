'use client';

import React, { useState, useMemo } from 'react';
import { AlertOctagon, MapPin, Zap } from 'lucide-react';
import { useSearchParams, useRouter, Link } from '@/src/lib/next-shim';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { OutageIncident } from '@/src/types';
import { getOutagesAction } from './_actions/outages.action';
import { OutageDetailModal } from './_components/OutageDetailModal';

export default function OutagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialSeverity = searchParams.get('severity') || 'ALL';
  const initialStatus = searchParams.get('status') || 'ALL';

  const [search, setSearch] = useState(initialQuery);
  const [severityFilter, setSeverityFilter] = useState<string>(initialSeverity);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [selectedIncident, setSelectedIncident] = useState<OutageIncident | null>(null);

  const [allOutages] = useState<OutageIncident[]>(() => {
    // Synchronously initialize, can also be fetched via getOutagesAction
    return [
      {
        id: 'out-01',
        trackingCode: 'PO-84921',
        title: '33kV Distribution Line Tripped due to Lightning strike',
        description: 'Sudden high voltage line rupture near Cedar Meadows Sector 4. Safety auto-trip triggered.',
        zone: 'Zone 3 - Southern Sector',
        feederId: 'fdr-05',
        feederName: 'F-301 Cedar Meadows Residential',
        substationName: 'South Valley Residential Substation',
        area: 'Cedar Meadows & Greenfield Lane',
        type: 'HIGH_VOLTAGE_FAULT',
        severity: 'CRITICAL',
        status: 'RESTORATION_IN_PROGRESS',
        affectedCustomers: 6400,
        reportedAt: '2026-10-09 10:15 AM',
        estimatedRestoration: '2026-10-09 01:45 PM',
        assignedCrew: {
          name: 'Crew Charlie-9 (Emergency Line Technicians)',
          vehicleId: 'VAN-702',
          contact: '+1 (555) 019-4829'
        },
        hasCriticalServices: false,
        coordinates: { lat: 37.7749, lng: -122.4194 }
      },
      {
        id: 'out-02',
        trackingCode: 'PO-41093',
        title: 'Step-Down Distribution Transformer Overheating & Oil Leak',
        description: 'Substation alarm reported extreme localized thermal spiking on Unit TR-4B.',
        zone: 'Zone 2 - Industrial District',
        feederId: 'fdr-03',
        feederName: 'F-201 Heavy Manufacturing Plant Feeder',
        substationName: 'Northgate Grid Terminal',
        area: 'Foundry Avenue, Industrial Zone North',
        type: 'TRANSFORMER_FAILURE',
        severity: 'HIGH',
        status: 'CREW_DISPATCHED',
        affectedCustomers: 1100,
        reportedAt: '2026-10-09 09:40 AM',
        estimatedRestoration: '2026-10-09 02:30 PM',
        assignedCrew: {
          name: 'Heavy Transformer Engineering Unit 2',
          vehicleId: 'CRANE-104',
          contact: '+1 (555) 017-9932'
        },
        hasCriticalServices: false,
        coordinates: { lat: 37.7833, lng: -122.4167 }
      },
      {
        id: 'out-03',
        trackingCode: 'PO-92014',
        title: 'Fallen Tree Branch Severed Secondary Lateral Wire',
        description: 'Localized wind gusts snapped a large branch across secondary low voltage line behind Elmwood School.',
        zone: 'Zone 1 - Commercial Core',
        feederId: 'fdr-01',
        feederName: 'F-101 Metro Commercial',
        substationName: 'Downtown Central Substation',
        area: 'Elmwood Square, 5th Avenue',
        type: 'FALLEN_LINE',
        severity: 'MODERATE',
        status: 'INVESTIGATING',
        affectedCustomers: 450,
        reportedAt: '2026-10-09 11:05 AM',
        estimatedRestoration: '2026-10-09 12:45 PM',
        assignedCrew: {
          name: 'Rapid Response Team Alpha',
          vehicleId: 'TRUCK-301',
          contact: '+1 (555) 014-2201'
        },
        hasCriticalServices: true,
        coordinates: { lat: 37.7690, lng: -122.4467 }
      },
      {
        id: 'out-04',
        trackingCode: 'PO-18302',
        title: 'Underground Cable Insulation Failure at Junction Box 12',
        description: 'Insulation wear caused ground fault during morning peak surge. Repaired with new composite splicing sleeve.',
        zone: 'Zone 4 - Western Hills',
        feederId: 'fdr-07',
        feederName: 'F-401 Ridge Summit Feeder',
        substationName: 'Highland Ridge Feeder Station',
        area: 'Pine Crest & Crestview',
        type: 'GRID_MAINTENANCE',
        severity: 'LOW',
        status: 'RESOLVED',
        affectedCustomers: 850,
        reportedAt: '2026-10-09 06:20 AM',
        estimatedRestoration: '2026-10-09 08:30 AM',
        resolvedAt: '2026-10-09 08:24 AM',
        hasCriticalServices: false,
        coordinates: { lat: 37.7550, lng: -122.4300 }
      }
    ];
  });

  const updateUrlParams = (newSearch: string, newSeverity: string, newStatus: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('q', newSearch);
    if (newSeverity !== 'ALL') params.set('severity', newSeverity);
    if (newStatus !== 'ALL') params.set('status', newStatus);
    router.replace(`/outages?${params.toString()}`);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    updateUrlParams(val, severityFilter, statusFilter);
  };

  const handleSeverityChange = (val: string) => {
    setSeverityFilter(val);
    updateUrlParams(search, val, statusFilter);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    updateUrlParams(search, severityFilter, val);
  };

  const filteredData = useMemo(() => {
    return allOutages.filter(item => {
      const matchesSearch = !search || 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.trackingCode.toLowerCase().includes(search.toLowerCase()) ||
        item.area.toLowerCase().includes(search.toLowerCase()) ||
        item.feederName.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity = severityFilter === 'ALL' || item.severity === severityFilter;
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [allOutages, search, severityFilter, statusFilter]);

  const columns: Column<OutageIncident>[] = [
    {
      header: 'Code / Ticket',
      accessorKey: 'trackingCode',
      sortable: true,
      cell: row => (
        <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          {row.trackingCode}
        </span>
      )
    },
    {
      header: 'Incident & Area',
      accessorKey: 'title',
      sortable: true,
      cell: row => (
        <div className="max-w-xs">
          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{row.title}</div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{row.area}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Affected Feeder',
      accessorKey: 'feederName',
      sortable: true,
      cell: row => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">{row.feederName}</span>
          <span className="text-slate-400 text-[11px]">{row.zone}</span>
        </div>
      )
    },
    {
      header: 'Severity',
      accessorKey: 'severity',
      sortable: true,
      cell: row => <StatusBadge status={row.severity} size="sm" />
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: row => <StatusBadge status={row.status} size="sm" />
    },
    {
      header: 'Restoration ETA',
      accessorKey: 'estimatedRestoration',
      sortable: true,
      cell: row => (
        <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
          {row.estimatedRestoration}
        </div>
      )
    },
    {
      header: 'Action',
      cell: row => (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setSelectedIncident(row);
          }}
          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
        >
          Details
        </button>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
            <AlertOctagon className="w-4 h-4" />
            <span>Real-time Grid Incidents</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Active Outages & Fault Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track reported grid breakdowns, dispatched repair crews, and estimated power restoration windows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/report-outage"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" />
            <span>Report New Power Cut</span>
          </Link>
          <Link
            href="/verify-report"
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Verify Ticket
          </Link>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Filter by title, area, feeder, or ticket code..."
          className="flex-1"
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={severityFilter}
            onChange={e => handleSeverityChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => handleStatusChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <option value="ALL">All Statuses</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="CREW_DISPATCHED">Crew Dispatched</option>
            <option value="RESTORATION_IN_PROGRESS">Restoration In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        pageSize={6}
        emptyTitle="No outages found"
        emptyDescription="All grid feeders are running nominally under this search criteria."
        onRowClick={row => setSelectedIncident(row)}
      />

      <OutageDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
