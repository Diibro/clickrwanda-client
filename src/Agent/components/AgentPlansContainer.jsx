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
               // const dividedPlans = {
               //      "Individual":[], "Small Business": [], 
               //      "Large Business": [], "Extra Boost": [], 
               //      "Commissions": [], "Fixed Ads": [],
               //      "Banner Ads": [], "Urgent Ads": [],
               //      "Article": []
                    
               // };

               const dividedPlans = {
                    "Ads Packages":[], "Banner Packages": [], 
                    "Shop Packages": []
               };
               for(const plan of paymentPlans){
                    if(plan.plan_type === "Ads Package" ){
                         dividedPlans["Ads Packages"].push(plan);
                    }else if(plan.plan_type === "Banner Package") {
                         dividedPlans["Banner Packages"].push(plan);
                    }else if(plan.plan_type === "Shop Package"){
                         dividedPlans["Shop Packages"].push(plan);
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
          <div className="w-full flex flex-col items-center justify-start gap-[20px]">
               {
                    catPlans ? 
                    Object.entries(catPlans).map(([key, value], index) => 
                         value.length > 0 ? 
                              <div className="admin-plans-container" key={`admin-plans-row-${key}-${index}`}>
                                   <div className={`title-row ${activePlans === key ? "bg-main-gold-600" : "bg-main-blue-700"}`} onClick={() => updateActivePlans(key)}><h3>{key}</h3></div>
                                   <div className={`w-full transition-all duration-300 ${activePlans === key ? "h-auto" : "h-0"} overflow-hidden `}>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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