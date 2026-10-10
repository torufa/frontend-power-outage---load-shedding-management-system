import React from 'react';
import { ZapOff, ArrowLeft } from 'lucide-react';
import { Link } from '../lib/next-shim';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
          <ZapOff className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Error 404 • Feeder Disconnected
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Substation Node Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            The requested grid resource, feeder route, or incident report does not exist or has been decommissioned.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Grid Command Portal</span>
        </Link>
      </div>
    </div>
  );
}
