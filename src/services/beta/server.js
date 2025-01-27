import axios from "axios";
import { fetchWrapper } from "./fetchWrapper";
const publicApi = import.meta.env.VITE_BETA_SERVER;

export const MainServer = {
     post: async (data, endpoint) => {
          try {
               const res = await axios.post(`${publicApi}/${endpoint}`, data);
               return res.data;
          } catch (error) {
               return null;
          }
     },
     fetch: async (endpoint) => {
          const url = `${publicApi}/${endpoint}`;
          return fetchWrapper(url, { method: 'GET' });
     },
     get:async (endpoint) => {
          try{
               const res = await axios.get(`${publicApi}/${endpoint}`);
               console.log(res)
               return res.data;
          }catch(error){
               console.log(error);
               return null
          }
     },
     getWithParams:async (endpoint, params) => {
          try{
               if(params) {
                    const res = await axios.get(`${publicApi}/${endpoint}`, {params: params});
                    return res.data;
               }
               const res = await axios.get(`${publicApi}/${endpoint}`);
               return res.data;
          }catch(error){
               // console.log(error);
               return null
          }
     },
     patch: async (data, endpoint) => {
          try {
               const res = await axios.patch(`${publicApi}/${endpoint}`, data);
               return res.data;
          } catch (error) {
               // console.log(error);
               return null;
          }
     },
     delete: async(endpoint) => {
          try {
               const res = await axios.delete(`${publicApi}/${endpoint}`);
               return res.data
          } catch (error) {
               // console.log(error);
               return null
          }
     }
}