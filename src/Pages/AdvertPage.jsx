import { Link, useLocation } from "react-router-dom"
import {  getItemUrlId } from "../utils/urlFunctions";
import {  useEffect, useState } from "react";
import { capitalizeString } from "../utils/otherFunctions";
import { jsonParserV1 } from "../utils/jsonFunctions";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import Loading from "../components/static/Loading";
import server from "../config/Server";
import { SimilarAds } from "../components/dynamic/Adverts.component";

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
               let adData =  localStorage.getItem('adViewed');
               if(adData){
                    try {
                         const adDatas = JSON.parse(adData);
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
                    localStorage.setItem("adViewed",JSON.stringify(res.data));
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
     }, []);
  return (
    <div className="advert-page">
     {
          !loading ?
          <>
          <div className="advert-page-mainAdvert">
               <div className="col">
                    <div className="images">
                         <img src={mainImage} alt={adViewed?.ad_id} className="img" />
                    </div>
                    <div className="images">
                         <div className="otherImages">
                              <img src={adViewed?.ad_image} alt={adViewed?.ad_name} onClick={() => setMainImage(adViewed.ad_image)} />
                              {images?.map((image, index) => < img src={image} alt={adViewed?.ad_name} key={index} onClick={() => setMainImage(image)} />)  }
                         </div>
                    </div>
               </div>
               <div className="col">
                    <h2>{adViewed?.ad_name ? capitalizeString(adViewed?.ad_name) : ""}</h2>
                    {adViewed?.ad_price && <h3 className="advert-price"> Price: <b>Rwf {adViewed?.ad_price ? adViewed.ad_price : "-"}</b> </h3>}
                    <p className="cat"><span>{adViewed?.category_name}</span> <span>{adViewed?.sub_name}</span></p>
                    <div className="content">
                         {adViewed?.description && <h4>Description:</h4>}
                         <p>
                              {adViewed?.description?.desc}
                         </p>
                    </div>
                    <div className="vendor">
                         {adViewed?.full_name && <h4>Owner Information:</h4>}
                         {adViewed?.profile_image && <img src={adViewed?.profile_image} alt={adViewed?.full_name} />}
                         {adViewed?.full_name && <h5>{adViewed?.full_name}</h5>}
                         {adViewed?.user_email && 
                              <div className="contact" >
                                   <p><Link to={`mailto:${adViewed?.user_email}`}><i><MdMail /></i>{adViewed?.user_email}</Link></p>
                                   <p><Link to={`tel:${adViewed?.user_phone}`}><i><FaPhone/></i>{adViewed?.user_phone}</Link></p>
                                   <p><a href={`https://www.google.com/maps/place/${adViewed.user_location.location}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot/></i> {adViewed?.user_location.location}</a></p>
                              </div>
                         }
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