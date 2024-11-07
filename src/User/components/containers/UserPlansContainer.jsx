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
          console.log(payPlans);
          if(payPlans && payPlans[0]){
               // const dividedPlans = {
               //      "Individual":[], "Small Business": [], 
               //      "Large Business": [], "Extra Boost": [], 
               //      "Commission Ads": [], "Fixed Ads": [],
               //      "Banner Ads": [], "Urgent Ads": [],
               //      "Article": []
               // };

               const dividedPlans = {
                    "Ads Packages":[], "Banner Packages": [], 
                    "Shop Packages": []
               };
               for(const plan of payPlans){
                    if(plan.plan_type === "Ads Package" ){
                         dividedPlans["Ads Packages"].push(plan);
                    }else if(plan.plan_type === "Banner Package") {
                         dividedPlans["Banner Packages"].push(plan);
                    }else if(plan.plan_type === "Shop Package"){
                         dividedPlans["Shop Packages"].push(plan);
                    }
                    // if(plan.plan_type === "Individual"){
                    //      dividedPlans["Individual"].push(plan);
                    // }else if (plan.plan_type === "Small Business"){
                    //      dividedPlans["Small Business"].push(plan);
                    // }else if(plan.plan_type === "Large Business"){
                    //      dividedPlans["Large Business"].push(plan);
                    // }else if(plan.plan_type === "Extra Boost"){
                    //      dividedPlans["Extra Boost"].push(plan)
                    // }else if(plan.plan_type === "Commission Ads"){
                    //      dividedPlans["Commission Ads"].push(plan);
                    // }else if(plan.plan_type === "Fixed Ads"){
                    //      dividedPlans["Fixed Ads"].push(plan);
                    // }else if(plan.plan_type === "Banner Ads"){
                    //      dividedPlans["Banner Ads"].push(plan);
                    // }else if(plan.plan_type === "Urgent Ads"){
                    //      dividedPlans["Urgent Ads"].push(plan);
                    // }else if(plan.plan_type === "Article Package"){
                    //      dividedPlans["Article"].push();
                    
                    // }
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
          <div className="w-full flex flex-col items-center justify-start mx-auto transition-all duration-100 gap-[10px] bg-white ">
               {
                    catPlans ? 
                    Object.entries(catPlans).map(([key, value], index) => 
                         value.length ?
                         <div className="w-full flex flex-col gap-[5px] items-center justify-start " key={`admin-plans-row-${key}-${index}`}>
                              <div className={`w-full flex items-center justify-start p-[10px] rounded-[5px] cursor-pointer transition-all duration-150  ${activePlans === key ? "bg-main-gold-600" : "bg-main-blue-700"}`} onClick={() => updateActivePlans(key)}><h3 className=" text-[1.2rem] text-white font-bold " >{key}</h3></div>
                              <div className={`w-full overflow-hidden flex items-start justify-center transition-all duration-300   ${activePlans === key ? "h-auto" : "h-0"} `}>
                                   <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[10px]  bg-white p-[5px] ">
                                        {
                                             value.map(item => item?.plan_id === activePlan?.plan_id ? <PayPlanCard btnTitle="Choose Plan" key={`user-dashboard-plans-card-${item?.plan_id}`} extra={{view_type: "current-plan-view", currentName: "Current Plan"}} plan={item}  /> : <PayPlanCard btnTitle={"Choose Plan"} key={`user-dashboard-plans-card-${item?.plan_id}`} plan={item} action={() => navigate(`/plan-payment?=${item.plan_id}`)} extra={{view_type: `${item.plan_plan_name}`}} />)
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