import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     uploadSingle: async(data, onProgress) => {
          try {
               const res = await axios.post(Server.fileUpload.single, data, {
                    headers: {
                         'x-api-key': serverKey
                    },
                    onUploadProgress: progressEvent => {
                         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                         if(onProgress) onProgress(progress);
                    }
          });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     uploadMany: async(data) => {
          try {
               const res = await axios.post(Server.fileUpload.multiple, data, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data
          } catch (error) {
               console.log(error);
               return null
          }
     }
}