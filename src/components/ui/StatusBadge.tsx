import React from 'react';
import { 
  OutageStatus, 
  OutageSeverity, 
  Feeder, 
  LoadSheddingSchedule, 
  CitizenReport 
} from '../../types';

interface StatusBadgeProps {
  status: 
    | OutageStatus 
    | OutageSeverity 
    | Feeder['status'] 
    | LoadSheddingSchedule['status'] 
    | CitizenReport['status'] 
    | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const getBadgeConfig = (val: string) => {
    switch (val) {
      // Outage status
      case 'INVESTIGATING':
        return { label: 'Investigating', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' };
      case 'CREW_DISPATCHED':
        return { label: 'Crew Dispatched', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' };
      case 'RESTORATION_IN_PROGRESS':
        return { label: 'Restoring Grid', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' };
      case 'RESOLVED':
      case 'ONLINE':
      case 'COMPLETED':
        return { label: val === 'ONLINE' ? 'Active Feeder' : val === 'COMPLETED' ? 'Completed' : 'Resolved', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };

      // Severities
      case 'CRITICAL':
        return { label: 'Critical Severity', color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 font-semibold' };
      case 'HIGH':
        return { label: 'High Priority', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' };
      case 'MODERATE':
        return { label: 'Moderate', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' };
      case 'LOW':
        return { label: 'Low', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' };

      // Feeder status
      case 'LOAD_SHEDDING':
      case 'ACTIVE_SHEDDING':
        return { label: 'Load Shedding', color: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30 animate-pulse' };
      case 'OUTAGE':
        return { label: 'Grid Outage', color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30' };
      case 'MAINTENANCE':
        return { label: 'Maintenance', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' };
      case 'SCHEDULED':
        return { label: 'Scheduled Rota', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' };

      // Citizen report status
      case 'VERIFIED':
        return { label: 'Verified Code', color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20' };
      case 'PENDING_VERIFICATION':
        return { label: 'Pending Verification', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' };
      case 'DISPATCHED':
        return { label: 'Field Dispatched', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' };
      case 'REJECTED':
        return { label: 'Rejected / Duplicate', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' };

      default:
        return { label: val.replace(/_/g, ' '), color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' };
    }
  };

  const config = getBadgeConfig(status);

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full',
    md: 'text-xs px-3 py-1 rounded-full font-medium',
    lg: 'text-sm px-3.5 py-1.5 rounded-full font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border tracking-wide uppercase ${sizeStyles[size]} ${config.color} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      {config.label}
    </span>
  );
};
