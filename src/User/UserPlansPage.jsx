import { useContext, useEffect, useState } from "react";
import { DashboardContainer, DashboardRow } from "./components/DashboardComponents"
import AppData from "../Contexts/AppContext"
import UserContext from "../Contexts/UserContext";
import { getPlansByType } from "../utils/subscriptionFunctions";
import PayPlanCard from "../components/cards/PayPlanCard";
import { useNavigate } from "react-router-dom";

const UserPlansPage = () => {
     const [data,setData] = useContext(AppData);
     const [user]  = useContext(UserContext);
     const {activePlan, userInfo} = user;
     const {payPlans} = data;
     const [businessPlans, setBusinessPlans] = useState([]);
     const navigate = useNavigate();
     useEffect(() => {
          console.log("the use active plan: ",user);
          if(payPlans && payPlans.length){
               const plans = getPlansByType(payPlans, userInfo?.business_type || "Individual");
               setBusinessPlans(plans)
          }else{
               setData((prev) => ({
                    ...prev,
                    fetchNow: true
               }))
          }
     },[user, payPlans]);
     return (
          <DashboardContainer>
               <DashboardRow>
                    <h2>Memberships plans</h2>
                    <p>Click on the <b>Choose Plan</b> button to choose your favorite plan.</p>
               </DashboardRow>
               <div className="user-dashboard-plans-container">
                    {
                         businessPlans && businessPlans.length ? 
                              businessPlans.map((plan,index) => plan.plan_id === activePlan.plan_id ? <PayPlanCard key={`user-plan-${index}`} extra={{view_type: "current-plan-view", currentName: "Current Plan"} } plan={plan} btnTitle={"Choose Plan"} /> : <PayPlanCard key={`user-plan-${index}`} extra={{view_type: `${plan.plan_name}-view`} } plan={plan} btnTitle={"Choose Plan"} action={() => navigate(`/plan-payment?=${plan.plan_id}`)} /> )
                         : null 
                    }
               </div>
          </DashboardContainer>
     )
}

export default UserPlansPage