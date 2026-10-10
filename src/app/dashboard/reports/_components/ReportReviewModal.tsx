import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { CitizenReport } from '@/src/types';

interface ReportReviewModalProps {
  report: CitizenReport | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: CitizenReport['status']) => void;
}

export const ReportReviewModal: React.FC<ReportReviewModalProps> = ({
  report,
  onClose,
  onUpdateStatus
}) => {
  if (!report) return null;

  return (
    <Modal
      isOpen={!!report}
      onClose={onClose}
      title={`Citizen Ticket ${report.verificationCode}`}
      subtitle={`Submitted by ${report.reporterName} on ${report.createdAt}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Meter Account:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{report.meterNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reporter Contact:</span>
            <span>{report.reporterPhone} • {report.reporterEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reported Area:</span>
            <span>{report.area}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Feeder:</span>
            <span className="font-semibold">{report.feederName}</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500">Citizen Description</span>
          <p className="text-xs text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            {report.description}
          </p>
        </div>

        {report.photoUrl && (
          <div>
            <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Attached Evidence</span>
            <img
              src={report.photoUrl}
              alt="Incident Evidence"
              className="w-full h-48 object-cover rounded-2xl border border-slate-200 dark:border-slate-700"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onUpdateStatus(report.id, 'DISPATCHED')}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
          >
            Approve & Dispatch Crew
          </button>
          <button
            onClick={() => onUpdateStatus(report.id, 'RESOLVED')}
            className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm"
          >
            Mark Resolved
          </button>
          <button
            onClick={() => onUpdateStatus(report.id, 'REJECTED')}
            className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 font-bold text-xs"
          >
            Reject / Duplicate
          </button>
        </div>
      </div>
    </Modal>
  );
};
