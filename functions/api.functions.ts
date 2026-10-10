/**
 * Central API Client for connecting Frontend to Backend
 * Repo: https://github.com/torufa/power-outage---load-shedding-management-system
 */

export const API_BASE_URL = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 
  'http://localhost:5000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('voltwatch_token') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: data?.message || data?.error || `HTTP error! status: ${response.status}`,
        data,
      };
    }

    return {
      success: true,
      data: data?.data || data,
      message: data?.message,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network connection failed. Backend might be unreachable.',
    };
  }
}
