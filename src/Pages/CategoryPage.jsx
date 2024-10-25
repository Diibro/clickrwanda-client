import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { fetchIds} from "../utils/urlFunctions";
import PropTypes from 'prop-types'
import Loading from "../components/static/Loading";
import { Helmet } from "react-helmet";
import AdvertService from '../services/Advert';
import Server from "../services/Server";
import Service from "../services/Service";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";

const CategoryPage = () => {
  const [ads,setAds] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategory,setSubCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  

  const fetchSubAds = async (sub_id, limit, offset) => {
    
    if(sub_id === "all") return await fetchAds();

    try {
      setLoading(true);
      const res = await AdvertService.getBySubCategory({sub_id, limit: limit || 40, offset: offset || 0});
      if(res) {
        const {data} = res;
        setAds(data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const {v_id:categoryId} = fetchIds(location);
      const res = await Service.post(Server.category.search, {category_id:categoryId});
      const subsRes = await Service.post(Server.subCategory.category, {category_id: categoryId});

      if(res && res.data){
        setCategory(res.data);
      }

      if(subsRes && subsRes.data) {
        setSubCategories(subsRes.data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const fetchAds = async () => {
    try {
      setLoading(true);
      const {v_id:categoryId} = fetchIds(location);
      const res = await Service.post(Server.advert.getApprovedAdsByCategory, {ids: [categoryId], limit: 40, offset: 0})
      if(res && res.data && res.data.length && Array.isArray(res.data)){
        setAds(res.data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
    
  }

  const handleSubCategoryChange = (id) => {
    const subCat = subCategories.find(sub => sub.sub_id === id);
    if(subCat) {
      setSubCategory(subCat);
    }else {
      setCategory(null)
    }
  }


  useEffect(() => {
    (async() => {
      await fetchCategory();
      await fetchAds();
    })(); 
  },[location.search]);

  useEffect(() => {
    (
      async () => {
        if(subCategory) return await fetchSubAds(subCategory.sub_id, 40, 0);
        else return await fetchAds();
      }
    )();
  },[subCategory]);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={`${category?.category_name} in Rwanda`} />
        <meta name="description" content={`Best and trusted ${category?.category_name} in Rwanda`} />
        <title>{`${category?.category_name || 'Category'}`} | Click Rwanda</title>
      </Helmet>
      <div className="w-full flex flex-col gap-[20px] items-center justify-start py-[10px]">
          <CategoryPageHeader content={{category, subCategories, fetchSubAdverts: (id) => handleSubCategoryChange(id)}} />
          <div className="w-[95%] md:w-[90%]">
            {!loading ? <>
            {ads && Array.isArray(ads) && ads.length ? <GeneralAdsContainer ads={ads} /> : <p className="font-semibold text-gray-600 text-[0.9rem]">No Ads found</p>}
            </> : <Loading />}
          </div>
      </div>
    </>
    
  )
}

const CategoryPageHeader = ({content}) => {
  const {category, subCategories, fetchSubAdverts} = content;

  const handleSubCategoryChange = (e) => {
    return fetchSubAdverts(e.target.value);
  }
  return (
    <div className="w-[95%] md:w-[90%] bg-white  flex items-center justify-between rounded-[5px] p-[10px] " >
      <div className="w-auto flex flex-col md:flex-row items-start justify-start gap-[5px] md:gap-[10px] ">
        <div className="w-auto flex items-center gap-[5px]">
          <p className="text-[0.9rem] text-gray-600 ">Category:</p>
          <h3 className="text-[1rem] text-main-blue-700 font-bold ">{category?.category_name}</h3>
        </div>
        <div className="w-auto flex items-center gap-[5px]">
          <label htmlFor="category-page-subCategory-selector" className="text-[0.9rem] text-gray-600 " >Sub-Category:</label>
          <select name="category-page-subCategory-selector" id="category-page-subCategory-selector" onChange={handleSubCategoryChange} className="text-[0.8rem] font-semibold text-main-blue-700 w-auto max-w[150px] border-[1.3px] rounded-[5px] p-[2.5px] border-gray-300 cursor-pointer outline-none ">
            <option value="all">All</option>
            {subCategories && subCategories.length && Array.isArray(subCategories) && 
              subCategories.map((sub, index) => <option key={`sub-category-category-page-${index}`} value={sub.sub_id} >{sub.sub_name}</option>)
            }
          </select>
        </div>
      </div>
    </div>
  )
}

CategoryPageHeader.propTypes = {
  content: PropTypes.shape({
    category: PropTypes.object,
    subCategories: PropTypes.array,
    fetchSubAdverts: PropTypes.func,
    cb: PropTypes.func
  })
}

export default CategoryPage;