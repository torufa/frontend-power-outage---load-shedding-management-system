'use client';

import React from 'react';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';
import { DashboardHeader } from '../../components/layout/DashboardHeader';
import { useAuth } from '../../context/AuthContext';
import { Link } from '../../lib/next-shim';
import { Lock } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Authentication Required
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Please sign in to access the VoltWatch SCADA Grid Command Dashboard.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3 px-4 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md"
          >
            Go to Login (Demo Roles Available)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
