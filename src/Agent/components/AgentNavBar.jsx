import { Link } from "react-router-dom"

const AgentNavBar = () => {
     return (
          <div className="agent-navbar">
               <Link to="/agent">Home</Link>
               <Link to="/agent/referrals">Referrals</Link>
               <Link to="/agent/payments">Payments</Link>
          </div>
     )
}

export default AgentNavBar