import axios from "axios"
import Server from "./Server"

export default {
     add: async(task) => {
          try {
               const res = await axios.post(Server.agentTask.add, task);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     update: async(task) => {
          try {
               const res = await axios.post(Server.agentTask.update, task);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     delete: async(task) => {
          try {
               const res = await axios.post(Server.agentTask.delete, task);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     findAll: async() => {
          try {
               const res = await axios.get(Server.agentTask.findAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     findByAgent: async(agent_id) => {
          try {
               const res = await axios.post(Server.agentTask.findByAgent, {agent_id})
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}