import axios from "axios";
import Server from './Server';
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     getAll: async () => {
          try {
               const res = await axios.get(Server.agentPayment.getAll,  {
                    headers: {
                         'x-api-key':serverKey
                    }
               });
               return res.data;

          } catch (error) {
               console.log(error);
               return null
          }
     },
     save: async(item) => {
          try {
               const token = sessionStorage.getItem("agentToken");
               if(token){
                    const res = await axios.post(Server.agentPayment.save, item, {
                         headers: {
                              "Authorization": token,
                              'x-api-key': serverKey
                         }
                    });

                    return res.data
               }
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(item) => {
          try {
               const token = sessionStorage.getItem("loginToken");
               if(token){
                    const res = await axios.post(Server.agentPayment.update, item, {
                         headers: {
                              "Authorization": token,
                              'x-api-key': serverKey
                         }
                    });

                    return res.data
               }
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     findByAgent: async(agent_id) => {
          try {
               const token = sessionStorage.getItem("agentToken");
               if(token){
                    const res = await axios.post(Server.agentPayment.findByAgent, {agent_id}, {
                         headers: {
                              "Authorization": token,
                              'x-api-key': serverKey
                         }
                    });
                    console.log(res);
                    return res.data
               }
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}