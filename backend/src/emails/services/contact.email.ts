import environment from "../../config/config.js";
import { sendEmail } from "../../lib/resend.js";
import { ContactEmailData } from "../../types/email.types.js";
import { contactAdminTemplate } from "../templates/contact-admin.template.js";

export const sendContactAdminEmail = async (
  contact: ContactEmailData,
): Promise<void> => {

  const html = contactAdminTemplate(contact);

  await sendEmail({
    to: environment.ENQUIRY_NOTIFICATION_EMAIL,
    subject: `New Contact Message - ${contact.name}`,
    html,
  });
};