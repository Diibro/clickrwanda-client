import { useContext, useEffect } from "react"
import { AdminContext } from "./AdminLayout";
import { showMainNotification } from "../utils/AdminFunctions";

const Logout = () => {
     const [,setAdminData] = useContext(AdminContext);
     const logout = ( ) => {
          sessionStorage.removeItem("loginToken");
          sessionStorage.removeItem("userData");
          setAdminData((prev) => ({...prev, logged:false}));
          showMainNotification("pass", "Successfully logged out", () => {})
     }
     useEffect( () => {
          logout();
     }, []) 
     return (
     <>logging...</>
     )
}

export default Logout