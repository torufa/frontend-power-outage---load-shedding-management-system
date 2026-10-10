import { UserRole } from '@/src/types';

export async function loginAction(email: string, password?: string): Promise<{ success: boolean; role: UserRole }> {
  const cleanEmail = email.toLowerCase().trim();
  let role: UserRole = 'CITIZEN';
  if (cleanEmail.includes('admin')) role = 'ADMIN';
  else if (cleanEmail.includes('operator')) role = 'OPERATOR';

  return { success: true, role };
}
