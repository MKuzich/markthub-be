import { Request } from "express";
import AuthService from "../services/auth.service";
import EmailService from "../services/email.service";
import { createError } from "../helpers/errors";

export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {}

  async signUpUser(req: Request) {
    const data = req.body;
    const verificationToken = await this.authService.signUp(data);
    const isSent = await this.emailService.sendEmailVerify(
      data.email,
      verificationToken
    );
    if (!isSent) {
      throw createError(500, "Error sending email.");
    }
    return isSent;
  }

  async verifyUser(req: Request) {
    const { verificationToken } = req.params;
    const isVerify = await this.authService.verify(verificationToken);
    if (!isVerify) {
      throw createError(500, "Verifing error.");
    }
    return isVerify;
  }

  async reVerifyUser(req: Request) {
    const email = req.body;
    if (!email) {
      throw createError(400, "Missing required field email");
    }
    const user = await this.authService.getUserByEmail(email);
    const isSent = await this.emailService.sendEmailVerify(
      email,
      user.verificationToken
    );
    if (!isSent) {
      throw createError(500, "Error sending email.");
    }
    return isSent;
  }

  async logInUser(req: Request) {
    const { body } = req;
    const { accessToken, refreshToken } = await this.authService.logIn(body);
    return { accessToken, refreshToken };
  }

  async logOutUser() {}

  async changePassword() {}
}

const authController = new AuthController(
  new AuthService(),
  new EmailService()
);
export default authController;
