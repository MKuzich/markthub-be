import nodemailer from "nodemailer";

const { MAIL, MAIL_PASSWORD, BASE_URL } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: MAIL,
    pass: MAIL_PASSWORD,
  },
};

export default class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendEmailVerify(email: string, verifyToken: string) {
    const verifyLink = `${BASE_URL}/api/auth/verify/${verifyToken}`;
    const emailOptions = {
      to: email,
      from: MAIL,
      subject: "Confirm your email for MarketHub account",
      html: `<h4>Click on this link to confirm registration on MarketHub shop ${verifyLink}</h4>`,
    };
    await this.transporter.sendMail(emailOptions);
    return true;
  }

  async sendChangePassword(
    email: string,
    resetToken: string,
    passwordId: string
  ) {
    const resetLink = `${BASE_URL}/api/auth/reset-password/${encodeURIComponent(
      resetToken
    )}/${passwordId}`;
    const emailOptions = {
      to: email,
      from: MAIL,
      subject: "Change your password for MarketHub account",
      html: `<h4>Click on this link to change password on MarketHub shop ${resetLink}</h4><bold>If it you didn't click for password change just ignore this link!</bold>`,
    };
    await this.transporter.sendMail(emailOptions);
    return true;
  }
}
