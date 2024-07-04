export const getActiveSubscription = (plans) => {
     const currentDate = new Date();

     return plans.find(plan => {
          const expDate = new Date(plan.exp_date);
          const validPlanTypes = ["Individual", "Small Business", "Large Business"];
          
          return expDate <= currentDate && validPlanTypes.includes(plan.plan_type) && plan.status === "Approved";
     }) || null;
}

export const getActivePlan  = (plans, plan_id) => {
     return plans.find(plan => plan.plan_id === plan_id)
}

export const getFreePlan = (plans, plan_type) => {
     if(plan_type){
          return plans.find(plan => plan.plan_type === plan_type && plan.plan_name === "Free");
     }else {
          return plans.find(plan => plan.plan_type === "Individual" && plan.plan_name === "Free");
          
     }
     
}

export const getPlansByType = (plans, plan_type) => {
     if(plan_type === null){
          return plans.filter(plan => plan.plan_type === "Individual");
     }
     return plans.filter(plan => plan.plan_type === plan_type);
}