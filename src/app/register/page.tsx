'use client';

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Link, useRouter } from '@/src/lib/next-shim';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
import { RegisterForm } from './_components/RegisterForm';
import { registerAction } from './_actions/register.action';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData: any) => {
    setIsLoading(true);
    try {
      await registerAction(formData);
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        meterNumber: formData.meterNumber,
        role: formData.role
      });
      showToast('Account profile created! Please verify the 6-digit security code.', 'info');
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch {
      showToast('Registration failed. Please check your fields.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-6 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md shadow-amber-500/20">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Register Consumer Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Link your electricity meter number to receive automated load shedding notifications
          </p>
        </div>

        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-amber-600 dark:text-amber-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
