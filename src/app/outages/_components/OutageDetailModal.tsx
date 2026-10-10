import React from 'react';
import { PhoneCall } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from '@/src/lib/next-shim';
import { OutageIncident } from '@/src/types';

interface OutageDetailModalProps {
  incident: OutageIncident | null;
  onClose: () => void;
}

export const OutageDetailModal: React.FC<OutageDetailModalProps> = ({ incident, onClose }) => {
  if (!incident) return null;

  return (
    <Modal
      isOpen={!!incident}
      onClose={onClose}
      title={`Incident ${incident.trackingCode}`}
      subtitle={incident.title}
      maxWidth="lg"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <StatusBadge status={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>
          <span className="text-xs text-slate-400">
            Reported {incident.reportedAt}
          </span>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {incident.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Location & Area</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{incident.area}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Affected Feeder</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{incident.feederName}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Impacted Consumers</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{incident.affectedCustomers.toLocaleString()} households</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Restoration ETA</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">{incident.estimatedRestoration}</span>
          </div>
        </div>

        {incident.assignedCrew && (
          <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-xs">
            <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">
              Assigned Emergency Response Crew
            </span>
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span>{incident.assignedCrew.name} ({incident.assignedCrew.vehicleId})</span>
              <a
                href={`tel:${incident.assignedCrew.contact}`}
                className="font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <PhoneCall className="w-3 h-3" />
                {incident.assignedCrew.contact}
              </a>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Link
            href={`/verify-report?code=${incident.trackingCode}`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs text-center shadow-md transition-colors"
          >
            Open Full Verification Tracker
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
