import { MockBackendService } from '@/src/lib/mock-backend';
import { Feeder, LoadSheddingSchedule } from '@/src/types';

export async function toggleFeederLoadShedAction(feederId: string, status: Feeder['status']): Promise<Feeder> {
  return MockBackendService.toggleFeederStatus(feederId, status);
}

export async function createLoadShedScheduleAction(data: Omit<LoadSheddingSchedule, 'id'>): Promise<LoadSheddingSchedule> {
  return MockBackendService.createSchedule(data);
}
