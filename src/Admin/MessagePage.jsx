import { Link } from "react-router-dom"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"

const MessagePage = () => {
     return (
          <>
               <AdminRow>
                    <DashTitle><h2>Client Messages</h2></DashTitle>
                    <MessageNavBar/>
               </AdminRow>
          </>
     )
}

const MessageNavBar = () => {
     return (
          <div className="admin-agents-nav-bar">
               <Link to="/admin/messages" >Commission Ads Clients</Link>
               <Link to="/admin/messages">Support Message</Link>
          </div>
     )
}

export default MessagePage