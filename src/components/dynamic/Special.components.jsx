import { useContext } from "react"
import AppData from "../../Contexts/AppContext"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";
import PropTypes from 'prop-types';
import { ActionBtn } from "./Buttons";
import UserContext from "../../Contexts/UserContext";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const BoostedSellers = () => {
     const [data] = useContext(AppData);
     const {bestSellers } = data;
     const navigate = useNavigate();
     const adsRef = useRef(null);
     const [scrollPos, setScrollPos] = useState({atLeft: false});

     const scrollHandle = (check) => {
          if(check === 1){
            adsRef.current.scrollBy({left: 300, behavior: 'smooth'});
          }else if(check === -1){
            adsRef.current.scrollBy({left: -300, behavior: 'smooth'})
          }
        }
      
        const handleScroll = () => {
          const { scrollLeft, scrollWidth, clientWidth } = adsRef.current;
          setScrollPos({
            atLeft: scrollLeft === 0,
            atRight: scrollLeft + clientWidth >= scrollWidth,
          });
        };
      
        useEffect(() => {
          const currentRef = adsRef.current;
          currentRef && currentRef.addEventListener('scroll', handleScroll);
      
          return () => {
            currentRef ? currentRef.removeEventListener('scroll', handleScroll) : null;
          };
        }, [bestSellers]);
     return(
          <div className="home-best-sellers">
               <p className="best-seller-para">Discover which sellers have been ranked best for the best products, services and deals.</p>
               <div ref={adsRef} className="sellers-container hide-scroll">
                    {bestSellers.map(item => <BesterSellerCard key={item.user_id} item={item}  /> )}
                    <span className="best-seller-card" onClick={() => navigate('/best-sellers')} >More...</span>
               </div>
               {!scrollPos.atLeft ? <i  onClick={()=>scrollHandle(-1)} className="nav-icon icon-left"><MdNavigateBefore/></i> : null}
               {!scrollPos.atRight ? <i  onClick={()=>scrollHandle(1)} className="nav-icon icon-right"><MdNavigateNext /></i> : null }
               
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
               {item.full_name}
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
     const location = useLocation();
     const getStarted = () => {
          return setUser(prev => ({
               ...prev, activeForm: "signup"
          }))
     }
     return(
          <div className={location.pathname === '/' ? 'home-get-started-sec' : 'get-started-sec'}>
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

export const RequestQuoteHeader = () => {
     return(
          <div className="home-request-quote-header hide-scroll">
               <Link to="/get-started">Open a shop</Link>
               <Link to="/send-request?=request-quotation" >Request Quotation</Link>
               <Link to="/send-request?=find-room">Find a room</Link>
               <Link to="/send-request?=buy-house">Buy a house</Link>
               <Link to="/send-request?=buy-car">Buy a car</Link>
               <Link to="/send-request?=find-job">Find a job</Link>
          </div>
     )
}


BesterSellerCard.propTypes = {
     item: PropTypes.any
}

