import { useContext, useEffect } from "react"
import { AdminContext } from "../../AdminLayout"
import { ImCross } from "react-icons/im";
import { toggleForms } from "../../../utils/AdminFunctions";
import AgentForms from "./AgentForms";
import AdvertForms from "./AdvertForms";
import ShopForms from "./ShopForms";
import { useLocation } from "react-router-dom";
import PlansForms from "./PlansForms";

const AdminForms = () => {
     const [adminData,setAdminData] = useContext(AdminContext);
     const {activeForm} = adminData;
     const location = useLocation();
     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: {
                    type: "default",
                    formName: ""
               }

          }))
     }

     useEffect(() => {
          closeFormsContainer();
     }, [location.pathname])
     return (
          <div className="admin-forms-container" id="admin-forms-container">
               <i className="close" onClick={closeFormsContainer}>
                    <ImCross />
               </i>
               {
                    activeForm.type === "agent" ? <AgentForms/> : activeForm.type === "advert" ? <AdvertForms/> : activeForm.type === "shop" ? <ShopForms /> : activeForm.type === "plans" ? <PlansForms /> : null 
               }
          </div>
     )
}

export default AdminForms