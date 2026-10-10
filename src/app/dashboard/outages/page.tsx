'use client';

import React, { useState } from 'react';
import { MockBackendService } from '@/src/lib/mock-backend';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { useToast } from '@/src/context/ToastContext';
import { OutageIncident, OutageStatus } from '@/src/types';
import { updateOutageAction } from './_actions/dashboardOutages.action';
import { OutageStatusModal } from './_components/OutageStatusModal';

export default function DashboardOutagesPage() {
  const { showToast } = useToast();
  const [outages, setOutages] = useState<OutageIncident[]>(() => MockBackendService.getOutages());
  const [search, setSearch] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<OutageIncident | null>(null);

  const handleUpdateStatus = async (id: string, status: OutageStatus, eta: string) => {
    const updated = await updateOutageAction(id, status, eta);
    setOutages(prev => prev.map(o => o.id === updated.id ? updated : o));
    setSelectedIncident(null);
    showToast(`Updated ${updated.trackingCode} to ${status}`, 'success');
  };

  const filtered = outages.filter(o => 
    !search ||
    o.title.toLowerCase().includes(search.toLowerCase()) ||
    o.trackingCode.toLowerCase().includes(search.toLowerCase()) ||
    o.area.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<OutageIncident>[] = [
    {
      header: 'Tracking Code',
      accessorKey: 'trackingCode',
      sortable: true,
      cell: row => (
        <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
          {row.trackingCode}
        </span>
      )
    },
    {
      header: 'Incident Title',
      accessorKey: 'title',
      sortable: true,
      cell: row => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{row.title}</div>
          <div className="text-xs text-slate-400">{row.area}</div>
        </div>
      )
    },
    {
      header: 'Feeder Node',
      accessorKey: 'feederName',
      sortable: true,
      cell: row => <span className="text-xs font-semibold">{row.feederName}</span>
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
      header: 'ETA',
      accessorKey: 'estimatedRestoration',
      cell: row => <span className="font-mono text-xs">{row.estimatedRestoration}</span>
    },
    {
      header: 'Manage',
      cell: row => (
        <button
          onClick={e => {
            e.stopPropagation();
            setSelectedIncident(row);
          }}
          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
        >
          Update
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Outage Incidents Control Table
        </h2>
        <p className="text-xs text-slate-500">
          Dispatch triage, repair status transitions, and restoration ETA management.
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by code (PO-...), title, area, or feeder..."
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        pageSize={6}
        emptyTitle="No outages found"
      />

      <OutageStatusModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onSave={handleUpdateStatus}
      />
    </div>
  );
}
