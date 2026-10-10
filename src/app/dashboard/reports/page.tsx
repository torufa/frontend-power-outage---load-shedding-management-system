'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { MockBackendService } from '@/src/lib/mock-backend';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { useToast } from '@/src/context/ToastContext';
import { CitizenReport } from '@/src/types';
import { ReportReviewModal } from './_components/ReportReviewModal';
import { updateCitizenReportStatusAction } from './_actions/dashboardReports.action';

export default function DashboardReportsPage() {
  const { showToast } = useToast();
  const [reports, setReports] = useState<CitizenReport[]>(() => MockBackendService.getCitizenReports());
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);

  const handleUpdateReportStatus = async (id: string, status: CitizenReport['status']) => {
    await updateCitizenReportStatusAction(id, status);
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setSelectedReport(null);
    showToast(`Report status updated to ${status}`, 'success');
  };

  const filtered = reports.filter(r =>
    !search ||
    r.verificationCode.toLowerCase().includes(search.toLowerCase()) ||
    r.reporterName.toLowerCase().includes(search.toLowerCase()) ||
    r.area.toLowerCase().includes(search.toLowerCase()) ||
    r.meterNumber.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<CitizenReport>[] = [
    {
      header: 'Verification Code',
      accessorKey: 'verificationCode',
      sortable: true,
      cell: row => (
        <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
          {row.verificationCode}
        </span>
      )
    },
    {
      header: 'Reporter & Meter',
      accessorKey: 'reporterName',
      sortable: true,
      cell: row => (
        <div>
          <span className="font-bold text-xs text-slate-900 dark:text-white block">{row.reporterName}</span>
          <span className="font-mono text-[11px] text-slate-400">{row.meterNumber}</span>
        </div>
      )
    },
    {
      header: 'Location & Feeder',
      accessorKey: 'area',
      cell: row => (
        <div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">{row.area}</span>
          <span className="text-[11px] text-slate-400">{row.feederName}</span>
        </div>
      )
    },
    {
      header: 'Hazard Flag',
      accessorKey: 'hasSparksOrFire',
      cell: row => (
        row.hasSparksOrFire ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" /> Sparks/Fire
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">Standard</span>
        )
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: row => <StatusBadge status={row.status} size="sm" />
    },
    {
      header: 'Actions',
      cell: row => (
        <button
          onClick={e => {
            e.stopPropagation();
            setSelectedReport(row);
          }}
          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          Review
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Citizen Outage Reports & Triage Queue
        </h2>
        <p className="text-xs text-slate-500">
          Verify citizen-submitted power outage tickets, cross-reference meters, and dispatch line crews.
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by code (PO-...), reporter name, meter number, or area..."
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        pageSize={6}
        emptyTitle="No citizen reports found"
      />

      <ReportReviewModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onUpdateStatus={handleUpdateReportStatus}
      />
    </div>
  );
}
