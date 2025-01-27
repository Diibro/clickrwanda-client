import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations } from '../../utils/locations';
import { useQuery } from '@tanstack/react-query';
import { MainServer } from '../../services/beta/server';
import { BetaEndpoints } from '../../services/beta/endpoints';

const SearchBar = () => {
  const {data: categoriesData} = useQuery({queryKey:["categories"], queryFn: async () => await MainServer.fetch(`${BetaEndpoints.category}`)});
  const category = categoriesData ? categoriesData.data : null;
  const [searched, setSearched] = useState({category: "All", location: "Rwanda"});
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const submitSearch = () => {
    const searchArr = [];
    if(searched.category != "All") searchArr.push(`category=${searched.category}`);
    if(searched.location != "Rwanda") searchArr.push(`location=${searched.location}`);
    if(searched.name) searchArr.push(`name=${searched.name}`);
    const searchStr = searchArr.join("&");
    if(searched.location || searched.category || searched.search){
      return navigate(`/search?${searchStr}`);
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      submitSearch(); 
    }
  }

  useEffect(() => {
    (async() => {
      const {districts} = getLocations();
      setLocations(districts);
    })()
  },[]);
  return (
    <form onSubmit={submitSearch} className=" w-full flex items-center justify-between gap-[5px] flex-wrap" onKeyDown={handleKeyPress}>
      <div className="w-full md:w-[90%] grid grid-cols-2 md:grid-cols-3 gap-[5px]">
        <select name="category" id="search-category-01" className='text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600' defaultValue={"All Categories"}  onChange={e => setSearched(prev => ({...prev, category:e.target.value}))}>
          {category && category[0] ? <option value="All" >All Categories</option> : null}
          {category && category[0] ? category.map((item) => <option key={`search-bar-category-${item.category_id}`} value={item.category_id}>{item.category_name}</option>) : <option value="">Loading...</option>}
        </select>
        <select name="locations" id="search-location-01" defaultValue={'Location'} className='text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600' onChange={e => setSearched(prev => ({...prev, location:e.target.value}))} >
          <option value="Rwanda">All Rwanda</option>
          {locations && locations[0] ? <option value="Kigali" >Kigali</option> : null}
          {locations && locations[0] ? locations.map((item) => <option key={`search-bar-location-${item}`}>{item}</option>) : <option value="" disabled>Loading...</option>}
        </select>
        <input type="text" placeholder={"search anything..."} className=' col-span-2 md:col-span-1 text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600 ' onChange={e => setSearched(prev => ({...prev, name:e.target.value}))} onKeyDown={handleKeyPress} id="search-input-01" />
      </div>
      <button type='submit' className='w-full md:w-[9%] py-[5px] bg-main-gold-500 hover:bg-main-gold-600 text-white text-[0.8rem] rounded-[5px] font-semibold '>Search</button>
    </form>
  )
}

export default SearchBar