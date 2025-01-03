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
import { TopDealsSidebanners } from "../config/banners";
import { VscVerifiedFilled } from "react-icons/vsc";
// import AppData from "../Contexts/AppContext";
import { Helmet } from 'react-helmet-async';
import AdvertService from "../services/Advert";
import JobSeekerPageContainer from "../jobSeeker/components/containers/JobSeekerPageContainer";
import { ActionBtn } from "../components/dynamic/Buttons";
import AppData from "../Contexts/AppContext";
import DOMPurify from 'dompurify';
import { SideBannerContainer } from "../components/banners/SideBanners";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";

const AdvertPage = () => {
     const [ , setData ] = useContext(AppData);
     const location = useLocation();
     const [loading, setLoading] = useState(false);
     const [adViewed, setAdViewed] = useState(null);
     const [sameVendorAds, setSameVendorsAds] = useState([]);
     const [samecategoryAds, setSameCategoryAds] = useState([]);
     const [images, setImages] = useState([]);
     const [mainImage, setMainImage] = useState(null);
     const [adDescription,setAdDescription] = useState(null);
     const [totalVendorViews, setTotalVendorviews] = useState(0);
     const [totalVendorAds,setTotalVendorAds] = useState(0); 
     const [shortDesc, setShortDesc] = useState(null);
     const [longDesc, setLongDesc ] = useState(null);

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: adViewed}));
     }

     const updateDescription = () => {
          Object.entries(adDescription).forEach(([key,value])=> {
               if(key === 'desc' || value.type === 'textarea' || value.type === 'file' || value.type === "htmlValue") {
                    setLongDesc(prev => ({...prev, [key]: value}));
               }else{
                    setShortDesc(prev => ({...prev, [key]: value}));
               }
               
          });
     }

     const updateImages = () => {
          const otherImages =  jsonParserV1(adViewed?.ad_images || null);
          Object.entries(adDescription).forEach(([,value]) => {
               if(value.type === 'file' && value.fileType === 'image/*'){
                    otherImages.push(value.value);
               }
          })
          return setImages(otherImages);
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
     },[adViewed]);

     useEffect(() => {
          if(adDescription){
               updateImages();
               return updateDescription();
          }
     }, [adDescription])
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
          <div className="w-full flex justify-between  items-start gap-[5px]">
               <div className="w-full lg:w-[85%] " id="ad-main-page-content">
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
                                             {adViewed?.category_name && 
                                                  <div className="cat">
                                                       <a href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.category_name}</span></a>,
                                                       <a href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.sub_name}</span></a> 
                                                  </div>
                                             } 
                                             
                                             {adViewed && adViewed?.ad_price > 0 &&
                                                  <h3 className="advert-price">{adViewed?.category_name === "Jobs" ? "Salary" : "Price"}: {<b>Rwf {adViewed?.ad_price ? formatPrice(adViewed.ad_price) : "-"}</b>} </h3>}
                                             <div className="content">
                                                  {
                                                       shortDesc ? 
                                                            Object.entries(shortDesc).map(([key,value], index) => 
                                                            <div className="short-value" key={`ad-desc-view-${key}-${index}`}>
                                                                 <b>{key}:</b>
                                                                 <span>{value.value}</span>
                                                            </div> 
                                                            )
                                                       :null
                                                  }
                                                  {
                                                       longDesc ? 
                                                            Object.entries(longDesc)?.map(([key,value], index) => 
                                                                 key === "desc" ? 
                                                                 <div className="group description-container" key={`ad-desc-view-${key}-${index}`}>
                                                                      <b>Description:</b>
                                                                      {
                                                                           getParagraphs(value.value || value, 50).map((text, count) => <p key={`ad-view-paragraph-${count}`}>{text}</p>)
                                                                      }
                                                                 </div>
                                                                 : value.type === 'textarea' ? 
                                                                      <div className="group description-container">
                                                                           <b>{key}:</b>
                                                                           {
                                                                                getParagraphs(value.value || value, 50).map((text, count) => <p key={`${key}-paragraph-advert-page-${count}`}>{text}</p>)
                                                                           }
                                                                      </div>
                                                                 : value.type === 'htmlValue' ? 
                                                                           <div className="group  description-container"  >
                                                                                <b>{key}:</b>
                                                                                <div className="html-value-container" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(value.value)}} ></div>
                                                                           </div>
                                                                 : value.type === 'file'? 
                                                                      <div className="inner-image">
                                                                           <b>{key}:</b>
                                                                           {
                                                                                value.fileType === 'image/*' ? <img src={value.value} alt={key} /> 
                                                                                : value.fileType === '.pdf' ? <p>Click to view the document: <a href={value.value} target="_blank" rel="noreferrer" className="view-btn">Document</a></p> 
                                                                                :null
                                                                           }
                                                                      </div>
                                                                 : null
                                                            )
                                                       : null
                                                  }
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col">
                                        <div className="vendor">
                                        {adViewed?.full_name && <div className="vendor-info-header"><h4 className="">{adViewed?.category_name === "Jobs" ? "Employer Information" : "Seller Information"}</h4></div>}
                                             <div className="vendor-col-left">
                                                  {adViewed?.profile_image && <a href={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`}><img src={adViewed?.profile_image} alt={adViewed?.full_name} /></a>}
                                                  {adViewed?.full_name && <h5 className="text-[0.9rem]" >{adViewed?.full_name}</h5>}
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
                         
                         <div className="w-full p-[10px] flex flex-col gap-[20px] ">
                              {sameVendorAds && sameVendorAds[0] ? 
                                   <div className="w-full flex flex-col items-center justify-start gap-[5px] ">
                                        <h3 className="bg-main-blue-700 text-white text-[0.9rem] md:text-[1.1rem] font-bold w-full rounded-[5px] py-[10px] px-[5px] " >More Ads from {adViewed?.username} shop <Link className="text-[0.7rem] md:text-[0.9rem] text-main-green-600 font-bold" to={`/vendor/${getItemUrl(adViewed?.full_name, adViewed.user_id)}`}>View All</Link></h3>
                                        <GeneralAdsContainer ads={sameVendorAds} containerId={'advert-page-same-vendor-ads'} />
                                   </div>
                              : null}
                              
                              {samecategoryAds && samecategoryAds[0] ? 
                                   <div className="w-full flex flex-col items-center justify-start gap-[5px] ">
                                        <h3 className="bg-main-blue-700 text-white text-[0.9rem] md:text-[1.1rem] font-bold w-full rounded-[5px] py-[10px] px-[5px] " >More {adViewed?.category_name} Ads <Link className="text-[0.7rem] md:text-[0.9rem] text-main-green-600 font-bold" to={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}>View All</Link></h3>
                                        <GeneralAdsContainer  ads={samecategoryAds} containerId={'advert-page-same-category-ads'} />
                                   </div>
                              :null}
                         </div>
                         </>
                         : <Loading/>
                    }
                    
                    </div>
               </div>
               <div className="hidden lg:flex lg:w-[15%] bg-white rounded-[5px] h-auto">
               <SideBannerContainer banners={TopDealsSidebanners} containerId={"ad-main-page-content"} changeArr={[adViewed,samecategoryAds, sameVendorAds]} />
               </div>
          </div>
    </>
  )
}

export default AdvertPage