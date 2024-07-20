import axios from "axios";
import Server from "./Server";

export default {
     add: async (item ) => {
          try {
               const res = await axios.post(Server.subCategory.save, item);
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.subCategory.update, item);
               return res;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async() => {
          try {
               const res = axios.get(Server.subCategory.getAll);
               return (await res).data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     searchCategory: async(category_id) => {
          try {
               const res = await axios.post(Server.subCategory.category, {category_id})
               return res.data;
          } catch (error) {
               console.log(error);
          }
     }
}