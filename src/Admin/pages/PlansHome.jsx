import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../AdminLayout"
// import DashPlanCard from "../components/cards/DashPlanCard";
import { AddButton } from "../components/buttons/ActionButtons";
import { toggleForms } from "../../utils/AdminFunctions";
import PayPlanCard from "../../components/cards/PayPlanCard";

const PlansHome = () => {
     const [adminData,setAdminData] = useContext(AdminContext);
     const {paymentPlans} = adminData;
     const [catPlans, setCatPlans] = useState(null);
     const [activePlans, setActivePlans] = useState("");

     const updateActivePlans = (plansName) => {
          if(activePlans === plansName) {
               setActivePlans("");
          }else{
               setActivePlans(plansName);
          }
     }
     const updateCatPlans = () => {
          if(paymentPlans && paymentPlans[0]){
               const dividedPlans = {
                    "Individual":[], "Small Business": [], 
                    "Large Business": [], "Extra Boost": [], 
                    "Commissions": [], "Fixed Ads": [],
                    "Banner Ads": [], "Urgent Ads": [],
                    "Article": [],"undefined": []
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
                    else{
                         dividedPlans["undefined"].push(plan);
                    }
               }
               setCatPlans(dividedPlans);
          }
     }

     const showPlansAddForm = (plan_type) => {
          setAdminData((prev) => ({
               ...prev, 
               activeForm: {
                    type: "plans",
                    formName: "Add Plan",
                    planType: plan_type,
                    nextId: `${plan_type}`
               }
          }))
          toggleForms(true);
     }

     const showPlanView = (plan, plan_type) => {
          setAdminData((prev) => ({
               ...prev, 
               activeForm: {
                    type: "plans",
                    formName: "Update Plan",
                    planType: plan_type,
                    objFocus: plan
               }
          }))
          toggleForms(true);
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
                              <div className={`title-row ${activePlans === key ? "active-plans-title" : ""}`} onClick={() => updateActivePlans(key)}><h3>{key}</h3></div>
                              <div className={`plans-container-row ${activePlans === key ? "active-plans" : ""} `}>
                                   <div className="actions-row">
                                        <AddButton title={"Add New Plan"} action={() => showPlansAddForm(key)} />
                                   </div>
                                   <div className="content">
                                        {
                                             value.map(item => <PayPlanCard btnTitle={"View Package"} key={`admin-plans-card-${item.plan_id}`} plan={item} action={() => showPlanView(item, key)} />)
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

export default PlansHome