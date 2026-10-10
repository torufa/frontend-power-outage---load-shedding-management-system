import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { OutageIncident, OutageStatus } from '@/src/types';

interface OutageStatusModalProps {
  incident: OutageIncident | null;
  onClose: () => void;
  onSave: (id: string, status: OutageStatus, eta: string) => void;
}

export const OutageStatusModal: React.FC<OutageStatusModalProps> = ({
  incident,
  onClose,
  onSave
}) => {
  const [newStatus, setNewStatus] = useState<OutageStatus>(incident?.status || 'INVESTIGATING');
  const [newETA, setNewETA] = useState(incident?.estimatedRestoration || '');

  if (!incident) return null;

  const handleSave = () => {
    onSave(incident.id, newStatus, newETA || incident.estimatedRestoration);
  };

  return (
    <Modal
      isOpen={!!incident}
      onClose={onClose}
      title={`Update Outage ${incident.trackingCode}`}
      subtitle={incident.title}
      maxWidth="md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            Restoration Status
          </label>
          <select
            value={newStatus}
            onChange={e => setNewStatus(e.target.value as OutageStatus)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            <option value="INVESTIGATING">Investigating</option>
            <option value="CREW_DISPATCHED">Crew Dispatched</option>
            <option value="RESTORATION_IN_PROGRESS">Restoration In Progress</option>
            <option value="RESOLVED">Resolved (Power Restored)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
            Estimated Restoration ETA
          </label>
          <input
            type="text"
            value={newETA}
            onChange={e => setNewETA(e.target.value)}
            placeholder="e.g. 2026-10-09 02:45 PM"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md"
          >
            Save Status Transition
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
