import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaShareAlt } from "react-icons/fa";
import PropTypes from 'prop-types';
import AppData from "../../Contexts/AppContext";
import { useLocation } from "react-router-dom";
import { AnyImage, CImage } from "../static/Image";

export const ImageSlider = ({images}) => {
     const [inView, setInView] = useState(images[0]);
     const [imageCount, setImageCount] = useState(0);
     const [,setData] = useContext(AppData);
     const location = useLocation();
     
     const urlLink = "https://share.clickrwanda.com/advert/"+location.search.split('?=')[1]
     const changeImage = count => {
          setImageCount(prev => prev + count);
     }
     const showButtons = (url, image, name) =>{
          setData(prev => ({
               ...prev,
               shareAlert: {
                    on: true,
                    content: {url, image, name}
               }
          }))
     }

     useEffect(() => {
          setInView(images[imageCount]);
     }, [imageCount, images]);

     return(
          <div className="image-slider">
               <i className='product-share-icon' onClick={() => showButtons(urlLink,images[0], "Advert")}><FaShareAlt/></i>
               <i className="left-arrow" onClick={() => changeImage(-1)} style={{display: imageCount === 0 ? 'none' : 'flex'}}><FaArrowLeft /></i>
               <img src={inView} alt="advert images" loading="lazy" />
               <i className="right-arrow" onClick={() => changeImage(1)} style={{display: imageCount === images.length - 1 ? 'none' : 'flex'}}><FaArrowRight /></i>
          </div>
     )
}


export const ImageViewer = ({images}) => {
     const [inView, setInView] = useState(images[0]);
     const [imageCount, setImageCount] = useState(0);
     const [,setData] = useContext(AppData);
     const location = useLocation();
     
     const urlLink = "https://share.clickrwanda.com/advert/"+location.search.split('?=')[1]
     const changeImage = image => {
          setInView(image);
     }
     const showButtons = (url, image, name) =>{
          setData(prev => ({
               ...prev,
               shareAlert: {
                    on: true,
                    content: {url, image, name}
               }
          }))
     }

     useEffect(() => {
          setInView(images[imageCount]);
     }, [imageCount]);

     return(
          <div className="image-viewer">
               <div className="side-images hide-scroll">
                    {images.map((image, index) => 
                         // <img key={index} src={image} loading="lazy" className={image === inView ? "active-image" : null} onMouseEnter={() => changeImage(image)} />
                         <AnyImage key={index} image={{src: image, alt: '', action: () => {}}} className={image === inView ? "active-image" : null} onMouseEnter={() => changeImage(image)} />
                    )}
               </div>
               <div className="main-image">
                    <i className='product-share-icon' onClick={() => showButtons(urlLink,images[0], "Advert")}><FaShareAlt/></i>
                    {/* <img src={inView} alt="advert images" loading="lazy" /> */}
                    <CImage image={{src:inView}} />
               </div>
               
          </div>
     )
}

ImageSlider.propTypes = {
     images: PropTypes.any
}

ImageViewer.propTypes = {
     images: PropTypes.any
}