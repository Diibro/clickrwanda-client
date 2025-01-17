import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaShareAlt} from "react-icons/fa";
import PropTypes from 'prop-types';
import AppData from "../../Contexts/AppContext";
import { useLocation } from "react-router-dom";

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

     const changeImage = (image) => {
          return setInView(image);
     }
     useEffect(() => {
          setInView(images[imageCount]);
     }, [imageCount]);

     return(
          <div className="w-full flex flex-col items-center gap-[10px] bg-white rounded-[5px] p-[5px] border border-gray-300">
               <div className="w-full flex items-center justify-start relative">
                    <img className="max-w-full max-h-[400px] mx-auto aspect-auto rounded-[5px]" src={inView} alt="advert images" loading="lazy" />
                    {/* <img image={{src:inView}} src={inView} /> */}
               </div>
               {
                    images && images.length > 1 ?
                    <div className="w-full h-[100px] flex items-center justify-start gap-[5px] overflow-x-auto hide-scroll border-t-[1.3px] border-gray-200">
                    {images.map((image, index) => 
                         <img key={index} src={image} loading="lazy" className={`${image === inView ? "border-orange-600 border-[1.4px] p-[5px] " : null} cursor-pointer w-auto h-full rounded-[5px]`} onClick={() => changeImage(image)} />
                    )}
               </div>
                    :null
               }
          </div>
     )
}

ImageSlider.propTypes = {
     images: PropTypes.any
}

ImageViewer.propTypes = {
     images: PropTypes.any
}