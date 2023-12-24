import PropTypes from 'prop-types';
import {  useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import { FaLocationDot } from "react-icons/fa6";
import { capitalizeString, formatPriceV1 } from '../../utils/otherFunctions';
import { SubmitButton } from './Buttons';
import { FaShareAlt } from "react-icons/fa";
import { ShareButtons } from './Containers';


const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, action, category, location, contact, views, link}) => {
     const [currency, setCurrency] = useState("Rwf");
     const shareRef = useRef(null);
     const showButtons = () =>{
          if(!shareRef.current) return;
          else {
               if(shareRef.current.style.display === 'none')
               {
                    return shareRef.current.style.display='flex'
               }else{
                    return shareRef.current.style.display = 'none'
               }
          }
     }
     return(
          <div className="product-square-container">
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <div className='share-buttons-container' ref={shareRef}>
                    <ShareButtons image={image} url={link} name={title} />
               </div>
               <i className='product-share-icon' onClick={showButtons}><FaShareAlt/></i>
               <img className='ad-image' src={image} alt={title} onClick={action} />
               <p className='cat'>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{capitalizeString(title)}</h5>
                    <a className='contact-no' href={`tel:${contact}`}>{contact}</a>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b><span>{`${currency} ${formatPriceV1(price)}`}</span> <SubmitButton content={{title:`${views} view${views > 1 ? 's' : '' }`, action, size:'small-text'}} /></b>
               </div>
          </div>
     )
}

export const ServiceSquare = ({image, title, plan, price, action, category, location, contact, views, link}) => {
     const shareRef = useRef(null);
     const showButtons = () =>{
          if(!shareRef.current) return;
          else {
               if(shareRef.current.style.display === 'none')
               {
                    return shareRef.current.style.display='flex'
               }else{
                    return shareRef.current.style.display = 'none'
               }
          }
     }
     return(
          <div className="product-square-container">
               <i className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</i>
               <div className='share-buttons-container' ref={shareRef}>
                    <ShareButtons image={image} url={link} name={title} />
               </div>
               <i className='product-share-icon' onClick={showButtons}><FaShareAlt/></i>
               <img className='ad-image' src={image} alt={capitalizeString(title)} onClick={action} />
               <p className='cat'>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{title}</h5>
                    <a className='contact-no' href={`tel:${contact}`}>{contact}</a>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b><span>Rwf {formatPriceV1(price)}</span> <SubmitButton content={{title:`${views} view${views > 1 ? 's' : '' }`, action, size:'small-text'}} /></b>
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
                         contact={item.contact || item.user_phone}
                         location={item.user_location.location}
                         views={item.ad_views}
                         link={`https://clickrwanda.com/ad/${getItemUrl(item.ad_name, item.ad_id)}`}
                         action={() => ViewAd(item)}
                         />
                         : <ServiceSquare
                              image={item.ad_image} 
                              title={item.ad_name}
                              plan={item.plan_name}
                              category={item.category_name}
                              contact={item.contact || item.user_phone}
                              location={item.user_location.location}
                              price={item.ad_price}
                              views={item.ad_views}
                              link={`https://clickrwanda.com/ad/${getItemUrl(item.ad_name, item.ad_id)}`}
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
     category: PropTypes.any,
     contact: PropTypes.any,
     views: PropTypes.any,
     link: PropTypes.any,
}

ProductSquare.propTypes = {
     image: PropTypes.any,
     title: PropTypes.any,
     price: PropTypes.any,
     condition: PropTypes.any,
     plan: PropTypes.any,
     action: PropTypes.any,
     location: PropTypes.any,
     category: PropTypes.any,
     contact: PropTypes.any,
     views: PropTypes.any,
     link: PropTypes.any,
}

export default Advert