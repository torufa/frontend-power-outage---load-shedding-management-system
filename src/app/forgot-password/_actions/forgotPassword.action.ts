export async function sendPasswordResetCodeAction(email: string): Promise<boolean> {
  return true;
}

export async function resetPasswordAction(email: string, newPass: string): Promise<boolean> {
  return true;
}
