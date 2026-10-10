'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  ShieldCheck, 
  Camera, 
  Copy,
  Loader2
} from 'lucide-react';
import { Link, useRouter } from '@/src/lib/next-shim';
import { MockBackendService } from '@/src/lib/mock-backend';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/context/ToastContext';
import { OutageType, OutageSeverity, CitizenReport } from '@/src/types';
import { WizardProgressBar } from './_components/WizardProgressBar';
import { submitOutageReportAction } from './_actions/reportOutage.action';

export default function ReportOutagePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdReport, setCreatedReport] = useState<CitizenReport | null>(null);

  const [formData, setFormData] = useState({
    area: user?.address || 'Cedar Meadows & Greenfield Lane',
    meterNumber: user?.meterNumber || 'MTR-8849-012',
    substationName: 'South Valley Residential Substation',
    feederName: 'F-301 Cedar Meadows Residential',
    outageType: 'TRANSFORMER_FAILURE' as OutageType,
    severity: 'HIGH' as OutageSeverity,
    description: '',
    affectedHouseholds: 30,
    hasSparksOrFire: false,
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    uploadProgress: 100,
    reporterName: user?.name || 'David H. Mitchell',
    reporterEmail: user?.email || 'citizen@voltwatch.gov',
    reporterPhone: user?.phone || '+1 (555) 234-5678'
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const substations = MockBackendService.getSubstations();
  const feeders = MockBackendService.getFeeders();

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingImage(true);
      setFormData(prev => ({ ...prev, uploadProgress: 20 }));

      setTimeout(() => {
        setFormData(prev => ({ ...prev, uploadProgress: 65 }));
      }, 400);

      setTimeout(() => {
        setFormData(prev => ({ 
          ...prev, 
          uploadProgress: 100,
          photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
        }));
        setUploadingImage(false);
        showToast('Photo evidence uploaded and encrypted.', 'success');
      }, 900);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.area.trim()) {
        showToast('Please enter your incident area/address.', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.description.trim()) {
        showToast('Please enter a short description of the power outage.', 'error');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmitReport = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const report = await submitOutageReportAction({
        meterNumber: formData.meterNumber,
        reporterName: formData.reporterName,
        reporterEmail: formData.reporterEmail,
        reporterPhone: formData.reporterPhone,
        area: formData.area,
        feederName: formData.feederName,
        substationName: formData.substationName,
        outageType: formData.outageType,
        severity: formData.severity,
        description: formData.description,
        affectedHouseholds: formData.affectedHouseholds,
        hasSparksOrFire: formData.hasSparksOrFire,
        photoUrl: formData.photoUrl
      });

      setCreatedReport(report);
      showToast(`Outage ticket created! Tracking Code: ${report.verificationCode}`, 'success');
    } catch {
      showToast('Failed to submit report. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
          <Flame className="w-3.5 h-3.5" />
          <span>Citizen Fault Reporting Wizard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Report Power Outage Incident
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Submit localized blackouts, damaged power lines, or blown transformers directly to SCADA emergency dispatch.
        </p>
      </div>

      <WizardProgressBar currentStep={step} />

      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Step 1: Incident Location & Substation Feeder</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Area / Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 428 Greenfield Lane, Cedar Meadows"
                  value={formData.area}
                  onChange={e => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Electricity Meter Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="MTR-8849-012"
                    value={formData.meterNumber}
                    onChange={e => setFormData({ ...formData, meterNumber: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Select Nearest Substation
                  </label>
                  <select
                    value={formData.substationName}
                    onChange={e => setFormData({ ...formData, substationName: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    {substations.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Target Feeder Line
                </label>
                <select
                  value={formData.feederName}
                  onChange={e => setFormData({ ...formData, feederName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  {feeders.map(f => (
                    <option key={f.id} value={f.name}>{f.name} - {f.substationName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Step 2: Outage Category & Impact Assessment</span>
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Fault Classification
                  </label>
                  <select
                    value={formData.outageType}
                    onChange={e => setFormData({ ...formData, outageType: e.target.value as OutageType })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="TRANSFORMER_FAILURE">Transformer Failure / Blow</option>
                    <option value="FALLEN_LINE">Fallen Cable / Downed Wire</option>
                    <option value="HIGH_VOLTAGE_FAULT">High Voltage Line Tripping</option>
                    <option value="SCHEDULED_LOAD_SHEDDING">Scheduled Load Shedding Issue</option>
                    <option value="UNSCHEDULED_BLACKOUT">Unscheduled Complete Blackout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Severity Priority
                  </label>
                  <select
                    value={formData.severity}
                    onChange={e => setFormData({ ...formData, severity: e.target.value as OutageSeverity })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="CRITICAL">Critical (Total Sector Outage)</option>
                    <option value="HIGH">High (Entire Street / Sub-feeder)</option>
                    <option value="MODERATE">Moderate (Cluster of 10-20 homes)</option>
                    <option value="LOW">Low (Single Premise Drop)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Estimated Affected Households
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={formData.affectedHouseholds}
                  onChange={e => setFormData({ ...formData, affectedHouseholds: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Incident Description & Symptoms *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what occurred (e.g. loud explosion sound on pole, smell of smoke, sudden voltage plunge)..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-500" />
              <span>Step 3: Photo Evidence & Safety Flags</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="safetyCheck"
                  checked={formData.hasSparksOrFire}
                  onChange={e => setFormData({ ...formData, hasSparksOrFire: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="safetyCheck" className="text-xs text-rose-700 dark:text-rose-300 font-medium cursor-pointer">
                  <strong className="block text-rose-600 dark:text-rose-400 uppercase font-bold">
                    Urgent Hazard Warning: Active Sparks, Smoke, or Downed Live Cable
                  </strong>
                  Check this box if wires are lying on the ground, touching trees, or actively sparking. This triggers priority Red-Code emergency truck dispatch.
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Upload Photo Evidence (Cloud Storage)
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-3 hover:border-amber-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-slate-500">
                    <label htmlFor="fileInput" className="font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">
                      Click to browse image
                    </label>{' '}
                    or drag snapshot here (JPG, PNG up to 10MB)
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleSimulatePhotoUpload}
                    className="hidden"
                  />

                  {uploadingImage && (
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Uploading to secure storage...</span>
                        <span>{formData.uploadProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-200"
                          style={{ width: `${formData.uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {formData.photoUrl && !uploadingImage && (
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <img
                        src={formData.photoUrl}
                        alt="Evidence Preview"
                        className="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
                      />
                      <div className="text-left text-xs">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Photo Verified & Attached
                        </span>
                        <span className="text-slate-400 block mt-0.5">outage_incident_evidence.jpg</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {createdReport ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Incident Report Dispatched & Verified
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Your report has been logged and assigned an official tracking verification code.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      Official Tracking Code
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(createdReport.verificationCode);
                        showToast(`Copied code ${createdReport.verificationCode} to clipboard!`, 'info');
                      }}
                      className="p-1 rounded text-amber-600 hover:text-amber-800 dark:text-amber-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                    {createdReport.verificationCode}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1 border-t border-amber-500/20">
                    <div>Feeder: <strong className="text-slate-900 dark:text-white">{createdReport.feederName}</strong></div>
                    <div>Location: <span>{createdReport.area}</span></div>
                    <div>Status: <span className="font-bold text-emerald-600 uppercase">{createdReport.status}</span></div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                  <Link
                    href={`/verify-report?code=${createdReport.verificationCode}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md text-center transition-colors"
                  >
                    Track Report Status →
                  </Link>
                  <Link
                    href="/"
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Step 4: Contact & Verification Confirmation</span>
                </h3>

                <p className="text-xs text-slate-500">
                  Please confirm your contact details to receive dispatch updates and SMS notifications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                      Reporter Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.reporterName}
                      onChange={e => setFormData({ ...formData, reporterName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                      Reporter Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.reporterPhone}
                      onChange={e => setFormData({ ...formData, reporterPhone: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Reporter Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.reporterEmail}
                    onChange={e => setFormData({ ...formData, reporterEmail: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider">
                    Incident Dispatch Summary
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Classification:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.outageType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Severity:</span>
                    <span className="font-semibold text-rose-500">{formData.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Safety Hazard Flag:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.hasSparksOrFire ? 'YES (PRIORITY)' : 'NO'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!createdReport && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitReport}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Incident...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit & Generate Verification Code</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
