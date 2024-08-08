import { createContext, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import UserService from "../services/User";
import server from "../config/Server";
import { useLocation, useNavigate } from "react-router-dom";
import { showMainNotification } from "../utils/AdminFunctions";
import PlanSubscriptionService from "../services/PlanSubscription";
import { getActivePlan, getActiveSubscription, getFreePlan } from "../utils/subscriptionFunctions";
import AppData from "./AppContext";

const UserContext = createContext();

export const UserProvider = ({children}) => {
     const [user, setUser] = useState({
          userId: '',
          userAdverts: [],
          userInfo: null,
          shopVisits: [],
          reviews: [],
          activeForm: '',
          loggedIn: false,
          fetchNow:"",
          activePlan: {},
          activeSubscription: null,
          userSubscriptions: [],
          role:""
     });
     const [data,setData] = useContext(AppData);
     const {payPlans} = data;
     const { userInfo} = user;
     const navigate = useNavigate();
     const location = useLocation();

     const fetchData = async() => {
          const res = await UserService.getUserDashBoard(userInfo.user_id);
          const userAds = await server.getUserAdverts();
          const userSubscriptionsRes = await PlanSubscriptionService.findByUser(userInfo.user_id); 
          if(userAds.status === "pass"){
               setUser((prev) => ({
                    ...prev,
                    userAdverts: userAds.data
               }))
          }else if(userAds.message === "Authentication Error"){
               setUser(prev => ({
                    ...prev,
                    loggedIn:false,
                    role: ''
               })) 
               showMainNotification("fail", "Session Timeout", () => {
                    navigate("/forms/login");
                    setData(prev => ({
                         ...prev,
                         prevState: location
                    }));
                    localStorage.setItem('prevState', JSON.stringify(location));
               });
          }    
          if(res){
               const {data} = res;
               setUser(prev => ({
                    ...prev,
                    shopVisits: data?.userVisits,
                    reviews: data?.userReviews
               }));
          }
          
          if(userSubscriptionsRes){
               const subs = userSubscriptionsRes.data;
               let userActiveSubscription = null;
               let userActivePlan = null;
               setUser(prev => ({
                    ...prev,
                    userSubscriptions: subs
               }))
               if(subs.length){
                    userActiveSubscription = getActiveSubscription(subs);
                    if(userActiveSubscription){
                         userActivePlan = getActivePlan(payPlans,userActiveSubscription.plan_id);
                    }else{
                         userActivePlan = getFreePlan(payPlans, userInfo.business_type);
                    }
                    
               }else{
                    userActivePlan = getFreePlan(payPlans, userInfo.business_type);
               }

               setUser((prev) => ({
                    ...prev,
                    activePlan: userActivePlan,
                    activeSubscription: userActiveSubscription
               }))
          }
     }

     useEffect(() => {
          if(location.pathname.startsWith('/forms/add-advert') && location.search.split('?=')[2]){
               return;
          }
          else if(
               location.pathname.startsWith('/user-dashboard') 
               || location.pathname.startsWith("/plan-payment" ) 
               || location.pathname.startsWith('/forms/add-advert')
               || location.pathname.startsWith('/job-seeker')
          ){
               if(userInfo && payPlans && payPlans.length ){
                    (async() => await fetchData())();
               }else if(!userInfo){
                    const token = sessionStorage.getItem('loginToken') || null;
                    let isLoggedIn = false;
                    if(token){
                         const storedData = sessionStorage.getItem('userData');
                         if(storedData){
                              const userData = JSON.parse(storedData);
                              setUser((prev) => ({
                              ...prev,
                              userInfo: userData,
                              loggedIn: true,
                              role: userData.user_type || userData.agent_type
                              }));
                              isLoggedIn = true;
                         }
                    }
     
                    if(!isLoggedIn){
                         return showMainNotification("fail", "First Login to access the user dashboard.", () => {
                              setData(prev => ({...prev, prevState: location}));
                              navigate("/forms/login", { state: { from: location} });

                         });
                    }
               }else if(!payPlans || !payPlans.length){
                    setData(prev => ({
                         ...prev, fetchNow:true
                    }))
               }
          }
          
     },[userInfo, location.pathname, payPlans]);
     

     return(
          <UserContext.Provider value={[user, setUser]} >{children}</UserContext.Provider>
     )
}

UserProvider.propTypes = {
     children: PropTypes.node.isRequired,
}
export default UserContext;