import { MockBackendService } from '@/src/lib/mock-backend';
import { OutageIncident } from '@/src/types';

export async function getOutagesAction(): Promise<OutageIncident[]> {
  return MockBackendService.getOutages();
}
