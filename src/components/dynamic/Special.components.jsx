import { useContext } from "react"
import AppData from "../../Contexts/AppContext"
import { useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";
import PropTypes from 'prop-types';

export const BoostedSellers = () => {
     const [data] = useContext(AppData);
     const {bestSellers } = data;
     const navigate = useNavigate();

     return(
          <div className="home-best-sellers">
               <span className="best-sellers-title">Best Sellers</span>
               <div className="sellers-container hide-scroll">
                    {bestSellers.map(item => <BesterSellerCard key={item.user_id} item={item}  /> )}
                    <span className="best-seller-card"  >More...</span>
               </div>
          </div>
     )
}

const BesterSellerCard = ({item}) => {
     const navigate = useNavigate();
     const handleClick = () =>{
          navigate(`/vendor/${getItemUrl(item.full_name, item.user_id)}`)
     } 
     return(
          <span onClick={handleClick} className="best-seller-card">
               {item.username}
          </span>
     )
}

export const TopDealsCard = () => {
     const url = "vendor/Click-Rwanda?=0e17d862-80c9-451c-974c-1eac88ddcc77";
     const navigate = useNavigate();
     return(
          <div onClick={() => navigate(url)} className="category-square top-deals-card">
               <h3>Top <br /> Deals</h3>
          </div>
     )
}

export const TodayDeals = () => {

}

BesterSellerCard.propTypes = {
     item: PropTypes.any
}

