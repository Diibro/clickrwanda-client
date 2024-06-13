import axios from "axios";
import Server from './Server';

export default {
     getAll: async () => {
          try {
               const res = await axios.get(Server.agentPayment.getAll);
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
                              "Authorization": token
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
               const token = sessionStorage.getItem("agentToken");
               if(token){
                    const res = await axios.post(Server.agentPayment.update, item, {
                         headers: {
                              "Authorization": token
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
                              "Authorization": token
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