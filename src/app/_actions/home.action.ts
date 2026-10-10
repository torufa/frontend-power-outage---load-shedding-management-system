import { GridMetrics, OutageIncident, LoadSheddingSchedule } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export async function getHomeGridOverviewAction(): Promise<{
  metrics: GridMetrics;
  activeOutages: OutageIncident[];
  upcomingSchedules: LoadSheddingSchedule[];
}> {
  const metrics = MockBackendService.getGridMetrics();
  const activeOutages = MockBackendService.getOutages().filter(o => o.status !== 'RESOLVED');
  const upcomingSchedules = MockBackendService.getSchedules();

  return {
    metrics,
    activeOutages,
    upcomingSchedules,
  };
}
