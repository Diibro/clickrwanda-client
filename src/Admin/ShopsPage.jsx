import { useContext } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import ShopsContainer from "./components/containers/ShopsContainer"
import { AdminContext } from "./AdminLayout"

const ShopsPage = () => {
     const [adminData ] = useContext(AdminContext);
     const {shops } = adminData;
     return (
     <>
          <AdminRow>
               <DashTitle><h2>Shops Management</h2></DashTitle>
          </AdminRow>
          <AdminRow>
               <ShopsContainer shops={shops}/>
          </AdminRow>
     </>
     )
}

export default ShopsPage