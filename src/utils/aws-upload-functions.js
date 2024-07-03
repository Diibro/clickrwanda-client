import UploadService from '../services/uploadFile';

const uploadFile = async (file, folder) => {
     const formData = new FormData();
     formData.append('image', file);
     formData.append('folderName', folder);
     const res = await UploadService.uploadSingle(formData);
     console.log(res);
     if(res.status === "pass"){
          return res.data;
     }else{
          return "";
     }
};

export const deleteFile = async (fileUrl) => {
     // const arr = fileUrl.split("/");

     // const fileName = arr[arr.length - 1];
     // const params = {
     //      Bucket: "clickrwanda.s3.com",
     //      Key: fileName,
     // };

     // try {
     //      const data = await s3.deleteObject(params).promise();
     //      console.log("File deleted successfully:", data);
     //      return data;
     // } catch (error) {
     //      console.error("Error deleting file:", error);
     //      throw error;
     // }

     return null
};

export const uploadMany = async (files, folder) => {
     const fileUrls = [];
     if (files && files.length > 0) {
          const uploadPromises = Array.from(files).map(async (file) => {
               const fileUrl = await uploadFile(file, folder);
               return fileUrl;
          });
          const resolvedFileUrls = await Promise.all(uploadPromises);
          fileUrls.push(...resolvedFileUrls);
     }
     return fileUrls;
};

export default uploadFile;
