import { createContext, useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import AgentNavBar from "./components/AgentNavBar";
import Home from "./Home";
import Referrals from "./Referrals";
import Payments from "./Payments";
import AgentPaymentService from "../services/AgentPayment";
import UserService from "../services/User";
import AgentLogout from "./AgentLogout";
import WebViewService from "../services/WebView";
import { calculateRefVisitsTotal, calculateShopTotal } from "../utils/agentFunctions";

export const AgentContext = createContext();

const AgentLayout = () => {
     const [agentData, setAgentData] = useState({
          logged: false,
          agentInfo: null,
          referrals: null,
          payments: null,
          webVisitsRef: null,
          totalAmount:0,
     });

     const navigate = useNavigate();

     const fetchAgentInfo = async() => {
          try {
               const loginToken = sessionStorage.getItem('agentToken');
               const agentInfoString = sessionStorage.getItem("agentData");
               let agent = null;
               if(agentInfoString){
                    agent= JSON.parse(agentInfoString);
               }
               if(loginToken && loginToken != undefined && loginToken != null && agent != null) {
                    const usersRef = await UserService.getByRef(agent.agent_id);
                    const agentPayments = await AgentPaymentService.findByAgent(agent.agent_id);
                    const webViewRef = await WebViewService.getRefVisits(agent.agent_id);
                    
                    setAgentData(prev => ({
                         ...prev, logged:true, 
                         agentInfo: agent,
                         referrals: usersRef.data || [],
                         payments: agentPayments.data || [],
                         webVisitsRef: webViewRef.data || [],
                    }));
               }else{
                    navigate("/forms/agent-login");
               }
          } catch (error) {
               console.log(error);
               navigate("/forms/agent-login");
          }
          
     }

     useEffect (() => {
          (async () => await fetchAgentInfo())();

     }, [agentData.logged]);

     useEffect(() => {
          if(agentData.payments){
               let visitAmount = calculateRefVisitsTotal(agentData.webVisitsRef, agentData.payments[0]?.p_date || null);
               let shopsAmount = calculateShopTotal(agentData.referrals, agentData.payments[0]?.p_date || null);
               setAgentData((prev) => ({...prev, totalAmount: (visitAmount + shopsAmount)}))
          }
          
     }, [agentData.payments]);

     return (
     <AgentContext.Provider value={[agentData, setAgentData]}>
          <div className="agent-layout">
               <AgentNavBar />
               <div className="agent-content-container">
                    <Routes>
                         <Route index path="/" element={<Home/>} />
                         <Route path="/referrals" element={<Referrals />} />
                         <Route path="/payments" element={<Payments />} />
                         <Route path="/logout" element={<AgentLogout />} />
                    </Routes>
               </div>
          </div>
     </AgentContext.Provider>
     )
}

export default AgentLayout