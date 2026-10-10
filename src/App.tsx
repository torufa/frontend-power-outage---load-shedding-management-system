/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { NavigationProvider, usePathname } from './lib/next-shim';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

// Next.js App Router Root Layout and Skeletons
import RootLayout from './app/layout';
import Loading from './app/loading';
import NotFound from './app/not-found';

// App Router Public Pages
import HomePage from './app/page';
import OutagesPage from './app/outages/page';
import SchedulePage from './app/schedule/page';
import ReportOutagePage from './app/report-outage/page';
import VerifyReportPage from './app/verify-report/page';
import PricingPage from './app/pricing/page';
import AboutPage from './app/about/page';
import ContactPage from './app/contact/page';

// Auth & Code Verification Pages
import LoginPage from './app/login/page';
import RegisterPage from './app/register/page';
import VerifyPage from './app/verify/page';
import ForgotPasswordPage from './app/forgot-password/page';

// Dashboard App Router Layout & Pages
import DashboardLayout from './app/dashboard/layout';
import DashboardOverviewPage from './app/dashboard/page';
import DashboardOutagesPage from './app/dashboard/outages/page';
import DashboardLoadSheddingPage from './app/dashboard/load-shedding/page';
import DashboardSubstationsPage from './app/dashboard/substations/page';
import DashboardReportsPage from './app/dashboard/reports/page';
import DashboardBillingPage from './app/dashboard/billing/page';
import DashboardAnalyticsPage from './app/dashboard/analytics/page';

function AppRouterView() {
  const pathname = usePathname();

  // Route matching with clean App Router architecture
  if (pathname.startsWith('/dashboard')) {
    let dashboardContent: React.ReactNode;

    switch (pathname) {
      case '/dashboard':
        dashboardContent = <DashboardOverviewPage />;
        break;
      case '/dashboard/outages':
        dashboardContent = <DashboardOutagesPage />;
        break;
      case '/dashboard/load-shedding':
        dashboardContent = <DashboardLoadSheddingPage />;
        break;
      case '/dashboard/substations':
        dashboardContent = <DashboardSubstationsPage />;
        break;
      case '/dashboard/reports':
        dashboardContent = <DashboardReportsPage />;
        break;
      case '/dashboard/billing':
        dashboardContent = <DashboardBillingPage />;
        break;
      case '/dashboard/analytics':
        dashboardContent = <DashboardAnalyticsPage />;
        break;
      default:
        dashboardContent = <DashboardOverviewPage />;
    }

    return (
      <DashboardLayout>
        {dashboardContent}
      </DashboardLayout>
    );
  }

  let publicPageContent: React.ReactNode;

  switch (pathname) {
    case '/':
      publicPageContent = <HomePage />;
      break;
    case '/outages':
      publicPageContent = <OutagesPage />;
      break;
    case '/schedule':
      publicPageContent = <SchedulePage />;
      break;
    case '/report-outage':
      publicPageContent = <ReportOutagePage />;
      break;
    case '/verify-report':
      publicPageContent = <VerifyReportPage />;
      break;
    case '/pricing':
      publicPageContent = <PricingPage />;
      break;
    case '/about':
      publicPageContent = <AboutPage />;
      break;
    case '/contact':
      publicPageContent = <ContactPage />;
      break;
    case '/login':
      publicPageContent = <LoginPage />;
      break;
    case '/register':
      publicPageContent = <RegisterPage />;
      break;
    case '/verify':
      publicPageContent = <VerifyPage />;
      break;
    case '/forgot-password':
      publicPageContent = <ForgotPasswordPage />;
      break;
    default:
      publicPageContent = <NotFound />;
  }

  return (
    <RootLayout>
      {publicPageContent}
    </RootLayout>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Suspense fallback={<Loading />}>
              <AppRouterView />
            </Suspense>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </NavigationProvider>
  );
}
