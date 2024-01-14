import { Container } from "@mui/material"
import Categories from '../components/dynamic/Categories';
import { useContext,useState } from "react";
import AppData from "../Contexts/AppContext";
import { Link, useLocation } from "react-router-dom";
import { dashReplacer} from "../utils/otherFunctions";
import CategoryAdverts from "../components/dynamic/CategoryAdverts";
import FilterContext from "../Contexts/FilterContext";
import { Helmet } from "react-helmet";

const CategoriesPage = () => {
  const [filter] = useContext(FilterContext);
  const {view} = filter;
  return (
    <>
      <Helmet>
        <meta name="description" content="Discover the categories of products and services most sold in Rwanda." />
        <title>Categories | Click Rwanda</title>
      </Helmet>
      <Container>
        <CategoryAdverts type={view} />
        <Categories limit={0} />
      </Container>
    </>
    
  )
}

export const CategoriesHeader = () => {
  const [,setFilter] = useContext(FilterContext);
  const location = useLocation();
  const [data] = useContext(AppData);
  const {categories} = data;
  const [active, setActive] = useState("All");
  return(
    <div className="categories-header">
      <Link to='/categories' className={active === "All" && location.pathname === '/categories' ? "active-category" : ''} onClick={()=>{setActive("All"); setFilter((prev) => ({...prev, view: ""}))}}>All</Link>
      {categories.map((item) => (
        <Link 
          className={active === item.category_name || location.pathname === `/categories/${dashReplacer(item.category_name)}`  ? "active-category" : ''}
          to={`/categories/${dashReplacer(item.category_name)}`} 
          key={item.category_id}
          onClick={()=> {setActive(item.category_name); setFilter((prev) => ({...prev, view: "category"}))} }
        >{item.category_name}</Link>
      ))}
    </div>
  )
}




export default CategoriesPage