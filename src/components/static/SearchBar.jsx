import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchUrl } from '../../utils/urlFunctions';
import AppData from '../../Contexts/AppContext';
import { getLocations } from '../../utils/locations';
import server from '../../config/Server';
import { useTranslation } from 'react-i18next';
// import server from '../../config/Server';
const SearchBar = () => {
  const {t} = useTranslation("global");
  const content = t("homePage.heroSection.searchBar", {returnObjects:true});
  const location = useLocation();
  const [searched, setSearched] = useState({category: "All", location: "Rwanda"});
  const [data] = useContext(AppData);
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const submitSearch = () => {
    if(searched.location || searched.category || searched.search){
      return navigate(`/search?=${getSearchUrl(searched)}`);
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      submitSearch(); 
    }
  }

  const getCategories = async () => {
    if(location.pathname === "/"){
      setCategory(data?.categories);
      return;
    }
    if(data.categories && data?.categories[0]){
      setCategory(data.categories);
    }else{
      const categoriesData = await server.get('categories',null);
      setCategory(categoriesData);
    }
  }

  useEffect(() => {
    (async() => {
      await getCategories();
      const {districts} = getLocations();
      setLocations(districts);
    })()
  },[data.categories]);
  return (
    <div className=" w-full flex items-center justify-between gap-[5px] flex-wrap" onKeyDown={handleKeyPress}>
      <div className="w-full md:w-[90%] grid grid-cols-2 md:grid-cols-3 gap-[5px]">
        <select name="category" id="search-category-01" className='text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600' defaultValue={content.category}  onChange={e => setSearched(prev => ({...prev, category:e.target.value}))}>
          {category && category[0] ? <option value="All" >All Categories</option> : null}
          {category && category[0] ? category.map((item) => <option key={`search-bar-category-${item.category_id}`} value={item.category_id}>{item.category_name}</option>) : <option value="">Loading...</option>}
        </select>
        <select name="locations" id="search-location-01" defaultValue={'Location'} className='text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600' onChange={e => setSearched(prev => ({...prev, location:e.target.value}))} >
          <option value="Rwanda">{content.location}</option>
          {locations && locations[0] ? <option value="Kigali" >Kigali</option> : null}
          {locations && locations[0] ? locations.map((item) => <option key={`search-bar-location-${item}`}>{item}</option>) : <option value="" disabled>Loading...</option>}
        </select>
        <input type="text" placeholder={content.search} className=' col-span-2 md:col-span-1 text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600 ' onChange={e => setSearched(prev => ({...prev, search:e.target.value}))} onKeyDown={handleKeyPress} id="search-input-01" />
      </div>
      <button className='w-full md:w-[9%] py-[5px] bg-main-gold-500 hover:bg-main-gold-600 text-white text-[0.8rem] rounded-[5px] font-semibold '>Search</button>
    </div>
  )
}

export default SearchBar