import { MockBackendService } from '@/src/lib/mock-backend';
import { LoadSheddingSchedule } from '@/src/types';

export async function getSchedulesAction(): Promise<LoadSheddingSchedule[]> {
  return MockBackendService.getSchedules();
}
