export interface ContactSubmission {
  name: string;
  email: string;
  meterNumber?: string;
  subject: string;
  message: string;
}

export async function submitContactFormAction(data: ContactSubmission) {
  // Simulate dispatch message
  return {
    success: true,
    ticketId: 'TCK-' + Math.floor(100000 + Math.random() * 900000),
    message: 'Your inquiry has been submitted to the National Grid Operations Center.',
  };
}
