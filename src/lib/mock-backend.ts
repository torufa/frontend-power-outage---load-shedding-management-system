import { 
  OutageIncident, 
  Feeder, 
  Substation, 
  LoadSheddingSchedule, 
  CitizenReport, 
  StripeTransaction, 
  GridMetrics,
  User
} from '../types';

const STORAGE_KEY_OUTAGES = 'voltwatch_outages';
const STORAGE_KEY_FEEDERS = 'voltwatch_feeders';
const STORAGE_KEY_SUBSTATIONS = 'voltwatch_substations';
const STORAGE_KEY_SCHEDULES = 'voltwatch_schedules';
const STORAGE_KEY_REPORTS = 'voltwatch_reports';
const STORAGE_KEY_TRANSACTIONS = 'voltwatch_transactions';

const initialSubstations: Substation[] = [
  {
    id: 'sub-01',
    name: 'Downtown Central Substation',
    code: 'SS-DWT-01',
    zone: 'Zone 1 - Commercial Core',
    capacityMVA: 120,
    currentLoadMVA: 98,
    temperatureCelsius: 64,
    healthScore: 92,
    feedersCount: 6,
    operatorInCharge: 'Eng. Marcus Vance',
    status: 'OPTIMAL'
  },
  {
    id: 'sub-02',
    name: 'Northgate Grid Terminal',
    code: 'SS-NGT-02',
    zone: 'Zone 2 - Industrial District',
    capacityMVA: 180,
    currentLoadMVA: 168,
    temperatureCelsius: 78,
    healthScore: 76,
    feedersCount: 8,
    operatorInCharge: 'Eng. Sarah Jenkins',
    status: 'WARNING'
  },
  {
    id: 'sub-03',
    name: 'South Valley Residential Substation',
    code: 'SS-SVR-03',
    zone: 'Zone 3 - Southern Sector',
    capacityMVA: 95,
    currentLoadMVA: 74,
    temperatureCelsius: 58,
    healthScore: 95,
    feedersCount: 5,
    operatorInCharge: 'Eng. David Chen',
    status: 'OPTIMAL'
  },
  {
    id: 'sub-04',
    name: 'Highland Ridge Feeder Station',
    code: 'SS-HLR-04',
    zone: 'Zone 4 - Western Hills',
    capacityMVA: 80,
    currentLoadMVA: 76,
    temperatureCelsius: 82,
    healthScore: 68,
    feedersCount: 4,
    operatorInCharge: 'Eng. Priya Sharma',
    status: 'WARNING'
  }
];

