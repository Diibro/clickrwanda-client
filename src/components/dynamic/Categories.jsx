import PropTypes from 'prop-types';
import { useContext, useEffect } from "react";
import AppData from "../../Contexts/AppContext";
// import { Container } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { InnerSection } from './InnerSectionContainer';
import { CategoryContainerSquare } from './Containers';
import { MoreLink } from './LinksComponents';
import { getItemUrl } from '../../utils/urlFunctions';
// import { TopDealsCard } from './Special.components';
// import MoreIcon from "../../assets/morecat.png";

const Categories = ({limit}) => {
     const [data, setData] = useContext(AppData);
     const {categories} = data;
     // const cond = false;
     useEffect(() => {
          if(!categories[0]){
               setData((prev) => ({...prev, fetchNow:true}));
          }
     },[])
     return(
          <div className='container'>
          {!categories ? null : categories[0] ? (
               <>
               <InnerSection type="title" >
                    Our top categories
               </InnerSection>
               <InnerSection type="content">
                    {/* {Array.isArray(categories) && <TopDealsCard />} */}
                    {Array.isArray(categories) && limit != 0  ? categories.map(
                    (item, index) => index < limit && item.category_id !== "d5bc3430-c1ce-4802-be23-b243a40229e3d5bc3430-c1ce-4802-be23-b243a40229e3" ? <CategoryContainerSquare
                         view={`/category/${getItemUrl(item.category_name, item.category_id)}`}
                         key={item.category_id} 
                         image={item.category_icon}
                         title={item.category_name}
                         ads_no={item.total_adverts > 0 ?` ${item.total_adverts} ads`: 'no ads'}/> : null
                    )
                    :Array.isArray(categories) && limit === 0   ? categories.map(
                         (item) => item.category_id !== "d5bc3430-c1ce-4802-be23-b243a40229e3" ? <CategoryContainerSquare 
                              view={`/category/${getItemUrl(item.category_name, item.category_id)}`}
                              key={item.category_id} 
                              image={item.category_icon}
                              title={item.category_name}
                              ads_no={item.total_adverts > 0 ?` ${item.total_adverts} ads`: 'no ads'}
                              /> :null
                    )
                    : null}
                    {/* {limit !== 0 && <CategoryContainerSquare view={`/categories`} image={MoreIcon} title={`All Categories`} /> } */}
               </InnerSection>

               {limit 
                    ? <InnerSection  type="more"><MoreLink content={{message: "View more Categories", icon: FaArrowRight, dest: '/categories'}} /> </InnerSection> 
                    : <></>}
               </>
          
          ) : categories.status ? null : null }
          </div>
     )
}


Categories.propTypes = {
     limit: PropTypes.number
}

export default Categories