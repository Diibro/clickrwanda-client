import { useContext, useEffect, useState } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import ShopsContainer from "./components/containers/ShopsContainer"
import { AdminContext } from "./AdminLayout"
import AdminSearchForm from "./components/forms/AdminSearchForm"
import { searchByKey } from "../utils/filterFunctions"

const ShopsPage = () => {
     const [adminData ] = useContext(AdminContext);
     const {shops } = adminData;

     const [displayShops, setDisplayShops] = useState([]);

     const handleSearch = (e) => {
          let searchValue = e.target.value;
          setDisplayShops(searchByKey(shops, "username",searchValue));
     }

     useEffect(() => {
          setDisplayShops(shops);
     }, [shops])
     return (
     <>
          <AdminRow>
               <DashTitle><h2>Shops Management</h2></DashTitle>
               <AdminSearchForm searchHandler={handleSearch} searchMessage={"Search Shops"}  />
          </AdminRow>
          <AdminRow>
               <ShopsContainer shops={displayShops}/>
          </AdminRow>
     </>
     )
}

export default ShopsPage