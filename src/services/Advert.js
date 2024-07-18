import axios from "axios"
import Server from "./Server";

export default {
     save: async (advert) => {
          try {
               const loginToken = sessionStorage.getItem('loginToken') || null;
               const res = await axios.post(Server.advert.save, advert, {headers: {
                    'Authorization': loginToken
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
                    'Authorization': loginToken
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
                    'Authorization': loginToken
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
               const res = await axios.post(Server.advert.search, advert);
               const info = await res.data;
               return info;
          } catch (error) {
               console.log(error)
               return null;
          }
     },
     getAll: async () => {
          try {
               const res = await axios.get(Server.advert.findAll);
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     getAllApproved: async(ops) => {
          try {
               const res = await axios.post(Server.advert.findAllApproved, ops);
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getSimilarAds: async(ops) => {
          try {
               const res = await axios.post(Server.advert.similarAds,ops);
               const info = res.data;
               return info;
          } catch (error) {
               console.log(error);
               return null;
          }
     }
}