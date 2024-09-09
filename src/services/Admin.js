import axios from "axios";
import Server from "./Server";
import { getDateToday } from "../utils/dateFunctions";
const serverKey = import.meta.env.VITE_SERVER_KEY

export default {
     countAll: async() => {
          try {
               const res = await axios.post(Server.admin.countAll, {newDate: getDateToday()}, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     getAdverts: async(type) => {
          try {
               const res = await axios.get(`${Server.admin.getAdverts}?type=${type}`, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     }
}