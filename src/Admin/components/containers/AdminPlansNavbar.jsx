import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

const AdminPlansNavbar = () => {
     const location = useLocation();
     const [activePath, setActivePath ] = useState("/");

     useEffect(() => {
          setActivePath(() => location.pathname.split("/")[3] || location.pathname.split("/")[2])
          console.log(activePath);
     }, [location.pathname]);

     return (
          <div className="admin-agents-nav-bar">
               <Link to={"/admin/plans"} className={activePath === "plans" ? "active" : ""}>Plans</Link>
               <Link to="/admin/plans/subscriptions"className={activePath === "subscriptions" ? "active" : ""} >Subscriptions</Link>
          </div>
     )
}

export default AdminPlansNavbar