import axios from "axios";
import Server from './Server';

export default {
     save: async(item) => {
          try {
               const res = await axios.post(Server.commissionAdsClients.add, item);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.commissionAdsClients.update, item);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     findAll:async() => {
          try {
               const res = axios.get(Server.commissionAdsClients.findAll);
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     findByAgent: async(agent_id) => {
          try {
               const res = axios.get(`${Server.commissionAdsClients.findByAgent}?agent_id=${agent_id}`);
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}