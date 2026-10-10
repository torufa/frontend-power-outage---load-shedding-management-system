import { MockBackendService } from '@/src/lib/mock-backend';
import { StripeTransaction } from '@/src/types';

export async function getBillingTransactionsAction(): Promise<StripeTransaction[]> {
  return MockBackendService.getTransactions();
}
