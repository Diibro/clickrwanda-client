import PropTypes from 'prop-types';
import {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import { FaLocationDot } from "react-icons/fa6";
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
// import { SubmitButton } from './Buttons';
import {  FaLongArrowAltRight } from "react-icons/fa";
import AppData from '../../Contexts/AppContext';
import { formatTimeAgo } from '../../utils/dateFunctions';
// import { LoadingImage } from './LoadinComponents';
import { CImage } from '../static/Image';
import { VscVerifiedFilled } from "react-icons/vsc";


export const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const ProductSquare = ({image, title, price, plan, action, category,categoryLink, location, contact, views, link, adDate, discount, verified}) => {
     const currency= "Rwf";
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
          <div className={`product-square-container ${plan === 'VIP' ? "premium" : plan === "VVIP" ? "enterprise" : plan}-ad`}>
               <span className={plan === "urgent" ? "pay-plan urgent" : plan === "VIP" ? "pay-plan premium" : plan === "basic" ? "pay-plan basic" : plan === "VVIP" ? "pay-plan enterprise" : "free-plan"}>{plan === 'VVIP' || plan === 'VIP' ? plan : capitalizeString(plan) }</span>
               {discount ? <span className='advert-discount'>- {discount}%</span> : null}
               {/* <i className='product-share-icon' onClick={() => showButtons(link,image, title)}><FaShareAlt/></i> */}
               <div className="ad-image">
               <div className='background-img' style={{backgroundImage:`url(${image})`}} ></div>
                    {/* <img src={image} alt={title} onClick={action} loading='lazy' /> */}
                    <CImage image={{src:image, alt:title, action}}  />
               </div>
               <p className='cat' onClick={() => navigate(categoryLink)}>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{capitalizeString(title)}</h5>
                    {verified ? <p className='verified-ad-text'>Verified <i><VscVerifiedFilled /></i></p> : <p className='unverified-ad-text'>Unverified</p>}
                    <a className='contact-no' href={`tel:${contact}`}>{contact}</a>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b>
                         <i>{formatTimeAgo(adDate)}</i>
                         {/* <SubmitButton content={{title:`${views} view${views > 1 ? 's' : '' }`, action, size:'small-text'}} /> */}
                    </b>
                    <b><span>{`${currency} ${formatPrice(price)}`}</span> </b>
               </div>
          </div>
     )
}

export const ServiceSquare = ({image, title, plan, price, action, category,categoryLink, location, contact, views, link, adDate, discount, verified}) => {
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
          <div className={`product-square-container ${plan === "VIP" ? 'premium' : plan === "VVIP" ? 'enterprise' : plan}-ad`}>
               <span className={plan === "urgent" ? "pay-plan urgent" : plan === "VIP" ? "pay-plan premium" : plan === "basic" ? "pay-plan basic" : plan === "VVIP" ? "pay-plan enterprise" : "free-plan"}>{plan === 'VVIP' || plan === 'VIP' ? plan : capitalizeString(plan) }</span>
               {discount ? <span className='advert-discount'>{discount}% off</span> : null}
               {/* <i className='product-share-icon' onClick={() => showButtons(link,image, title)}><FaShareAlt/></i> */}
               <div className="ad-image" >
                    <div className='background-img' style={{backgroundImage:`url(${image})`}} ></div>
                    {/* {image ? <img src={image} alt={capitalizeString(title)} onClick={action} loading='lazy'/> : <LoadingImage />} */}
                    <CImage image={{src:image, alt:title, action}}  />
               </div>
               <p className='cat' onClick={() => navigate(categoryLink)}>{category}</p>
               <div className='content'>
                    <h5 onClick={action}>{title}</h5>
                    {verified ? <p className='verified-ad-text'>Verified <i><VscVerifiedFilled /></i></p> : <p className='unverified-ad-text'>Unverified</p>}
                    <a className='contact-no' href={`tel:${contact}`}>{contact}</a>
                    <a href={`https://www.google.com/maps/place/${capitalizeString(location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {location}</a>
                    <b>
                         <i>{formatTimeAgo(adDate)}</i> 
                         {/* <SubmitButton content={{title:`${views} view${views > 1 ? 's' : '' }`, action, size:'small-text'}} /> */}
                    </b>
                    <b><span>Rwf {formatPrice(price)}</span></b>
               </div>
          </div>
     )
}

 const AdvertRenderer = ({item}) => {
     const navigate = useNavigate();
     const ViewAd = (ad) => {
          navigate(`/ad/${getItemUrl(item.ad_name, ad.ad_id)}`);
     }
     return(
          item.ad_type === "product" ? <ProductSquare
                         image={item.ad_image}
                         title={item.ad_name}
                         price={item.ad_price}
                         plan={item.plan_name}
                         // category={item.category_name}
                         category={item.sub_name}
                         contact={item.contact || item.user_phone}
                         location={item.user_location.location}
                         views={item.ad_views}
                         adDate={item.ad_date}
                         discount={item.ad_discount}
                         verified={item?.verified}
                         categoryLink={`/category/${getItemUrl(item.category_name, item.category_id)}`}
                         link={`https://clickrwanda.com/ad/${getItemUrl("", item.ad_id)}`}
                         action={() => ViewAd(item)}
                         />
                         : <ServiceSquare
                              image={item.ad_image} 
                              title={item.ad_name}
                              plan={item.plan_name}
                              category={item.category_name}
                              contact={item.contact || item.user_phone}
                              location={item?.user_location?.location}
                              price={item.ad_price}
                              views={item.ad_views}
                              adDate={item.ad_date}
                              discount={item.ad_discount}
                              verified={item?.verified}
                              categoryLink={`/category/${getItemUrl(item.category_name, item.category_id)}`}
                              link={`https://clickrwanda.com/ad/${getItemUrl("", item.ad_id)}`}
                              action={() => ViewAd(item)}
                         />
     )
}

export const AdvertImage = ({images}) => {
     const others = images.more ? images.more : null;
     const navigate = useNavigate();
     const showAd = () => {
          return navigate(`/ad/${getItemUrl("advert", images.id)}`)
     }
     return(
          <>
               <img src={images.main} alt={images.name} loading='lazy' className='search-page-image' onClick={showAd} />
               {others && others.map((image, index) =><img key={index} src={image} alt={images.name} loading='lazy' className='search-page-image' onClick={showAd} /> ) }
          </>
     )
}

export const DashAdvert = ({item}) => {
     if (!item) return null;
     return(
          <div className="dash-advert-row">
               
          </div>
     )
}

export const AdvertRow = ({item}) => {
     return(
          <div className="advert-row">
               <p className='ad-plan'>{item.plan_name !== "freemium" ? item.plan_name : null}</p>
               <div className="row">
                    <img src={item.ad_image} alt={item.ad_name} loading='lazy' />
                    <div className='col'>
                         <h3>{item.ad_name}</h3>
                         <p className='website'>
                              <a href={item.website} target='_blank' rel="noreferrer" >{item.website}</a>
                         </p>
                    </div>
               </div>
               <p className='desc'>
                    <span>{item?.description?.desc?.value || item?.description?.desc }</span>
                    <span><a href={item.website} target='_blank' rel="noreferrer" > Visit Website <i><FaLongArrowAltRight /></i> </a></span>
                    
               </p>
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
     discount: PropTypes.any,
     verified: PropTypes.any
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
     discount: PropTypes.any,
     verified: PropTypes.any
}

AdvertRow.propTypes = {
     item: PropTypes.any
}

AdvertImage.propTypes = {
     images: PropTypes.any
}

DashAdvert.propTypes ={
     item: PropTypes.any
}

export default AdvertRenderer;