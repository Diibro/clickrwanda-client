import axios from "axios";
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default {
     add: async (item ) => {
          try {
               const res = await axios.post(Server.subCategory.save, item, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return  res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.subCategory.update, item, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async() => {
          try {
               const res = axios.get(Server.subCategory.getAll, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     searchCategory: async(category_id) => {
          try {
               const res = await axios.post(Server.subCategory.category, {category_id}, {
                    headers: {
                         'x-api-key': serverKey
                    }
               })
               return res.data;
          } catch (error) {
               console.log(error);
          }
     }
}