import { useContext } from "react"
import { AdminContext } from "../../AdminLayout"
import { ImCross } from "react-icons/im";
import { toggleForms } from "../../../utils/AdminFunctions";
import AgentForms from "./AgentForms";

const AdminForms = () => {
     const [,setAdminData] = useContext(AdminContext);
     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form"

          }))
     }
     return (
          <div className="admin-forms-container" id="admin-forms-container">
               <i className="close" onClick={closeFormsContainer}>
                    <ImCross />
               </i>
               <AgentForms />
          </div>
     )
}

export default AdminForms