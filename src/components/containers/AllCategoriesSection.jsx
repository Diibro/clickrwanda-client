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
                    <div className="w-full bg-white rounded-[10px] flex flex-col items-center gap-[20px] p-[10px]">
                         <div className="w-full">
                              <h3 className="text-[1.4rem] font-extrabold text-main-blue-700  ">All Categories</h3>
                         </div>
                         <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-[10px] ">
                              {
                                   content.map((item, index) => index < catCount ? <CategoryCard category={item} key={`home-all-categories-${item.category_id}`} /> : null)
                              }
                         </div>
                         {
                              catCount < content.length 
                              ? <p className="text-[0.8rem] font-mono text-gray-800 cursor-pointer hover:text-main-blue-500 " onClick={() => setCatCount(content.length)}>View More</p> 
                              : <p className="text-[0.8rem] font-mono text-gray-800 cursor-pointer hover:text-main-blue-500 " onClick={() => setCatCount(12)}>View Less</p>
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
          <div className="w-full flex flex-col gap-[5px] ">
               <div className="w-full">
                    <h5 className="text-[0.8rem] text-gray-800 font-semibold underline underline-offset-1 ">{category.category_name} <span>{`${category.total_adverts} ads`}</span></h5>
               </div>
               <div className="w-full flex flex-col gap-[2.5px]">
                    {
                         category.subCategories.map((item,index) => index <= 4 ? <span className="text-[0.7rem] text-gray-700 cursor-pointer hover:text-main-blue-600 transition-all duration-150" key={item.sub_id} onClick={() => navigate(`/category/${getItemUrl(category.category_name, category.category_id)}`)}>{item.sub_name} <b className="text-[0.65rem] font-mono ">{`(${item.total_ads})`}</b></span> : null)
                    }
                    {
                         category.subCategories.length > 4 ? <span className="text-[0.7rem] font-mono text-main-blue-700 hover:text-main-blue-600 cursor-pointer" onClick={() => navigate(`/category/${getItemUrl(category.category_name, category.category_id)}`)}>View All...</span> :null
                    }
               </div>
          </div>
     )
} 

CategoryCard.propTypes = {
     category: PropTypes.object
}

export default AllCategoriesSection