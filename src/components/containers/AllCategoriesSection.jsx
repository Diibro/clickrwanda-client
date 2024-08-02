import { useContext, useEffect, useState } from "react"
import AppData from "../../Contexts/AppContext"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";

const AllCategoriesSection = () => {
     const [data] = useContext(AppData);
     const {categories, subCategories} = data;
     const [content, setContent] = useState(null);
     const [catCount,setCatCount] = useState(12);
     const updateContent = () => {
          const newCategories = categories;

          newCategories.forEach(cat => {
               cat.subCategories = subCategories.filter(sub => sub.category_id === cat.category_id)
          });
          setContent(newCategories);
     }

     useEffect(() => {
          if(categories && categories.length && subCategories && subCategories.length){
               updateContent();
          }
     },[categories]);

     return (
          <>
               {
                    content ? 
                    <div className="home-categories-section">
                         <div className="title">
                              <h3>All Categories</h3>
                         </div>
                         <div className="content hide-scroll">
                              {
                                   content.map((item, index) => index < catCount ? <CategoryCard category={item} key={`home-all-categories-${item.category_id}`} /> : null)
                              }
                         </div>
                         {
                              catCount < content.length ? <p className="view-expan-section" onClick={() => setCatCount(content.length)}>View More</p> : <p className="view-expan-section" onClick={() => setCatCount(12)}>View Less</p>
                         }
                    </div>
                    :null
               }
          </>
     )
}

const CategoryCard = ({category}) => {
     const navigate = useNavigate();
     return (
          <div className="home-categories-subcard">
               <div className="title">
                    <h5>{category.category_name} <span>{`${category.total_adverts} ads`}</span></h5>
                    
                    </div>
               <div className="sub-categories">
                    {
                         category.subCategories.map((item,index) => index <= 4 ? <span key={item.sub_id} onClick={() => navigate(`/category/${getItemUrl(category.category_name, category.category_id)}`)}>{item.sub_name} {`(${item.total_ads})`}</span> : null)
                    }
                    {
                         category.subCategories.length > 4 ? <span onClick={() => navigate(`/category/${getItemUrl(category.category_name, category.category_id)}`)}>View All...</span> :null
                    }
               </div>
          </div>
     )
} 

CategoryCard.propTypes = {
     category: PropTypes.object
}

export default AllCategoriesSection