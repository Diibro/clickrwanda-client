import { createContext, useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import AgentNavBar from "./components/AgentNavBar";
import Home from "./Home";
import Referrals from "./Referrals";
import Payments from "./Payments";
import AgentLogout from "./AgentLogout";

const AgentContext = createContext();

const AgentLayout = () => {
     const [agentData, setAgentData] = useState({
          loggged: false,
          agentInfo: null,
     });

     const navigate = useNavigate();

     const fetchAgentInfo = () => {
          try {
               const loginToken = sessionStorage.getItem('agentToken');
               const agentInfoString = sessionStorage.getItem("agentData");
               let agentInfo = null;
               if(agentInfoString){
                    agentInfo = JSON.parse(agentInfoString);
               }
               if(loginToken && loginToken != undefined && loginToken != null && agentInfo != null) {
                    setAgentData(prev => ({...prev, logged:true, agentInfo: agentInfo}));
               }else{
                    navigate("/forms/agent-login");
               }
          } catch (error) {
               console.log(error);
               navigate("/forms/agent-login");
          }
          
     }

     useEffect (() => {
          fetchAgentInfo();
     }, [])

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