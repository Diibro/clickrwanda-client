import { useContext } from "react"
import AppData from "../../Contexts/AppContext"
import { useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";
import PropTypes from 'prop-types';

export const BoostedSellers = () => {
     const [data] = useContext(AppData);
     const {bestSellers } = data;

     return(
          <div className="home-best-sellers">
               <span className="best-sellers-title">Best Sellers</span>
               <div className="sellers-container hide-scroll">
                    {bestSellers.map(item => <BesterSellerCard key={item.user_id} item={item}  /> )}
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

BesterSellerCard.propTypes = {
     item: PropTypes.any
}

