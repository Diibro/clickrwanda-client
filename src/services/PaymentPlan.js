import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     save: async (item) => {
          try {
               const res = await axios.post(Server.paymentPlans.save, item, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.paymentPlans.update, item, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async() => {
          try {
               const res = await axios.get(Server.paymentPlans.getAll, {
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