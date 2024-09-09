import axios from "axios"
import Server from "./Server";
const serverKey = import.meta.env.VITE_SERVER_KEY


export default {
     save: async (advert) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.advert.save, advert, {headers: {
                    'Authorization': loginToken,
                    'x-api-key': serverKey
               }});
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     update: async (advert) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.advert.update, advert, {headers: {
                    'Authorization': loginToken,
                    'x-api-key': serverKey
               }});
               const info = res.data;
               return info;
               
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     updateAd: async (advert) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.advert.updateAd, advert, {headers: {
                    'Authorization': loginToken,
                    'x-api-key': serverKey
               }});
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     searchAd: async (advert) => {
          try {
               const res = await axios.post(Server.advert.search, advert, {
                    headers: {
                         'x-api-key':serverKey
                    }
               });
               const info = await res.data;
               return info;
          } catch (error) {
               console.log(error)
               return null;
          }
     },
     getAll: async () => {
          try {
               const res = await axios.get(Server.advert.findAll, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     getAllApproved: async(ops) => {
          try {
               const res = await axios.post(Server.advert.findAllApproved, ops, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getSimilarAds: async(ops) => {
          try {
               const res = await axios.post(Server.advert.similarAds,ops, {
                    headers: {
                         'x-api-key': serverKey
                    }
               });
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getByLocation: async(ops) => {
          try {
               const res = await axios.post(Server.advert.adsByLocation, ops, {
                    headers:{
                         'x-api-key': serverKey
                    }
               });
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     getCountsByLocation: async(locations) => {
          try {
               const res = await axios.post(Server.advert.getCountsByLocation, locations, {
                    headers:{
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getByCategory: async(ops) => {
          try {
               const res = await axios.post(Server.advert.getByCategory, ops, {
                    headers:{
                         'x-api-key': serverKey
                    }
               });
               return res.data; 
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getBySubCategory: async(ops) => {
          try {
               const res = await axios.post(Server.advert.getBySubCategory, ops, {
                    headers:{
                         'x-api-key': serverKey
                    }
               });
               return res.data; 
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getClientApprovedCommissionAds: async (ops) => {
          try {
               const res = await axios.post(Server.advert.getClientCommissionAds, ops, {
                    headers:{
                         'x-api-key': serverKey
                    }
               });
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     getCommissionAdsByCategory: async(ops) => {
          try {
               const res = await axios.post(Server.advert.getCommissionAdsByCategory, ops, {
                    headers:{
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