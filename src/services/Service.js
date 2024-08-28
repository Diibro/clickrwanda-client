import axios from "axios";

export default  {
     post: async(endpoint,data) => {
          try {
               const res = await axios.post(endpoint, data);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     get: async(endpoint) => {
          try {
               const res = await axios.get(endpoint);
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     } 
}