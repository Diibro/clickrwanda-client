import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import FilterContext from '../../Contexts/FilterContext';
import { jsonParserV1, jsonParserV2 } from '../../utils/jsonFunctions';


const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, condition, action}) => {
     const [currency, setCurrency] = useState("Rwf");
     return(
          <div className="product-square-container" onClick={action}>
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

export const ServiceSquare = ({image, title, plan, description, action}) => {
     return(
          <div className="service-square-container" onClick={action}>
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <img className='ad-image' src={image} alt={title} />
               <h5>{title}</h5>

               <p>{description}</p>
          </div>
     )
}

export const AdvertRenderer = ({item}) => {
     const [,setFilter] = useContext(FilterContext);
     const ViewAd = (ad) => {
          setFilter((prev) => ({...prev, advertView: ad}));
     }
     return(
          item.ad_type === "product" ? <ProductSquare
                         image={item.ad_image}
                         title={item.ad_name}
                         price={item.ad_price}
                         plan={item.plan_name}
                         condition="Best condition"
                         action={() => ViewAd(item)}
                         />
                         : <ServiceSquare
                              image={item.ad_image} 
                              title={item.ad_name}
                              plan={item.plan_name}
                              description={item.description.desc || "Service "}
                              action={() => ViewAd(item)}
                         />
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