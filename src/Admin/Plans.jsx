import { Route, Routes } from "react-router-dom"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import AdminPlansNavbar from "./components/containers/AdminPlansNavbar"
import PlansHome from "./pages/PlansHome"
import PlansSubscriptions from "./pages/PlansSubscriptions"

const Plans = () => {
     return (
          <>
               <AdminRow>
                    <DashTitle><h2>Membership plans</h2></DashTitle>
                    <AdminPlansNavbar />
               </AdminRow>
               <Routes>
                    <Route path="/" index element={<PlansHome />} />
                    <Route path="/subscriptions" element={<PlansSubscriptions />} />
               </Routes>
          </>
     )
}

export default Plans