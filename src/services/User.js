import axios from "axios";
import Server from "./Server";

export default {
     login: async (user) => {
          try {
               const res = await axios.post(Server.user.login, user);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async () => {
          try {
               const res = await axios.get(Server.user.getAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}