import PropTypes from 'prop-types';
import {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import { FaLocationDot } from "react-icons/fa6";
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
import { SubmitButton } from './Buttons';
import { FaShareAlt } from "react-icons/fa";
import AppData from '../../Contexts/AppContext';
import { formatTimeAgo } from '../../utils/dateFunctions';


const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, action, category,categoryLink, location, contact, views, link, adDate, discount}) => {
     const [currency, setCurrency] = useState("Rwf");
     const [,setData] = useContext(AppData);
     const navigate = useNavigate();
     const showButtons = (url, image, name) =>{
          console.log(url, name, image);
          setData(prev => ({
               ...prev,
               shareAlert: {
                    on: true,
                    content: {url, image, name}
               }
          }))
     }
     return(
          <div className="product-square-container">
               <span className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</span>
               {discount ? <span className='advert-discount'>- {discount}%</span> : null}
               <i className='product-share-icon' onClick={() => showButtons(link,image, title)}><FaShareAlt/></i>
               <img className='ad-image' src={image} alt={title} onClick={action} />
               <p className='cat' onClick={() => navigate(categoryLink)}>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{capitalizeString(title)}</h5>
                    <a className='contact-no' href={`tel:${contact}`}>{contact}</a>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b><i>{formatTimeAgo(adDate)}</i><SubmitButton content={{title:`${views} view${views > 1 ? 's' : '' }`, action, size:'small-text'}} /></b>
                    <b><span>{`${currency} ${formatPrice(price)}`}</span> </b>
               </div>
          </div>
     )
}

export const ServiceSquare = ({image, title, plan, price, action, category,categoryLink, location, contact, views, link, adDate, discount}) => {
     const [,setData] = useContext(AppData);
     const navigate = useNavigate();
     const showButtons = (url, image, name) =>{
          setData(prev => ({
               ...prev,
               shareAlert: {
                    on: true,
                    content: {url, image, name}
               }
          }))
     }
     return(
          <div className="product-square-container">
               <span className={plan === "urgent" ? "pay-plan urgent" : plan === "premium" ? "pay-plan premium" : plan === "featured" ? "pay-plan featured" : "free-plan"}>{plan}</span>
               {discount ? <span className='advert-discount'>{discount}% off</span> : null}
               <i className='product-share-icon' onClick={() => showButtons(link,image, title)}><FaShareAlt/></i>
               <img className='ad-image' src={image} alt={capitalizeString(title)} onClick={action} />
               <p className='cat' onClick={() => navigate(categoryLink)}>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{title}</h5>
                    <a className='contact-no' href={`tel:${contact}`}>{contact}</a>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b><i>{formatTimeAgo(adDate)}</i> <SubmitButton content={{title:`${views} view${views > 1 ? 's' : '' }`, action, size:'small-text'}} /></b>
                    <b><span>Rwf {formatPrice(price)}</span></b>
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
                         adDate={item.ad_date}
                         discount={item.ad_discount}
                         categoryLink={`/category/${getItemUrl(item.category_name, item.category_id)}`}
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
                              adDate={item.ad_date}
                              discount={item.ad_discount}
                              categoryLink={`/category/${getItemUrl(item.category_name, item.category_id)}`}
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
     adDate: PropTypes.any,
     categoryLink: PropTypes.any,
     discount: PropTypes.any
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
     adDate: PropTypes.any,
     categoryLink: PropTypes.any,
     discount: PropTypes.any
}

export default Advert