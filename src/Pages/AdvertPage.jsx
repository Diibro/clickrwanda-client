import { Link, useLocation } from "react-router-dom"
import {  getItemUrl, getItemUrlId } from "../utils/urlFunctions";
import {  useEffect, useState } from "react";
import { capitalizeString, formatPrice } from "../utils/otherFunctions";
import { jsonParserV1 } from "../utils/jsonFunctions";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import Loading from "../components/static/Loading";
import server from "../config/Server";
import { SimilarAds } from "../components/dynamic/Adverts.component";
import UserRating from "../components/dynamic/Rating.component";
import {  formatTimeAgo } from "../utils/dateFunctions";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdPageview } from "react-icons/md";
import { ImageSlider } from "../components/dynamic/ImageSlider";
import { getData, saveData } from "../utils/storageFunctions";
import { AdvertReview, RateAdvert } from "../components/dynamic/Reviews.component";


const AdvertPage = () => {
     const location = useLocation();
     const [loading, setLoading] = useState(false);
     const [adViewed, setAdViewed] = useState(null);
     const [otherAds, setOtherAds] = useState(null);
     const adId = getItemUrlId(location.search);
     const images = jsonParserV1(adViewed?.ad_images || null);
     const [mainImage, setMainImage] = useState(null);

     
     const updateAdViewed = async () => {
          let check = 0;
          try {
               let adDatas =  getData('adViewed');
               if(adDatas){
                    try {
                         const ad = adDatas.adData;
                         if(ad && adId === ad.ad_id){
                              const {sameCategory, sameSubCategory} = adDatas;
                              setAdViewed(ad);
                              setOtherAds(sameSubCategory || sameCategory || null);
                              setMainImage(ad.ad_image);
                              check = 1;
                         }
                    } catch (error) {
                         check = 0;
                    }
                    
               }

               if(check === 0){
                    setLoading(true);
                    const res = await server.searchAd({ad_id:adId});
                    saveData("adViewed",res.data, 5);
                    const {adData, sameCategory, sameSubCategory} = res.data;
                    setAdViewed(adData);
                    setOtherAds(sameSubCategory || sameCategory || null);
                    setMainImage(adData.ad_image);
               }
          } catch (error) {
               console.log(error);
          }finally {
               setLoading(false);
          }
          
     }
     useEffect(() => {
           updateAdViewed();
           if(!mainImage && adViewed){
               setMainImage(adViewed.ad_image);
           }
     }, [location.search]);
  return (
    <div className="advert-page">
     {
          !loading ?
          <>
          <div className="advert-page-mainAdvert">
               <div className="col">
                    <ImageSlider images={[mainImage, ...images]} />
                    <div className="advert-page-info">
                         <h2>{adViewed?.ad_name ? capitalizeString(adViewed?.ad_name) : ""}</h2>
                         {adViewed?.ad_price && <h3 className="advert-price"> Price: <b>Rwf {adViewed?.ad_price ? formatPrice(adViewed.ad_price) : "-"}</b> </h3>}
                         {adViewed?.category_name && 
                              <p className="cat">
                                   <a href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.category_name}</span></a>
                                   <a href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.sub_name}</span></a> 
                              </p>
                         } 
                         
                         <div className="content">
                              {adViewed?.description && <h4>Description:</h4>}
                              <p>
                                   {adViewed?.description?.desc}
                              </p>
                         </div>
                    </div>
               </div>
               <div className="col">
                    <div className="vendor">
                    {adViewed?.full_name && <h4>Seller Information:</h4>}
                         <div className="vendor-col-left">
                              {adViewed?.profile_image && <a href={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`}><img src={adViewed?.profile_image} alt={adViewed?.full_name} /></a>}
                              {adViewed?.full_name && <h5>{adViewed?.full_name}</h5>}
                              <UserRating rating={adViewed?.rating} />
                         </div>
                         <div className="vendor-col-right">
                              {adViewed?.user_email && 
                                   <div className="contact" >
                                        <p className="vendor-date">Joined:  {formatTimeAgo(adViewed?.reg_date)}</p>
                                        <p className="vendor-views"><i><MdPageview /></i>  {adViewed?.totalViews} Total views</p>
                                        <a href={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`} className="vendor-views"><i><RiAdvertisementFill /></i>  {adViewed?.total_ads} Total Ads</a>
                                        <p><Link to={`mailto:${adViewed?.user_email}`}><i><MdMail /></i>{adViewed?.user_email}</Link></p>
                                        <p><Link to={`tel:${adViewed?.user_phone}`}><i><FaPhone/></i>{adViewed?.user_phone}</Link></p>
                                        <p><a href={`https://www.google.com/maps/place/${adViewed.user_location.location}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {adViewed?.user_location.location}</a></p>
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
          <div className="advert-page-others">
               <h3>Similar ads</h3>
               {otherAds ? <SimilarAds limit={10} adverts={otherAds} /> : <>no similarads</>}
          </div>
          </>
          : <Loading/>
     }
     
    </div>
  )
}

export default AdvertPage