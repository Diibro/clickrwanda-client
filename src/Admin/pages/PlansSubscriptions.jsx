import { useEffect, useState } from "react";
import SubscriptionCard from "../components/cards/SubscriptionCard";
import PlanSubscriptionService from "../../services/PlanSubscription"
import { getDateOnly } from "../../utils/dateFunctions";
import { showMainNotification } from "../../utils/AdminFunctions";
const PlansSubscriptions = () => {
     const [subscriptions,setSubscriptions] = useState({
          "Pending Subscriptions": [],
          "Rejected Subscriptions": [],
          "Approved Subscriptions": [],
     });
     const [activePays, setActivePays] = useState("");
     const [refresh, setRefresh] = useState(0);

     const fetchSubs = async() => {
          const subInfo = await PlanSubscriptionService.findAll();
          const info = {
               "Pending Subscriptions": [],
               "Rejected Subscriptions": [],
               "Approved Subscriptions": [],
          }
          if(subInfo){
               const subData = subInfo.data;
               if(subData.length){
                    subData.forEach(p => {
                         if(p.status === 'pending'){
                              info["Pending Subscriptions"].push(p);
                         }else if(p.status === "rejected"){
                              info["Rejected Subscriptions"].push(p);
                         }else if(p.status === "Approved"){
                              info["Approved Subscriptions"].push(p);
                         }
                    })
               }
               console.log(info)
          }
          setSubscriptions(info);
     }

     const approvePay = async(sub) => {
               sub.status = "Approved";
               sub.subscription_date = getDateOnly(sub.subscription_date);

               const res = await PlanSubscriptionService.update(sub);
               if(res){
                    if(res.status === 'pass'){
                         showMainNotification('pass', 'Subscription approved successfully', () => setRefresh(refresh  + 1));
                    }else{
                         showMainNotification('fail', res.message, () => {})
                    }
               }else{
                    showMainNotification('fail', 'error connecting to the server.', () => {});
               }
     }

     const rejectPay = async(sub) => {
          sub.status = "rejected";
          sub.subscription_date = getDateOnly(sub.subscription_date);

          const res = await PlanSubscriptionService.update(sub);
          if(res){
               if(res.status === 'pass'){
                    showMainNotification('pass', 'Subscription rejected successfully', () => setRefresh(refresh  + 1));
               }else{
                    showMainNotification('fail', res.message, () => {})
               }
          }else{
               showMainNotification('fail', 'error connecting to the server.', () => {});
          }
     }

     useEffect(() => {
          (async() => await fetchSubs())();
     }, [refresh]);

     return (
          <div className="admin-agent-payments-container">
               {
                    Object.entries(subscriptions).map(([key, value], index) => 
                         <div className={`payments-sub-container ${activePays === key ? 'active-pays' :""}`} key={`payment-sub-container-${index}-${key}`}>
                              <div className="sub-container-title" onClick={() => setActivePays(key)}><h4>{key} <span>({value.length})</span></h4></div>
                              <div className="sub-container-payments active">
                                   {
                                        value && value.length ? 
                                             value.map((item,index) => <SubscriptionCard key={`agent-payment-card-${key}-${index}`} subscription={item} actions={{approve: async() => await approvePay(item), reject: async() => await rejectPay(item)}} />)
                                        : <p>No {key}</p>
                                   }
                              </div>
                         </div>
                    )
               }
          </div>
     )
}

export default PlansSubscriptions