import axios from "axios";
import Server from "./Server";

export default {
     uploadSingle: async(data) => {
          try {
               const res = await axios.post(Server.fileUpload.single, data);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     uploadMany: async(data) => {
          try {
               const res = await axios.post(Server.fileUpload.multiple, data);
               return res.data
          } catch (error) {
               console.log(error);
               return null
          }
     }
}