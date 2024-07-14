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
import { calculatePackageTotal, calculateRefVisitsTotal, calculateShopTotal, getNotPayed, getValidWebVisits, getVisitIds } from "../utils/agentFunctions";
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
                    const paymentsData = agentPayments.data || [];
                    const lastPayDate = paymentsData && paymentsData.length ? paymentsData[0].p_date : null; 
                    const webViewRef = await WebViewService.getRefVisits(agent.agent_id);
                    const packageSoldInfo = await PlanSubscriptionService.findByRId(agent.agent_id);
                    const agentTaskInfo = await AgentTaskService.findByAgent(agent.agent_id);
                    const visitIds = getVisitIds(agentTaskInfo.data);
                    setAgentData(prev => ({
                         ...prev, logged:true, 
                         agentInfo: agent,
                         referrals: getNotPayed(usersRef.data, "reg_date", lastPayDate ),
                         payments: paymentsData,
                         webVisitsRef: getValidWebVisits(webViewRef.data, agentTaskInfo.data, lastPayDate),
                         packageSold: getNotPayed(packageSoldInfo.data, 'subscription_date', lastPayDate),
                         tasks: agentTaskInfo.data || [],
                         commissionShops: [],
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
          <div className="agent-technical-notification">
               <p>Hello our beloved agents. we are happy to have you on our platform and we highly appreciate your effort. This is a notice from the Click Rwanda Technical team to address the problem that has been reported by most of the agents where, you found some of the amounts on your dashboard. We would like to let you know it has been a technical issues with in our system. We kindly excuse ourselves for the inconviences received on this. Please kindly continue to report any issue to the support team.</p>
               <p>Keep making money from Click Rwanda through the various options availed for you. Thanks.</p>
          </div>
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