import { useContext, useEffect, useState } from "react";
import AppData from "../../Contexts/AppContext";
import PayPlanCard from "../../components/cards/PayPlanCard";
import PropTypes from "prop-types";
import { copyToClipboard } from "../../utils/otherFunctions";
const AgentPlansContainer = ({agent}) => {
     const [data,setData] = useContext(AppData);
     const {payPlans: paymentPlans} = data;
     const [catPlans, setCatPlans] = useState(null);
     useEffect(() => {
          if(!paymentPlans.length){
               setData(prev => ({...prev, fetchNow: true}));
          }
     },[]);

     const updateCatPlans = () => {
          if(paymentPlans && paymentPlans[0]){
               const dividedPlans = {"Individual":[], "Small Business": [], "Large Business": [], "Extra Boost Packages": [], "undefined": []};
               for(const plan of paymentPlans){
                    if(plan.plan_type === "Individual"){
                         dividedPlans["Individual"].push(plan);
                    }else if (plan.plan_type === "Small Business"){
                         dividedPlans["Small Business"].push(plan);
                    }else if(plan.plan_type === "Large Business"){
                         dividedPlans["Large Business"].push(plan);
                    }else if(plan.plan_type === "Extra Boost Packages"){
                         dividedPlans["Extra Boost Packages"].push(plan)
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
          <div className="pay-plans-container">
               {
                    catPlans ? 
                    Object.entries(catPlans).map(([key, value], index) => 
                         value.length > 0 ? 
                              <div className="row" key={`admin-plans-row-${key}-${index}`}>
                                   <h3>{key}</h3>
                                   <div className="plan-container-row">
                                        {     
                                                  value.map(item => item.plan_name !== "Free"  ?<PayPlanCard key={`admin-plans-card-${item.plan_id}`} plan={item} action={() => copyToClipboard(`http://localhost:5173/plan-payment?=${item.plan_id}?=${agent?.agent_id}`)} btnTitle={"Sell Package"} /> :null)
                                        }
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

