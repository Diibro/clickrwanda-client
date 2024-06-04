import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { AdminContext } from '../AdminLayout';
import { DeleteButton, EditButton } from './buttons/ActionButtons';

import AgentService from "../../services/Agent";
import { showNotification } from '../../utils/AdminFunctions';
import { formatTimeAgo } from '../../utils/dateFunctions';

const AgentsTable = () => {
     const [adminData,setAdminData] = useContext(AdminContext);
     const {agents} = adminData;
     // const [agentEdit,setAgentEdit] = useState(null);

     const setAgent =  async (agent, status) => {
          if(agent != null ){
               agent.active = status;
               agent.location = JSON.stringify(agent.location);
               const res = await AgentService.update(agent);
               if(res.status === "success") {
                    setAdminData((prev) => ({
                         ...prev,
                         notification: {
                              type: "pass",
                              message: res.message
                         }
                    }))
               }else{
                    setAdminData((prev) => ({
                         ...prev,
                         notification: {
                              type: "fail",
                              message: res.message
                         }
                    }))
               }
               showNotification();
          }
     }
     useEffect(() => {

     }, [agents]);
     return (
          <div className='dash-agents-table'>
               <div className='dash-agents-table-title'>
                    <b>Agent Code</b>
                    <b>name</b>
                    <b>Location</b>
                    <b>Status</b>
                    <b>Added</b>
                    <b>Actions</b>
                    <b>Edit</b>
               </div>
               {
                    agents && agents[0] ?
                         agents.map((agent) => 
                         <div className='dash-agent-table-row' key={agent.agent_id}>
                              <span>{agent.agent_id}</span>
                              <span>{agent.a_name}</span>
                              <span>{agent.location?.location || "Rwanda"}</span>
                              <span>{agent.active ? "Active" : "Inactive"}</span>
                              <span>{formatTimeAgo(agent.registration_date) || formatTimeAgo(agent.registrationDate)}</span>
                              <span>{agent.active ? <DeleteButton title="Disactivate" action={async()=> setAgent(agent, false)} /> : <EditButton title="Activate" action={async()=> setAgent(agent, true)} />}</span>
                              <span><EditButton title="Update" /></span>
                         </div>
                    )
                    :
                    <p>No Agents Found</p>
               }
          </div>
     )
}

AgentsTable.propTypes = {
     agents: PropTypes.array
}

export default AgentsTable