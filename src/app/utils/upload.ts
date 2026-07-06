import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import config from "../config";
import AppError from "../errors/AppError";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },

      (error, result) => {
        if (error || !result)
          return reject(new AppError(500, "Image upload failed"));
        resolve(result.secure_url);
      },
    );

    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  const parts = imageUrl.split("/");

  if (parts.length < 2) {
    throw new Error("Invalid image URL format");
  }

  const filename = parts[parts.length - 1]?.split(".")[0];
  const folder = parts[parts.length - 2];

  if (!filename || !folder) {
    throw new Error("Could not extract filename or folder from URL");
  }

  const publicId = `${folder}/${filename}`;
  await cloudinary.uploader.destroy(publicId);
};
