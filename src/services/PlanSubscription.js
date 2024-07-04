import axios from "axios";
import Server from "./Server";

export default {
     add: async(item) => {
          try {
               const res = await axios.post(Server.planSubscription.add, item);
               return res.data
          } catch (error) {
               console.log(error);
               return null
          }
     },
     update: async(item) => {
          try {
               const res = await axios.post(Server.planSubscription.update, item);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     findAll: async() => {
          try {
               const res = await axios.get(Server.planSubscription.findAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     findByRId: async(r_id) => {
          try {
               const res = await axios.post(Server.planSubscription.findByAgent, {r_id});
               return res.data;
          } catch (error) {
               console.log(error);
               return null
          }
     },
     findByUser: async(user_id) => {
          try {
               const res = await axios.post(Server.planSubscription.findByUser, {user_id});
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     countAll: async() => {
          try {
               const res = await axios.get(Server.planSubscription.countAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return 0;
          }
     }
}