import { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {  } from "react";
import { openNewTab } from "../../utils/otherFunctions";

const advertBanner = {
     name: "Advert Here",
     images: {
          vr: "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/banners/asideAd.png"

     },
     link: "https://www.clickrwanda.com/payment-plans/banners"
}
export const LeftBanner = ({items}) => {
     let on = false;
     return(
          <div className="banner side-banner">
               {on ? items?.map((banner, index) => (
                    <div className="hr-banner" key={index} onClick={() => openNewTab(banner.link)}>
                         <div className="hover-content">
                              {/* <h3>{banner.name}</h3> */}
                              <a href={banner.link} rel="noreferrer" target="_blank">Click Here</a>
                         </div>
                         <img src={banner.images?.vr} alt={banner.name} />
                    </div>
               ) ) : null}
          </div>
     )
}

export const RightBanner = ({items}) => {
     const arr = [];
     for (let i = 1; i<(6-items.length); i++){
          arr.push(i);
     }
     return(
          <div className="banner side-banner">
               { items?.map((banner, index) => (
                    <div className="vr-banner" key={index} onClick={() => openNewTab(banner.link)}>
                         <div className="hover-content">
                              {/* <h3>{banner.name}</h3> */}
                              <a href={banner.link} rel="noreferrer" target="_blank">Click Here</a>
                         </div>
                         <img src={banner.images?.vr} alt={banner.name} />
                    </div>
               ) ) }
               {
                    arr.map((item) => (
                         <div className="vr-banner" onClick={() => openNewTab(advertBanner.link)} key={item}>
                              <div className="hover-content">
                                   {/* <h3>{banner.name}</h3> */}
                                   <a href={advertBanner.link} rel="noreferrer" target="_blank" download={advertBanner.images?.vr}>Click Here</a>
                              </div>
                              <img src={advertBanner.images?.vr} alt={advertBanner.name} />
                         </div>
                    )) 
               }
               
          </div>
     )
}

export const HorizontalBanner = ({items, upper, lower}) => {
     
     return(
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] hide-scroll relative">
               {items?.map((banner, index) => (
                    index >= lower && index <= upper ?
                    <div className="w-full relative rounded-[5px] overflow-hidden " key={index} onClick={() => openNewTab(banner.link)}>
                         <a className="w-full h-auto" href={banner.link} rel="noreferrer" target="_blank">
                              <img className="w-full h-auto cursor-pointer" src={banner.images?.hr} alt={banner.name} />
                         </a>
                    </div>
               : null) )}
          </div>
     )
}

export const HeroSectionBanner = ({items}) => {
     const [active, setActive] = useState({
          index: 0,
          image: items[0].images.hr
     })

     const changeActive = () => {
          let nextIndex = active.index + 1;
          if(nextIndex < items.length){
               return setActive(prev => ({...prev,  index : nextIndex ,image:items[nextIndex].images.hr}))
          }else{
               return setActive(prev => ({...prev, index: 0, image: items[0].images.hr}))
          }
          
     }
     useEffect(() => {
          const intervalId = setInterval(() => {
               changeActive();
             }, 5000); 
         
             return () => {
               clearInterval(intervalId); 
             };
     }, [active])
     return (
          <div className="w-full px-[5px] flex flex-col items-center">
               {items?.map((banner, index) => (
                    <div className="hero-banner-container" key={index} onClick={() => openNewTab(banner.link)}>
                         <div className="hover-content">
                              {/* <h3>{banner.name}</h3> */}
                              <a href={banner.link} rel="noreferrer" target="_blank">Click Here</a>
                         </div>
                         <img src={banner.images?.hr} alt={banner.name} />
                    </div>
               ) )}
          </div>
     )
}

LeftBanner.propTypes = {
     items: PropTypes.any
}

HorizontalBanner.propTypes = {
     items: PropTypes.any,
     upper: PropTypes.number,
     lower: PropTypes.number,
}

HeroSectionBanner.propTypes = {
     items: PropTypes.any
}

RightBanner.propTypes = {
     items: PropTypes.any
}