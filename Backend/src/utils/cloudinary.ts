import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';


dotenv.config();
// Cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    console.log(`File uploaded to Cloudinary: ${response.secure_url}`);

    return response;

  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    return null;

  } finally {
    // Always delete the local file (success or failure)
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Failed to delete local file:", err);
      } else {
        console.log("Local file deleted:", localFilePath);
      }
    });
  }
};

export { uploadOnCloudinary };

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted image from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error(`Error deleting image from Cloudinary: ${publicId}`, error);
  }
};