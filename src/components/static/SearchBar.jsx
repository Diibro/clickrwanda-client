import {FiSearch} from 'react-icons/fi';
const SearchBar = () => {
  return (
    <div className="search-bar-main">
     <input type="text" placeholder="Search anything..." />
     <i><FiSearch /></i>
    </div>
  )
}

export default SearchBar