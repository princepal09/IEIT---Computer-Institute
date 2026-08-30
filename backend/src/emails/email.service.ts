import resend from '../lib/resend.js';
import environment from '../config/config.js';

import { passwordResetTemplate } from './templates/password-reset.template.js';

export const sendPasswordEmail= async (
  email: string,
  resetToken: string,
  name?: string,
): Promise<void> => {
  const resetUrl = `${environment.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const html = passwordResetTemplate(resetUrl, name);

  const { error } = await resend.emails.send({
    from: environment.MAIL_FROM,
    to: email,
    subject: 'Reset your Password',
    html,
  });
  if (error) {
    console.error('Resend error:', error);

    throw new Error('Failed to send password reset email');
  }
};
