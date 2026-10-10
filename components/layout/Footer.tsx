import React from 'react';
import { Zap, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';
import { Link } from '@/src/lib/next-shim';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                VoltWatch
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Real-time electrical grid dispatch, automated rotational load shedding schedule intelligence, and citizen incident verification.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>National Grid Interconnected & Synced</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              24/7 Grid Control Desks
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Toll-Free Emergency</span>
                  <span>1-800-VOLT-SYS (865-8797)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Downed Lines Hazard</span>
                  <span>Emergency Dial 911 / Priority Red</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              System Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/outages" className="hover:text-amber-500 transition-colors">
                  Live Outage Map & Feeder Table
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-amber-500 transition-colors">
                  Load Shedding Rotational Timetable
                </Link>
              </li>
              <li>
                <Link href="/report-outage" className="hover:text-amber-500 transition-colors">
                  Citizen Power Cut Incident Wizard
                </Link>
              </li>
              <li>
                <Link href="/verify-report" className="hover:text-amber-500 transition-colors">
                  Code & Ticket Verification Check
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-amber-500 transition-colors">
                  Stripe Priority Alert Plans
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              Secure Gateway
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Powered exclusively by Stripe</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Direct bank-grade credit card checkout. Zero wallet redirects. PCI-DSS Level 1 compliant.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 VoltWatch Power Outage & Load Shedding Management System. Apollo-Level2 B7A7 Serial 3.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">About System</Link>
            <Link href="/contact" className="hover:underline">Contact Desks</Link>
            <span className="inline-flex items-center gap-1">
              Built with Next.js App Router Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
