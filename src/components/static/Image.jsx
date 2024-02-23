
import PropTypes from "prop-types";

export const CImage = ({image}) => {
     return(
          <div className="c-image">
               <img src={image.src} width={image.width || "100%"} height={image.height || "100%"} alt={image.alt} loading="lazy" onClick={image.action} />
          </div>
     )
}

CImage.propTypes = {
     image: PropTypes.any
}