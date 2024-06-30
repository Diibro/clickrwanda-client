// upload.js

import { v4 as uuidv4 } from 'uuid';
import s3, { s3Config } from "../config/s3Config";

const uploadFile = async (file, folder) => {
     const uniqueKey = `${uuidv4()}-${file.name}`;
     const filePath = `${folder}/${uniqueKey}`
     const params = {
          Bucket: s3Config.bucketName,
          Key: filePath,
          Body: file,
          ACL: 'public-read', // Optional: for public access
          ContentType: file.type,
     };

     // eslint-disable-next-line no-useless-catch
     try {
          const response = await s3.upload(params).promise();
          const {Location} = response;
          return Location;
     } catch (error) {
          throw error
     }
     
     // return "";
};

export const deleteFile = async (fileUrl) => {
     const arr = fileUrl.split("/");

     const fileName = arr[arr.length - 1];
     const params = {
          Bucket: "clickrwanda.s3.com",
          Key: fileName,
     };

     try {
          const data = await s3.deleteObject(params).promise();
          console.log("File deleted successfully:", data);
          return data;
     } catch (error) {
          console.error("Error deleting file:", error);
          throw error;
     }

     // return null
};

export const uploadMany = async (files, folder) => {
     const fileUrls = [];
     
          if (files && files[0]) {
          const uploadPromises = Array.from(files).map(async (file) => {
               try {
                    const fileUrl = await uploadFile(file, folder);
                    fileUrls.push(fileUrl);
               } catch (error) {
                    console.log(error);
               }
          });
     
          await Promise.all(uploadPromises);
          }
     
          return fileUrls;
};

export default uploadFile;
