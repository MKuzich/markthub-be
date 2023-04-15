import { createError } from "../helpers/errors";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import { IUserChangeData } from "../types/user.type";
import { IFile } from "../types/file.type";

const { AZURE_STORAGE_CONNECTION_STRING } = process.env;

export default class UserService {
  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(409, "Wrong email.");
    }
    return user;
  }

  async changeData(
    id: string,
    data: IUserChangeData,
    file: IFile | null = null
  ) {
    const newUsersData = { ...data };

    if (file) {
      const containerName = "users";
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING!
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const upload = file;
      if (upload) {
        const filename = uuidv4() + "-" + upload.originalname;
        const blobClient = containerClient.getBlockBlobClient(filename);
        await blobClient.uploadData(upload.buffer, {
          blobHTTPHeaders: { blobContentType: upload.mimetype },
        });
        newUsersData.image = blobClient.url;

        const user = await User.findById(id);
        if (!user) {
          throw createError(404, "User not found.");
        }
        if (user.image) {
          const oldImageParts = user.image.split("/");
          const oldImage = oldImageParts[oldImageParts.length - 1];

          const oldBlobClient = containerClient.getBlockBlobClient(oldImage);
          await oldBlobClient.delete();
        }
      }

      await User.findByIdAndUpdate(id, newUsersData);
      return true;
    }
  }

  async getCurrent(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw createError(409, "Undefined user.");
    }
    const {
      phone,
      email,
      firstName,
      secondName,
      image,
      rate,
      date,
      reviews,
      products,
      _id,
    } = user;
    return {
      phone,
      email,
      firstName,
      secondName,
      image,
      rate,
      date,
      reviews,
      products,
      _id,
    };
  }

  async addReview(userId: string, reviewId: string) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { reviews: { $each: [reviewId], $position: 0 } },
      },
      { new: true }
    );
    if (!user) {
      throw createError(404, "User not found.");
    }
    return true;
  }

  async deleteReview(userId: string, reviewId: string) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { reviews: reviewId },
      },
      { new: true }
    );
    if (!user) {
      throw createError(404, "User not found.");
    }
    return true;
  }
}
