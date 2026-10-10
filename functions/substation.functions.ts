import { apiClient } from './api.functions';
import { Substation, GridMetrics } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export async function fetchSubstationsFromApi(): Promise<Substation[]> {
  const res = await apiClient<Substation[]>('/substations');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return MockBackendService.getSubstations();
}

export async function fetchGridMetricsFromApi(): Promise<GridMetrics> {
  const res = await apiClient<GridMetrics>('/metrics/grid');
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.getGridMetrics();
}
