import { useContext, useEffect } from "react"
import { AdminContext } from "./AdminLayout";
import { showMainNotification } from "../utils/AdminFunctions";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const Logout = () => {
     const [,setAdminData] = useContext(AdminContext);
     const [,setUser] = useContext(UserContext)
     const navigate = useNavigate()
     const logout = ( ) => {
          sessionStorage.removeItem("loginToken");
          sessionStorage.removeItem("userData");
          setAdminData(() => ({}));
          setUser({})
          showMainNotification("pass", "Successfully logged out", () => navigate('/'))
     }
     useEffect( () => {
          logout();
     }, []) 
     return (
     <>logging...</>
     )
}

export default Logout