import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getItemUrlId } from "../utils/urlFunctions";
import server from "../config/Server";
import PropTypes from 'prop-types'
import Loading from "../components/static/Loading";
import { CategoryAdverts} from "../components/dynamic/Adverts.component";

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
      const subAdvertsStored = sessionStorage.getItem('subAdverts');
      if(subAdvertsStored) {
        let parsedData = JSON.parse(subAdvertsStored);
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
        sessionStorage.setItem('subAdverts', JSON.stringify(subAdverts));
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
      if(categoryData.category_id === categoryId){
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
    <div className="category-page">
      {!loading ? <>
        <div className="category-page-content">
          {subCategories ? <CategoryHeader subViewed={{id: subViewed.id, action: viewSubCategory}} subCategories={subCategories} /> : null }
          {categoryAds ? <CategoryAdverts adverts={categoryAds} /> : null}
        </div>
      </> : <Loading />}
     
    </div>
  )
}

const CategoryHeader = ({subCategories, subViewed}) => {
  return(
    <div className="category-page-header">
      <span className={`${subViewed.id === "all" ? 'active-sub' : '' }`} onClick={() =>subViewed.action('all')}>All</span>
      {subCategories.map((item) => <span className={`${subViewed.id === item.sub_id ? 'active-sub' : ''}`} key={item.sub_id} onClick={() => subViewed.action(item.sub_id)}>{item.sub_name}</span>)}
    </div>
  )
}

CategoryHeader.propTypes = {
  subCategories : PropTypes.arrayOf(PropTypes.object).isRequired,
  subViewed: PropTypes.any
}

export default CategoryPage;