import { useEffect, useState } from "react"
import AdminRow from "../AdminRow";
import AgentPaymentService from "../../../services/AgentPayment";
import AgentPaymentCard from "../cards/AgentPaymentCard";

const AgentPaymentsContainer = () => {
     const [payments, setPayments] = useState({
          "Pending Payments": [],
          "Rejected Payments": [],
          "Approved Payments": [],
     });
     const [activePays, setActivePays] = useState("");
     
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

     useEffect(() => {
          (async() => await fetchPayments())()
     })
     return (
          <div className="admin-agent-payments-container">
               {
                    Object.entries(payments).map(([key, value], index) => 
                         <div className={`payments-sub-container ${activePays === key ? 'active-pays' :""}`} key={`payment-sub-container-${index}-${key}`}>
                              <div className="sub-container-title" onClick={() => setActivePays(key)}><h4>{key} <span>({value.length})</span></h4></div>
                              <div className="sub-container-payments active">
                                   {
                                        value && value.length ? 
                                             value.map((item,index) => <AgentPaymentCard key={`agent-payment-card-${key}-${index}`} payment={item} />)
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