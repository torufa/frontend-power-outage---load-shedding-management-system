/**
 * Database & Backend Integration Guide and Helper Functions
 * Backend Repository: https://github.com/torufa/power-outage---load-shedding-management-system
 */

export interface DatabaseConnectionConfig {
  databaseUri: string;
  databaseName: string;
  isAtlasCluster: boolean;
  poolSize?: number;
}

export const BACKEND_REPO_URL = 'https://github.com/torufa/power-outage---load-shedding-management-system';

export const BACKEND_SETUP_INSTRUCTIONS = `
# How to Connect this Frontend to your Backend & Live Stripe

### 1. Backend Environment Setup (.env in your backend repo)
Ensure your backend has the following environment variables:
\`\`\`env
PORT=5000
NODE_ENV=production
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/voltwatch_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d

# Stripe Live / Test Keys
STRIPE_SECRET_KEY=sk_test_51...your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_...your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000
\`\`\`

### 2. Frontend Environment Setup (.env.local in this project)
\`\`\`env
# Point to your Express/Node.js backend server
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Public Stripe Key for Elements / Checkout
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...your_stripe_publishable_key
\`\`\`

### 3. Stripe Payment Flow Architecture
1. Citizen/Commercial Client selects Emergency Priority Grid Notification Plan ($19 / $49 / $199).
2. Frontend calls \`POST /api/v1/payments/stripe/create-payment-intent\` with \`amount\` & \`currency\`.
3. Backend creates Stripe Payment Intent via \`stripe.paymentIntents.create()\` using \`STRIPE_SECRET_KEY\` and returns \`clientSecret\`.
4. Frontend mounts Stripe Elements with \`clientSecret\` and completes payment.
5. Stripe sends a webhook to backend (\`POST /api/v1/payments/stripe/webhook\`), which updates customer subscription in MongoDB/PostgreSQL.
`;

export async function testBackendConnection(customUrl?: string): Promise<{ connected: boolean; latencyMs: number; error?: string }> {
  const targetUrl = customUrl || (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:5000/api/v1';
  const start = Date.now();
  try {
    const res = await fetch(`${targetUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(3000) });
    const latencyMs = Date.now() - start;
    if (res.ok) {
      return { connected: true, latencyMs };
    }
    return { connected: false, latencyMs, error: `Backend returned status ${res.status}` };
  } catch (err: any) {
    return { connected: false, latencyMs: Date.now() - start, error: err?.message || 'Connection refused' };
  }
}
