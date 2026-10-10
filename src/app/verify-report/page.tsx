'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import { useSearchParams } from '@/src/lib/next-shim';
import { useToast } from '@/src/context/ToastContext';
import { verifyReportCodeAction } from './_actions/verifyReport.action';
import { VerificationResultCard } from './_components/VerificationResultCard';

export default function VerifyReportPage() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const codeParam = searchParams.get('code') || '';
  const [codeInput, setCodeInput] = useState(codeParam);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (codeParam) {
      handleVerify(codeParam);
    }
  }, [codeParam]);

  const handleVerify = async (codeToTest?: string) => {
    const target = (codeToTest || codeInput).trim();
    if (!target) {
      showToast('Please enter an outage code, meter number, or OTP.', 'warning');
      return;
    }

    setHasSearched(true);
    const result = await verifyReportCodeAction(target);
    setVerificationResult(result);

    if (result.isValid) {
      showToast(`Verification Successful for ${target}!`, 'success');
    } else {
      showToast('Code verification could not find this record.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SCADA Cryptographic Verification Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Code & Incident Verification
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Verify official Outage Tracking Tickets (<code className="font-mono text-amber-500">PO-XXXXX</code>), Smart Consumer Meters (<code className="font-mono text-emerald-500">MTR-XXXX</code>), or 6-digit identity OTPs.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Code (e.g. PO-84921, PO-72810, or MTR-8849-012)..."
              value={codeInput}
              onChange={e => setCodeInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm font-mono uppercase rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-sm"
            />
          </div>
          <button
            onClick={() => handleVerify()}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Code</span>
          </button>
        </div>

        <div className="pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Click to test active verification codes:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Outage PO-84921 (Critical Line Trip)', code: 'PO-84921' },
              { label: 'Outage PO-41093 (Transformer Alarm)', code: 'PO-41093' },
              { label: 'Citizen Ticket PO-72810', code: 'PO-72810' },
              { label: 'Smart Meter MTR-8849-012', code: 'MTR-8849-012' },
              { label: 'Auth OTP 123456', code: '123456' },
            ].map(pill => (
              <button
                key={pill.code}
                type="button"
                onClick={() => {
                  setCodeInput(pill.code);
                  handleVerify(pill.code);
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasSearched && (
        <VerificationResultCard code={codeInput} result={verificationResult} />
      )}
    </div>
  );
}
