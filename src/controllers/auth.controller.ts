import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import EmailService from "../services/email.service";
import { createError } from "../helpers/errors";
import { IUserTokenPayload } from "../types/user.type";

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

  async logInUser(req: Request, res: Response) {
    const { body } = req;
    const { accessToken, refreshToken } = await this.authService.logIn(body);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    return;
  }

  async getCurrentUser(req: Request) {
    if (!req.user) {
      throw createError(401, "Not authorized.");
    }
    const { id } = req.user as IUserTokenPayload;
    const user = await this.authService.getCurrent(id);

    return user;
  }

  async logOutUser(req: Request) {
    if (!req.user) {
      throw createError(401, "Not authorized.");
    }
    const { id } = req.user as IUserTokenPayload;
    const isLogOuted = await this.authService.logOut(id);
    return isLogOuted;
  }

  async changeUserPassword(req: Request) {
    const { email } = req.body;
    const user = await this.authService.getUserByEmail(email);
    const { encryptedToken, id } = await this.authService.createPasswordReset(
      user._id
    );
    const isSent = await this.emailService.sendChangePassword(
      email,
      encryptedToken,
      id.toString()
    );
    return isSent;
  }

  async resetUserPassword(req: Request) {
    const { resetToken, passwordId } = req.params;
    const { newPassword } = req.body;
    const isChanged = await this.authService.resetPassword(
      resetToken,
      newPassword,
      passwordId
    );
    return isChanged;
  }
}

const authController = new AuthController(
  new AuthService(),
  new EmailService()
);
export default authController;
