import axios from "axios";
import Server from "./Server";

export default {
     save: async (item) => {
          try {
               const res = await axios.post(Server.paymentPlans.save, item);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.paymentPlans.update, item);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async() => {
          try {
               const res = await axios.get(Server.paymentPlans.getAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     }
}