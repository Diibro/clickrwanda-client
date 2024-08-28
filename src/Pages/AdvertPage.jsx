import { Link, useLocation } from "react-router-dom"
import {  fetchIds, getItemUrl } from "../utils/urlFunctions";
import { useContext, useEffect, useState } from "react";
import { capitalizeString, formatPrice, getParagraphs } from "../utils/otherFunctions";
import { jsonParserV1, parseString } from "../utils/jsonFunctions";
import { FaEye, FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import Loading from "../components/static/Loading";
import server from "../config/Server";
import UserRating from "../components/dynamic/Rating.component";
import {  formatTimeAgo } from "../utils/dateFunctions";
import { RiAdvertisementFill } from "react-icons/ri";
import {  ImageViewer } from "../components/dynamic/ImageSlider";
// import { getData, saveData } from "../utils/storageFunctions";
import { AdvertReview, RateAdvert } from "../components/dynamic/Reviews.component";
// import { Helmet } from "react-helmet";
import { LeftBanner, RightBanner } from "../components/dynamic/Banners";
import { Banners } from "../config/banners";
import { VscVerifiedFilled } from "react-icons/vsc";
// import AppData from "../Contexts/AppContext";
import { Helmet } from 'react-helmet-async';
import AdvertService from "../services/Advert";
import AdvertsContainer from "../components/containers/AdvertsContainer";
import JobSeekerPageContainer from "../jobSeeker/components/containers/JobSeekerPageContainer";
import { ActionBtn } from "../components/dynamic/Buttons";
import AppData from "../Contexts/AppContext";

const AdvertPage = () => {
     const [ , setData ] = useContext(AppData);
     const location = useLocation();
     const [loading, setLoading] = useState(false);
     const [adViewed, setAdViewed] = useState(null);
     const [sameVendorAds, setSameVendorsAds] = useState([]);
     const [samecategoryAds, setSameCategoryAds] = useState([]);
     const images = jsonParserV1(adViewed?.ad_images || null);
     const [mainImage, setMainImage] = useState(null);
     const [adDescription,setAdDescription] = useState(null);
     const [totalVendorViews, setTotalVendorviews] = useState(0);
     const [totalVendorAds,setTotalVendorAds] = useState(0); 

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: adViewed}));
     }

     const{ v_id:adId} = fetchIds(location);

     const updateSimilarAds = async() => {
          const similarAds = await AdvertService.getSimilarAds({
               sameVendor: {user_id: adViewed.user_id, limit:8,offset:0, ad_id: adViewed.ad_id}, 
               similarCategory:{category_id:adViewed.category_id, limit:8, offset:0, ad_id: adViewed.ad_id}
          })
          if(similarAds){
               const {vendorAds, similarCategory} = similarAds.data;
               setSameVendorsAds(vendorAds);
               setSameCategoryAds(similarCategory);
          }
     }
     
     const updateAdViewed = async () => {
          let check = 0;
          try {

               if(check === 0){
                    setLoading(true);
                    const res = await server.searchAd({ad_id:adId});
                    // saveData("adViewed",res.data, 10);
                    const adData = res.data;
                    const extraData = res.extraData;
                    setTotalVendorAds(extraData.totalAds);
                    setTotalVendorviews(extraData.visits);
                    setAdViewed(adData);
                    setMainImage(adData.ad_image);
                    setAdDescription(parseString(adData.description));
               }
          } catch (error) {
               console.log(`"Advert page error: "${error}`);
          }finally {
               setLoading(false);
               
          }
          
     }
     useEffect(() => {
               window.scrollTo(0,0);
               (async () => await updateAdViewed())();
     }, [location.search]);

     useEffect(() => {
          if(adViewed){
               (async() => await updateSimilarAds())();
          }
     },[adViewed])
  return (
     <>
          <Helmet>
               <meta name="description" content={adViewed?.description?.desc || ''} />
               <meta name="keywords" content={`${adViewed?.ad_name} | Click Rwanda`} />
               <meta property="og:title" content={`${adViewed?.ad_name || 'Advert'} | Click Rwanda`} />
               <meta property="og:description" content={adViewed?.description?.desc || ''} />
               <meta property="og:image" content={adViewed?.ad_image || ''} />
               <meta property="og:url" content={window.location.href} />
               <meta property="og:type" content="website" />
               <title>{`${adViewed?.ad_name || 'Advert'} | Click Rwanda`}</title>
          </Helmet>
          <div className="page-main">
               <div className="side"><LeftBanner items={Banners} /></div>
               <div className="page-content">
                    <div className="advert-page">
                    {
                         !loading ?
                         <>
                         {
                              adViewed?.category_name === "Job Seekers CVs" 
                              ? 
                                   <JobSeekerPageContainer user={adViewed} />
                              :<div className="advert-page-mainAdvert">
                                   <div className="col">
                                        <ImageViewer images={[mainImage, ...images]} />
                                        <div className="advert-page-info">
                                             <h2>{adViewed?.ad_name ? capitalizeString(adViewed?.ad_name) : ""} {adViewed?.verified ? <i className="verified"><VscVerifiedFilled /></i> : null}</h2>
                                             {adViewed && <h3 className="advert-price"> Price: {adViewed?.ad_price <= 0 ? <b>Negotiable</b> : <b>Rwf {adViewed?.ad_price ? formatPrice(adViewed.ad_price) : "-"}</b>} </h3>}
                                             {adViewed?.category_name && 
                                                  <div className="cat">
                                                       <a href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.category_name}</span></a>
                                                       <a href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.sub_name}</span></a> 
                                                  </div>
                                             } 
                                             
                                             <div className="content">
                                                  {adDescription && <h4>Details:</h4>}
                                                  {
                                                       adViewed?.description && adDescription ? 
                                                            Object.entries(adDescription)?.map(([key,value], index) => 
                                                                 key === "desc" ? 
                                                                 <div className="group description-container" key={`ad-desc-view-${key}-${index}`}>
                                                                      <b>Description:</b>
                                                                      {
                                                                           getParagraphs(value.value || value, 50).map((text, count) => <p key={`ad-view-paragraph-${count}`}>{text}</p>)
                                                                      }
                                                                 </div>
                                                                 :
                                                                 <></>
                                                            )
                                                       : null
                                                  }
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col">
                                        <div className="vendor">
                                        {adViewed?.full_name && <div className="vendor-info-header"><h4>Seller Information</h4></div>}
                                             <div className="vendor-col-left">
                                                  {adViewed?.profile_image && <a href={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`}><img src={adViewed?.profile_image} alt={adViewed?.full_name} /></a>}
                                                  {adViewed?.full_name && <h5>{adViewed?.full_name}</h5>}
                                                  <UserRating rating={adViewed?.rating} />
                                             </div>
                                             <div className="vendor-col-right">
                                                  {adViewed?.user_email && 
                                                       <div className="contact" >
                                                            <p className="vendor-date">Joined  {formatTimeAgo(adViewed?.reg_date)}</p>
                                                            <div className="row">
                                                                 <p className="vendor-views"><a href={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`} className="vendor-views vendor-ads"><i><RiAdvertisementFill /></i>  {formatPrice(totalVendorAds)} Ads</a></p>
                                                                 <p className="vendor-views"><i><FaEye /></i>  {formatPrice(totalVendorViews)} views</p>
                                                            </div>
                                                            {
                                                                 !adViewed.commission ? 
                                                                      <>
                                                                           <p className="vendor-views"><Link to={`tel:${adViewed?.contact}`}><i><FaPhone/></i>{adViewed?.user_phone}</Link></p>
                                                                           <p className="vendor-views"><Link to={`mailto:${adViewed?.user_email}`}><i><MdMail /></i>{adViewed?.user_email}</Link></p>
                                                                      </>
                                                                 :null
                                                            }
                                                            <p className="vendor-views"><a href={`https://www.google.com/maps/place/${adViewed.user_location.location}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {adViewed?.user_location.location}</a></p>
                                                            <ActionBtn title="Contact Seller" action={showContactSeller} />
                                                       </div>
                                                  }
                                             </div>
                                             
                                        </div>
                                        <div className="reviews">
                                             {adViewed ? <RateAdvert item={adViewed} /> : null}
                                        </div>
                                        <div className="reviews">
                                             {adViewed && <AdvertReview item={adViewed} />} 
                                        </div>
                                        <div className="safety-tips">
                                             <h4>Safety Tips</h4>
                                             <div className="tips">
                                                  <p><span>1</span> Meet in a public space to see the item and exchange the money.</p>
                                                  <p><span>2</span> Never send the item before receiving the money.</p>
                                                  <p><span>3</span> Never send or wire the money to sellers or buyers.</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         }
                         
                         <div className="advert-page-others">
                              {sameVendorAds && sameVendorAds[0] ? 
                                   <>
                                        <h3>More Ads from {adViewed?.username} shop <Link to={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`}>View All</Link></h3>
                                        <AdvertsContainer adverts={sameVendorAds} />
                                   </>
                              : null}
                              
                              {samecategoryAds && samecategoryAds[0] ? 
                                   <>
                                        <h3>More {adViewed?.category_name} Ads <Link to={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}>View All</Link></h3>
                                        <AdvertsContainer adverts={samecategoryAds} />
                                   </>
                              :null}
                         </div>
                         </>
                         : <Loading/>
                    }
                    
                    </div>
               </div>
               <div className="side"><RightBanner items={Banners} /></div>
          </div>
    </>
  )
}

export default AdvertPage