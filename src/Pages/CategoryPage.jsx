import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getItemUrlId } from "../utils/urlFunctions";
import server from "../config/Server";
import PropTypes from 'prop-types'
import Loading from "../components/static/Loading";
import { CategoryAdverts} from "../components/dynamic/Adverts.component";
import { getData, saveData } from "../utils/storageFunctions";
import { Helmet } from "react-helmet";

const CategoryPage = () => {
  const [categoryAds, setCategoryAds] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [subViewed, setSubViewed] = useState({id: 'all'}); 
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const fetchSubAdverts = async (sub_id) => {
    try {
      if(sub_id === 'all') {
        // setCategoryAds()
        return;
      }
      let check = 0;
      const parsedData = getData('subAdverts');
      if(parsedData) {
        if(parsedData.sub_id === sub_id) {
          setCategoryAds(parsedData.adverts);
          check = 1;
        }
      }

      if(check === 0) {
        setLoading(true);
        const res = await server.searchAdverts('sub-category', {sub_id});
        if(res === 'no adverts found'){
          return;
        }
        setCategoryAds(res);
        const subAdverts = { sub_id, data: res};
        saveData('subAdverts', subAdverts, 30);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  
  const viewSubCategory = (id) => {
    console.log(id);
    setSubViewed((prev) => ({...prev, id}));
    (async () => await fetchSubAdverts(id) )();
  }

  useEffect(() => {
    const categoryId = getItemUrlId(location.search);
    const categoryViewStored = sessionStorage.getItem('categoryViewed');
    let check = 0;
    const fetchData = async(id) => {
      try {
        setLoading(true);
        const categoryDatas = await server.searchAdverts('category', {category_id: id});
        if(categoryDatas !== "no data found"){
          const {categoryData, subCategories, adverts} = categoryDatas
          sessionStorage.setItem('categoryViewed', JSON.stringify(categoryDatas));
          setCategoryAds(adverts);
          setSubCategories(subCategories);
          setCategory(categoryData)
          return;
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
    console.log(categoryAds);
  },[location.search] );

  return (
    <>
      <Helmet>
        <meta name="keywords" content={`${category?.category_name} in Rwanda`} />
        <meta name="description" content={`Best and trusted ${category?.category_name} in Rwanda`} />
        <title>{`${category?.category_name || 'Category'}`} | Click Rwanda</title>
      </Helmet>
      <div className="category-page">
        
          <div className="category-page-content">
            
            {subCategories ? <CategoryHeader subViewed={{id: subViewed.id, action: viewSubCategory}} /> : null }
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

  const fetchData = async(id) => {
    try {
      const categoryDatas = await server.searchAdverts('category', {category_id: id});
      if(categoryDatas !== "no data found"){
        console.log("these are the datas found");
        console.log(categoryDatas)
        const {subCategories} = categoryDatas;
        setSubCategories(subCategories);
        return;
      }
    } catch (error) {
      console.log(error);
    }finally{
      // 
    }
    
    console.log("no data found");

    
  }

  useEffect(() => {
    const categoryId = getItemUrlId(location.search);
    (async () => {
      await fetchData(categoryId);
    })();
  }, []);

  return(
    <div className="category-page-header">
      <h3>Filter....</h3>
      <div className="filter-content">
        <div className="row">
          <h4>Sub-Category</h4>
          <select name="sub-category" id="sub-category" onChange={(event) => subViewed.action(event.target.value)}>
            <option value="all">All</option>
            {subCategories && subCategories[0] ? subCategories.map((item) => <option key={item.sub_id} value={item.sub_id} >{item.sub_name} {`(${item.sub_ads} ads)`}</option>) : null}
          </select>
          {/* <span className={`${subViewed.id === "all" ? 'active-sub' : '' }`} onClick={() =>subViewed.action('all')}>All</span>
          {subCategories.map((item) => <span className={`${subViewed.id === item.sub_id ? 'active-sub' : ''}`} key={item.sub_id} onClick={() => subViewed.action(item.sub_id)}>{item.sub_name} <i>({item.sub_ads} ads)</i> </span>)} */}
        </div>
        <div className="row">
          <h4>Price</h4>
          <select name="price-filter" id="price-filter" >
            <option value="" >{`< 110,000 rwf`}</option>
            <option value="" >{`> 110,000 rwf`}</option>
            <option value="" >{`> 210,000 rwf`}</option>
            <option value="" >{`> 310,000 rwf`}</option>
            <option value="" >{`> 410,000 rwf`}</option>
          </select>
        </div>
        
      </div>
      
    </div>
  )
}

CategoryHeader.propTypes = {
  subViewed: PropTypes.any
}

export default CategoryPage;