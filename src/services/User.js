import axios from "axios";
import Server from "./Server";
import { showMainNotification } from "../utils/AdminFunctions";

export default {
     login: async (user) => {
          try {
               const res = await axios.post(Server.user.login, user);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getAll: async () => {
          try {
               const res = await axios.get(Server.user.getAll);
               return res.data;
          } catch (error) {
               console.log(error);
               return null;
          }
     },
     getByRef: async (r_id) => {
          try{
               const token = sessionStorage.getItem("agentToken");
               if(token){
                    const res = await axios.post(Server.user.getByRef, {r_id}, {
                         headers: {
                              "Authorization": token
                         }
                    });

                    return res.data
               }
          }catch(error){
               console.log(error);
               return null;
          }
     },
     getUserDashBoard: async(user_id) => {
          try{
               const token = sessionStorage.getItem("loginToken");
               if(token){
                    const res = await axios.post(Server.user.getUserDashInfo, {user_id}, {
                         headers: {
                              "Authorization": token
                         }
                    });
                    return res.data
               }else{
                    showMainNotification("fail", "Session expired. Login again.", () => {});
                    return null;
               }
          }catch(error){
               console.log(error);
               showMainNotification("fail", "Network error", () => {})
               return null;
          }
     }
}