import PropTypes from 'prop-types';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import { FaLocationDot } from "react-icons/fa6";
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
import { SubmitButton } from './Buttons';


const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, action, category, location}) => {
     const [currency, setCurrency] = useState("Rwf");
     return(
          <div className="product-square-container">
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={title} onClick={action} />
               <p className='cat'>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{capitalizeString(title)}</h5>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b><span>{`${currency} ${formatPrice(price)}`}</span> <SubmitButton content={{title:"view", action}} /></b>
               </div>
          </div>
     )
}

export const ServiceSquare = ({image, title, plan, price, action, category, location}) => {
     return(
          <div className="product-square-container">
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={capitalizeString(title)} onClick={action} />
               <p className='cat'>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{title}</h5>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b><span>Rwf {formatPrice(price)}</span> <SubmitButton content={{title:"view", action}} /></b>
               </div>
          </div>
     )
}

export const AdvertRenderer = ({item}) => {
     const navigate = useNavigate();
     const ViewAd = (ad) => {
          navigate(`/ad/${getItemUrl(ad.ad_name, ad.ad_id)}`);
     }
     return(
          item.ad_type === "product" ? <ProductSquare
                         image={item.ad_image}
                         title={item.ad_name}
                         price={item.ad_price}
                         plan={item.plan_name}
                         category={item.category_name}
                         location={item.user_location.location}
                         action={() => ViewAd(item)}
                         />
                         : <ServiceSquare
                              image={item.ad_image} 
                              title={item.ad_name}
                              plan={item.plan_name}
                              category={item.category_name}
                              location={item.user_location.location}
                              price={item.ad_price}
                              action={() => ViewAd(item)}
                         />
     )
}

export const DashAdvert = ({item}) => {
     if (!item) return null;
     return(
          <div className="dash-advert-row">
               
          </div>
     )
}

AdvertRenderer.propTypes = {
     item: PropTypes.object,
}

ServiceSquare.propTypes = {
     image: PropTypes.any,
     title: PropTypes.any,
     price: PropTypes.any,
     description: PropTypes.any,
     plan: PropTypes.any,
     action: PropTypes.any,
     location: PropTypes.any,
     category: PropTypes.any
}

ProductSquare.propTypes = {
     image: PropTypes.any,
     title: PropTypes.any,
     price: PropTypes.any,
     condition: PropTypes.any,
     plan: PropTypes.any,
     action: PropTypes.any,
     location: PropTypes.any,
     category: PropTypes.any
}

export default Advert