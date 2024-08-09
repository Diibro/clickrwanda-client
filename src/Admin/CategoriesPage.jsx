import { useContext } from "react"
import AdminRow from "./components/AdminRow"
import AdminCategoriesContainer from "./components/containers/AdminCategoriesContainer"
import DashTitle from "./components/DashTitle"
import { AdminContext } from "./AdminLayout"

     const CategoriesPage = () => {
     const [adminData] = useContext(AdminContext);
     const {categories } = adminData;
     return (
          <>
               <AdminRow>
                    <DashTitle><h2>Manage Categories</h2></DashTitle>
                    <AdminCategoriesContainer categories={categories} />
               </AdminRow>
          </>
     )
}

export default CategoriesPage