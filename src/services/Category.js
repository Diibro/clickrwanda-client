import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     save: async(category) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.category.save, category, {headers: {
                    'Authorization': loginToken,
                    'x-api-key': serverKey
               }});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(category) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.category.update, category, {headers: {
                    'Authorization': loginToken,
                    'x-api-key': serverKey
               }});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async() => {
          try {
               const res = await axios.get(Server.category.getAll, {
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