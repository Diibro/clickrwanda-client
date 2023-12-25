import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import PropTypes from 'prop-types';

export const ImageSlider = ({images}) => {
     const [inView, setInView] = useState(images[0]);
     const [imageCount, setImageCount] = useState(0);

     const changeImage = count => {
          setImageCount(prev => prev + count);
     }

     useEffect(() => {
          setInView(images[imageCount]);
     }, [imageCount, images]);

     return(
          <div className="image-slider">
               <i className="left-arrow" onClick={() => changeImage(-1)} style={{display: imageCount === 0 ? 'none' : 'flex'}}><FaArrowLeft /></i>
               <img src={inView} alt="advert images" />
               <i className="right-arrow" onClick={() => changeImage(1)} style={{display: imageCount === images.length - 1 ? 'none' : 'flex'}}><FaArrowRight /></i>
          </div>
     )
}

ImageSlider.propTypes = {
     images: PropTypes.any
}