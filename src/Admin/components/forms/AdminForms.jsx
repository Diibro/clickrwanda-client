import { useContext } from "react"
import { AdminContext } from "../../AdminLayout"
import { ImCross } from "react-icons/im";
import { toggleForms } from "../../../utils/AdminFunctions";
import AgentForms from "./AgentForms";
import AdvertForms from "./AdvertForms";

const AdminForms = () => {
     const [,setAdminData] = useContext(AdminContext);
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
     return (
          <div className="admin-forms-container" id="admin-forms-container">
               <i className="close" onClick={closeFormsContainer}>
                    <ImCross />
               </i>
               <AgentForms />
               <AdvertForms />
          </div>
     )
}

export default AdminForms