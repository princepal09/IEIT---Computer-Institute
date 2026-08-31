import environment from '../../config/config.js';
import { sendEmail } from '../../lib/resend.js';
import { EnquiryEmailData } from '../../types/email.types.js';
import { enquiryTemplate } from '../templates/enquiry-admin-template.js';

export const sendEnquiryAdminEmail = async (enquiry: EnquiryEmailData): Promise<void> => {
  const html = enquiryTemplate(enquiry);

  await sendEmail({
    to: environment.ENQUIRY_NOTIFICATION_EMAIL,
    subject: `New Enquiry - ${enquiry.name}`,
    html,
  });
};
