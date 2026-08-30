export const passwordResetTemplate = (
  resetUrl: string,
  name?: string,
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>Reset Your Password</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 8px;
          "
        >
          <h2>
            Reset Your Password
          </h2>

          <p>
            Hello ${name},
          </p>

          <p>
            We received a request to reset your
            IEIT account password.
          </p>

          <p>
            Click the button below to create a
            new password.
          </p>

          <div style="margin: 30px 0;">
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 12px 24px;
                background-color: #000000;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
              "
            >
              Reset Password
            </a>
          </div>

          <p>
            This link will expire in 15 minutes.
          </p>

          <p>
            If you didn't request a password reset,
            you can safely ignore this email.
          </p>

          <p>
            Thanks,<br />
            IEIT Institute
          </p>
        </div>
      </body>
    </html>
  `;
};