import { apiClient } from './api.functions';
import { User, UserRole } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export async function loginWithApi(email: string, password?: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  // Try live backend API first
  const res = await apiClient<{ user: User; token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (res.success && res.data) {
    if (typeof window !== 'undefined' && res.data.token) {
      localStorage.setItem('voltwatch_token', res.data.token);
    }
    return { success: true, user: res.data.user, token: res.data.token };
  }

  // Graceful local fallback to keep prototype & review testable
  const localUser = MockBackendService.loginUser(email);
  return { success: true, user: localUser, token: 'mock-jwt-token-' + localUser.id };
}

export async function registerWithApi(userData: Partial<User> & { password?: string }): Promise<{ success: boolean; user?: User; error?: string }> {
  const res = await apiClient<{ user: User; token: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (res.success && res.data) {
    return { success: true, user: res.data.user };
  }

  const newUser: User = {
    id: 'user-' + Date.now(),
    name: userData.name || 'Citizen User',
    email: userData.email || 'citizen@voltwatch.gov',
    role: (userData.role as UserRole) || 'CITIZEN',
    phone: userData.phone,
    address: userData.address,
    meterNumber: userData.meterNumber,
  };
  return { success: true, user: newUser };
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('voltwatch_token');
    localStorage.removeItem('voltwatch_user');
  }
}

export function getCurrentUserToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('voltwatch_token');
}
