import { apiClient } from './api.functions';
import { CitizenReport } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export async function fetchCitizenReportsFromApi(): Promise<CitizenReport[]> {
  const res = await apiClient<CitizenReport[]>('/reports');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return MockBackendService.getCitizenReports();
}

export async function submitCitizenReportWithApi(
  data: Omit<CitizenReport, 'id' | 'createdAt' | 'upvotes' | 'status' | 'verificationCode'>
): Promise<CitizenReport> {
  const res = await apiClient<CitizenReport>('/reports', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.submitCitizenReport(data);
}

export async function upvoteReportWithApi(id: string): Promise<CitizenReport | null> {
  const res = await apiClient<CitizenReport>(`/reports/${id}/upvote`, {
    method: 'POST',
  });
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.upvoteReport(id);
}

export async function verifyReportCode(code: string): Promise<CitizenReport | null> {
  const res = await apiClient<CitizenReport>(`/reports/verify/${code}`);
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.verifyReportCode(code);
}
