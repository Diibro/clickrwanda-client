import { useEffect, useState } from "react";
import Categories from '../../data/HotCategories.json';
import {  useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";
import PropTypes from 'prop-types';
import { MyImage } from "../static/Image";

const HomeShopContainer = () => {
     const [categories,setCategories] = useState(null);
     useEffect(() => {
          setCategories(Categories.categories);
     },[]);
     return (
          <div className="shop-page-categories">
               {
                    categories && categories.length ? 
                         categories.map((cat, index) => 
                         <div key={`market-page-cat-${index}`} className='market-page-category-container'>
                              <div className="market-page-category-container-title">
                                   <h2>{cat.name}</h2>
                              </div>
                              <div className="market-page-sub-cat-container hide-scroll">
                                   <div className="content">
                                        {
                                             cat.subs && cat.subs.length ? 
                                                  cat.subs.map((sub,index) => <HotSubcategoryCard key={`market-page-sub-${index}-${cat.name}`} category={cat} sub={sub} /> )
                                             : null
                                        }
                                   </div>
                              </div>
                         </div> 
                    )
                    : null
               }
          </div>
     )
}

const HotSubcategoryCard = ({category,sub}) => {
     const navigate = useNavigate();
     return (
          <div className="home-hot-category-card" onClick={() => navigate(`/our-shop/${getItemUrl(sub.sub_name, sub.id)}`)}>
               <MyImage image={sub.image} />
               {/* <img src={sub.image || category.image} alt={`${sub.sub_name}`} loading="lazy" /> */}
               <div className="content">
                    <h5>{sub.sub_name}</h5>
               </div>
          </div>
     )
}

HotSubcategoryCard.propTypes = {
     category: PropTypes.object,
     sub: PropTypes.object,
     dest: PropTypes.string
}

export default HomeShopContainer