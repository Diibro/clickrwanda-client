import axios from "axios";
import Server from './Server';
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     save: async(item) => {
          try {
               const res = await axios.post(Server.commissionAdsClients.add, item, {
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
               const res = await axios.post(Server.commissionAdsClients.update, item, {
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
     findAll:async() => {
          try {
               const res = axios.get(Server.commissionAdsClients.findAll, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     findByAgent: async(agent_id) => {
          try {
               const res = axios.get(`${Server.commissionAdsClients.findByAgent}?agent_id=${agent_id}`, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}