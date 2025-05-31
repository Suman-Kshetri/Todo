import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { log } from 'console';
import fs from 'fs';

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
        try {
            if(!localFilePath) return null;

            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: 'auto'
            })
            console.log(`File uploaded successfully: ${response} and ${response.url}`);
            return response;

        } catch (error: unknown) {
            // if the file is not uploaded to the server then removing [teporary saveds file] it from server for the self cleaning purpose
            fs.unlinkSync(localFilePath);
            return null;

        }
    }

    export {uploadOnCloudinary};