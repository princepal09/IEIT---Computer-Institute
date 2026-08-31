import { Resend } from 'resend';

import environment from '../config/config.js';

const resend = new Resend(environment.RESEND_API_KEY);

export default resend;

interface SendEmailOptions {
  to: string|string[]
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailOptions): Promise<void> => {
  const { error } = await resend.emails.send({
    from: environment.MAIL_FROM,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error('Failed to send email');
  }
};
