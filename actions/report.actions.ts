import { ApiService } from '@/src/lib/api';
import { CitizenReport } from '@/src/types';

export async function fetchAllCitizenReports(): Promise<CitizenReport[]> {
  return await ApiService.getCitizenReports();
}

export async function submitCitizenReportAction(
  report: Omit<CitizenReport, 'id' | 'verificationCode' | 'status' | 'createdAt'>
): Promise<CitizenReport> {
  return await ApiService.submitCitizenReport(report);
}
