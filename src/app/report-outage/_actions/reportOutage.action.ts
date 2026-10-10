import { MockBackendService } from '@/src/lib/mock-backend';
import { CitizenReport } from '@/src/types';

export async function submitOutageReportAction(
  data: Omit<CitizenReport, 'id' | 'verificationCode' | 'status' | 'createdAt'>
): Promise<CitizenReport> {
  return MockBackendService.submitCitizenReport(data);
}
