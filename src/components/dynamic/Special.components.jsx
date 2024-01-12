import { useContext } from "react"
import AppData from "../../Contexts/AppContext"
import { useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";
import PropTypes from 'prop-types';
import { ActionBtn } from "./Buttons";
import UserContext from "../../Contexts/UserContext";

export const BoostedSellers = () => {
     const [data] = useContext(AppData);
     const {bestSellers } = data;
     const navigate = useNavigate();

     return(
          <div className="home-best-sellers">
               <span className="best-sellers-title">Best Sellers</span>
               <div className="sellers-container hide-scroll">
                    {bestSellers.map(item => <BesterSellerCard key={item.user_id} item={item}  /> )}
                    <span className="best-seller-card" onClick={() => navigate('/best-sellers')} >More...</span>
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

export const GetStartedV1 = () => {
     const [,setUser] = useContext(UserContext);
     const getStarted = () => {
          return setUser(prev => ({
               ...prev, activeForm: "signup"
          }))
     }
     return(
          <div className="home-get-started-sec">
               <div className="row-title">
                    <h3>Open a shop --</h3>
                    <p> simple, fast and free</p>
               </div>
               <div className="benefits">
                    <h4>Benefits</h4>
                    <div className="row">
                         <span>1</span>
                         <p>Build An Online Presence</p>
                    </div>
                    <div className="row">
                         <span>2</span>
                         <p>Wider Reach</p>
                    </div>
                    <div className="row">
                         <span>3</span>
                         <p>24/7 Accessibility </p>
                    </div>
                    <div className="row">
                         <span>4</span>
                         <p>Lower Overhead Costs</p>
                    </div>
                    <div className="row">
                         <span>5</span>
                         <p>Increased Marketing Opportunities</p>
                    </div>
                    <div className="row">
                         <span>6</span>
                         <p>Boost Revenue </p>
                    </div>
                    <div className="row">
                         <span>7</span>
                         <p>More Selling Channels </p>
                    </div>
                    <div className="row">
                         <span>8</span>
                         <p>Enhance Customer Engagement </p>
                    </div>
                    <div className="row">
                         <span>9</span>
                         <p>Increased Brand Visibility</p>
                    </div>
                    <div className="row">
                         <span>10</span>
                         <p>Increase Customer Base</p>
                    </div>
               </div>
               <p>Click on the below link and follow the instructions to open your shop and start selling for free.</p>
               <ActionBtn title="Get Started" action={getStarted} />
          </div>
     )
}


BesterSellerCard.propTypes = {
     item: PropTypes.any
}

