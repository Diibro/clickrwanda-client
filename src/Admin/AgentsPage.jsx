import { useContext } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import AgentsTable from "./components/AgentsTable";
import { AdminContext } from "./AdminLayout";
import { Route, Routes } from "react-router-dom";
import AdminAgentsNavbar from "./components/containers/AdminAgentsNavbar";
import AgentPaymentsContainer from "./components/containers/AgentPaymentsContainer";


const AgentsPage = () => {
     
     const {agents} = useContext(AdminContext);
     return (
     <>
          <AdminRow>
               <DashTitle><h2>Agents Management</h2></DashTitle>
               <AdminAgentsNavbar />
          </AdminRow>
          <Routes>
               <Route index path="/" element={ <AdminRow><AgentsTable agents={agents} /></AdminRow>} />
               <Route path="/agent-payments" element={<AgentPaymentsContainer />} />
          </Routes>
     </>
     )
}

export default AgentsPage