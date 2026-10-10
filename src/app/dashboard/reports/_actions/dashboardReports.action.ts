import { MockBackendService } from '@/src/lib/mock-backend';
import { CitizenReport } from '@/src/types';

export async function updateCitizenReportStatusAction(id: string, status: CitizenReport['status']) {
  return true;
}
