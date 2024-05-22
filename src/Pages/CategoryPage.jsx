import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { getItemUrlId } from "../utils/urlFunctions";
import server from "../config/Server";
import PropTypes from 'prop-types'
import Loading from "../components/static/Loading";
import { CategoryAdverts} from "../components/dynamic/Adverts.component";
import { getData, saveData } from "../utils/storageFunctions";
import { Helmet } from "react-helmet";
import { filterByPrice, filterPrices } from "../utils/filterFunctions";
// import { formatPrice } from "../utils/otherFunctions";

const CategoryPage = () => {
  const [categoryAds, setCategoryAds] = useState(null);
  const [ads, setAds] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [subViewed, setSubViewed] = useState({id: 'all'}); 
  const [subCategory, setSubCategory] = useState(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const fetchSubAdverts = async (sub_id) => {
    try {
      console.log("trying to fetch data");
      // if(sub_id === 'all') {
      //   setCategoryAds()
      //   return;
      // }
      let check = 0;
      const parsedData = getData('subAdverts');
      if(parsedData) {
        if(parsedData.sub_id === sub_id) {
          setCategoryAds(parsedData.adverts);
          setAds(parsedData.adverts);
          check = 1;
          return;
        }
      }

      if(check === 0) {
        setLoading(true);
        const res = await server.searchAdverts('sub-category', {sub_id});
        if(res === 'no adverts found'){
          return;
        }
        setCategoryAds(res);
        setAds(res);
        const subAdverts = { sub_id, data: res};
        saveData('subAdverts', subAdverts, 30);
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
    (async () => await fetchSubAdverts(item.sub_id) )();
  }

  const viewAdsByPrice = (filterData) => {
    try {
      let maxPrice = +filterData.min + +filterData.change;
      const filteredAds = filterByPrice(ads, {min:filterData.min, max: maxPrice});
      setCategoryAds(filteredAds);
      console.log(categoryAds);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const categoryId = getItemUrlId(location.search);
    const categoryViewStored = sessionStorage.getItem('categoryViewed');
    let check = 0;
    const fetchData = async(id) => {
      try {
        setLoading(true);
        const categoryDatas = await server.searchAdverts('category', {category_id: id});
        console.log("checking");
        if(categoryDatas !== "no data found"){
          const {categoryData, subCategories, adverts} = categoryDatas
          sessionStorage.setItem('categoryViewed', JSON.stringify(categoryDatas));
          setCategoryAds(adverts);
          setAds(adverts);
          setSubCategories(subCategories);
          setCategory(categoryData)
          // return;
        }else{
          console.log("no data found");
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
      
      console.log("no data found");

      
    }
    if(categoryViewStored && categoryViewStored !== 'no data found') {
      const categoryDataStored =  JSON.parse(categoryViewStored);
      const {categoryData} = categoryDataStored;
      if(categoryData?.category_id === categoryId){
        const {subCategories, adverts} = categoryDataStored
        setCategoryAds(adverts);
        setAds(adverts);
        setSubCategories(subCategories);
        setCategory(categoryData)
        check = 1;
      }
    }

    if(check === 0) {
      (async() => {
        await fetchData(categoryId);
      })(); 
    }
  },[location.search]);

  return (
    <>
      <Helmet>
        <meta name="keywords" content={`${category?.category_name} in Rwanda`} />
        <meta name="description" content={`Best and trusted ${category?.category_name} in Rwanda`} />
        <title>{`${category?.category_name || 'Category'}`} | Click Rwanda</title>
      </Helmet>
      <div className="category-page">
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
          <div className="category-page-content">
            {subCategories ? <CategoryHeader subViewed={
              {id: subViewed.id, action: viewSubCategory, data: ads, filterByPrice: viewAdsByPrice}
              } /> : null }
            {!loading ? <>
            {categoryAds ? <CategoryAdverts adverts={categoryAds} /> : null}
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