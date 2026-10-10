'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MockBackendService } from '@/src/lib/mock-backend';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/src/context/ToastContext';
import { Feeder, LoadSheddingSchedule } from '@/src/types';
import { FeederSwitchboard } from './_components/FeederSwitchboard';
import { toggleFeederLoadShedAction, createLoadShedScheduleAction } from './_actions/dashboardLoadShedding.action';

export default function DashboardLoadSheddingPage() {
  const { showToast } = useToast();

  const [feeders, setFeeders] = useState<Feeder[]>(() => MockBackendService.getFeeders());
  const [schedules, setSchedules] = useState<LoadSheddingSchedule[]>(() => MockBackendService.getSchedules());
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    zone: 'Zone 1 - Commercial Core',
    feederId: 'fdr-01',
    feederName: 'F-101 Metro Commercial',
    area: 'Commercial Plaza Block B',
    startTime: '14:00',
    endTime: '16:00',
    date: '2026-10-09',
    expectedReliefMW: 24,
    reason: 'Mid-afternoon thermal overload relief'
  });

  const handleToggleFeeder = async (feederId: string, currentStatus: Feeder['status']) => {
    const nextStatus = currentStatus === 'ONLINE' ? 'LOAD_SHEDDING' : 'ONLINE';
    const updated = await toggleFeederLoadShedAction(feederId, nextStatus);
    setFeeders(prev => prev.map(f => f.id === feederId ? updated : f));
    showToast(`Feeder ${updated.name} switched to ${nextStatus}`, 'info');
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createLoadShedScheduleAction({
      zone: newSchedule.zone,
      feederId: newSchedule.feederId,
      feederName: newSchedule.feederName,
      area: newSchedule.area,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      date: newSchedule.date,
      status: 'SCHEDULED',
      expectedReliefMW: newSchedule.expectedReliefMW,
      reason: newSchedule.reason,
      notificationSent: false
    });
    setSchedules(prev => [created, ...prev]);
    setCreateModalOpen(false);
    showToast('New load shedding rota added to national timetable.', 'success');
  };

  const scheduleColumns: Column<LoadSheddingSchedule>[] = [
    {
      header: 'Time Window',
      accessorKey: 'startTime',
      sortable: true,
      cell: row => (
        <span className="font-mono font-bold text-xs">
          {row.startTime} - {row.endTime}
        </span>
      )
    },
    {
      header: 'Feeder',
      accessorKey: 'feederName',
      sortable: true,
      cell: row => (
        <div>
          <span className="font-bold text-xs text-slate-900 dark:text-white block">{row.feederName}</span>
          <span className="text-[11px] text-slate-500">{row.area}</span>
        </div>
      )
    },
    {
      header: 'Relief Target',
      accessorKey: 'expectedReliefMW',
      cell: row => <span className="font-mono font-bold text-amber-500 text-xs">{row.expectedReliefMW} MW</span>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: row => <StatusBadge status={row.status} size="sm" />
    },
    {
      header: 'Reason',
      accessorKey: 'reason',
      cell: row => <span className="text-xs text-slate-500 line-clamp-1">{row.reason}</span>
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Rotational Load Shedding Manager
          </h2>
          <p className="text-xs text-slate-500">
            Emergency feeder breaker isolation controls & automated rotational timetable.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Rota</span>
        </button>
      </div>

      <FeederSwitchboard feeders={feeders} onToggle={handleToggleFeeder} />

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          Active & Scheduled Rotas
        </h3>
        <DataTable
          data={schedules}
          columns={scheduleColumns}
          pageSize={5}
        />
      </div>

      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Schedule New Load Shedding Rota"
        subtitle="Add automated rotational outage window to public schedule"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSchedule} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Grid Feeder</label>
            <select
              value={newSchedule.feederId}
              onChange={e => {
                const f = feeders.find(item => item.id === e.target.value);
                setNewSchedule({
                  ...newSchedule,
                  feederId: e.target.value,
                  feederName: f?.name || '',
                  zone: f?.zone || 'Zone 1',
                  expectedReliefMW: f?.capacityMW || 20
                });
              }}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {feeders.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.capacityMW} MW)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Start Time (HH:mm)</label>
              <input
                type="time"
                value={newSchedule.startTime}
                onChange={e => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                required
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">End Time (HH:mm)</label>
              <input
                type="time"
                value={newSchedule.endTime}
                onChange={e => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                required
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Reason / Notes</label>
            <input
              type="text"
              placeholder="e.g. Generation capacity deficit reduction"
              value={newSchedule.reason}
              onChange={e => setNewSchedule({ ...newSchedule, reason: e.target.value })}
              required
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md"
            >
              Add to Schedule
            </button>
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
