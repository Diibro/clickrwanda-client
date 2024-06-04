import { useContext } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import AgentsTable from "./components/AgentsTable";
import { AdminContext } from "./AdminLayout";
import { AddButton } from "./components/buttons/ActionButtons";
import { toggleForms } from "../utils/AdminFunctions";


const AgentsPage = () => {
     const [,setAdminData] = useContext(AdminContext);
     
     const showAddForm = () => {
          setAdminData((prev ) => ({
               ...prev,
               activeForm: "Add Agent"
          }));
          toggleForms(true);
     } 
     const {agents} = useContext(AdminContext);
     return (
     <>
          <AdminRow>
               <DashTitle><h2>Agents Management</h2></DashTitle>
               <AddButton title={"Add Agent"} action={showAddForm} />
          </AdminRow>
          <AdminRow>
               <AgentsTable agents={agents} />
          </AdminRow>
          <div className="agent-form-container">
               <DashTitle>
                    
               </DashTitle>
          </div>
     </>
     )
}

export default AgentsPage