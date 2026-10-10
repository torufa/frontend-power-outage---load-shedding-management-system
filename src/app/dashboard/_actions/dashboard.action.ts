import { MockBackendService } from '@/src/lib/mock-backend';
import { Feeder } from '@/src/types';

export async function toggleDashboardFeederAction(feederId: string, nextStatus: Feeder['status']): Promise<Feeder> {
  return MockBackendService.toggleFeederStatus(feederId, nextStatus);
}
