import { MockBackendService } from '@/src/lib/mock-backend';
import { OutageIncident, OutageStatus } from '@/src/types';

export async function updateOutageAction(id: string, status: OutageStatus, eta?: string): Promise<OutageIncident> {
  return MockBackendService.updateOutageStatus(id, status, eta);
}
