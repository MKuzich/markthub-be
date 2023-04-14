import { Model, model, Schema } from "mongoose";

import { IPasswordReset } from "../types/password.type";

const passwordResetSchema = new Schema<IPasswordReset>({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const PasswordReset: Model<IPasswordReset> = model(
  "PasswordReset",
  passwordResetSchema
);

export default PasswordReset;
