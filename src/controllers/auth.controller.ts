import { Request } from "express";
import AuthService from "../services/auth.service";
import EmailService from "../services/email.service";

export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {}

  async signUpUser(req: Request) {
    const data = req.body;

    const verificationToken = await this.authService.signUp(data);

    await this.emailService.sendEmail(data.email, verificationToken);

    return true;
  }

  async logInUser() {}

  async logOutUser() {}

  async changePassword() {}
}

const authController = new AuthController(
  new AuthService(),
  new EmailService()
);
export default authController;
