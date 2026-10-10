import { MockBackendService } from '@/src/lib/mock-backend';
import { StripeTransaction } from '@/src/types';

export async function processStripePaymentAction(params: {
  userEmail: string;
  planName: string;
  amountUSD: number;
  cardLast4: string;
  cardBrand: 'visa' | 'mastercard' | 'amex';
}): Promise<StripeTransaction> {
  return MockBackendService.processStripePayment(params);
}
