import { useContext, useEffect, useState } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import { AdminContext } from "./AdminLayout"
import AdvertsContainer from "./components/containers/AdvertsContainer"
import AdminSearchForm from "./components/forms/AdminSearchForm"
import { searchByKey } from "../utils/filterFunctions"

const AdvertsPage = () => {
     const [adminData] = useContext(AdminContext);
     const {adverts} = adminData;
     const [displayAds, setDisplayAds] = useState([]);

     const handleSearch = (e) => {
          const searchValue = e.target.value;
          setDisplayAds(searchByKey(adverts, "ad_name", searchValue));
     }

     useEffect(() => {
          setDisplayAds(adverts);
     }, [adverts]);

     return (
     <>
          <AdminRow>
               <DashTitle><h2>Manage Adverts</h2></DashTitle>
               <AdminSearchForm searchHandler={handleSearch} searchMessage="Search Adverts" />
          </AdminRow>
          <AdminRow>
               <AdvertsContainer adverts={displayAds} />
          </AdminRow>
     </>
     )
}

export default AdvertsPage