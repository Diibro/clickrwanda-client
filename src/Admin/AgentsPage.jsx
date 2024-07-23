import { useContext, useEffect, useState } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import AgentsTable from "./components/AgentsTable";
import { AdminContext } from "./AdminLayout";
import { Route, Routes } from "react-router-dom";
import AdminAgentsNavbar from "./components/containers/AdminAgentsNavbar";
import AgentPaymentsContainer from "./components/containers/AgentPaymentsContainer";


const AgentsPage = () => {
     const [agentsData,setAgentData] = useState([]);
     const [influencers,setInfluencers] = useState([]);
     const [adminData] = useContext(AdminContext);
     const {agents} = adminData;

     useEffect(() => {
          if(agents && agents.length){
               const agentsInfo = {agents: [], influencers: []}; 
               agents.forEach(agent => agent.agent_type === 'agent' ? agentsInfo.agents.push(agent) : agent.agent_type === 'influencer' ? agentsInfo.influencers.push(agent) : () => {});
               setAgentData(agentsInfo.agents);
               console.log(agentsInfo);
               setInfluencers(agentsInfo.influencers);
          }else {
               console.log(agents);
          }
     },[agents]);
     return (
     <>
          <AdminRow>
               <DashTitle><h2>Agents Management</h2></DashTitle>
               <AdminAgentsNavbar />
          </AdminRow>
          <Routes>
               <Route index path="/" element={ <AdminRow><AgentsTable agents={agentsData} /></AdminRow>} />
               <Route path='/influencers' element={<AdminRow><AgentsTable agents={influencers} /></AdminRow>} />
               <Route path="/agent-payments" element={<AgentPaymentsContainer />} />
          </Routes>
     </>
     )
}

export default AgentsPage