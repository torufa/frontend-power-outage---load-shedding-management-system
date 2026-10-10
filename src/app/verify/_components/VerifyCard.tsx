import React from 'react';
import { ShieldCheck, KeyRound } from 'lucide-react';
import { VerificationCodeInput } from '@/components/ui/VerificationCodeInput';
import { Link } from '@/src/lib/next-shim';

interface VerifyCardProps {
  email: string;
  isLoading: boolean;
  error: string | null;
  onVerify: (code: string) => void;
  onResend: () => void;
}

export const VerifyCard: React.FC<VerifyCardProps> = ({
  email,
  isLoading,
  error,
  onVerify,
  onResend
}) => {
  return (
    <>
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Enter Verification Code
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We sent a 6-digit confirmation code to <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>
        </p>
      </div>

      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
          <KeyRound className="w-4 h-4" />
          <span>Test Code: <strong className="font-mono">123456</strong></span>
        </div>
        <button
          type="button"
          onClick={() => onVerify('123456')}
          className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-bold shadow-sm hover:bg-amber-600 transition-colors"
        >
          Autofill & Verify
        </button>
      </div>

      <div className="py-2">
        <VerificationCodeInput
          length={6}
          isLoading={isLoading}
          error={error}
          onComplete={onVerify}
          onResend={onResend}
        />
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Have an Outage Incident Code?</span>
        <Link href="/verify-report" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
          Verify PO-Ticket →
        </Link>
      </div>
    </>
  );
};
