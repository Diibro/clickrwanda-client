import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY

export default {
     save: async (agent) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.agent.save, agent, {headers: {
                    'Authorization': loginToken,
                    'x-api-key': serverKey
               }});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async (agent) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.agent.update, agent, {
                    headers: {
                         'Authorization':loginToken,
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
               const loginToken  = sessionStorage.getItem('loginToken') || null;
               const res = await axios.get(Server.agent.getAll, {
                    headers: {
                         'Authorization':loginToken,
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     login: async(agent) => {
          try {
               const res = await axios.post(Server.agent.login, agent,  {
                    headers: {
                         'x-api-key':serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     resetPassword: async(agent) => {
          try {
               const res = await axios.post(Server.agent.resetPassword, agent,  {
                    headers: {
                         'x-api-key':serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getCounts: async(ops) => {
          try {
               const res = await axios.post(Server.agent.getCounts, ops,  {
                    headers: {
                         'x-api-key':serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getCommissionAdsByAgent: async(r_id) => {
          try {
               const res = await axios.get(`${Server.agent.getCommissionAdsByAgent}?r_id=${r_id}`,  {
                    headers: {
                         'x-api-key':serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}