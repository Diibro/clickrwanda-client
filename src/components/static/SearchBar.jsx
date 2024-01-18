import { useContext, useEffect, useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getSearchUrl } from '../../utils/urlFunctions';
import AppData from '../../Contexts/AppContext';
import { getLocations } from '../../utils/locations';
// import server from '../../config/Server';
const SearchBar = () => {
  const [searched, setSearched] = useState({category: "All", location: "Rwanda"});
  const [data, setData] = useContext(AppData);
  const [locations, setLocations] = useState([]);
  const {categories} = data;
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

  useEffect(() => {
    if(!categories[0]){
      setData(prev => ({...prev, fetchNow:true}));
    }
    (async() => {
      const {districts} = await getLocations();
      // const {data} = districts;
      // setLocations(data);
      setLocations(districts.data);
    })()
    
  },[])
  return (
    <div className="search-bar-main" onKeyDown={handleKeyPress}>
      <select name="category" id="categories-id" className='hide-scroll' defaultValue={'Category'}  onChange={e => setSearched(prev => ({...prev, category:e.target.value}))}>
        {categories[0] ? <option value="All"  selected>All Categories</option> : null}
        {categories[0] ? categories.map((item) => <option key={item.category_id} value={item.category_id}>{item.category_name}</option>) : <option value="">Loading...</option>}
      </select>
      <input type="text" placeholder="Search anything..." onChange={e => setSearched(prev => ({...prev, search:e.target.value}))} onKeyDown={handleKeyPress} />
      <select name="locations" id="locations-02" defaultValue={'Location'} className='hide-scroll' onChange={e => setSearched(prev => ({...prev, location:e.target.value}))} >
        <option value="Rwanda" selected  >All Rwanda</option>
        {locations[0] ? <option value="Kigali" >Kigali</option> : null}
        {locations[0] ? locations.map((item) => <option key={item}>{item}</option>) : <option value="" disabled>Loading...</option>}
      </select>
      <i onClick={submitSearch}><FiSearch /></i>
    </div>
  )
}

export default SearchBar