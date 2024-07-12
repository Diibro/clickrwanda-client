import { useEffect, useState } from "react"
import AgentPaymentService from "../../../services/AgentPayment";
import AgentPaymentCard from "../cards/AgentPaymentCard";
import { showMainNotification } from "../../../utils/AdminFunctions";
import { getDateOnly } from "../../../utils/dateFunctions";

const AgentPaymentsContainer = () => {
     const [payments, setPayments] = useState({
          "Pending Payments": [],
          "Rejected Payments": [],
          "Approved Payments": [],
     });
     const [activePays, setActivePays] = useState("");
     const [refresh, setRefresh] = useState(0)
     
     const fetchPayments = async() =>{
          const paymentsInfo = await AgentPaymentService.getAll();
          const info = {
               "Pending Payments": [],
               "Rejected Payments": [],
               "Approved Payments": [],
          }
          if(paymentsInfo){
               const paymentsData = paymentsInfo.data;
               if(paymentsData.length){
                    paymentsData.forEach(p => {
                         if(p.status === 'pending'){
                              info["Pending Payments"].push(p);
                         }else if(p.status === "rejected"){
                              info["Rejected Payments"].push(p);
                         }else if(p.status === "Approved"){
                              info["Approved Payments"].push(p);
                         }
                    })
               }
          }
          setPayments(info);
     }

     const approvePay = async(payment) => {
          if(payment){
               payment.status = 'Approved';
               payment.p_date = getDateOnly(payment.p_date)
               const res = await AgentPaymentService.update(payment);
               if(res){
                    if(res.status === 'success'){
                         showMainNotification('pass', 'Payment approved successfully', () => setRefresh(refresh  + 1));
                    }else{
                         showMainNotification('fail', res.message, () => {})
                    }
               }else{
                    showMainNotification('fail', 'error connecting to the server.', () => {});
               }
          }
     }

     const rejectPay = async(payment) => {
          if(payment){
               console.log(payment)
               payment.status = 'rejected';
               payment.p_date = getDateOnly(payment.p_date)
               const res = await AgentPaymentService.update(payment);
               console.log(res);
               if(res){
                    if(res.status === 'success'){
                         showMainNotification('pass', 'Payment rejected successfully', () => setRefresh(refresh  + 1));
                    }else{
                         showMainNotification('fail', res.message, () => {})
                    }
               }else{
                    showMainNotification('fail', 'error connecting to the server.', () => {});
               }
          }
     }

     useEffect(() => {
          (async() => await fetchPayments())()
     },[refresh]);
     return (
          <div className="admin-agent-payments-container">
               {
                    Object.entries(payments).map(([key, value], index) => 
                         <div className={`payments-sub-container ${activePays === key ? 'active-pays' :""}`} key={`payment-sub-container-${index}-${key}`}>
                              <div className="sub-container-title" onClick={() => setActivePays(key)}><h4>{key} <span>({value.length})</span></h4></div>
                              <div className="sub-container-payments active">
                                   {
                                        value && value.length ? 
                                             value.map((item,index) => <AgentPaymentCard key={`agent-payment-card-${key}-${index}`} payment={item} actions={{approve: async() => await approvePay(item), reject: async() => await rejectPay(item)}} />)
                                        : <p>No {key}</p>
                                   }
                              </div>
                         </div>
                    )
               }
          </div>
     )
}

export default AgentPaymentsContainer