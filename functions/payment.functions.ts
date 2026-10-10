import { apiClient } from './api.functions';
import { StripeTransaction } from '@/src/types';
import { MockBackendService } from '@/src/lib/mock-backend';

export interface CreatePaymentIntentRequest {
  planId: string;
  planName: string;
  amount: number; // in USD
  currency?: string;
  customerEmail: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  id: string;
  amount: number;
  currency: string;
  status: string;
}

/**
 * Initiates Stripe Payment Intent via Backend API
 */
export async function createStripePaymentIntent(data: CreatePaymentIntentRequest): Promise<PaymentIntentResponse> {
  const res = await apiClient<PaymentIntentResponse>('/payments/stripe/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.success && res.data) {
    return res.data;
  }

  // Fallback demo simulation client secret for interactive testing
  return {
    clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
    id: `pi_${Date.now()}`,
    amount: data.amount * 100, // cents
    currency: data.currency || 'usd',
    status: 'requires_payment_method',
  };
}

/**
 * Record successful Stripe transaction in the database
 */
export async function recordStripeTransaction(transactionData: {
  amount: number;
  currency?: string;
  tier: 'BASIC' | 'PRO' | 'ENTERPRISE';
  userEmail: string;
  stripePaymentIntentId?: string;
  paymentMethodLast4?: string;
}): Promise<StripeTransaction> {
  const res = await apiClient<StripeTransaction>('/payments/stripe/record', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });

  if (res.success && res.data) {
    return res.data;
  }

  return MockBackendService.recordStripePayment(transactionData);
}

/**
 * Retrieve Stripe transaction history
 */
export async function getStripeTransactions(): Promise<StripeTransaction[]> {
  const res = await apiClient<StripeTransaction[]>('/payments/stripe/history');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return MockBackendService.getStripeTransactions();
}
