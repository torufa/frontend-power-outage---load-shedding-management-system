import { ApiService } from '@/src/lib/api';
import { LoadSheddingSchedule, Feeder } from '@/src/types';

export async function fetchAllSchedules(): Promise<LoadSheddingSchedule[]> {
  return await ApiService.getSchedules();
}

export async function createScheduleAction(data: Omit<LoadSheddingSchedule, 'id'>): Promise<LoadSheddingSchedule> {
  return await ApiService.createSchedule(data);
}

export async function fetchAllFeeders(): Promise<Feeder[]> {
  return await ApiService.getFeeders();
}

export async function toggleFeederAction(feederId: string, status: Feeder['status']): Promise<Feeder> {
  return await ApiService.toggleFeederStatus(feederId, status);
}
