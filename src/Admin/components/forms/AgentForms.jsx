import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashTitle from "../DashTitle";
import { AdminContext } from "../../AdminLayout";
import AgentService from "../../../services/Agent";
import {  extractDateOnly, getRwandaTime} from "../../../utils/dateFunctions";
import { showMainNotification, showNotification, toggleForms } from "../../../utils/AdminFunctions";
import { parseString } from "../../../utils/jsonFunctions";
import { DeleteButton, EditButton, VerifyButton } from "../buttons/ActionButtons";
import { MdAddCall } from "react-icons/md";
import { sortByAny } from "../../../utils/filterFunctions";

const AgentForms = () => {
     const [adminData] = useContext(AdminContext);
     const {activeForm} = adminData;

     return (
          <>
               {activeForm.type === "agent" ? 
                    <div className="agent-form-container">
                         {activeForm.formName === "Add Agent" ? <AddAgentForm />  : activeForm.formName === "Update Agent" ? <AgentUpdateFom/> :null}
                    </div>
               : null}
          </>
          
     )
}


const AddAgentForm = () => {
     const {register, handleSubmit} = useForm();
     const [adminData,setAdminData] = useContext(AdminContext);
     const {locations,agents} = adminData;

     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form"

          }))
     }

     const submitForm = async (data) => {
          data.location = JSON.stringify({location: data.location});
          data.registrationDate = getRwandaTime();
          data.active = true;
          setAdminData((prev) => ({...prev, notification: {type:"pass", message: "form submit sir"}}));
          showNotification();

          const res = await AgentService.save(data);
          if(res.status === "success"){
               setAdminData((prev) => 
                    ({
                         ...prev, 
                         notification: {type:"pass", message: res.message},
                         agents: agents === null ? [res.data] : [...agents, res.data]
                    })
               );
               showNotification();
               closeFormsContainer();
          }else{
               setAdminData((prev) => ({
                    ...prev,
                    notification: {type: "fail", message: res.message}
               }))
               showNotification();
          }
          
     }         

     return (
     <div className="admin-add-agent-form">
          <DashTitle>
               <h4>Add Agent</h4>
          </DashTitle>
          <form className="admin-dash-form" onSubmit={handleSubmit(submitForm)}>
               <div className="group">
                    <label htmlFor="a_name">Agent Name:</label>
                    <input type="text" name="a_name" id="a_name" {...register('a_name', {required: true})}/>
               </div>
               <div className="group">
                    <label htmlFor="a_email">Email:</label>
                    <input type="email" name="a_email" id="a_email" {...register('a_email', {required:true})} />
               </div>
               <div className="group">
                    <label htmlFor="a_phone">Phone:</label>
                    <input type="text" name="a_phone" id="a_phone" {...register('a_phone', {required:true})} />
               </div>
               <div className="group">
                    <label htmlFor="a_password">Password:</label>
                    <input type="password" name="a_password" id="a_password" {...register('a_password',{required:true})} />
               </div>
               <div className="group">
                    <label htmlFor="location">Location:</label>
                    <select name="location" id="location" {...register('location', {required:true})}>
                         <option value="" disabled>Select...</option>
                         {
                              locations && locations[0] && locations.map((location, index) => <option key={`${location}-${index}`} value={location}>{location}</option>)
                         }
                    </select>
               </div>
               <div className="group">
                    <input type="submit" value="Submit" />
               </div>
          </form>
     </div>
     )
}

