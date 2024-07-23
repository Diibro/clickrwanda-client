import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

const AdminAgentsNavbar = () => {
     const location = useLocation();
     const [activePath, setActivePath ] = useState("/");

     useEffect(() => {
          setActivePath(() => location.pathname.split("/")[3] || location.pathname.split("/")[2])
          console.log(activePath);
     }, [location.pathname])
     return (
          <div className="admin-agents-nav-bar">
               <Link to="/admin/agents" className={activePath === "agents" ? "active" : ""}>Agents</Link>
               <Link to="/admin/agents/influencers" className={activePath === "influencers" ? "active" : ""}>Influencers</Link>
               <Link to="/admin/agents/agent-payments" className={activePath === "agent-payments"? "active" : ""}>Payments</Link>
               <Link to="/admin/agents/tasks" className={activePath === "tasks"? "active" : ""} >Tasks</Link>
          </div>
     )
}

export default AdminAgentsNavbar