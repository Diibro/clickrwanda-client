import { useContext } from "react";
import { useForm } from "react-hook-form";
import DashTitle from "../DashTitle";
import { AdminContext } from "../../AdminLayout";
import AgentService from "../../../services/Agent";
import {  getRwandaTime} from "../../../utils/dateFunctions";
import { showNotification, toggleForms } from "../../../utils/AdminFunctions";

const AgentForms = () => {
     const [adminData] = useContext(AdminContext);
     const {activeForm} = adminData;

     return (
          <>
               {activeForm.type === "agent" ? 
                    <div className="agent-form-container">
                         {activeForm.formName === "Add Agent" ? <AddAgentForm />  : null}
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
     <>
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
     </>
     )
}




export default AgentForms