const initialFeeders: Feeder[] = [
  {
    id: 'fdr-01',
    name: 'F-101 Metro Commercial',
    substationId: 'sub-01',
    substationName: 'Downtown Central Substation',
    zone: 'Zone 1',
    capacityMW: 24,
    currentLoadMW: 19.5,
    status: 'ONLINE',
    connectedConsumers: 4200,
    priorityLevel: 'COMMERCIAL',
    lastStatusChanged: '2 hours ago'
  },
  {
    id: 'fdr-02',
    name: 'F-102 General Hospital Express Feeder',
    substationId: 'sub-01',
    substationName: 'Downtown Central Substation',
    zone: 'Zone 1',
    capacityMW: 18,
    currentLoadMW: 14.2,
    status: 'ONLINE',
    connectedConsumers: 850,
    priorityLevel: 'CRITICAL_HOSPITAL',
    lastStatusChanged: 'Active / Protected'
  },
  {
    id: 'fdr-03',
    name: 'F-201 Heavy Manufacturing Plant Feeder',
    substationId: 'sub-02',
    substationName: 'Northgate Grid Terminal',
    zone: 'Zone 2',
    capacityMW: 32,
    currentLoadMW: 0,
    status: 'LOAD_SHEDDING',
    connectedConsumers: 1100,
    priorityLevel: 'INDUSTRIAL',
    lastStatusChanged: '15 mins ago'
  },
  {
    id: 'fdr-04',
    name: 'F-202 Tech Valley Feeder',
    substationId: 'sub-02',
    substationName: 'Northgate Grid Terminal',
    zone: 'Zone 2',
    capacityMW: 28,
    currentLoadMW: 21.0,
    status: 'ONLINE',
    connectedConsumers: 3900,
    priorityLevel: 'COMMERCIAL',
    lastStatusChanged: '5 hours ago'
  },
  {
    id: 'fdr-05',
    name: 'F-301 Cedar Meadows Residential',
    substationId: 'sub-03',
    substationName: 'South Valley Residential Substation',
    zone: 'Zone 3',
    capacityMW: 16,
    currentLoadMW: 0,
    status: 'OUTAGE',
    connectedConsumers: 6400,
    priorityLevel: 'RESIDENTIAL',
    lastStatusChanged: '35 mins ago'
  },
  {
    id: 'fdr-06',
    name: 'F-302 Parkview Estates',
    substationId: 'sub-03',
    substationName: 'South Valley Residential Substation',
    zone: 'Zone 3',
    capacityMW: 15,
    currentLoadMW: 11.8,
    status: 'ONLINE',
    connectedConsumers: 5100,
    priorityLevel: 'RESIDENTIAL',
    lastStatusChanged: 'Yesterday'
  },
  {
    id: 'fdr-07',
    name: 'F-401 Ridge Summit Feeder',
    substationId: 'sub-04',
    substationName: 'Highland Ridge Feeder Station',
    zone: 'Zone 4',
    capacityMW: 14,
    currentLoadMW: 0,
    status: 'LOAD_SHEDDING',
    connectedConsumers: 2800,
    priorityLevel: 'RESIDENTIAL',
    lastStatusChanged: '45 mins ago'
  }
];

const initialOutages: OutageIncident[] = [
  {
    id: 'out-01',
    trackingCode: 'PO-84921',
    title: '33kV Distribution Line Tripped due to Lightning strike',
    description: 'Sudden high voltage line rupture near Cedar Meadows Sector 4. Safety auto-trip triggered to isolate transformer cluster.',
    zone: 'Zone 3 - Southern Sector',
    feederId: 'fdr-05',
    feederName: 'F-301 Cedar Meadows Residential',
    substationName: 'South Valley Residential Substation',
    area: 'Cedar Meadows & Greenfield Lane',
    type: 'HIGH_VOLTAGE_FAULT',
    severity: 'CRITICAL',
    status: 'RESTORATION_IN_PROGRESS',
    affectedCustomers: 6400,
    reportedAt: '2026-10-09 10:15 AM',
    estimatedRestoration: '2026-10-09 01:45 PM',
    assignedCrew: {
      name: 'Crew Charlie-9 (Emergency Line Technicians)',
      vehicleId: 'VAN-702',
      contact: '+1 (555) 019-4829'
    },
    hasCriticalServices: false,
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 'out-02',
    trackingCode: 'PO-41093',
    title: 'Step-Down Distribution Transformer Overheating & Oil Leak',
    description: 'Substation alarm reported extreme localized thermal spiking on Unit TR-4B. Preventive shutdown executed to prevent catastrophic explosion.',
    zone: 'Zone 2 - Industrial District',
    feederId: 'fdr-03',
    feederName: 'F-201 Heavy Manufacturing Plant Feeder',
    substationName: 'Northgate Grid Terminal',
    area: 'Foundry Avenue, Industrial Zone North',
    type: 'TRANSFORMER_FAILURE',
    severity: 'HIGH',
    status: 'CREW_DISPATCHED',
    affectedCustomers: 1100,
    reportedAt: '2026-10-09 09:40 AM',
    estimatedRestoration: '2026-10-09 02:30 PM',
    assignedCrew: {
      name: 'Heavy Transformer Engineering Unit 2',
      vehicleId: 'CRANE-104',
      contact: '+1 (555) 017-9932'
    },
    hasCriticalServices: false,
    coordinates: { lat: 37.7833, lng: -122.4167 }
  },
  {
    id: 'out-03',
    trackingCode: 'PO-92014',
    title: 'Fallen Tree Branch Severed Secondary Lateral Wire',
    description: 'Localized wind gusts snapped a large branch across secondary low voltage line behind Elmwood School.',
    zone: 'Zone 1 - Commercial Core',
    feederId: 'fdr-01',
    feederName: 'F-101 Metro Commercial',
    substationName: 'Downtown Central Substation',
    area: 'Elmwood Square, 5th Avenue',
    type: 'FALLEN_LINE',
    severity: 'MODERATE',
    status: 'INVESTIGATING',
    affectedCustomers: 450,
    reportedAt: '2026-10-09 11:05 AM',
    estimatedRestoration: '2026-10-09 12:45 PM',
    assignedCrew: {
      name: 'Rapid Response Team Alpha',
      vehicleId: 'TRUCK-301',
      contact: '+1 (555) 014-2201'
    },
    hasCriticalServices: true,
    coordinates: { lat: 37.7690, lng: -122.4467 }
  },
  {
    id: 'out-04',
    trackingCode: 'PO-18302',
    title: 'Underground Cable Insulation Failure at Junction Box 12',
    description: 'Insulation wear caused ground fault during morning peak surge. Repaired with new composite splicing sleeve.',
    zone: 'Zone 4 - Western Hills',
    feederId: 'fdr-07',
    feederName: 'F-401 Ridge Summit Feeder',
    substationName: 'Highland Ridge Feeder Station',
    area: 'Pine Crest & Crestview',
    type: 'GRID_MAINTENANCE',
    severity: 'LOW',
    status: 'RESOLVED',
    affectedCustomers: 850,
    reportedAt: '2026-10-09 06:20 AM',
    estimatedRestoration: '2026-10-09 08:30 AM',
    resolvedAt: '2026-10-09 08:24 AM',
    hasCriticalServices: false,
    coordinates: { lat: 37.7550, lng: -122.4300 }
  }
];

