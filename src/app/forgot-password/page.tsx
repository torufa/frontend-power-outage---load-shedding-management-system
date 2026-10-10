'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useRouter } from '@/src/lib/next-shim';
import { VerificationCodeInput } from '@/components/ui/VerificationCodeInput';
import { useToast } from '@/src/context/ToastContext';
import { ForgotPasswordForm } from './_components/ForgotPasswordForm';
import { sendPasswordResetCodeAction, resetPasswordAction } from './_actions/forgotPassword.action';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState<'EMAIL' | 'VERIFY_CODE' | 'NEW_PASSWORD' | 'DONE'>('EMAIL');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async (userEmail: string) => {
    setEmail(userEmail);
    await sendPasswordResetCodeAction(userEmail);
    showToast(`Password recovery verification code sent to ${userEmail}`, 'info');
    setStep('VERIFY_CODE');
  };

  const handleVerifyCode = (code: string) => {
    if (code.length === 6) {
      showToast('Verification code confirmed! You can now set a new password.', 'success');
      setStep('NEW_PASSWORD');
    } else {
      setError('Please provide the full 6-digit verification code.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    await resetPasswordAction(email, newPassword);
    showToast('Your password has been securely reset.', 'success');
    setStep('DONE');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden">
        {step === 'EMAIL' && (
          <ForgotPasswordForm onSendCode={handleSendCode} />
        )}

        {step === 'VERIFY_CODE' && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Verify Identity Code
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter the 6-digit security code dispatched to {email}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex justify-between items-center text-indigo-700 dark:text-indigo-300">
              <span>Test Reset Code: <strong className="font-mono">882910</strong></span>
              <button
                type="button"
                onClick={() => handleVerifyCode('882910')}
                className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[11px]"
              >
                Autofill
              </button>
            </div>

            <VerificationCodeInput
              length={6}
              error={error}
              onComplete={handleVerifyCode}
              onResend={() => showToast('New reset code sent!', 'info')}
            />
          </div>
        )}

        {step === 'NEW_PASSWORD' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create New Password
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a strong passphrase for your VoltWatch account
              </p>
            </div>

            {error && (
              <p className="text-xs text-rose-500 font-semibold text-center">{error}</p>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'DONE' && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Password Reset Complete
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You can now login with your updated security credentials.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md"
            >
              Sign In Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
