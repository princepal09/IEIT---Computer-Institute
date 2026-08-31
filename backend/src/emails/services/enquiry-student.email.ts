import { sendEmail } from '../../lib/resend.js';
import { EnquiryEmailData } from '../../types/email.types.js';
import { enquiryStudentTemplate } from '../templates/enquiry-student.template.js';

export const sendEnquiryStudentEmail = async (enquiry: EnquiryEmailData): Promise<void> => {
  if (!enquiry.email) {
    return;
  }

  const html = enquiryStudentTemplate(enquiry);

  await sendEmail({
    to: enquiry.email,
    subject: 'We received your enquiry',
    html,
  });
};
