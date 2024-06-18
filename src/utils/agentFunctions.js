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
               if(shop.active && isLaterThan(lastDate, shop.reg_date)){
                    total += 200;
               }
          });
     }
     

     return total;
} 

export const countVisits = (arr, key, search) => {
     
     console.log(arr);
     if(arr && arr[0]){
          return arr.filter(item => item[key].startsWith(search)).length
     }else{
          return 0;
     }
}