'use client';

import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { EmergencyHotlineCard } from './_components/EmergencyHotlineCard';

export default function ContactPage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your emergency inquiry has been logged to Grid Dispatch.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          24/7 Grid Control & Dispatch
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Need immediate assistance with high-voltage hazards or transformer failures? Contact our round-the-clock emergency desk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-4">
          <EmergencyHotlineCard />

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Emergency Hotlines
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Downed Power Lines Hazard</strong>
                  <span>Immediate Life-Safety: Dial 911 or 1-800-VOLT-911</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400">
                <PhoneCall className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Toll-Free Outage Line</strong>
                  <span>1-800-VOLT-SYS (Available 24 Hours / 7 Days)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <Mail className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Dispatch Operations Desk</strong>
                  <span>dispatch@voltwatch.gov</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Transmitted
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Our duty SCADA engineer has logged your message. If this is an active power outage, please also submit via our incident wizard.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Send Grid Inquiry / Feedback
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="David Mitchell"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="citizen@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Inquiry regarding Feeder F-301 shedding schedule"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter details of your feedback or inquiry..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit to Grid Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
