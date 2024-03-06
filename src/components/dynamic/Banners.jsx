import { useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {  } from "react";
import { openNewTab } from "../../utils/otherFunctions";

const advertBanner = {
     name: "Advert Here",
     images: {
          vr: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1709100968/clickrwanda/banners/asideAd_l4n54f.png"

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
                                   <a href={advertBanner.link} rel="noreferrer" target="_blank">Click Here</a>
                              </div>
                              <img src={advertBanner.images?.vr} alt={advertBanner.name} />
                         </div>
                    )) 
               }
               
          </div>
     )
}

export const HorizontalBanner = ({items}) => {
     // const bannerRef = useRef(null);
     // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
     
     // const scrollBanner = async () => {
     //      let counter = 1;
     //      let check = true;
     //      let loopInf = true;
     //      const scrollWidth = bannerRef.current?.scrollWidth / items.length;
     //      while(loopInf){
     //           await delay(10000);
     //           if(counter === items.length){
     //                check = false;
     //           }else if(counter === 1){
     //                check = true;
     //           }
     //           if(check) {
     //                console.log("moved");
     //                counter++;
     //                bannerRef.current.scrollBy({left: scrollWidth, behavior: 'smooth'});
                    
     //           }else{
     //                counter--;
     //                bannerRef.current.scrollBy({left: -scrollWidth, behavior: 'smooth'});
     //           }
               
               
     //      }
     // }
     // useEffect(()=> {
     //      scrollBanner();
     // },[]);

     // (async() => await scrollBanner())();
     return(
          <div className="banner horizontal-banner hide-scroll" ref={bannerRef}>
               {items?.map((banner, index) => (
                    <div className="hr-banner" key={index} onClick={() => openNewTab(banner.link)}>
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
          <div className="banner hero-section-banner">
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
     items: PropTypes.any
}

HeroSectionBanner.propTypes = {
     items: PropTypes.any
}

RightBanner.propTypes = {
     items: PropTypes.any
}