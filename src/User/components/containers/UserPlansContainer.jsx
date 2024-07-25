import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppData from "../../../Contexts/AppContext";
import UserContext from "../../../Contexts/UserContext";
import PayPlanCard from "../../../components/cards/PayPlanCard";

const UserPlansContainer = () => {
     const [data,setData] = useContext(AppData);
     const [user]  = useContext(UserContext);
     const {activePlan} = user;
     const {payPlans} = data;
     // const [businessPlans, setBusinessPlans] = useState([]);
     const navigate = useNavigate();
     const [catPlans,setCatPlans] = useState(null);
     const [activePlans, setActivePlans] = useState("");

     const updateActivePlans = (plansName) => {
          if(activePlans === plansName) {
               setActivePlans("");
          }else{
               setActivePlans(plansName);
          }
     }

     const updateCatPlans = () => {
          if(payPlans && payPlans[0]){
               const dividedPlans = {"Individual Plans":[], "Small Business Plans": [], "Large Business Plans": [], "Extra Boost Plans": []};
               for(const plan of payPlans){
                    if(plan.plan_type === "Individual"){
                         if(plan.plan_id === activePlan.plan_id || plan.plan_name !== "Free") {
                              dividedPlans["Individual Plans"].push(plan);
                         }
                         
                    }else if (plan.plan_type === "Small Business"){
                         if(plan.plan_id === activePlan.plan_id || plan.plan_name !== "Free"){
                              dividedPlans["Small Business Plans"].push(plan);
                         }
                         
                    }else if(plan.plan_type === "Large Business"){
                         if(plan.plan_id === activePlan.plan_id || plan.plan_name !== "Free"){
                              dividedPlans["Large Business Plans"].push(plan);
                         }
                         
                    }else if(plan.plan_type === "Extra Boost Packages"){
                         if(plan.plan_id === activePlan.plan_id || plan.plan_name !== "Free"){
                              dividedPlans["Extra Boost Packages"].push(plan)
                         }
                         
                    }
               }
               setCatPlans(dividedPlans);
          }
     }

     useEffect(() => {
          if(payPlans && payPlans.length ){
               updateCatPlans();
          }else{
               setData((prev) => ({
                    ...prev,
                    fetchNow: true
               }))
          }
          
     }, [payPlans]);
     return (
          <div className="admin-plans-container">
               {
                    catPlans ? 
                    Object.entries(catPlans).map(([key, value], index) => 
                         <div className="admin-plans-container" key={`admin-plans-row-${key}-${index}`}>
                              <div className={`title-row ${activePlans === key ? "active-plans-title" : ""}`} onClick={() => updateActivePlans(key)}><h3>{key}</h3></div>
                              <div className={`plans-container-row ${activePlans === key ? "active-plans" : ""} `}>
                                   <div className="content">
                                        {
                                             value.map(item => item.plan_id === activePlan.plan_id ? <PayPlanCard btnTitle="Choose Plan" key={`user-dashboard-plans-card-${item.plan_id}`} extra={{view_type: "current-plan-view", currentName: "Current Plan"}} plan={item}  /> : <PayPlanCard btnTitle={"Choose Plan"} key={`user-dashboard-plans-card-${item.plan_id}`} plan={item} action={() => navigate(`/plan-payment?=${item.plan_id}`)} extra={{view_type: `${item.plan_plan_name}`}} />)
                                        }
                                   </div>
                              </div>
                         </div>
                    )
                    : <p>No plans found</p>
               }
          </div>
     )
}

export default UserPlansContainer