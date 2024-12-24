import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { getItemUrl} from "../utils/urlFunctions";
import PropTypes from 'prop-types'
import Loading from "../components/static/Loading";
import { Helmet } from "react-helmet";
import AdvertService from '../services/Advert';
import Server from "../services/Server";
import Service from "../services/Service";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import Pagination from "../components/Pagination";

const CategoryPage = () => {
  const adsLimit = 40;
  const [totalAds,setTotalAds] = useState(0);
  const [ads,setAds] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategory,setSubCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  

  const fetchSubAds = async (sub_id, limit, offset) => {
    try {
      setLoading(true);
      const res = await AdvertService.getBySubCategory({sub_id, limit: limit, offset: offset});
      if(res) {
        const {data, pagination} = res;
        setTotalAds(pagination.total);
        setAds(data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const getSearchParams = () => {
    const searchId = location.search;
    const idArr = searchId.split("?=");
    console.log(idArr);
    return idArr;
  }

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const ids = getSearchParams();
      const categoryId = ids[1];
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
      setLoading(true);const ids = getSearchParams();
      if(ids.length > 2){
        const subId = ids[2];
        return await fetchSubAds(subId, adsLimit, (currentPage - 1) * adsLimit);
      }
      const categoryId = ids[1];
      const res = await Service.post(Server.advert.getApprovedAdsByCategory, {ids: [categoryId], limit: adsLimit, offset: (currentPage - 1) * adsLimit});
      if(res && res.data && res.data.length && Array.isArray(res.data)){
        const {data, pagination} = res;
        setAds(data);
        setTotalAds(pagination.total);
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

  const fetchMoreAds = (page) => {
    const idsArr = getSearchParams();
    setCurrentPage(page);
    if(idsArr.length > 2){
      const subId = idsArr[2];
      return fetchSubAds(subId, adsLimit, (page - 1) * adsLimit);
    }
    const categoryId = idsArr[1];
    setCurrentPage(page);
    return fetchAds(categoryId, adsLimit, (page - 1) * adsLimit);

  }


  useEffect(() => {
    (async() => {
      await fetchCategory();
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
          <CategoryPageHeader content={{category, subCategories, subCategory, totalAds, fetchSubAdverts: (id) => handleSubCategoryChange(id)}} />
          <Pagination content={{total: totalAds, currentPage, perPage: adsLimit,fetchMore: (page) => fetchMoreAds(page)}} />
          <div className="w-full">
            {!loading ? <>
            {ads && Array.isArray(ads) && ads.length ? <GeneralAdsContainer ads={ads} /> : <p className="font-semibold text-gray-600 text-[0.9rem]">No Ads found</p>}
            </> : <Loading />}
          </div>
          <Pagination content={{total: totalAds, currentPage, perPage: adsLimit,fetchMore: (page) => fetchMoreAds(page)}} />
      </div>
    </>
    
  )
}

const CategoryPageHeader = ({content}) => {
  const {category, subCategory, subCategories, totalAds} = content;
  const navigate = useNavigate();

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    if(subCategoryId === "all") {
      return navigate(`/category/${getItemUrl(category.category_name, category.category_id)}`);
    }
    return navigate(`/category/${getItemUrl(category.category_name, category.category_id)}?=${e.target.value}`);
    // return fetchSubAdverts(e.target.value);
  }
  return (
    <div className="w-full bg-white  flex flex-wrap items-start mditems-center justify-between rounded-[5px] p-[10px] " >
      <div className="w-auto flex flex-col md:flex-row items-start justify-start gap-[5px] md:gap-[10px] ">
        <div className="w-full  md:w-auto flex flex-row items-center gap-[5px]">
          <p className="text-[0.9rem] text-gray-600 ">Category:</p>
          <h3 className="text-[1rem] text-main-blue-700 font-bold ">{category?.category_name}</h3>
        </div>
        <div className="w-full  md:w-auto flex flex-row items-start gap-[5px]">
          <label htmlFor="category-page-subCategory-selector" className="text-[0.9rem] text-gray-600 " >Sub-Category:</label>
          <select name="category-page-subCategory-selector" id="category-page-subCategory-selector" onChange={handleSubCategoryChange} className="text-[0.8rem] font-semibold text-main-blue-700 w-auto max-w[150px] border-[1.3px] rounded-[5px] p-[2.5px] border-gray-300 cursor-pointer outline-none ">
            <option value="all">All</option>
            {subCategories && subCategories.length && Array.isArray(subCategories) && 
              subCategories.map((sub, index) => <option selected={sub.sub_id === subCategory?.sub_id} key={`sub-category-category-page-${index}`} value={sub.sub_id} >{sub.sub_name}</option>)
            }
          </select>
        </div>
      </div>
      <div className="w-full  md:w-auto flex items-center gap-[5px]">
        <p className="text-[0.9rem] text-gray-600 ">Total Ads:</p>
        <p className="text-[1rem] text-main-blue-700 font-bold ">{totalAds}</p>
      </div>
    </div>
  )
}

CategoryPageHeader.propTypes = {
  content: PropTypes.shape({
    category: PropTypes.object,
    subCategories: PropTypes.array,
    fetchSubAdverts: PropTypes.func,
    subCategory: PropTypes.object,
    totalAds: PropTypes.number,
    cb: PropTypes.func
  })
}

export default CategoryPage;