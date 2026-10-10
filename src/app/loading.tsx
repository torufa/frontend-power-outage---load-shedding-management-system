import React from 'react';
import { Zap } from 'lucide-react';
import { CardSkeleton, TableSkeleton } from '../components/ui/SkeletonLoader';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center animate-spin">
          <Zap className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-3 w-64 rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <TableSkeleton rows={5} />
      </div>
    </div>
  );
}
