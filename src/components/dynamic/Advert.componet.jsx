import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import { FaLocationDot } from "react-icons/fa6";
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
// import { SubmitButton } from './Buttons';
import { formatTimeAgo } from '../../utils/dateFunctions';
// import { LoadingImage } from './LoadinComponents';
import { AnyImage, CImage, MyImage } from '../static/Image';
import { VscVerifiedFilled } from "react-icons/vsc";
import { useContext } from 'react';
import AppData from '../../Contexts/AppContext';
import JobCard from '../cards/JobCard';
import JobSeekerCard from '../cards/JobSeekerCard';


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
               {ad.commission ? 
                    <span className='pay-plan deal'>Deal</span> : 
                    <span className={ad.plan_name === "urgent" ? "pay-plan urgent" : ad.plan_name === "VIP" ? "pay-plan premium" : ad.plan_name === "basic" ? "pay-plan basic" : ad.plan_name === "VVIP" ? "pay-plan enterprise" : "free-plan"}>{ad.plan_name === 'VVIP' || ad.plan_name === 'VIP' ? ad.plan_name : capitalizeString(ad.plan_name) }</span>
               }
               {/* {ad.ad_discount && ad.ad_discount > 0 && ad.ad_discount <= 100 && +ad.ad_price > 0 ? <span className='advert-discount'>- {ad.ad_discount}%</span> : null} */}
               <div className="ad-image">
                    <div className='background-img' style={{backgroundImage:`url(${ad.ad_image})`}} ></div>
                    <MyImage image={ad.ad_image} action={ViewAd} />
               </div>
               <div className='content'>
                    <h5 onClick={ViewAd}><span>{capitalizeString(ad.ad_name)}</span></h5>
                    {ad.verified ? <p className='verified-ad-text-paragraph' >Verified<i className='verified-ad-text'><VscVerifiedFilled /></i></p> : null}
                    <div className="row">
                         <b>
                              <i>{formatTimeAgo(ad.ad_date)},</i>
                              <a href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer">{ad.user_location?.location}</a>
                         </b>
                         
                    </div>
                    <div className="row">
                         {
                              +ad.ad_price <= 0  ? <span className='ad-price'>Negotiable</span> :<span className='ad-price' >
                                   {
                                        ad.ad_discount && ad.ad_discount <= 100 && ad.ad_discount > 0 ?
                                        <>{`${currency} ${formatPrice(+ad.ad_price - ((+ad.ad_price * ad.ad_discount)/100))}`} <span className="original-price">{`${currency} ${formatPrice(ad.ad_price)}`}</span> </>:
                                        <>{`${currency} ${formatPrice(ad.ad_price)}`} </>
                                   }
                                   
                                   </span> 
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
          :
          item.category_name === 'Job Seekers CVs'? 
          <JobSeekerCard ad={item} />:
          <AdvertCardVertical ad={item} />
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
          <div className="w-full flex flex-col p-[5px] shadow-sm shadow-gray-300 rounded-[5px] bg-white ">
               <div className="w-full flex items-start justify-between gap-[5px]">
                    <img src={item.ad_image} alt={item.ad_name} loading='lazy' className='w-[7.5%] min-w-[50px]' />
                    <div className='w-[90%]'>
                         <h3 className='text-[0.95rem] font-extrabold text-main-blue-700'>{item.ad_name}</h3>
                         <p className='text-[0.8rem] text-gray-700'>
                              <a href={item.website} target='_blank' rel="noreferrer" >{item.website}</a>
                         </p>
                    </div>
               </div>
               <p className='w-full text-[0.85rem] text-gray-700 text-justify line-clamp-3'>
                    {item?.description?.desc?.value || item?.description?.desc }
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