import { useContext, useState } from "react"
import FilterContext from "../Contexts/FilterContext"
import { jsonParserV1} from "../utils/jsonFunctions";
import { ImCross } from "react-icons/im";
import { MdCall, MdEmail } from "react-icons/md";

const ProductView = () => {
     const [filter, setFilter] = useContext(FilterContext);
     const {advertView} = filter;
     const images = jsonParserV1(advertView.ad_images);
     const [mainImage, setMainImage] = useState(advertView.ad_image);
     const closeView = () => {
          setFilter((prev) => ({...prev, advertView:false}));
     }
     let stylesClass = advertView.plan_name === "urgent" ? "urgent" : advertView.plan_name === "premium" ? "premium" : advertView.plan_name === "'feautured" ? "featured" : ""; 
     return(
          <div className={`advert-view-container product-view ${stylesClass}`}>
               <i onClick={closeView} className="close-icon"><ImCross/></i>
               <div className="product-view-images">
                    <div className="product-view-mainImage">
                         <img src={mainImage} alt="main image in view" />
                    </div>
                    <div className="product-view-otherImages">
                         <img src={advertView.ad_image} alt="main image" onClick={() => setMainImage(advertView.ad_image)} />
                         {images.map((image, index) => < img src={image} key={index} onClick={() => setMainImage(image)} />) }
                    </div>
               </div>
               <div className="product-view-content">
                    <h3>{advertView.ad_name}</h3>
                    <p className="p-tag">Price: <b>Rwf {advertView.ad_price}</b></p>
                    <p className="p-tag">Category:  <b>{advertView.category_name}</b></p>
                    <p className="p-tag">Sub category: <b>{advertView.sub_name}</b></p>
                    <p className="p-tag">Description: {"current no description"}</p>
                    <div className="seller-info">
                         <h3>Owner:</h3>
                         <div className="row">
                              <img src={advertView.profile_image} alt="seller image" />
                              <span><b>{advertView.full_name}</b></span>
                         </div>
                         <div className="row">
                              <a href={`mailto:${advertView.user_email}`}><i><MdEmail /></i> {advertView.user_email}</a>
                              <a href={`tel:${advertView.user_phone}`}><i><MdCall /></i> {advertView.user_phone}</a>
                         </div>
                    </div>
               </div>
          </div>
     )
}

const ServiceView = () => {
     const [filter,setFilter] = useContext(FilterContext);
     const {advertView} = filter;
     const images = jsonParserV1(advertView.ad_images);
     const [viewImage, setViewImage] = useState(advertView.ad_image);
     const closeView = () => {
               setFilter((prev) => ({...prev, advertView:false}));
     }
     let stylesClass = advertView.plan_name === "urgent" ? "urgent" : advertView.plan_name === "premium" ? "premium" : advertView.plan_name === "'feautured" ? "featured" : ""; 
     return(
          <div className={`advert-view-container service-view ${stylesClass}`}>
               <i onClick={closeView} className="close-icon"><ImCross/></i>
               <div className="product-view-images">
                    <div className="product-view-mainImage">
                         <img src={viewImage} alt="main image in view" />
                    </div>
                    <div className="product-view-otherImages">
                         <img src={advertView.ad_image} alt="main image" onClick={() => setViewImage(advertView.ad_image)} />
                         {images.map((image, index) => < img src={image} key={index} onClick={() => setViewImage(image)} />) }
                    </div>
               </div>
               <div className="product-view-content">
                    <h3>{advertView.ad_name}</h3>
                    <p>Price: <b>{advertView.ad_price}</b></p>
                    <p><i>Category:</i>  <b>{advertView.category_name}</b></p>
                    <p><i>Sub category:</i> <b>{advertView.sub_name}</b></p>
                    <p><i>Description:</i> {"current no description"}</p>
                    <div className="seller-info">
                         <p>Owner:</p>
                         <div className="row">
                              <img src={advertView.profile_image} alt="seller image" />
                              <span><b>{advertView.full_name}</b></span>
                         </div>
                         <div className="row">
                              <a href={`mailto:${advertView.user_email}`}>{advertView.user_email}</a>
                              <a href={`tel:${advertView.user_phone}`}>{advertView.user_phone}</a>
                         </div>
                    </div>
               </div>
          </div>
     )
}

const AdvertView = () => {
     const [filter] = useContext(FilterContext);
     const {advertView} = filter;

     if(advertView && advertView.id != "") {
          return(
               <div className="advert-view">
                    {advertView.ad_type === "product" ? <ProductView/> : <ServiceView />}
               </div>
          )
     }else{
          return(<></>);
     }
     
}

export default AdvertView;