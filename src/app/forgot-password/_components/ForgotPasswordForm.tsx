import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { Link } from '@/src/lib/next-shim';

interface ForgotPasswordFormProps {
  onSendCode: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSendCode }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onSendCode(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reset Password
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your work or consumer email to receive a password reset code
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
          Account Email
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="email"
            required
            placeholder="name@voltwatch.gov"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
      >
        <span>Send Verification Code</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center pt-2">
        <Link href="/login" className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to login</span>
        </Link>
      </div>
    </form>
  );
};
