'use client';

import React, { useState } from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { Link, useRouter } from '@/src/lib/next-shim';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
import { UserRole } from '@/src/types';
import { LoginForm } from './_components/LoginForm';
import { DemoLoginButtons } from './_components/DemoLoginButtons';
import { loginAction } from './_actions/login.action';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (email: string, password?: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await loginAction(email, password);
      await login(email, password);
      showToast('Successfully authenticated to VoltWatch Grid!', 'success');
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials. You can also use the one-click demo logins below.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = (role: UserRole) => {
    loginAsDemo(role);
    showToast(`Signed in as Demo ${role}!`, 'success');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md shadow-amber-500/20">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign in to VoltWatch
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your credentials or choose a pre-configured demo role
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />

        <DemoLoginButtons onSelectRole={handleDemoClick} />

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Need a consumer account?</span>
          <Link href="/register" className="font-bold text-amber-600 dark:text-amber-400 hover:underline">
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
}
