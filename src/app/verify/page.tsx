'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from '@/src/lib/next-shim';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
import { VerifyCard } from './_components/VerifyCard';
import { verifyOtpAction } from './_actions/verify.action';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyOTP, user } = useAuth();
  const { showToast } = useToast();

  const emailParam = searchParams.get('email') || user?.email || 'citizen@voltwatch.gov';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleVerifyCode = async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(r => setTimeout(r, 500));
      const res = await verifyOtpAction(code);

      if (res.isValid) {
        await verifyOTP(code);
        setVerifiedSuccess(true);
        showToast('Code verification successful! Identity confirmed.', 'success');
      } else {
        setError(res.message || 'Verification code invalid. Try 123456 for sample verification.');
      }
    } catch {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    showToast(`New 6-digit verification code dispatched to ${emailParam}.`, 'info');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {verifiedSuccess ? (
          <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Verification Complete!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Your credentials have been securely verified on the National SCADA Grid registry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 text-left space-y-1">
              <div className="flex justify-between font-medium">
                <span>Account Status:</span>
                <span className="font-bold">VERIFIED & ACTIVE</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Contact:</span>
                <span>{emailParam}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Security Token:</span>
                <span className="font-mono">AUTH-VALID-2026</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Access Grid Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <VerifyCard
            email={emailParam}
            isLoading={isLoading}
            error={error}
            onVerify={handleVerifyCode}
            onResend={handleResend}
          />
        )}
      </div>
    </div>
  );
}
