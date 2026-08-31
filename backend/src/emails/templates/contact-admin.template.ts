import { ContactEmailData } from "../../types/email.types.js";

export const contactAdminTemplate = (contact: ContactEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <body
        style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        "
      >

        <h2>New Contact Message</h2>

        <p>
          You have received a new message from
          your website contact form.
        </p>

        <hr />

        <p>
          <strong>Name:</strong>
          ${contact.name}
        </p>

        <p>
          <strong>Email:</strong>
          ${contact.email}
        </p>

        <p>
          <strong>Phone:</strong>
          ${contact.phone ?? 'Not provided'}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${contact.message}
        </p>

        <hr />

        <p>
          Please check the admin panel for more details.
        </p>

      </body>
    </html>
  `;
};
