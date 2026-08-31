
export const enquiryStudentTemplate = (enquiry: {
  name: string;
  branch: {
    name: string;
  } | null;
  course: {
    name: string;
  } | null;
}) => {
  return `
    <h2>Enquiry Received</h2>

    <p>Hi ${enquiry.name},</p>

    <p>
      Thank you for your interest in our institute.
    </p>

    ${
      enquiry.course
        ? `<p>
            We received your enquiry regarding
            <strong>${enquiry.course.name}</strong>
            at
            <strong>${enquiry.branch?.name ?? 'our branch'}</strong>.
          </p>`
        : ''
    }

    <p>
      Our team will contact you shortly.
    </p>

    <p>
      Regards,<br />
      IEIT Team
    </p>
  `;
};