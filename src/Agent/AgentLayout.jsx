import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

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
          <div className="agent-layout">AgentLayout</div>
     </AgentContext.Provider>
     )
}

export default AgentLayout