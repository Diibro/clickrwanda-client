import { useContext, useEffect, useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchUrl } from '../../utils/urlFunctions';
import AppData from '../../Contexts/AppContext';
import { getLocations } from '../../utils/locations';
import server from '../../config/Server';
// import server from '../../config/Server';
const SearchBar = () => {
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
      const {districts} = await getLocations();
      setLocations(districts.data);
    })()
  },[data.categories]);
  return (
    <div className="search-bar-main" onKeyDown={handleKeyPress}>
      <select name="category" id="search-category-01" className='hide-scroll' defaultValue={'Category'}  onChange={e => setSearched(prev => ({...prev, category:e.target.value}))}>
        {category && category[0] ? <option value="All"  selected>All Categories</option> : null}
        {category && category[0] ? category.map((item) => <option key={item.category_id} value={item.category_id}>{item.category_name}</option>) : <option value="">Loading...</option>}
      </select>
      <input type="text" placeholder="Search anything..." onChange={e => setSearched(prev => ({...prev, search:e.target.value}))} onKeyDown={handleKeyPress} id="search-input-01" />
      <select name="locations" id="search-location-01" defaultValue={'Location'} className='hide-scroll' onChange={e => setSearched(prev => ({...prev, location:e.target.value}))} >
        <option value="Rwanda" selected  >All Rwanda</option>
        {locations && locations[0] ? <option value="Kigali" >Kigali</option> : null}
        {locations && locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
      </select>
      <i onClick={submitSearch}><FiSearch /></i>
    </div>
  )
}

export default SearchBar