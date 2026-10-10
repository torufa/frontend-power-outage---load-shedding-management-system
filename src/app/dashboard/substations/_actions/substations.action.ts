import { MockBackendService } from '@/src/lib/mock-backend';
import { Substation } from '@/src/types';

export async function getSubstationsAction(): Promise<Substation[]> {
  return MockBackendService.getSubstations();
}
