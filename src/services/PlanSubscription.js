import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     add: async(item) => {
          try {
               const res = await axios.post(Server.planSubscription.add, item, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data
          } catch (error) {
               console.log(error);
               return null
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.planSubscription.update, item, {
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
     findAll: async() => {
          try {
               const res = await axios.get(Server.planSubscription.findAll, {
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
     findByRId: async(r_id) => {
          try {
               const res = await axios.post(Server.planSubscription.findByAgent, {r_id}, {
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
     findByUser: async(user_id) => {
          try {
               const res = await axios.post(Server.planSubscription.findByUser, {user_id}, {
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
     countAll: async() => {
          try {
               const res = await axios.get(Server.planSubscription.countAll, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return 0;
          }
     }
}