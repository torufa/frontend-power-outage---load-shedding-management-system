import { MockBackendService } from '@/src/lib/mock-backend';
import { Substation } from '@/src/types';

export async function fetchAllSubstations(): Promise<Substation[]> {
  return MockBackendService.getSubstations();
}
