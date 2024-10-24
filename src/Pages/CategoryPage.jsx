import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { fetchIds, getItemUrlId } from "../utils/urlFunctions";
import server from "../config/Server";
import PropTypes from 'prop-types'
import Loading from "../components/static/Loading";
import { CategoryAdverts} from "../components/dynamic/Adverts.component";
import { Helmet } from "react-helmet";
import { filterPrices } from "../utils/filterFunctions";
import AdvertService from '../services/Advert';
import Server from "../services/Server";
import Service from "../services/Service";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";

const CategoryPage = () => {
  const [categoryAds, setCategoryAds] = useState(null);
  const [ads,setAds] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [subViewed, setSubViewed] = useState({id: 'all'}); 
  const [subCategory, setSubCategory] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  

  const fetchSubAdverts = async (sub_id, limit, offset) => {
    try {
      setLoading(true);
      const res = await AdvertService.getBySubCategory({sub_id, limit, offset});
      if(res) {
        const {data} = res;
        setCategoryAds(data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  
  const viewSubCategory = (item) => {
    setSubCategory(item);
    setSubViewed((prev) => ({...prev, id: item.sub_id}));
    (async () => await fetchSubAdverts(item.sub_id, 48,0) )();
  }

  const fetchAds = async () => {
    try {
      setLoading(true);
      const {v_id:categoryId} = fetchIds(location);
      const res = await Service.post(Server.advert.getApprovedAdsByCategory, {ids: [categoryId], limit: 50, offset: 0})
      if(res && res.data && res.data.length && Array.isArray(res.data)){
        setAds(res.data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
    
  }


  useEffect(() => {
    (async() => {
      await fetchAds();
    })(); 
  },[location.search]);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={`${category?.category_name} in Rwanda`} />
        <meta name="description" content={`Best and trusted ${category?.category_name} in Rwanda`} />
        <title>{`${category?.category_name || 'Category'}`} | Click Rwanda</title>
      </Helmet>
      <div className="w-full flex flex-col gap-[20px] items-center justify-start py-[10px]">
          <div className="category-page-nav">
            <div className="name" onClick={() => window.location.reload()}>
              {category?.category_name}
            </div>
            {!subCategory ? null : 
            <div className="name">
              {subCategory?.sub_name || ""}
            </div>
            }
          </div>
          <div className="w-[95%] md:w-[90%]">
            {!loading ? <>
            {ads && Array.isArray(ads) && ads.length ? <GeneralAdsContainer ads={ads} /> : <p className="font-semibold text-gray-600 text-[0.9rem]">No Ads found</p>}
            </> : <Loading />}
          </div>
      </div>
    </>
    
  )
}

const CategoryHeader = ({subViewed}) => {
  const [subCategories, setSubCategories] = useState(null);
  const [filteredPrices, setFilteredPrices] = useState([]);

  const fetchData = async(id) => {
    try {
      const categoryDatas = await server.searchAdverts('category', {category_id: id});
      if(categoryDatas !== "no data found"){
        const {subCategories} = categoryDatas;
        setSubCategories(subCategories);
        return;
      }
    } catch (error) {
      console.log(error);
    }finally{
      // 
    }
  }

  useEffect(() => {
    const categoryId = getItemUrlId(location.search);
    (async () => {
      await fetchData(categoryId);
    })();
  }, []);

  useEffect(() => {
    setFilteredPrices(filterPrices(subViewed.data));
}, [subViewed.data]);

// useEffect(() => {
//     document.getElementById("price-filter").selectedIndex = 0;
// }, [filteredPrices]);

  return(
    <div className="category-page-header">
      <h3>Filter....</h3>
      <div className="filter-content">
        <div className="row">
          <h4>Sub-Category</h4>
          <select name="sub-category" id="sub-category" onChange={(event) => subViewed.action(JSON.parse(event.target.value))}>
            <option value="all">All</option>
            {subCategories && subCategories[0] ? subCategories.map((item) => <option key={item.sub_id} value={JSON.stringify(item)} >{item.sub_name} {`(${item.sub_ads} ads)`}</option>) : null}
          </select>
        </div>

        {/* <div className="row">
          <h4>Price</h4>
          <select onChange={(e) => subViewed.filterByPrice({min:e.target.value, change:filteredPrices[1]})}  
            name="price-filter" id="price-filter" >
            <option value="" disabled selected>Price range..</option>
            {filteredPrices.map((price,index) => 
            <option value={filteredPrices[index]} key={index}>{formatPrice(price)} - {index < 5 ? formatPrice(filteredPrices[index + 1]): "Above"} </option>
          )}
          </select>
        </div> */}
        
      </div>
      
    </div>
  )
}

CategoryHeader.propTypes = {
  subViewed: PropTypes.any
}

export default CategoryPage;