const AgentUpdateFom = () => {
     const [adminData,setAdminData] = useContext(AdminContext);
     const {activeForm, locations, agents} = adminData;
     const [activeAgent, setActiveAgent] = useState(null);
     const [socialLinks, setSocialLinks] = useState(null);
     const navigate = (url) => {
          window.open(url, "_blank");
     };
     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form"

          }))
     }

     const updateAgent = async() => {
          const res  = await AgentService.update(activeAgent);
          if(res.status === "success"){
               const newAgents = sortByAny([...(agents.filter(agent => agent.agent_id !== activeAgent.agent_id)), activeAgent], "registration_date")
               setAdminData(prev => ({
                    ...prev,
                    agents: [...newAgents]
               }))
               showMainNotification("pass", res.message, () => closeFormsContainer()); 
          }else{
               showMainNotification("fail", res.message, () => {});
          }
     }


     useEffect(() => {
          if(activeForm.type === "agent" && activeForm.objFocus){
               setActiveAgent(activeForm.objFocus);
               setSocialLinks(parseString(activeForm?.objFocus?.social_links));
          }
     }, [activeForm]);
     return (
          <div className="admin-agent-update-form">
               <DashTitle><h2>Update Agent: {activeAgent ? activeAgent.a_name : ""}</h2></DashTitle>
               <div className="admin-agent-update-form-container">
                    <div className="group">
                         <b>Referral Code: </b>
                         <span>{activeAgent?.agent_id}</span>
                    </div>
                    <div className="group">
                         <b>Email:</b>
                         <span>{activeAgent?.a_email}</span>
                    </div>
                    <div className="group">
                         <b>Name:</b>
                         <span>{activeAgent?.a_name}</span>
                         <p>Change name: <input type="text" name="a_name" id="a_name" onChange={(e) => setActiveAgent(prev => ({...prev, a_name: e.target.value }))} /></p>
                    </div>
                    <div className="group">
                         <b>Phone:</b>
                         <span>{activeAgent?.a_phone} <i className="call-icon" onClick={() => navigate(`tel:${activeAgent?.a_phone}`)}><MdAddCall /></i> </span>
                         <p>Change Phone:<input type="phone" name="a_phone" id="a_phone" onChange={(e) => setActiveAgent(prev => ({...prev, a_phone: e.target.value }))} /></p>
                    </div>
                    <div className="group">
                         <b>Location:</b>
                         <span>{parseString(activeAgent?.location)?.location || "Rwanda"}</span>
                         <p>Change Location:
                              <select name="location" id="location" onChange={(e) => setActiveAgent(prev => ({...prev, location: JSON.stringify({location: e.target.value}) }))}>
                                   <option value="Rwanda">Change location..</option>
                                   {locations && locations.map(location => <option key={`location-${location}`} value={location}>{location}</option>)}
                              </select>
                         </p>
                    </div>
                    <div className="group">
                         <b>Registered on:</b>
                         <span>{extractDateOnly(activeAgent?.registration_date)}</span>
                    </div>
                    <div className="group">
                         <b>Status:</b>
                         <span>{activeAgent?.active ? "Active" : "Inactive" }</span>
                         <p>{activeAgent?.active ? <DeleteButton title={"Deactivate"} action={() => setActiveAgent(prev => ({...prev, active:0}))} /> : <EditButton title={"Activate"} action={() => setActiveAgent(prev => ({...prev, active:1}))} /> }</p>
                    </div>
                    <div className="group">
                         <b>Verification:</b>
                         <span>{activeAgent?.verified ? "Verified" : "unverified" }</span>
                         <p>{activeAgent?.verified ? <DeleteButton title={"Unverify"} action={() => setActiveAgent(prev => ({...prev, verified:0}))} /> : <VerifyButton title={"Verify"} action={() => setActiveAgent(prev => ({...prev, verified:1}))} />}</p>
                    </div>
                    <div className="group links">
                         <b>Social Media Links:</b>
                         {
                              socialLinks ? 
                                   Object.entries(socialLinks).map(([key, value], index) => <p key={`social-medial-link-${key}-${index}`}><b>{key}</b>:{value}<EditButton title={"Visit"} action={() => navigate(value)}/></p> )
                              : <p>No social medial Links</p>
                         }
                    </div>
                    <div className="group">
                         <b>New login password:</b>
                         <p>Type new Password: <input type="text" onChange={(e) => setActiveAgent(prev => ({...prev, new_password: e.target.value}))} /></p>
                    </div>
                    <EditButton title={"Save Changes"} action={async() => await updateAgent() } />
               </div>
          </div>
     )
}


export default AgentForms