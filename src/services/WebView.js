import axios from "axios";
import Server from "./Server";

export default {
     addVisit: async(visit) => {
          try {
               const res = await axios.post(Server.webView.add, visit);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAllVisits: async () => {
          try {
               const res = await axios.get(Server.webView.getAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getRefVisits: async (r_id) => {
          try {
               const res = await axios.post(Server.webView.refVisits, {r_id});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getTypeVisits: async (v_type) => {
          try {
               const res = await axios.post(Server.webView.typeVisits, {v_type});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getIdVisits: async (id) => {
          try {
               const res = await axios.post(Server.webView.id_visits, {id});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}