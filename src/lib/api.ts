/**
 * Unified API Client for VoltWatch
 * Connects to live backend (Express/MongoDB or PostgreSQL) when NEXT_PUBLIC_API_URL / VITE_API_URL is configured.
 * Automatically handles JWT Bearer tokens and falls back gracefully to MockBackendService if offline.
 */

import { MockBackendService } from './mock-backend';
import { 
  OutageIncident, 
  Feeder, 
  Substation, 
  LoadSheddingSchedule, 
  CitizenReport, 
  StripeTransaction, 
  GridMetrics,
  User 
} from '../types';

// Detect API base URL from Next.js (process.env.NEXT_PUBLIC_API_URL) or Vite (import.meta.env.VITE_API_URL)
const getApiBaseUrl = (): string | null => {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
      // @ts-ignore
      return import.meta.env.VITE_API_URL;
    }
  } catch {
    // ignore
  }
  return null;
};

const API_BASE_URL = getApiBaseUrl();

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('voltwatch_jwt_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json.data !== undefined ? json.data : json;
}

export const ApiService = {
  // Check if live backend URL is configured
  isLiveConfigured: (): boolean => Boolean(API_BASE_URL),

  // --- Outages ---
  getOutages: async (): Promise<OutageIncident[]> => {
    if (!API_BASE_URL) return MockBackendService.getOutages();
    try {
      return await request<OutageIncident[]>('/outages');
    } catch (err) {
      console.warn('API error, falling back to local state:', err);
      return MockBackendService.getOutages();
    }
  },

  updateOutageStatus: async (id: string, status: OutageIncident['status'], eta?: string): Promise<OutageIncident> => {
    if (!API_BASE_URL) return MockBackendService.updateOutageStatus(id, status, eta);
    return await request<OutageIncident>(`/outages/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, estimatedRestoration: eta })
    });
  },

  // --- Feeders ---
  getFeeders: async (): Promise<Feeder[]> => {
    if (!API_BASE_URL) return MockBackendService.getFeeders();
    try {
      return await request<Feeder[]>('/feeders');
    } catch {
      return MockBackendService.getFeeders();
    }
  },

  toggleFeederStatus: async (feederId: string, status: Feeder['status']): Promise<Feeder> => {
    if (!API_BASE_URL) return MockBackendService.toggleFeederStatus(feederId, status);
    return await request<Feeder>(`/feeders/${feederId}/toggle`, {
      method: 'POST',
      body: JSON.stringify({ status })
    });
  },

  // --- Load Shedding Schedules ---
  getSchedules: async (): Promise<LoadSheddingSchedule[]> => {
    if (!API_BASE_URL) return MockBackendService.getSchedules();
    try {
      return await request<LoadSheddingSchedule[]>('/load-shedding');
    } catch {
      return MockBackendService.getSchedules();
    }
  },

  createSchedule: async (data: Omit<LoadSheddingSchedule, 'id'>): Promise<LoadSheddingSchedule> => {
    if (!API_BASE_URL) return MockBackendService.createSchedule(data);
    return await request<LoadSheddingSchedule>('/load-shedding', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // --- Citizen Reports ---
  getCitizenReports: async (): Promise<CitizenReport[]> => {
    if (!API_BASE_URL) return MockBackendService.getCitizenReports();
    try {
      return await request<CitizenReport[]>('/reports');
    } catch {
      return MockBackendService.getCitizenReports();
    }
  },

  submitCitizenReport: async (report: Omit<CitizenReport, 'id' | 'verificationCode' | 'status' | 'createdAt'>): Promise<CitizenReport> => {
    if (!API_BASE_URL) return MockBackendService.submitCitizenReport(report);
    return await request<CitizenReport>('/reports', {
      method: 'POST',
      body: JSON.stringify(report)
    });
  },

  // --- Code Verification ---
  verifyCode: async (code: string) => {
    if (!API_BASE_URL) return MockBackendService.verifyCode(code);
    try {
      return await request<any>(`/verify/${encodeURIComponent(code)}`);
    } catch {
      return MockBackendService.verifyCode(code);
    }
  },

  // --- Stripe Live Payments ---
  createStripePaymentIntent: async (params: { planId: string; amountUSD: number; userEmail: string }): Promise<{ clientSecret: string; paymentIntentId: string }> => {
    if (!API_BASE_URL) {
      // Local fallback
      return { clientSecret: `pi_mock_secret_${Date.now()}`, paymentIntentId: `pi_${Date.now()}` };
    }
    return await request<{ clientSecret: string; paymentIntentId: string }>('/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  },

  confirmStripePayment: async (params: { paymentIntentId: string; planName: string; userEmail: string; amountUSD: number; cardLast4: string; cardBrand: any }): Promise<StripeTransaction> => {
    if (!API_BASE_URL) return MockBackendService.processStripePayment(params);
    return await request<StripeTransaction>('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
};
