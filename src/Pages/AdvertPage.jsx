import { Link, useLocation } from "react-router-dom"
import {  getItemUrlId } from "../utils/urlFunctions";
import { useContext, useEffect, useState } from "react";
import AppData from "../Contexts/AppContext";
import { capitalizeString } from "../utils/otherFunctions";
import { jsonParserV1 } from "../utils/jsonFunctions";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const AdvertPage = () => {
     const location = useLocation();
     const [data] = useContext(AppData);
     const [adViewed, setAdViewed] = useState(null);
     const adId = getItemUrlId(location.search);
     const images = jsonParserV1(adViewed?.ad_images || null);
     const [mainImage, setMainImage] = useState(adViewed?.ad_image || null);
     const updateAdViewed = async () => {
          let check = 0;
          try {
               if(data.adverts[0]){
                    for(const ad of data.adverts ){
                         if(adId === ad.ad_id){
                              check = 1;
                              setAdViewed(ad);
                         }
                    }
                    if(check === 1){
                         return
                    }else{
                         setAdViewed({ad_name: "We are fetching ffrom the database"});
                    }
               }
          } catch (error) {
               return;
          }
          
     }
     useEffect(() => {
           (async () => await updateAdViewed())();
           if(!mainImage && adViewed){
               setMainImage(adViewed.ad_image);
           }
     }, [data]);
  return (
    <div className="advert-page">
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
               <div className="content">
                    {adViewed?.description && <h4>Description:</h4>}
                    <p>
                         {adViewed?.description.desc}
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
                         </div>
                    }
               </div>
          </div>
     </div>
     <div className="advert-page-others"></div>
    </div>
  )
}

export default AdvertPage