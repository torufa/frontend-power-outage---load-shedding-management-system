import { User } from '@/src/types';

export async function registerAction(data: Partial<User>): Promise<{ success: boolean; user: Partial<User> }> {
  return { success: true, user: data };
}
