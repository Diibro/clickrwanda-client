import PropTypes from 'prop-types';
import { useContext, useEffect } from "react";
import AppData from "../../Contexts/AppContext";
// import { Container } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { InnerSection } from './InnerSectionContainer';
import { CategoryContainerSquare } from './Containers';
import { MoreLink } from './LinksComponents';
import { getItemUrl } from '../../utils/urlFunctions';
import { useTranslation } from 'react-i18next';
// import { TopDealsCard } from './Special.components';
// import MoreIcon from "../../assets/morecat.png";

const Categories = () => {
     const {t} = useTranslation("global");
     const content = t("homePage.categoriesSection", {returnObjects:true});
     const [data, setData] = useContext(AppData);
     const {categories} = data;
     // const cond = false;
     useEffect(() => {
          if(!categories[0]){
               setData((prev) => ({...prev, fetchNow:true}));
          }
     },[])
     return(
          <div className=' w-full bg-white flex flex-col items-center rounded-[5px] p-[10px] '>
          {!categories ? null : categories[0] ? (
               <>
               <div className='w-full flex items-center gap-[10px] '>
                    <h2 className='text-main-blue-700 text-[1.4rem] md:tex-[1.6rem] font-extrabold '>{content.title}</h2>
               </div>
               <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-[10px] md:gap-[20px] '>
                    {Array.isArray(categories)  ? categories.map(
                         (item) => item.category_id !== "d5bc3430-c1ce-4802-be23-b243a40229e3" ? <CategoryContainerSquare 
                              view={`/category/${getItemUrl(item.category_name, item.category_id)}`}
                              key={item.category_id} 
                              image={item.category_icon}
                              title={item.category_name}
                              ads_no={item.total_adverts > 0 ?` ${item.total_adverts} ads`: 'no ads'}
                              /> :null
                    )
                    : null}
               </div>
               </>
          
          ) : categories.status ? null : null }
          </div>
     )
}


Categories.propTypes = {
     limit: PropTypes.number
}

export default Categories