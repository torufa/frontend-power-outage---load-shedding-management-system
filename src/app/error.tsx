import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from '../lib/next-shim';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-5 p-8 rounded-3xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto ring-8 ring-rose-500/5">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Grid System Synchronous Exception
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {error?.message || 'A transmission glitch occurred while loading telemetry data. Safety fallback state triggered.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {reset && (
            <button
              onClick={() => reset()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Telemetry
            </button>
          )}
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            Return to Grid Home
          </Link>
        </div>
      </div>
    </div>
  );
}
