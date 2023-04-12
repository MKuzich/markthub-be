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
}
