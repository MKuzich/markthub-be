export interface IPasswordReset {
  user: string;
  token: string;
  iv: string;
  createdAt: Date;
}
