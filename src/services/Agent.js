import axios from "axios";
import Server from "./Server";

export default {
     save: async (agent) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.agent.save, agent, {headers: {
                    'Authorization': loginToken
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
                    headers: {'Authorization':loginToken}
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
                    headers: {'Authorization':loginToken}
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     login: async(agent) => {
          try {
               const res = await axios.post(Server.agent.login, agent);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     resetPassword: async(agent) => {
          try {
               const res = await axios.post(Server.agent.resetPassword, agent);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getCounts: async(ops) => {
          try {
               const res = await axios.post(Server.agent.getCounts, ops);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getCommissionAdsByAgent: async(r_id) => {
          try {
               const res = await axios.get(`${Server.agent.getCommissionAdsByAgent}?r_id=${r_id}`);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}