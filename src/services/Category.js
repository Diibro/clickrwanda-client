import axios from "axios";
import Server from "./Server";

export default {
     save: async(category) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.category.save, category, {headers: {
                    'Authorization': loginToken
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
                    'Authorization': loginToken
               }});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async() => {
          try {
               const res = await axios.get(Server.category.getAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}