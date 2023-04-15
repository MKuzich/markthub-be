import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import EmailService from "../services/email.service";
import UserService from "../services/user.service";
import { createError } from "../helpers/errors";
import { IUserTokenPayload } from "../types/user.type";

export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    private userService: UserService
  ) {}

  async signUpUser(req: Request) {
    const data = req.body;
    const image = req.file ?? null;
    const verificationToken = await this.authService.signUp(data, image);
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
    const user = await this.userService.getUserByEmail(email);
    if (!user.verificationToken) {
      throw createError(409, "No verification token in user data.");
    }
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
    const user = await this.userService.getCurrent(id);

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

  async changeForgottenUserPassword(req: Request) {
    const { email } = req.body;
    const user = await this.userService.getUserByEmail(email);
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

  async changeUserEmail(req: Request) {
    const { email } = req.body;
    const { id } = req.user as IUserTokenPayload;

    const emailChangeToken = await this.authService.verifyEmail(email, id);
    const isSent = await this.emailService.sendEmailVerify(
      email,
      emailChangeToken
    );
    return isSent;
  }

  async resetUserEmail(req: Request) {
    const { emailChangeToken } = req.params;
    const updatedUser = await this.authService.resetEmail(emailChangeToken);
    return updatedUser;
  }

  async changeUserPassword(req: Request) {
    const data = req.body;
    const { id } = req.user as IUserTokenPayload;
    const isChanged = await this.authService.changePassword(id, data);
    return isChanged;
  }
}

const authController = new AuthController(
  new AuthService(),
  new EmailService(),
  new UserService()
);
export default authController;
