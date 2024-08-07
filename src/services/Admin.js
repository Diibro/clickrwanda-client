import axios from "axios";
import Server from "./Server";
import { getDateToday } from "../utils/dateFunctions";

export default {
     countAll: async() => {
          try {
               const res = await axios.post(Server.admin.countAll, {newDate: getDateToday()});
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     getAdverts: async(type) => {
          try {
               const res = await axios.get(`${Server.admin.getAdverts}?type=${type}`);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     }
}