import { useContext, useEffect, useState } from "react";
import AppData from "../../Contexts/AppContext";
import PayPlanCard from "../../components/cards/PayPlanCard";
import PropTypes from "prop-types";
import { copyToClipboard } from "../../utils/otherFunctions";
const AgentPlansContainer = ({agent}) => {
     const [data,setData] = useContext(AppData);
     const {payPlans: paymentPlans} = data;
     const [catPlans, setCatPlans] = useState(null);
     const [activePlans, setActivePlans] = useState("");

     const updateActivePlans = (plansName) => {
          if(activePlans === plansName) {
               setActivePlans("");
          }else{
               setActivePlans(plansName);
          }
     }
     useEffect(() => {
          if(!paymentPlans.length){
               setData(prev => ({...prev, fetchNow: true}));
          }
     },[]);

     const updateCatPlans = () => {
          if(paymentPlans && paymentPlans[0]){
               const dividedPlans = {
                    "Individual":[], "Small Business": [], 
                    "Large Business": [], "Extra Boost": [], 
                    "Commissions": [], "Fixed Ads": [],
                    "Banner Ads": [], "Urgent Ads": [],
                    "Article": []
               };
               for(const plan of paymentPlans){
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
               for (const category in dividedPlans) {
                    dividedPlans[category].sort((a, b) => a.plan_amount - b.plan_amount);
               }
               setCatPlans(dividedPlans);

          }
     }


     useEffect(() => {
          updateCatPlans();
     }, [data])
     return (
          <div className="admin-plans-container">
               {
                    catPlans ? 
                    Object.entries(catPlans).map(([key, value], index) => 
                         value.length > 0 ? 
                              <div className="admin-plans-container" key={`admin-plans-row-${key}-${index}`}>
                              <div className={`title-row ${activePlans === key ? "active-plans-title" : ""}`} onClick={() => updateActivePlans(key)}><h3>{key}</h3></div>
                              <div className={`plans-container-row ${activePlans === key ? "active-plans" : ""} `}>
                                   <div className="content">
                                        {
                                             value.map(item => item.plan_name !== "Free"  ?<PayPlanCard key={`admin-plans-card-${item.plan_id}`} plan={item} action={() => copyToClipboard(`https://clickrwanda.com/plan-payment?=${item.plan_id}?=${agent?.agent_id}`)} btnTitle={"Sell Package"} /> :null)
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

AgentPlansContainer.propTypes = {
     agent: PropTypes.object
}


export default AgentPlansContainer


// <div className="row" key={`admin-plans-row-${key}-${index}`}>
//      <h3>{key}</h3>
//      <div className="plan-container-row">
//           {     
//                     value.map(item => item.plan_name !== "Free"  ?<PayPlanCard key={`admin-plans-card-${item.plan_id}`} plan={item} action={() => copyToClipboard(`https://clickrwanda.com/plan-payment?=${item.plan_id}?=${agent?.agent_id}`)} btnTitle={"Sell Package"} /> :null)
//           }
//      </div>
// </div>