const initialSchedules: LoadSheddingSchedule[] = [
  {
    id: 'sch-01',
    zone: 'Zone 2 - Industrial District',
    feederId: 'fdr-03',
    feederName: 'F-201 Heavy Manufacturing Plant Feeder',
    area: 'Industrial Sector 4 to 9',
    startTime: '11:00',
    endTime: '13:00',
    date: '2026-10-09',
    status: 'ACTIVE_SHEDDING',
    expectedReliefMW: 32.0,
    reason: 'Deficit balance management due to hydro turbine routine servicing',
    notificationSent: true
  },
  {
    id: 'sch-02',
    zone: 'Zone 4 - Western Hills',
    feederId: 'fdr-07',
    feederName: 'F-401 Ridge Summit Feeder',
    area: 'Ridge Crest & Summit Road',
    startTime: '11:30',
    endTime: '13:30',
    date: '2026-10-09',
    status: 'ACTIVE_SHEDDING',
    expectedReliefMW: 14.0,
    reason: 'Transmission bottleneck reduction during mid-day thermal peak',
    notificationSent: true
  },
  {
    id: 'sch-03',
    zone: 'Zone 3 - Southern Sector',
    feederId: 'fdr-06',
    feederName: 'F-302 Parkview Estates',
    area: 'Parkview Heights & Lakeview',
    startTime: '14:00',
    endTime: '16:00',
    date: '2026-10-09',
    status: 'SCHEDULED',
    expectedReliefMW: 15.0,
    reason: 'Scheduled rotational load distribution',
    notificationSent: true
  },
  {
    id: 'sch-04',
    zone: 'Zone 1 - Commercial Core',
    feederId: 'fdr-01',
    feederName: 'F-101 Metro Commercial',
    area: 'Commercial Plaza Block B',
    startTime: '16:30',
    endTime: '18:00',
    date: '2026-10-09',
    status: 'SCHEDULED',
    expectedReliefMW: 24.0,
    reason: 'Evening lighting surge peak containment',
    notificationSent: false
  },
  {
    id: 'sch-05',
    zone: 'Zone 3 - Southern Sector',
    feederId: 'fdr-06',
    feederName: 'F-302 Parkview Estates',
    area: 'Parkview Estates South Block',
    startTime: '08:00',
    endTime: '10:00',
    date: '2026-10-09',
    status: 'COMPLETED',
    expectedReliefMW: 15.0,
    reason: 'Morning peak generation offset',
    notificationSent: true
  }
];

