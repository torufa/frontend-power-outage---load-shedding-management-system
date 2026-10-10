export type UserRole = 'ADMIN' | 'OPERATOR' | 'CITIZEN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  meterNumber?: string;
  substationId?: string;
  isVerified: boolean;
  stripeCustomerId?: string;
  hasActiveAlertSubscription?: boolean;
}

export type OutageStatus = 'INVESTIGATING' | 'CREW_DISPATCHED' | 'RESTORATION_IN_PROGRESS' | 'RESOLVED';
export type OutageSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
export type OutageType = 
  | 'TRANSFORMER_FAILURE' 
  | 'HIGH_VOLTAGE_FAULT' 
  | 'SCHEDULED_LOAD_SHEDDING' 
  | 'FALLEN_LINE' 
  | 'SUBSTATION_OVERLOAD' 
  | 'GRID_MAINTENANCE'
  | 'UNSCHEDULED_BLACKOUT';

export interface OutageIncident {
  id: string;
  trackingCode: string; // e.g. PO-84921
  title: string;
  description: string;
  zone: string;
  feederId: string;
  feederName: string;
  substationName: string;
  area: string;
  type: OutageType;
  severity: OutageSeverity;
  status: OutageStatus;
  affectedCustomers: number;
  reportedAt: string;
  estimatedRestoration: string;
  resolvedAt?: string;
  assignedCrew?: {
    name: string;
    vehicleId: string;
    contact: string;
  };
  hasCriticalServices: boolean; // Hospitals, water stations
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Feeder {
  id: string;
  name: string;
  substationId: string;
  substationName: string;
  zone: string;
  capacityMW: number;
  currentLoadMW: number;
  status: 'ONLINE' | 'LOAD_SHEDDING' | 'OUTAGE' | 'MAINTENANCE';
  connectedConsumers: number;
  priorityLevel: 'CRITICAL_HOSPITAL' | 'INDUSTRIAL' | 'COMMERCIAL' | 'RESIDENTIAL';
  lastStatusChanged: string;
}

export interface Substation {
  id: string;
  name: string;
  code: string;
  zone: string;
  capacityMVA: number;
  currentLoadMVA: number;
  temperatureCelsius: number;
  healthScore: number; // 0 - 100
  feedersCount: number;
  operatorInCharge: string;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL_OVERLOAD';
}

export interface LoadSheddingSchedule {
  id: string;
  zone: string;
  feederId: string;
  feederName: string;
  area: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  date: string;      // YYYY-MM-DD
  status: 'SCHEDULED' | 'ACTIVE_SHEDDING' | 'COMPLETED' | 'CANCELLED';
  expectedReliefMW: number;
  reason: string;
  notificationSent: boolean;
}

export interface CitizenReport {
  id: string;
  verificationCode: string; // e.g. PO-72810
  meterNumber: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  area: string;
  feederName: string;
  substationName: string;
  outageType: OutageType;
  severity: OutageSeverity;
  description: string;
  affectedHouseholds: number;
  hasSparksOrFire: boolean;
  photoUrl?: string;
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'DISPATCHED' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  verifiedAt?: string;
  notes?: string;
}

export interface StripePlan {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  interval: 'month' | 'one_time';
  popular?: boolean;
  stripePriceId: string;
  features: string[];
}

export interface StripeTransaction {
  id: string;
  paymentIntentId: string;
  userEmail: string;
  planName: string;
  amountUSD: number;
  currency: 'usd';
  status: 'succeeded' | 'processing' | 'requires_payment_method';
  createdAt: string;
  receiptNumber: string;
  cardBrand: 'visa' | 'mastercard' | 'amex';
  last4: string;
}

export interface GridMetrics {
  totalCapacityMW: number;
  currentDemandMW: number;
  currentGenerationMW: number;
  sheddingDeficitMW: number;
  gridFrequencyHz: number;
  gridStabilityIndex: number; // 0 - 100
  activeOutagesCount: number;
  activeSheddingFeeders: number;
  mttrMinutes: number; // Mean Time to Resolution
}
