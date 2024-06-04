import { useContext, useEffect } from "react"
import { AdminContext } from "./AdminLayout";

const Logout = () => {
     const [,setAdminData] = useContext(AdminContext);
     const logout = ( ) => {
          sessionStorage.removeItem("loginToken");
          sessionStorage.removeItem("userData");
          setAdminData((prev) => ({...prev, logged:false}));
     }
     useEffect( () => {
          logout();
     }, []) 
     return (
     <>logging...</>
     )
}

export default Logout