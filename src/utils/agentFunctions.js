import { isLaterThan } from "./dateFunctions";

// export const calculateRefVisitsTotal = (arr, lastDate,v_ids) => {
//      let totalAmount = 0;
//      console.log(v_ids);
//      if(arr && arr[0]){
//           arr.forEach(visit => {
//                if(v_ids.includes(visit.v_id) && isLaterThan(lastDate, visit.v_date)){
//                     totalAmount += 5;
//                }
//           })
//      }
     

//      return totalAmount;
// }


export const calculateRefVisitsTotal = (arr, lastDate,tasks) => {
     let totalAmount = 0;
     if(arr && arr[0] && tasks && tasks.length){
          arr.forEach(visit => {
               tasks.forEach(task => {
                    if(task.v_ids.includes(visit.v_id) && isLaterThan(lastDate, visit.v_date) && isLaterThan(visit.v_date, task.exp_date)){
                         totalAmount += task.amount;
                    }
               })
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
                    total += ((30 / 100) * sub.amount);
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

export const getVisitIds = (tasks) => {
     const v_ids = [];
     if(tasks && tasks.length){
          tasks.forEach(task => {
               v_ids.push(...(task.v_ids));
          })
     }
     return v_ids;
}

export const getNotPayed = (arr, date_key, last_pay_date) => {
     if(last_pay_date && last_pay_date != null && last_pay_date != ''){
          if(arr && arr.length){
               return arr.filter(item => isLaterThan(last_pay_date, item[date_key]) )
          }else {
               return []
          }
     }else {
          return arr;
     }
} 

// export const getValidWebVisits = (arr, tasks, last_pay_date) => {
//      const validWebVisits = [];
//      if (arr && arr.length && tasks && tasks.length) {

//           return arr.filter(visit => {
//                return tasks.some(task => {
//                     return isLaterThan(visit.v_date, task.exp_date) && isLaterThan(last_pay_date, visit.v_date) && task.v_ids.includes(visit.v_id);
//                });
//           });
//      }

//      // const commonIps = {};

//      // validWebVisits.forEach(visit => {
//      //      const baseIpArr = visit.v_ip_address.split('.')
//      //      const baseIp = baseIpArr[0]+'.'+baseIpArr[1]+'.'+baseIpArr[2];
//      //      // commonIps[baseIp] = 
//      // })

//      return validWebVisits;
// };

export const getValidWebVisits = (arr, tasks, last_pay_date) => {
     const validWebVisits = [];
     const dateNetworkMap = {}; // Map to track networks for each date

     if (arr && arr.length && tasks && tasks.length) {
          return arr.filter(visit => {
             // Extract the base IP network (first three octets)
               const baseIpArr = visit.v_ip_address.split('.');
               const baseNetwork = `${baseIpArr[0]}.${baseIpArr[1]}.${baseIpArr[2]}`;
             // Get the visit date
             const visitDate = visit.v_date.split('T')[0]; // Assuming ISO date format
          // Initialize map for this date if not already done
          if (!dateNetworkMap[visitDate]) {
               dateNetworkMap[visitDate] = {};
          }
             // Check if this network has already been visited on the same date
               if (dateNetworkMap[visitDate][baseNetwork]) {
                    return false; // Skip if the network already has a valid visit on this date
               }
             // Check if the visit is valid based on tasks and dates
               const isValidVisit = tasks.some(task => {
                    return (
                         isLaterThan(visit.v_date, task.exp_date) &&
                         isLaterThan(last_pay_date, visit.v_date) &&
                         task.v_ids.includes(visit.v_id)
                    );
               });
               // If valid, store the network for this date and allow the visit
               if (isValidVisit) {
                    dateNetworkMap[visitDate][baseNetwork] = true;
                    return true;
               }
               return false;
          });
     }
     return validWebVisits;
};