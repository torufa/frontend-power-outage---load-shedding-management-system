import { apiClient } from './api.functions';
import { OutageIncident, OutageStatus, OutageSeverity } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export async function fetchOutagesFromApi(): Promise<OutageIncident[]> {
  const res = await apiClient<OutageIncident[]>('/outages');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return MockBackendService.getOutages();
}

export async function createOutageWithApi(data: Partial<OutageIncident>): Promise<OutageIncident> {
  const res = await apiClient<OutageIncident>('/outages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.createOutage({
    title: data.title || 'Grid Disturbance',
    feederId: data.feederId || 'fdr-1',
    feederName: data.feederName || 'Gulshan North Feeder',
    substationId: data.substationId || 'sub-1',
    area: data.area || 'Gulshan 2',
    severity: data.severity || 'HIGH',
    cause: data.cause || 'Under Investigation',
    affectedCustomers: data.affectedCustomers || 1500,
  });
}

export async function updateOutageStatusWithApi(id: string, status: OutageStatus): Promise<OutageIncident | null> {
  const res = await apiClient<OutageIncident>(`/outages/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.updateOutageStatus(id, status);
}

export async function verifyIncidentCode(code: string): Promise<OutageIncident | null> {
  const res = await apiClient<OutageIncident>(`/outages/verify/${code}`);
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.verifyIncidentCode(code);
}
