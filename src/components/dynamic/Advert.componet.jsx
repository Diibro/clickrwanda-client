import PropTypes from 'prop-types';
import { useState } from 'react';


const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, condition}) => {
     const [currency, setCurrency] = useState("Rwf");
     return(
          <div className="product-square-container">
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={title} />
               <h5>{title}</h5>
               <div className='content'>
                    <p>{condition}</p>
                    <b>{`${currency} ${price}`}</b>
               </div>
          </div>
     )
}

export const ServiceSquare = ({image, title, plan, description}) => {
     return(
          <div className="service-square-container">
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={title} />
               <h5>{title}</h5>
               <p>{description}</p>
          </div>
     )
}

ServiceSquare.propTypes = {
     image: PropTypes.any,
     title: PropTypes.any,
     price: PropTypes.any,
     description: PropTypes.any,
     plan: PropTypes.any
}

ProductSquare.propTypes = {
     image: PropTypes.any,
     title: PropTypes.any,
     price: PropTypes.any,
     condition: PropTypes.any,
     plan: PropTypes.any
}

export default Advert