const initialCitizenReports: CitizenReport[] = [
  {
    id: 'rep-01',
    verificationCode: 'PO-72810',
    meterNumber: 'MTR-8849-012',
    reporterName: 'David H. Mitchell',
    reporterEmail: 'citizen@voltwatch.gov',
    reporterPhone: '+1 (555) 234-5678',
    area: 'Cedar Meadows & Greenfield Lane',
    feederName: 'F-301 Cedar Meadows Residential',
    substationName: 'South Valley Residential Substation',
    outageType: 'HIGH_VOLTAGE_FAULT',
    severity: 'CRITICAL',
    description: 'Heard a massive pop sound followed by sudden complete darkness across the entire row of 40 townhouses.',
    affectedHouseholds: 42,
    hasSparksOrFire: true,
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    status: 'VERIFIED',
    createdAt: '2026-10-09 10:18 AM',
    verifiedAt: '2026-10-09 10:25 AM',
    notes: 'Correlated with high voltage fault alarm on Feeder F-301. Line repair crew dispatched.'
  },
  {
    id: 'rep-02',
    verificationCode: 'PO-93104',
    meterNumber: 'MTR-4421-998',
    reporterName: 'Emily Watson',
    reporterEmail: 'emily.w@example.com',
    reporterPhone: '+1 (555) 345-6789',
    area: 'Highland Crest, Block 3',
    feederName: 'F-401 Ridge Summit Feeder',
    substationName: 'Highland Ridge Feeder Station',
    outageType: 'SCHEDULED_LOAD_SHEDDING',
    severity: 'LOW',
    description: 'Power cut occurred at 11:30 AM as per load shedding timetable. Checking when power will be returned.',
    affectedHouseholds: 18,
    hasSparksOrFire: false,
    status: 'VERIFIED',
    createdAt: '2026-10-09 11:35 AM',
    verifiedAt: '2026-10-09 11:36 AM',
    notes: 'Normal rotational load shedding in effect. Expected restoration 13:30.'
  },
  {
    id: 'rep-03',
    verificationCode: 'PO-30819',
    meterNumber: 'MTR-1290-776',
    reporterName: 'Karen Reynolds',
    reporterEmail: 'reynolds.k@example.com',
    reporterPhone: '+1 (555) 987-6543',
    area: 'Downtown 4th Street',
    feederName: 'F-101 Metro Commercial',
    substationName: 'Downtown Central Substation',
    outageType: 'FALLEN_LINE',
    severity: 'HIGH',
    description: 'Street tree branch broken onto electricity pole. Loose wire hanging near sidewalk curb!',
    affectedHouseholds: 120,
    hasSparksOrFire: true,
    status: 'DISPATCHED',
    createdAt: '2026-10-09 11:10 AM',
    verifiedAt: '2026-10-09 11:14 AM',
    notes: 'Safety hazard flagged! Emergency crew Alpha en route with bucket truck.'
  }
];

const initialTransactions: StripeTransaction[] = [
  {
    id: 'tx-01',
    paymentIntentId: 'pi_3MtwBwLkdIwHu7ix28aN019a',
    userEmail: 'citizen@voltwatch.gov',
    planName: 'Citizen Shield (Priority SMS/Email Alerts)',
    amountUSD: 4.99,
    currency: 'usd',
    status: 'succeeded',
    createdAt: '2026-10-01 14:22',
    receiptNumber: 'REC-STRIPE-89104',
    cardBrand: 'visa',
    last4: '4242'
  },
  {
    id: 'tx-02',
    paymentIntentId: 'pi_3MtwCwLkdIwHu7ix99bK221b',
    userEmail: 'metro.bakery@example.com',
    planName: 'Business Priority SLA Pass',
    amountUSD: 19.99,
    currency: 'usd',
    status: 'succeeded',
    createdAt: '2026-10-05 09:15',
    receiptNumber: 'REC-STRIPE-89105',
    cardBrand: 'mastercard',
    last4: '5555'
  }
];

