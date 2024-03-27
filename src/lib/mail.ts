import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "NAMEISHAI <auth@nameishai.id.vn>",
    to: email,
    subject: "2FA Code",
    html: `<h1>Hello ${email}</h1><p>Your 2FA token: ${token}</p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "NAMEISHAI <auth@nameishai.id.vn>",
    to: email,
    subject: "Reset password",
    html: `<h1>Hello ${email}</h1><a href="${resetLink}">Click here to reset password</a>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const configLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "NAMEISHAI <auth@nameishai.id.vn>",
    to: email,
    subject: "Confirm your new verification email",
    html: `<h1>Hello ${email}</h1><a href="${configLink}">Click here to verify your email</a>`,
  });
};
