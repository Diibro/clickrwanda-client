import { useContext } from "react"
import AppData from "../../Contexts/AppContext"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getItemUrl } from "../../utils/urlFunctions";
import PropTypes from 'prop-types';
import { ActionBtn } from "./Buttons";
import { MdVerified } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export const BoostedSellers = () => {
     const {t} = useTranslation("global");
     const content = t("homePage.bestSellersSection", {returnObjects:true});
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
          console.log(bestSellers);
          const currentRef = adsRef.current;
          currentRef && currentRef.addEventListener('scroll', handleScroll);
      
          return () => {
            currentRef ? currentRef.removeEventListener('scroll', handleScroll) : null;
          };
        }, [bestSellers]);
     return(
          <div className="container">
               <div className="ads-section-title">
                    <div className="title">
                         <h3 className="main-title">{content.title}</h3>
                         <Link to={content.viewAllLink.link}>{content.viewAllLink.title}</Link>
                    </div>
                    <div className="section-navigation">
                         <i  onClick={()=>scrollHandle(-1)} className={`${!scrollPos.atLeft  ? '' : 'inactive'}`} ><RiArrowLeftSLine/></i>
                         <i onClick={()=>scrollHandle(1)} className={`${!scrollPos.atRight ? '' : 'inactive'}`}><RiArrowRightSLine/></i>
                    </div>
               </div>
               <div className="home-best-sellers">
                    <p className="best-seller-para">{content.message}</p>
                    <div ref={adsRef} className="sellers-container hide-scroll">
                         {bestSellers && bestSellers[0] && bestSellers.map(item => <BesterSellerCard key={item.user_id} item={item}  /> )}
                         <div className="best-seller-card" onClick={() => navigate('/best-sellers')} ><p>More...</p></div>
                    </div>
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
          <div onClick={handleClick} className="best-seller-card">
               <div className="profile-image">
                    <img src={item.profile_image} width={100} alt={`profile image for ${item.full_name}`} />
               </div>
               <div className="content">
               <p>{item.full_name}{item.verified ? <i><MdVerified /></i> : null}</p>
               </div>
          </div>
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
     const navigate = useNavigate();
     const location = useLocation();
     const getStarted = () => {
          return navigate("/forms/signup");
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
     const {t} = useTranslation("global");
     const content = t("homePage.heroSection.buttons", {returnObjects:true});
     return(
          <div className="home-request-quote-header hide-scroll">
               {content.map((item,index) => <Link to={item.link} key={`hero-btn-${index}`}>{item.name}</Link>)}
          </div>
     )
}


BesterSellerCard.propTypes = {
     item: PropTypes.any
}

