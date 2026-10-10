import { MockBackendService } from '@/src/lib/mock-backend';

export async function verifyReportCodeAction(code: string) {
  return MockBackendService.verifyCode(code);
}
