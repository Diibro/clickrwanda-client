import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     addVisit: async(visit) => {
          try {
               const res = await axios.post(Server.webView.add, visit, {
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
     getAllVisits: async () => {
          try {
               const res = await axios.get(Server.webView.getAll, {
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
     getRefVisits: async (r_id) => {
          try {
               const res = await axios.post(Server.webView.refVisits, {r_id}, {
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
     getTypeVisits: async (v_type) => {
          try {
               const res = await axios.post(Server.webView.typeVisits, {v_type}, {
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
     getIdVisits: async (id) => {
          try {
               const res = await axios.post(Server.webView.id_visits, {id}, {
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