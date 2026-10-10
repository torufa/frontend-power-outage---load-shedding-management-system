import { ApiService } from '@/src/lib/api';

export async function verifyCodeAction(code: string) {
  return await ApiService.verifyCode(code);
}
