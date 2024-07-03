import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import UserService from "../services/User";
import server from "../config/Server";
import { useNavigate } from "react-router-dom";
import { showMainNotification } from "../utils/AdminFunctions";

const UserContext = createContext();

export const UserProvider = ({children}) => {
     const [user, setUser] = useState({
          userId: '',
          userAdverts: [],
          userInfo: {},
          shopVisits: [],
          reviews: [],
          activeForm: '',
          loggedIn: false,
          fetchNow:""
     });
     const {loggedIn} = user;
     const navigate = useNavigate();

     const fetchUserData = async (userId) => {
          if(userId  && userId != '' && loggedIn){
               const res = await UserService.getUserDashBoard(userId);
               const userAds = await server.getUserAdverts();
               console.log(userAds);
               if(userAds.status === "pass"){
                    setUser((prev) => ({
                         ...prev,
                         userAdverts: userAds.data
                    }))
               }else if(userAds.message === "Authentication Error"){
                    setUser(prev => ({
                         ...prev,
                         loggedIn:false
                    })) 
                    showMainNotification("fail", "Session Timeout", () => navigate("/forms/login"));
               }    
               if(res){
                    const {data} = res;
                    setUser(prev => ({
                         ...prev,
                         shopVisits: data?.userVisits,
                         reviews: data?.userReviews
                    }));
               }


          }else{
               console.log('no user Id');
          }
     }
     useEffect(() => {
          const token = sessionStorage.getItem('loginToken') || null;
          if(token){
               const storedData = sessionStorage.getItem('userData');
               if(storedData){
                    const userData = JSON.parse(storedData);
                    setUser((prev) => ({
                    ...prev,
                    userInfo: userData,
                    loggedIn: true
                    }));

                    (async() => await fetchUserData(userData.user_id))();
               }
               
          }else{
               setUser(prev => ({
                    ...prev, loggedIn:false
               }))
          }
     }, [user.fetchNow]);

     return(
          <UserContext.Provider value={[user, setUser]} >{children}</UserContext.Provider>
     )
}

UserProvider.propTypes = {
     children: PropTypes.node.isRequired,
}
export default UserContext;