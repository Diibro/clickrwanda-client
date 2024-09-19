import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import { FaLocationDot } from "react-icons/fa6";
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
// import { SubmitButton } from './Buttons';
import {  FaLongArrowAltRight } from "react-icons/fa";
import { formatTimeAgo } from '../../utils/dateFunctions';
// import { LoadingImage } from './LoadinComponents';
import { AnyImage, CImage, MyImage } from '../static/Image';
import { VscVerifiedFilled } from "react-icons/vsc";
import { useContext } from 'react';
import AppData from '../../Contexts/AppContext';
import JobCard from '../cards/JobCard';


export const Advert = () => {
  return (
    <div>Advert</div>
  )
}

export const AdvertCardVertical = ({ad}) => {
     const [,setData] = useContext(AppData);
     const currency= "Rwf";
     const navigate = useNavigate();
     // const categoryLink = `/category/${getItemUrl(ad.category_name, ad.category_id)}`;
     const ViewAd = () => {
          navigate(`/ad/${getItemUrl(ad.ad_name, ad.ad_id)}`);
     }

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: ad}))
     }

     return(
          <div className={`product-square-container ${ad.plan_name === 'VIP' ? "premium" : ad.plan_name === "VVIP" ? "enterprise" : ad.plan_name}-ad ${ad.commission ? 'deal-ad' : ''}`}>
               <span className={ad.plan_name === "urgent" ? "pay-plan urgent" : ad.plan_name === "VIP" ? "pay-plan premium" : ad.plan_name === "basic" ? "pay-plan basic" : ad.plan_name === "VVIP" ? "pay-plan enterprise" : "free-plan"}>{ad.plan_name === 'VVIP' || ad.plan_name === 'VIP' ? ad.plan_name : capitalizeString(ad.plan_name) }</span>
               {ad.commission ? <span className='pay-plan deal'>Deal</span> : null}
               {ad.ad_discount ? <span className='advert-discount'>- {ad.ad_discount}%</span> : null}
               <div className="ad-image">
                    <div className='background-img' style={{backgroundImage:`url(${ad.ad_image})`}} ></div>
                    {/* <img src={image} alt={title} onClick={action} loading='lazy' /> */}
                    {/* <CImage image={{src:ad.ad_image, alt:ad.ad_name, action:() => ViewAd()}}  /> */}
                    <MyImage image={ad.ad_image} action={ViewAd} />
               </div>
               <div className='content'>
                    <h5 onClick={ViewAd}><span>{capitalizeString(ad.ad_name)}</span>{ad.verified ? <i className='verified-ad-text'><VscVerifiedFilled /></i> : null}</h5>
                    <div className="row">
                         <b>
                              <i>{formatTimeAgo(ad.ad_date)},</i>
                              <a href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer">{ad.user_location?.location}</a>
                         </b>
                         
                    </div>
                    <div className="row">
                         {
                              ad.category_name === 'Job Seekers CVs' || +ad.ad_price <= 0  ? <span className='ad-price'>Negotiable</span> :<span className='ad-price' >{`${currency} ${formatPrice(ad.ad_price)}`}</span> 
                         }
                         
                    </div>
                    <div className="row">
                         <button className='view-btn' onClick={ViewAd}>View</button>
                         <button className='contact-btn' onClick={showContactSeller}>Contact</button>
                    </div>
               </div>
          </div>
     )
}

export const ProductSquare = ({image, title, price, plan, action, category,categoryLink, location, contact, adDate, discount, verified}) => {
     const currency= "Rwf";
     const navigate = useNavigate();
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
                    <h5 onClick={action}>{capitalizeString(title)}{verified ? <p className='verified-ad-text'><i><VscVerifiedFilled /></i></p> : null}</h5>
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

export const ServiceSquare = ({image, title, plan, price, action, category,categoryLink, location, contact, adDate, discount, verified}) => {
     const navigate = useNavigate();
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
     
     return(
          item.category_id === "b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7" ?
               <JobCard ad={item} />
          :<AdvertCardVertical ad={item} />
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
               {/* <img src={images.main} alt={images.name} loading='lazy' className='search-page-image' onClick={showAd} /> */}
               <AnyImage image={{src: images.main, alt: images.name, action: showAd}} />
               {others && others.map((image, index) =>
                    // <img key={index} src={image} alt={images.name} loading='lazy' className='search-page-image' onClick={showAd} /> 
                    <AnyImage image={{src:image,alt: images.name, action: showAd}} key={index}  />
               ) 
               }
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

AdvertCardVertical.propTypes = {
     ad: PropTypes.object
}

export default AdvertRenderer;