// Helper to get from local storage or fallback
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export class MockBackendService {
  // GET Outages
  static getOutages(): OutageIncident[] {
    return getStored<OutageIncident[]>(STORAGE_KEY_OUTAGES, initialOutages);
  }

  // GET Outage by tracking code or ID
  static getOutageByCode(code: string): OutageIncident | undefined {
    const outages = this.getOutages();
    return outages.find(o => 
      o.trackingCode.toLowerCase() === code.trim().toLowerCase() ||
      o.id.toLowerCase() === code.trim().toLowerCase()
    );
  }

  // Update Outage status
  static updateOutageStatus(id: string, newStatus: OutageIncident['status'], estimatedRestoration?: string): OutageIncident {
    const outages = this.getOutages();
    const index = outages.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Outage not found');

    outages[index].status = newStatus;
    if (estimatedRestoration) {
      outages[index].estimatedRestoration = estimatedRestoration;
    }
    if (newStatus === 'RESOLVED') {
      outages[index].resolvedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setStored(STORAGE_KEY_OUTAGES, outages);
    return outages[index];
  }

  // Create Outage
  static createOutage(outageData: Omit<OutageIncident, 'id' | 'trackingCode' | 'reportedAt'>): OutageIncident {
    const outages = this.getOutages();
    const randomCode = `PO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOutage: OutageIncident = {
      ...outageData,
      id: `out-${Date.now()}`,
      trackingCode: randomCode,
      reportedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
    };
    outages.unshift(newOutage);
    setStored(STORAGE_KEY_OUTAGES, outages);
    return newOutage;
  }

  // GET Feeders
  static getFeeders(): Feeder[] {
    return getStored<Feeder[]>(STORAGE_KEY_FEEDERS, initialFeeders);
  }

  // Toggle Feeder load shedding status
  static toggleFeederStatus(feederId: string, targetStatus: Feeder['status']): Feeder {
    const feeders = this.getFeeders();
    const index = feeders.findIndex(f => f.id === feederId);
    if (index === -1) throw new Error('Feeder not found');

    feeders[index].status = targetStatus;
    feeders[index].currentLoadMW = targetStatus === 'LOAD_SHEDDING' || targetStatus === 'OUTAGE' ? 0 : feeders[index].capacityMW * 0.8;
    feeders[index].lastStatusChanged = 'Just now';
    setStored(STORAGE_KEY_FEEDERS, feeders);
    return feeders[index];
  }

  // GET Substations
  static getSubstations(): Substation[] {
    return getStored<Substation[]>(STORAGE_KEY_SUBSTATIONS, initialSubstations);
  }

  // GET Schedules
  static getSchedules(): LoadSheddingSchedule[] {
    return getStored<LoadSheddingSchedule[]>(STORAGE_KEY_SCHEDULES, initialSchedules);
  }

  // Create Schedule
  static createSchedule(schedule: Omit<LoadSheddingSchedule, 'id'>): LoadSheddingSchedule {
    const schedules = this.getSchedules();
    const newSchedule: LoadSheddingSchedule = {
      ...schedule,
      id: `sch-${Date.now()}`,
    };
    schedules.unshift(newSchedule);
    setStored(STORAGE_KEY_SCHEDULES, schedules);
    return newSchedule;
  }

  // GET Citizen Reports
  static getCitizenReports(): CitizenReport[] {
    return getStored<CitizenReport[]>(STORAGE_KEY_REPORTS, initialCitizenReports);
  }

  // Submit Citizen Report with generated verification code
  static submitCitizenReport(report: Omit<CitizenReport, 'id' | 'verificationCode' | 'status' | 'createdAt'>): CitizenReport {
    const reports = this.getCitizenReports();
    const code = `PO-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReport: CitizenReport = {
      ...report,
      id: `rep-${Date.now()}`,
      verificationCode: code,
      status: 'VERIFIED', // auto-verified by smart telemetry matching
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      verifiedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    };
    reports.unshift(newReport);
    setStored(STORAGE_KEY_REPORTS, reports);
    return newReport;
  }

  // Verify Code tool (Code verification requirement)
  static verifyCode(code: string): { 
    isValid: boolean; 
    type: 'OUTAGE_REPORT' | 'METER' | 'OTP' | 'UNKNOWN'; 
    data?: any; 
    message: string;
  } {
    const clean = code.trim().toUpperCase();

    // 1. Check if 6-digit auth OTP (e.g. 123456 or demo codes)
    if (/^\d{6}$/.test(clean)) {
      return {
        isValid: true,
        type: 'OTP',
        message: '6-Digit Security One-Time Passcode successfully verified.'
      };
    }

    // 2. Check if Outage Report Code (PO-XXXXX)
    if (clean.startsWith('PO-') || clean.startsWith('PO')) {
      const formatted = clean.startsWith('PO-') ? clean : `PO-${clean.replace('PO', '')}`;
      const reports = this.getCitizenReports();
      const report = reports.find(r => r.verificationCode === formatted);
      const outages = this.getOutages();
      const outage = outages.find(o => o.trackingCode === formatted);

      if (report || outage) {
        return {
          isValid: true,
          type: 'OUTAGE_REPORT',
          data: report || outage,
          message: `Official Outage Incident verified for code ${formatted}. Status: ${(report?.status || outage?.status)}`
        };
      }
    }

    // 3. Check if Consumer Meter Code (MTR-XXXX-XXX)
    if (clean.startsWith('MTR-') || clean.startsWith('MTR')) {
      return {
        isValid: true,
        type: 'METER',
        data: {
          meterNumber: clean,
          assignedSubstation: 'South Valley Residential Substation (SS-SVR-03)',
          assignedFeeder: 'F-301 Cedar Meadows Residential',
          voltageTier: '240V Split Phase Single Residential',
          activeTariff: 'Domestic Tier 2',
          connectionStatus: 'ACTIVE'
        },
        message: `Electricity Meter Code ${clean} confirmed in national smart metering directory.`
      };
    }

    return {
      isValid: false,
      type: 'UNKNOWN',
      message: 'Code not found. Please verify the 6-digit OTP, PO-XXXXX incident code, or MTR-XXXX meter number.'
    };
  }

  // GET Stripe Transactions
  static getTransactions(): StripeTransaction[] {
    return getStored<StripeTransaction[]>(STORAGE_KEY_TRANSACTIONS, initialTransactions);
  }

  // Process Stripe Checkout (Strictly Stripe, NO bKash/Nagad)
  static processStripePayment(params: {
    userEmail: string;
    planName: string;
    amountUSD: number;
    cardLast4: string;
    cardBrand: 'visa' | 'mastercard' | 'amex';
  }): StripeTransaction {
    const transactions = this.getTransactions();
    const randomHex = Math.random().toString(36).substring(2, 10);
    const newTx: StripeTransaction = {
      id: `tx-${Date.now()}`,
      paymentIntentId: `pi_voltwatch_${randomHex}`,
      userEmail: params.userEmail,
      planName: params.planName,
      amountUSD: params.amountUSD,
      currency: 'usd',
      status: 'succeeded',
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      receiptNumber: `REC-STRIPE-${Math.floor(10000 + Math.random() * 90000)}`,
      cardBrand: params.cardBrand,
      last4: params.cardLast4
    };
    transactions.unshift(newTx);
    setStored(STORAGE_KEY_TRANSACTIONS, transactions);
    return newTx;
  }

  // Grid Real-Time Metrics
  static getGridMetrics(): GridMetrics {
    const outages = this.getOutages().filter(o => o.status !== 'RESOLVED');
    const feeders = this.getFeeders();
    const sheddingCount = feeders.filter(f => f.status === 'LOAD_SHEDDING').length;

    return {
      totalCapacityMW: 450.0,
      currentGenerationMW: 378.4,
      currentDemandMW: 412.0,
      sheddingDeficitMW: 33.6,
      gridFrequencyHz: 49.98,
      gridStabilityIndex: 94.2,
      activeOutagesCount: outages.length,
      activeSheddingFeeders: sheddingCount,
      mttrMinutes: 48
    };
  }
}
