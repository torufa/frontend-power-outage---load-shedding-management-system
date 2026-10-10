import { MockBackendService } from '@/src/lib/mock-backend';

export async function verifyOtpAction(code: string) {
  return MockBackendService.verifyCode(code);
}
