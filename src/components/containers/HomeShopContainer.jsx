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
          <div className="w-full flex flex-col gap-[10px] justify-start items-start">
               {
                    categories && categories.length ? 
                         categories.map((cat, index) => 
                         <div key={`market-page-cat-${index}`} className='w-full bg-white rounded-[5px] flex flex-col items-center justify-center gap-[5px] '>
                              <div className="w-full flex items-center justify-start gap-[5px] px-[5px] py-[10px] ">
                                   <h2 className="text-main-blue-700 text-[1.2rem] md:tex-[1.4rem] font-extrabold" >{cat.name}</h2>
                              </div>
                              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] items-start justify-start hide-scroll">
                                   {
                                        cat.subs && cat.subs.length ? 
                                             cat.subs.map((sub,index) => <HotSubcategoryCard key={`market-page-sub-${index}-${cat.name}`} category={cat} sub={sub} /> )
                                        : null
                                   }
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
          <div className="w-full aspect-[100/80] flex flex-col items-center justify-start rounded-[5px] overflow-hidden relative transition-all duration-150 p-[5px] shadow-md shadow-gray-300 " onClick={() => navigate(`/our-shop/${getItemUrl(sub.sub_name, sub.id)}`)}>
               {/* <MyImage image={sub.image} /> */}
               <img src={sub.image} alt={`${sub.sub_name}`} loading="lazy" className="w-full h-full object-fill rounded-[5px] cursor-pointer " />
               <div className="w-full py-[10px] flex flex-col items-center justify-center">
                    <h5 className="text-[0.7rem] text-center md:text-[0.9rem] lg:text-[0.9rem] text-main-blue-700 font-bold ">{sub.sub_name}</h5>
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