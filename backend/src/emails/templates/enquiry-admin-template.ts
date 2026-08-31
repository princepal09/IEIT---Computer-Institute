export const enquiryTemplate = (enquiry: {
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  branch: {
    name: string;
    slug: string;
  } | null;
  course: {
    name: string;
    slug: string;
  } | null;
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>New Enquiry</title>
      </head>

      <body>
        <h2>New Enquiry Received</h2>

        <p><strong>Name:</strong> ${enquiry.name}</p>

        <p><strong>Phone:</strong> ${enquiry.phone}</p>

        <p>
          <strong>Email:</strong>
          ${enquiry.email ?? 'Not provided'}
        </p>

        <p>
          <strong>Branch:</strong>
          ${enquiry.branch?.name ?? 'Not specified'}
        </p>

        <p>
          <strong>Course:</strong>
          ${enquiry.course?.name ?? 'General Enquiry'}
        </p>

        <p>
          <strong>Message:</strong>
          ${enquiry.message ?? 'No message provided'}
        </p>

        <hr />

        <p>
          Please contact the student as soon as possible.
        </p>
      </body>
    </html>
  `;
};