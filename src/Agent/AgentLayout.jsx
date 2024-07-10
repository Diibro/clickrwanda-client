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
import { calculatePackageTotal, calculateRefVisitsTotal, calculateShopTotal, getVisitIds } from "../utils/agentFunctions";
import Tasks from "./Tasks";
import AgentPlans from "./AgentPlans";
import PlanSubscriptionService from "../services/PlanSubscription";
import AgentTaskService from "../services/AgentTask";

export const AgentContext = createContext();

const AgentLayout = () => {
     const [agentData, setAgentData] = useState({
          logged: false,
          agentInfo: null,
          referrals: null,
          payments: null,
          webVisitsRef: null,
          packageSold:null,
          totalAmount:0,
          tasks:null,
          vIds:[]
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
                    const packageSoldInfo = await PlanSubscriptionService.findByRId(agent.agent_id);
                    const agentTaskInfo = await AgentTaskService.findByAgent(agent.agent_id);
                    const visitIds = getVisitIds(agentTaskInfo.data);
                    console.log(agentPayments)
                    setAgentData(prev => ({
                         ...prev, logged:true, 
                         agentInfo: agent,
                         referrals: usersRef.data || [],
                         payments: agentPayments.data || [],
                         webVisitsRef: webViewRef.data || [],
                         packageSold: packageSoldInfo.data || [],
                         tasks: agentTaskInfo.data || [],
                         vIds: visitIds
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
               let visitAmount = calculateRefVisitsTotal(agentData.webVisitsRef, agentData.payments[0]?.p_date || null, agentData.tasks);
               let shopsAmount = calculateShopTotal(agentData.referrals, agentData.payments[0]?.p_date || null);
               let packagesAmount = calculatePackageTotal(agentData.packageSold,agentData.payments[0]?.p_date || null);
               setAgentData((prev) => ({...prev, totalAmount: (visitAmount + shopsAmount + packagesAmount)}))
          }
          
     }, [agentData.payments]);

     return (
     <AgentContext.Provider value={[agentData, setAgentData]}>
          <div className="agent-layout">
               <AgentNavBar />
               <div className="agent-content-container">
                    <Routes>
                         <Route index path="/" element={<Home/>} />
                         <Route path="/tasks" element={<Tasks />} />
                         <Route path="/referrals" element={<Referrals />} />
                         <Route path="/payments" element={<Payments />} />
                         <Route path="/pay-plans" element={<AgentPlans />} />
                         <Route path="/logout" element={<AgentLogout />} />
                    </Routes>
               </div>
          </div>
     </AgentContext.Provider>
     )
}

export default AgentLayout