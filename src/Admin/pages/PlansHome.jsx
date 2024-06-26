import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../AdminLayout"
import DashPlanCard from "../components/cards/DashPlanCard";

const PlansHome = () => {
     const [adminData] = useContext(AdminContext);
     const {paymentPlans} = adminData;
     const [catPlans, setCatPlans] = useState(null);
     const [activePlans, setActivePlans] = useState("");
     
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
                    }else{
                         dividedPlans["undefined"].push(plan);
                    }
               }
               setCatPlans(dividedPlans);
          }
     }

     useEffect(() => {
          updateCatPlans();
     }, [paymentPlans]); 

     return (
          <div className="admin-plans-container">
               {
                    catPlans ? 
                    Object.entries(catPlans).map(([key, value], index) => 
                         <div className="admin-plans-container" key={`admin-plans-row-${key}-${index}`}>
                              <div className="title-row"><h3>{key}</h3></div>
                              <div className="plans-container-row">
                                   {
                                        value.map(item => <DashPlanCard key={`admin-plans-card-${item.plan_id}`} plan={item} />)
                                   }
                              </div>
                         </div>
                    )
                    : <p>No plans found</p>
               }
          </div>
     )
}

export default PlansHome