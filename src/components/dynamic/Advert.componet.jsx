import PropTypes from 'prop-types';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';


const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, action}) => {
     const [currency, setCurrency] = useState("Rwf");
     return(
          <div className="product-square-container" onClick={action}>
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={title} />
               <div className='content'>
                    <h5>{title}</h5>
                    <b>{`${currency} ${price}`}</b>
               </div>
          </div>
     )
}

export const ServiceSquare = ({image, title, plan, price, action}) => {
     return(
          <div className="product-square-container" onClick={action}>
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={title} />
               <div className='content'>
                    <h5>{title}</h5>
                    <b>Rwf {price}</b>
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
                         action={() => ViewAd(item)}
                         />
                         : <ServiceSquare
                              image={item.ad_image} 
                              title={item.ad_name}
                              plan={item.plan_name}
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
     action: PropTypes.any
}

ProductSquare.propTypes = {
     image: PropTypes.any,
     title: PropTypes.any,
     price: PropTypes.any,
     condition: PropTypes.any,
     plan: PropTypes.any,
     action: PropTypes.any
}

export default Advert