import { v2 as cloudinary } from "cloudinary";

let configured = false;

export function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration is incomplete.");
  }

  if (!configured) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
    configured = true;
  }

  return { client: cloudinary, cloudName, apiKey, apiSecret };
}

export function getCloudinaryThumbnail(url: string) {
  return url.replace("/upload/", "/upload/so_0,f_jpg,q_auto/").replace(/\.(mp4|webm|mov)(\?.*)?$/i, ".jpg");
}
