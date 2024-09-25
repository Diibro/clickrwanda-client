import axios from "axios";
const serverKey = import.meta.env.VITE_SERVER_KEY;

export default  {
     post: async(endpoint,data) => {
          try {
               const res = await axios.post(endpoint, data, {
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
     get: async(endpoint) => {
          try {
               const res = await axios.get(endpoint, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     patch: async(endpoint, data) => {
          try {
               const res = await axios.patch(endpoint, data, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               if(res  && res.data){
                    return res.data;
               }else {
                    return null;
               }

          } catch (error) {
               console.log(error);
               return null
          }
     },
     delete: async (endpoint) => {
          try {
               const res = await axios.delete(endpoint, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               if(res && res.data){
                    return res.data;
               }else {
                    return null;
               }
          } catch (error) {
               console.log(error);
               return null
          }
     }
}