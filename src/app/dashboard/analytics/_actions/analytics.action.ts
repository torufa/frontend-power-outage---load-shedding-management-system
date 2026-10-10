import { MockBackendService } from '@/src/lib/mock-backend';

export async function getAnalyticsDataAction() {
  const metrics = MockBackendService.getGridMetrics();
  const substations = MockBackendService.getSubstations();
  const outages = MockBackendService.getOutages();

  return {
    metrics,
    substations,
    outages,
    averageRestorationHours: 1.4,
    gridEfficiencyScore: 94.2,
    totalDeficitMegawatts: metrics.loadSheddingDeficitMW,
  };
}
