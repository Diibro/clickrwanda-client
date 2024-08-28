import { Link, useNavigate } from "react-router-dom";
import Categories from '../../data/HotCategories.json';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { getItemUrl } from "../../utils/urlFunctions";

const HomeHotCategories = () => {
     const [categories,setCategories] = useState(null);
     useEffect(() => {
          setCategories(Categories.categories);
     }, [])
     return (
          <div className="container">
               <div className="ads-section-title">
                    <div className="title">
                         <h3 className="main-title">Hot Categories</h3>
                         <Link to='/market'>More</Link>
                    </div>
               </div>
               <div className="categories-container">
                    {categories && categories.length ? categories.map((item, index) => <HomeHotcategoryCard key={`home-hot-category-${index}`} category={item} />) : null}
               </div>
          </div>
     )
}


const HomeHotcategoryCard = ({category}) => {
     const navigate = useNavigate();
     return (
          <div className="home-hot-category-card" onClick={() => navigate(`/market/${getItemUrl(category.name, "")}`)}>
               <img src={category.image} alt={`${category.name}`} loading="lazy" />
               <div className="content">
                    <h5>{category.name}</h5>
               </div>
          </div>
     )
}

HomeHotcategoryCard.propTypes = {
     category: PropTypes.object
}
export default HomeHotCategories