import { useContext } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import { AdminContext } from "./AdminLayout"
import AdvertsContainer from "./components/containers/AdvertsContainer"

const AdvertsPage = () => {
     const [adminData] = useContext(AdminContext);
     const {adverts} = adminData;

     return (
     <>
          <AdminRow>
               <DashTitle><h2>Manage Adverts</h2></DashTitle>
          </AdminRow>
          <AdminRow>
               <AdvertsContainer adverts={adverts} />
          </AdminRow>
     </>
     )
}

export default AdvertsPage