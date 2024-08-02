
import PropTypes from "prop-types";
import { ImageNotFound } from "../../assets/assets";
import {Img} from 'react-image';


export const CImage = ({image}) => {

     const imageStyle = {
          maxWidth: image.maxWidth || "100%", 
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
     return(
          <div className="c-image" style={containerStyles}>
               <Img
                    src={[image.src,ImageNotFound]}
                    alt={image.alt}
                    style={imageStyle}
                    onClick={image.action}
               />
          </div>
     )
}

export const AnyImage = ({image, ...props}) => {
     const imageStyle = {
          maxWidth: "auto",  
          maxHeight: "auto",
          zIndex: "1"
     }

     return(
          <Img src={[image.src,ImageNotFound]}  alt={image.alt} style={imageStyle}  onClick={image.action} {...props}/>
     )
}

CImage.propTypes = {
     image: PropTypes.any
}


AnyImage.propTypes = {
     image: PropTypes.any
}