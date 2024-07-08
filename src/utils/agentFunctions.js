import { isLaterThan } from "./dateFunctions";

export const calculateRefVisitsTotal = (arr, lastDate) => {
     let totalAmount = 0;
     if(arr && arr[0]){
          arr.forEach(visit => {
               if(!visit.v_type.startsWith('/forms') && isLaterThan(lastDate, visit.v_date)){
                    totalAmount += 5;
               }
          })
     }
     

     return totalAmount;
}

export const calculateShopTotal = (arr, lastDate) => {
     
     let total = 0;
     if(arr && arr[0]){
          arr.forEach(shop => {
               if(shop.active && isLaterThan(lastDate, shop.reg_date) && shop.total_ads > 0){
                    total += 20;
               }
          });
     }
     

     return total;
} 

export const calculatePackageTotal = (arr, lastDate) =>{
     let total = 0;
     if(arr && arr[0]){
          arr.forEach(sub => {
               if(sub.status === "Approved" && isLaterThan(lastDate, sub.subscription_date)){
                    total += ((20 / 100) * sub.amount);
               }
          })
     }

     return total;
}

export const countVisits = (arr, key, search) => {
     if(arr && arr[0]){
          return arr.filter(item => item[key].startsWith(search)).length
     }else{
          return 0;
     }
}