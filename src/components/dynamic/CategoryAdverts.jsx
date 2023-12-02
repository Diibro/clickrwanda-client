// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AdvertRenderer} from './Advert.componet';
import { useLocation } from 'react-router-dom';
import { dashReplacer } from '../../utils/otherFunctions';
import FilterContext from '../../Contexts/FilterContext';

const CategoryAdverts = () => {
     const [filter] = useContext(FilterContext);
     const {view, adverts} = filter;
     console.log(adverts);
     const location = useLocation();
     if(view === "sub_category"){
          return (
               <div className='side-ads-view'>
                    {adverts.map((item) => (
                         location.pathname === `/categories/${dashReplacer(item.category_name)}/${dashReplacer(item.sub_name)}` ?
                         <AdvertRenderer item={item} key={item.ad_id} /> 
                         : null
                    ))}
               </div>
             )
     }else if(view === "category"){
          return (
               <div className='side-ads-view'>
                    {adverts.map((item) => (
                         location.pathname === `/categories/${dashReplacer(item.category_name)}` ?
                         <AdvertRenderer item={item} key={item.ad_id} />
                         : <>no adverts</>
                    ))}
               </div>
             )
     }else{
          return(
               <div className='side-ads-view'>
                    {adverts.map((item) => <AdvertRenderer item={item} key={item.ad_id} /> )}
               </div>
          )
     }
  
}



export default CategoryAdverts