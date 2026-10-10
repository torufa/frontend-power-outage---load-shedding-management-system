import { ApiService } from '@/src/lib/api';
import { OutageIncident, OutageStatus } from '@/src/types';

export async function fetchAllOutages(): Promise<OutageIncident[]> {
  return await ApiService.getOutages();
}

export async function updateOutageStatusAction(
  id: string, 
  status: OutageStatus, 
  eta?: string
): Promise<OutageIncident> {
  return await ApiService.updateOutageStatus(id, status, eta);
}
