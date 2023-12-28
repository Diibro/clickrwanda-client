import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getSearchUrl } from '../../utils/urlFunctions';
const SearchBar = () => {
  const [searched, setSearched] = useState(null);
  const navigate = useNavigate();
  const submitSearch = () => {
    if(searched){
      navigate(`/search/ads?=${getSearchUrl(searched)}`);
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      submitSearch(); 
    }
  }
  return (
    <div className="search-bar-main">
      <input type="text" placeholder="Search anything..." onChange={(e) => setSearched(e.target.value)} onKeyDown={handleKeyPress} />
      <i onClick={submitSearch}><FiSearch /></i>
    </div>
  )
}

export default SearchBar