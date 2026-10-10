'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Bell, MapPin } from 'lucide-react';
import { useSearchParams, Link } from '@/src/lib/next-shim';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { LoadSheddingSchedule } from '@/src/types';
import { getSchedulesAction } from './_actions/schedule.action';
import { ActiveSheddingBanner } from './_components/ActiveSheddingBanner';

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const feederParam = searchParams.get('feeder') || '';

  const [search, setSearch] = useState(feederParam);
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [schedules] = useState<LoadSheddingSchedule[]>(() => {
    return [
      {
        id: 'sch-01',
        zone: 'Zone 2 - Industrial District',
        feederId: 'fdr-03',
        feederName: 'F-201 Heavy Manufacturing Plant Feeder',
        area: 'Industrial Sector 4 to 9',
        startTime: '11:00',
        endTime: '13:00',
        date: '2026-10-09',
        status: 'ACTIVE_SHEDDING',
        expectedReliefMW: 32.0,
        reason: 'Deficit balance management due to hydro turbine routine servicing',
        notificationSent: true
      },
      {
        id: 'sch-02',
        zone: 'Zone 4 - Western Hills',
        feederId: 'fdr-07',
        feederName: 'F-401 Ridge Summit Feeder',
        area: 'Ridge Crest & Summit Road',
        startTime: '11:30',
        endTime: '13:30',
        date: '2026-10-09',
        status: 'ACTIVE_SHEDDING',
        expectedReliefMW: 14.0,
        reason: 'Transmission bottleneck reduction during mid-day thermal peak',
        notificationSent: true
      },
      {
        id: 'sch-03',
        zone: 'Zone 3 - Southern Sector',
        feederId: 'fdr-06',
        feederName: 'F-302 Parkview Estates',
        area: 'Parkview Heights & Lakeview',
        startTime: '14:00',
        endTime: '16:00',
        date: '2026-10-09',
        status: 'SCHEDULED',
        expectedReliefMW: 15.0,
        reason: 'Scheduled rotational load distribution',
        notificationSent: true
      },
      {
        id: 'sch-04',
        zone: 'Zone 1 - Commercial Core',
        feederId: 'fdr-01',
        feederName: 'F-101 Metro Commercial',
        area: 'Commercial Plaza Block B',
        startTime: '16:30',
        endTime: '18:00',
        date: '2026-10-09',
        status: 'SCHEDULED',
        expectedReliefMW: 24.0,
        reason: 'Evening lighting surge peak containment',
        notificationSent: false
      },
      {
        id: 'sch-05',
        zone: 'Zone 3 - Southern Sector',
        feederId: 'fdr-06',
        feederName: 'F-302 Parkview Estates',
        area: 'Parkview Estates South Block',
        startTime: '08:00',
        endTime: '10:00',
        date: '2026-10-09',
        status: 'COMPLETED',
        expectedReliefMW: 15.0,
        reason: 'Morning peak generation offset',
        notificationSent: true
      }
    ];
  });

  const filteredSchedules = useMemo(() => {
    return schedules.filter(item => {
      const matchesSearch = !search ||
        item.feederName.toLowerCase().includes(search.toLowerCase()) ||
        item.area.toLowerCase().includes(search.toLowerCase()) ||
        item.zone.toLowerCase().includes(search.toLowerCase());

      const matchesZone = zoneFilter === 'ALL' || item.zone.includes(zoneFilter);
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesZone && matchesStatus;
    });
  }, [schedules, search, zoneFilter, statusFilter]);

  const activeShedding = schedules.filter(s => s.status === 'ACTIVE_SHEDDING');

  const columns: Column<LoadSheddingSchedule>[] = [
    {
      header: 'Time Window',
      accessorKey: 'startTime',
      sortable: true,
      cell: row => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {row.startTime} - {row.endTime}
          </span>
        </div>
      )
    },
    {
      header: 'Grid Zone',
      accessorKey: 'zone',
      sortable: true,
      cell: row => (
        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
          {row.zone}
        </span>
      )
    },
    {
      header: 'Feeder & Area',
      accessorKey: 'feederName',
      sortable: true,
      cell: row => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.feederName}</div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{row.area}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Relief Target',
      accessorKey: 'expectedReliefMW',
      sortable: true,
      cell: row => (
        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
          {row.expectedReliefMW} MW
        </span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: row => <StatusBadge status={row.status} size="sm" />
    },
    {
      header: 'Shed Reason',
      accessorKey: 'reason',
      cell: row => (
        <span className="text-xs text-slate-500 line-clamp-1 max-w-[200px]" title={row.reason}>
          {row.reason}
        </span>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Rotational Grid Balancing</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Load Shedding Rotational Timetable
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official scheduled outage rota published by the National Load Dispatch Center.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span>Subscribe to SMS Feeder Warnings</span>
        </Link>
      </div>

      <ActiveSheddingBanner activeShedding={activeShedding} />

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by feeder name, area, or zone..."
          className="flex-1"
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <option value="ALL">All Zones</option>
            <option value="Zone 1">Zone 1 (Commercial)</option>
            <option value="Zone 2">Zone 2 (Industrial)</option>
            <option value="Zone 3">Zone 3 (Southern)</option>
            <option value="Zone 4">Zone 4 (Western Hills)</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE_SHEDDING">Active Shedding</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <DataTable
        data={filteredSchedules}
        columns={columns}
        pageSize={6}
        emptyTitle="No schedules found"
        emptyDescription="No scheduled load shedding rotas match your filter criteria."
      />
    </div>
  );
}
