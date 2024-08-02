
import PropTypes from "prop-types";
import { ImageNotFound } from "../../assets/assets";
import { useEffect, useState } from "react";

export const CImage = ({image}) => {
     const [imageUrl, setImageUrl] = useState(ImageNotFound);
     const imageStyle = {
          // width: image.width || "100%",
          // height: image.height || "100%",
          maxWidth: image.maxWidth || "100%",  // Add maxWidth property
          maxHeight: image.maxHeight || "100%",
          zIndex: "1"
     }
     const containerStyles= {
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
     }

     useEffect(() => {
          if(image.src){
               const img = new Image();
               img.src = image.src;
               img.onload = () => setImageUrl(image.src);
               img.onerror = () => setImageUrl(ImageNotFound);
          }
     }, [])
     return(
          <div className="c-image" style={containerStyles}>
               {/* <img src={image.src} width={image.width || "100%"} height={image.height || "100%"} alt={image.alt} loading="lazy" onClick={image.action} /> */}
               <img src={imageUrl}  alt={image.alt} loading="lazy" style={imageStyle}  onClick={image.action} />
          </div>
     )
}

export const AnyImage = ({image, ...props}) => {
     const [imageUrl, setImageUrl] = useState(ImageNotFound);
     const imageStyle = {
          maxWidth: "auto",  
          maxHeight: "auto",
          zIndex: "1"
     }
     

     useEffect(() => {
          if(image.src){
               const img = new Image();
               img.src = image.src;
               img.onload = () => setImageUrl(image.src);
               img.onerror = () => setImageUrl(ImageNotFound);
          }
     }, [])
     return(
          <img src={imageUrl}  alt={image.alt} loading="lazy" style={imageStyle}  onClick={image.action} {...props}/>
     )
}

CImage.propTypes = {
     image: PropTypes.any
}


AnyImage.propTypes = {
     image: PropTypes.any
}