import axios from "axios"
import Server from "./Server"
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     add: async(task) => {
          try {
               const res = await axios.post(Server.agentTask.add, task, {
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
     update: async(task) => {
          try {
               const res = await axios.post(Server.agentTask.update, task, {
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
     delete: async(task) => {
          try {
               const res = await axios.post(Server.agentTask.delete, task, {
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
     findAll: async() => {
          try {
               const res = await axios.get(Server.agentTask.findAll, {
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
     findByAgent: async(agent) => {
          try {
               const res = await axios.post(Server.agentTask.findByAgent, agent, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}