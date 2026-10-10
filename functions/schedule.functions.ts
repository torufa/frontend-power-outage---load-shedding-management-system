import { apiClient } from './api.functions';
import { LoadSheddingSchedule, Feeder } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export async function fetchSchedulesFromApi(): Promise<LoadSheddingSchedule[]> {
  const res = await apiClient<LoadSheddingSchedule[]>('/load-shedding/schedules');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return MockBackendService.getSchedules();
}

export async function fetchFeedersFromApi(): Promise<Feeder[]> {
  const res = await apiClient<Feeder[]>('/feeders');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return MockBackendService.getFeeders();
}

export async function toggleFeederLoadSheddingWithApi(feederId: string, enabled: boolean): Promise<Feeder | null> {
  const res = await apiClient<Feeder>(`/feeders/${feederId}/load-shedding`, {
    method: 'PATCH',
    body: JSON.stringify({ isLoadShedding: enabled }),
  });
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.toggleFeederLoadShedding(feederId, enabled);
}

export async function createScheduleWithApi(schedule: Partial<LoadSheddingSchedule>): Promise<LoadSheddingSchedule> {
  const res = await apiClient<LoadSheddingSchedule>('/load-shedding/schedules', {
    method: 'POST',
    body: JSON.stringify(schedule),
  });
  if (res.success && res.data) {
    return res.data;
  }
  return MockBackendService.createSchedule({
    feederId: schedule.feederId || 'fdr-1',
    feederName: schedule.feederName || 'Gulshan Feeder',
    area: schedule.area || 'Gulshan',
    startTime: schedule.startTime || '14:00',
    endTime: schedule.endTime || '15:30',
    date: schedule.date || new Date().toISOString().split('T')[0],
    recurrence: schedule.recurrence || 'DAILY',
    status: schedule.status || 'SCHEDULED',
    expectedDeficitMW: schedule.expectedDeficitMW || 25,
  });
}
