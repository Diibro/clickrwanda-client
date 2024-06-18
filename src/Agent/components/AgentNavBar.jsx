import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { MdLogout, MdPayment } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

const AgentNavBar = () => {
     const location = useLocation();
     const [activePath, setActivePath] = useState("/");

     useEffect(() => {
          setActivePath(() => location.pathname.split("/")[2] || location.pathname.split("/")[1]);
          console.log();
     
     },[location.pathname]);

     return (
          <div className="agent-navbar">
               <Link className={activePath === "agent" ? "active" : ""} to="/agent" ><i><FaHome /></i><span>Home</span></Link>
               <Link className={activePath === "tasks" ? "active" : ""} to="/agent/tasks"><i><GoTasklist /></i><span>Tasks</span></Link>
               <Link className={activePath === "referrals" ? "active" : ""} to="/agent/referrals"><i><AiOutlineTeam /></i><span>Referrals</span></Link>
               <Link className={activePath === "payments" ? "active" : ""} to="/agent/payments"><i><MdPayment/></i><span>Payments</span></Link>
               <Link className={activePath === "logout" ? "active" : ""} to="/agent/logout"><i><MdLogout /></i><span>Logout</span></Link>
          </div>
     )
}

export default AgentNavBar