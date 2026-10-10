import { ApiService } from '@/src/lib/api';
import { StripeTransaction } from '@/src/types';

export async function createStripePaymentIntentAction(params: {
  planId: string;
  amountUSD: number;
  userEmail: string;
}) {
  return await ApiService.createStripePaymentIntent(params);
}

export async function confirmStripePaymentAction(params: {
  paymentIntentId: string;
  planName: string;
  userEmail: string;
  amountUSD: number;
  cardLast4: string;
  cardBrand: 'visa' | 'mastercard' | 'amex';
}): Promise<StripeTransaction> {
  return await ApiService.confirmStripePayment(params);
}
