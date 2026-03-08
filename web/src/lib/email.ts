type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

export async function sendEmail(input: SendEmailInput) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM;

  const recipients = Array.isArray(input.to) ? input.to : [input.to];

  if (!resendApiKey || !fromEmail) {
    console.log("[email:skipped]", {
      reason: "Missing RESEND_API_KEY or EMAIL_FROM",
      to: recipients,
      subject: input.subject,
    });
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      subject: input.subject,
      html: input.html,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed: ${res.status} ${text}`);
  }
}
