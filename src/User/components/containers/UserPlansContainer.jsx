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
               const dividedPlans = {
                    "Individual":[], "Small Business": [], 
                    "Large Business": [], "Extra Boost": [], 
                    "Commissions": [], "Fixed Ads": [],
                    "Banner Ads": [], "Urgent Ads": [],
                    "Article": []
               };
               for(const plan of payPlans){
                    if(plan.plan_type === "Individual"){
                         dividedPlans["Individual"].push(plan);
                    }else if (plan.plan_type === "Small Business"){
                         dividedPlans["Small Business"].push(plan);
                    }else if(plan.plan_type === "Large Business"){
                         dividedPlans["Large Business"].push(plan);
                    }else if(plan.plan_type === "Extra Boost"){
                         dividedPlans["Extra Boost"].push(plan)
                    }else if(plan.plan_type === "Commissions"){
                         dividedPlans["Commissions"].push(plan);
                    }else if(plan.plan_type === "Fixed Ads"){
                         dividedPlans["Fixed Ads"].push(plan);
                    }else if(plan.plan_type === "Banner Ads"){
                         dividedPlans["Banner Ads"].push(plan);
                    }else if(plan.plan_type === "Urgent Ads"){
                         dividedPlans["Urgent Ads"].push(plan);
                    }else if(plan.plan_type === "Article Package"){
                         dividedPlans["Article"].push();
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
                         value.length ?
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
                         : null

                    )
                    : <p>No plans found</p>
               }
          </div>
     )
}

export default UserPlansContainer