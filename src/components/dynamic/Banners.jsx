import { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {  } from "react";
import { ActionBtn } from "./Buttons";
import SideBanner from "../../assets/samples/side-advertise.gif";
import HorizontalGif from "../../assets/samples/clickrwanda-banner.png"
import HeroBanner from "../../assets/samples/2.jpg"
import HeroBanner3 from "../../assets/samples/3.jpg"
import HeroBanner4 from "../../assets/samples/4.jpg"
import HeroBanner5 from "../../assets/samples/5.jpg"
import AskaSide from "../../assets/samples/Aska sidebanner.png"
import ConectHr from "../../assets/samples/connect-real-hr-banner.png";

const HeroBanners = [
     {banner_image: HeroBanner},
     {banner_image: HeroBanner3},
     {banner_image: HeroBanner4},
     {banner_image: HeroBanner5}]


export const LeftBanner = ({items}) => {
     // const [active, setActive] = useState({});
     // const changeActive = () => {
     
     
     // }
     // useEffect(() => {
          
     // }, [1000]);
     return(
          <div className="banner side-banner">
               {/* <h3>Advertise Here</h3>
               <ActionBtn title="Get Started"/> */}
               <img src={AskaSide} alt="sample-banner" />
          </div>
     )
}

export const RightBanner = ({items}) => {
     // const [active, setActive] = useState({});
     // const changeActive = () => {
     
     
     // }
     // useEffect(() => {
          
     // }, [1000]);
     return(
          <div className="banner side-banner">
               {/* <h3>Advertise Here</h3>
               <ActionBtn title="Get Started"/> */}
               <img src={AskaSide} alt="sample-banner" />
          </div>
     )
}

export const HorizontalBanner = ({items}) => {
     // const [active, setActive] = useState({});
     // const changeActive = () => {
     
     
     // }
     // useEffect(() => {
          
     // }, [1000]);
     return(
          <div className="banner horizontal-banner">
               {/* <h3>Advertise Here</h3>
               <ActionBtn title="Get Started"/> */}
               <img src={ConectHr} alt="Horizontal gif" />
          </div>
     )
}

export const HeroSectionBanner = ({items}) => {
     const [active, setActive] = useState({
          index: 0,
          image: HeroBanners[0].banner_image
     })

     const changeActive = () => {
          let nextIndex = active.index + 1;
          if(nextIndex < HeroBanners.length){
               return setActive(prev => ({...prev,  index : nextIndex ,image:HeroBanners[nextIndex].banner_image}))
          }else{
               return setActive(prev => ({...prev, index: 0, image: HeroBanners[0].banner_image}))
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
               <div className="hero-banner-container">
                    {/* <h3>Advertise Here</h3>
                    <ActionBtn title="Get Started"/> */}
                    <img src={active.image} alt="banner" />
               </div>
               
          </div>
     )
}

LeftBanner.propTypes = {
     items: PropTypes.any
}
