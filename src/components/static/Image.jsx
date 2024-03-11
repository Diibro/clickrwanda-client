
import PropTypes from "prop-types";

export const CImage = ({image}) => {
     const imageStyle = {
          // width: image.width || "100%",
          // height: image.height || "100%",
          maxWidth: image.maxWidth || "100%",  // Add maxWidth property
          maxHeight: image.maxHeight || "100%",
          borderBottom: "1px solid gray",
          zIndex: "1"
     }
     const containerStyles= {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
     }
     return(
          <div className="c-image" style={containerStyles}>
               {/* <img src={image.src} width={image.width || "100%"} height={image.height || "100%"} alt={image.alt} loading="lazy" onClick={image.action} /> */}
               <img src={image.src}  alt={image.alt} loading="lazy" style={imageStyle}  onClick={image.action} />
          </div>
     )
}

CImage.propTypes = {
     image: PropTypes.any
}