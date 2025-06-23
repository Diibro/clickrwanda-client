import { Link, useParams } from "react-router-dom"
import {  getItemUrl } from "../utils/urlFunctions";
import { useContext, useEffect, useState } from "react";
import { capitalizeString, formatPrice, getParagraphs } from "../utils/otherFunctions";
import { jsonParserV1, parseString } from "../utils/jsonFunctions";
import { FaEye, FaLocationDot, FaWhatsapp} from "react-icons/fa6";
import Loading from "../components/static/Loading";
import UserRating from "../components/dynamic/Rating.component";
import { RiAdvertisementFill } from "react-icons/ri";
import {  ImageViewer } from "../components/dynamic/ImageSlider";
// import { getData, saveData } from "../utils/storageFunctions";
import { AdvertReview, RateAdvert } from "../components/dynamic/Reviews.component";
// import { Helmet } from "react-helmet";
import { VscVerifiedFilled } from "react-icons/vsc";
// import AppData from "../Contexts/AppContext";
import { Helmet } from 'react-helmet-async';
import AdvertService from "../services/Advert";
import JobSeekerPageContainer from "../jobSeeker/components/containers/JobSeekerPageContainer";
import AppData from "../Contexts/AppContext";
import DOMPurify from 'dompurify';
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import { MdCall } from "react-icons/md";
import { standardizePhoneNumber } from "../utils/stringfunctions";
import { MainServer } from "../services/beta/server";
import { BetaEndpoints } from "../services/beta/endpoints";

const AdvertPage = () => {
     const {id} = useParams();

     const [ , setData ] = useContext(AppData);
     const [loading, setLoading] = useState(false);
     const [adViewed, setAdViewed] = useState(null);
     const [sameVendorAds, setSameVendorsAds] = useState([]);
     const [samecategoryAds, setSameCategoryAds] = useState([]);
     const [images, setImages] = useState([]);
     const [mainImage, setMainImage] = useState(null);
     const [totalVendorViews, setTotalVendorviews] = useState(0);
     const [totalVendorAds,setTotalVendorAds] = useState(0); 
     const [shortDesc, setShortDesc] = useState(null);
     const [longDesc, setLongDesc ] = useState(null);

     // important
     const [subCategory,setSubCategory] = useState(null);
     const [vendor,setVendor] = useState(null); 

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: adViewed}));
     }
     
     

     useEffect(() => {
               window.scrollTo(0,0);
               const updateImages = (ad) => {
                    const otherImages =  jsonParserV1(ad?.ad_images || null);
                    Object.entries(parseString(ad.description)).forEach(([,value]) => {
                         if(value.type === 'file' && value.fileType === 'image/*'){
                              otherImages.push(value.value);
                         }
                    })
                    return setImages(otherImages);
               }
               const updateDescription = (description) => {
                    Object.entries(description).forEach(([key,value])=> {
                         if(key === 'desc' || value.type === 'textarea' || value.type === 'file' || value.type === "htmlValue") {
                              setLongDesc(prev => ({...prev, [key]: value}));
                         }else{
                              setShortDesc(prev => ({...prev, [key]: value}));
                         }
                         
                    });
               }

               const updateAdViewed = async () => {
                    let check = 0;
                    try {
          
                         if(check === 0){
                              setLoading(true);
                              const res = await MainServer.fetch(`${BetaEndpoints.advert}/${id}`);
                              // saveData("adViewed",res.data, 10);
                                   const adData = res.data;
                                   console.log(adData);
                                   // const extraData = res.extraData;
                                   setTotalVendorAds(adData.users._count.adverts);
                                   setVendor(adData.users);
                                   console.log(adData.users);
                                   setSubCategory(adData.sub_category);
                                   // setTotalVendorviews(extraData.visits);
                                   setAdViewed(adData);
                                   setMainImage(adData?.ad_image);
                                   updateImages(adData);
                                   updateDescription(parseString(adData.description));
                              
                         }
                    } catch (error) {
                         console.log(`"Advert page error: "${error}`);
                    }finally {
                         setLoading(false);
                         
                    }
                    
               }
               (async () => await updateAdViewed())();
     },[id]);

     useEffect(() => {
          console.log(adViewed);
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
          if(adViewed){
               (async() => await updateSimilarAds())();
          }
     },[adViewed]);
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
               <div className="w-full" id="ad-main-page-content">
                    <div className="w-full flex flex-col items-center justify-center">
                    {
                         !loading ?
                         <>
                         {
                              adViewed?.category_name === "Job Seekers CVs" ? <JobSeekerPageContainer user={adViewed} />
                              :
                              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
                                   <div className="w-full lg:col-span-2 flex flex-col gap-[10px] items-center justify-start">
                                        <ImageViewer images={[mainImage, ...images]} />
                                        <div className="w-full grid grid-cols-1 gap-[2.5px] bg-white border p-[10px] border-gray-300 rounded-[5px]">
                                             <h2 className="text-[1.2rem] font-bold line-clamp-3 text-main-blue-700 flex items-center justify-start">{adViewed?.ad_name ? capitalizeString(adViewed?.ad_name) : ""} {adViewed?.verified ? <i className="verified"><VscVerifiedFilled /></i> : null}</h2>
                                             
                                                  <div className="w-full flex items-center justify-start gap-[2.5px]">
                                                  {adViewed?.category_name &&
                                                       <>
                                                            <a className="text-[0.9rem] text-gray-700" href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>{adViewed?.category_name}</span></a>
                                                            <a className="text-[0.9rem] text-gray-700" href={`/category/${getItemUrl(adViewed?.category_name, adViewed?.category_id)}`}><span>| {adViewed?.sub_name}</span></a>
                                                       </>}
                                                       {adViewed?.user_location && <a className=' text-[0.9rem] md:text-[0.9rem] text-gray-700 inline-flex items-center gap-[2.5px]' href={`https://www.google.com/maps/place/${capitalizeString(adViewed.user_location?.location || "Kigali") || "Kigali"}`} target="_blank" rel="noopener noreferrer">| <i><FaLocationDot /></i>{adViewed.user_location?.location || "Kigali"}</a>}
                                                  </div>
                                             
                                             {adViewed && adViewed?.ad_price > 0 &&
                                                  <h3 className="text-[1.2rem] font-bold text-gray-700">{adViewed?.category_name === "Jobs" ? "Salary" : "Price"}: {<b className="text-bold text-orange-800">Rwf {adViewed?.ad_price ? formatPrice(adViewed.ad_price) : "-"}</b>} </h3>
                                             }
                                             <div className="w-full flex items-center justify-between md:justify-start gap-[10px] mt-[10px]">
                                                  <a href={`https://wa.me/${standardizePhoneNumber(adViewed?.user_phone, "+25")}`} rel="noreferrer" target="_blank" className="w-[50%] md:w-auto md:px-[20px] flex items-center gap-[5px] py-[7.5px] border border-green-700 rounded-[5px] hover:bg-green-100 text-[0.9rem] justify-center text-green-800 font-semibold text-center"><i className="text-[22px]"><FaWhatsapp /></i> Chat on Whatsapp</a>
                                                  <a href={`tel:${standardizePhoneNumber(adViewed?.user_phone, "+25")}`} rel="noreferrer" target="_blank" className="w-[50%] md:w-auto md:px-[20px] flex items-center gap-[5px] py-[7.5px] bg-blue-600 hover:bg-blue-800 rounded-[5px] text-[0.9rem] text-white justify-center font-semibold text-center" ><i className="text-[22px]"><MdCall /></i> Contact Us</a>
                                             </div>
                                        </div>
                                        {
                                             shortDesc ? 
                                                  <div className="w-full flex items-center justify-start gap-[5px] flex-wrap ">
                                                       {
                                                            Object.entries(shortDesc).map(([key,value], index) => 
                                                                 <div className="w-auto bg-white p-[5px] px-[20px] rounded-[5px] flex flex-col items-center justify-start gap-[2.5px] border border-gray-300" key={`ad-desc-view-${key}-${index}`}>
                                                                      <b className="text-[0.8rem] whitespace-nowrap text-gray-700">{key}</b>
                                                                      <span className="text-[0.8rem] text-gray-800 font-semibold whitespace-pre-line">{value.value}</span>
                                                                 </div> 
                                                            )
                                                       }
                                                  </div>
                                                  
                                             :null
                                        }
                                        <div className="w-full flex flex-col items-center justify-start gap-[5px] p-[5px] bg-white border border-gray-300 rounded-[5px]">
                                             {
                                                  longDesc ? 
                                                       Object.entries(longDesc)?.map(([key,value], index) => 
                                                            key === "desc" ? () => {
                                                                 return( 
                                                                      <div className="w-full" key={`ad-desc-view-${key}-${index}`}>
                                                                           {
                                                                                getParagraphs(value.value || value).map((text, count) => <p className="text-[0.9rem] text-gray-700 whitespace-pre-line" key={`ad-view-paragraph-${count}`}>{text}</p>)
                                                                           }
                                                                      </div>)
                                                            }: value.type === 'textarea' ? 
                                                                 <div className="w-full">
                                                                      {
                                                                           getParagraphs(value.value || value, 50).map((text, count) => <p className="text-[0.9rem] text-gray-700 " key={`${key}-paragraph-advert-page-${count}`}>{text}</p>)
                                                                      }
                                                                 </div>
                                                            : value.type === 'htmlValue' ? 
                                                                      <div className="w-full flex flex-col items-start gap-[2.5px]"  >
                                                                           <div className="w-full px-[5px] text-[0.9rem] text-gray-700 flex flex-col items-start gap-[5px]" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(value.value)}} ></div>
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
                                   <div className="w-full flex flex-col items-center justify-start gap-[10px]">
                                        <div className="w-full flex flex-col items-center bg-white border border-gray-300 rounded-[5px] p-[5px] gap-[5px]">
                                             {vendor && <div className="w-full flex items-center justify-center bg-gray-100 py-[5px] rounded-[5px]"><h4 className="text-[1.4rem] font-bold text-main-blue-700">{subCategory && subCategory.category.category_name === "Jobs" ? "About  Employer" : "About Vendor"}</h4></div>}
                                             <div className="w-full flex items-start justify-start gap-[10px]">
                                                  {vendor && vendor.profile_image && <a className="w-auto p-[2.5px] border border-green-600 rounded-[5px]" href={`/vendor/${getItemUrl(vendor.full_name, vendor.user_id)}`}><img className="w-[60px] rounded-[5px] aspect-square object-cover object-center" src={vendor.profile_image} alt={vendor.full_name} /></a>}
                                                  <div className="w-auto flex flex-col items-start justify-start gap-[4px]">
                                                       {vendor?.full_name && <h5 className="text-[1.2rem] font-bold text-main-blue-700" >{vendor?.full_name}</h5>}
                                                       <UserRating rating={vendor?.rating || 0} />
                                                       <div className="w-full grid grid-cols-2 gap-[5px]">
                                                            {
                                                                 adViewed && adViewed.user_id &&
                                                                 <>
                                                                      <span className="w-full flex items-center gap-[2.5px] rounded-[5px] text-main-blue-700 text-[0.8rem] font-semibold"><i className="text-[24px]"><RiAdvertisementFill /></i><a href={`/vendor/${getItemUrl(adViewed?.full_name, adViewed?.user_id)}`} className="vendor-views vendor-ads">  {formatPrice(totalVendorAds)} Ads</a></span>
                                                                      <span className="w-full flex items-center gap-[2.5px] rounded-[5px] text-main-blue-700 text-[0.8rem] font-semibold"><i className="text-[24px]"><FaEye /></i>  {formatPrice(totalVendorViews)} views</span>
                                                                 </>
                                                            }
                                                       </div>
                                                  </div>
                                                  
                                             </div>
                                             <button className="w-full py-[7px] text-[0.9rem] font-semibold text-white bg-blue-600 rounded-[5px] outline-none border border-blue-600 hover:bg-white hover:text-blue-500 " onClick={showContactSeller}>Contact Vendor</button>
                                             
                                        </div>
                                        <div className="w-full bg-white rounded-[5px]">
                                             {adViewed ? <RateAdvert item={adViewed} /> : null}
                                        </div>
                                        <div className="w-full bg-white rounded-[5px]">
                                             {adViewed && <AdvertReview item={adViewed} />} 
                                        </div>
                                        <div className="w-full rounded-[5px] p-[5px] flex flex-col gap-[5px] bg-white">
                                             <h4 className="text-[1.3rem] font-bold text-main-blue-700">Safety Tips</h4>
                                             <div className="w-full flex flex-col items-start gap-[3px]">
                                                  <p className="text-[0.9rem] text-gray-600 "><span>1.</span> Meet in a public space to see the item and exchange the money.</p>
                                                  <p className="text-[0.9rem] text-gray-600 "><span>2.</span> Never send the item before receiving the money.</p>
                                                  <p className="text-[0.9rem] text-gray-600 "><span>3.</span> Never send or wire the money to sellers or buyers.</p>
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
               {/* <div className="hidden lg:flex lg:w-[15%] bg-white rounded-[5px] h-auto">
               <SideBannerContainer banners={TopDealsSidebanners} containerId={"ad-main-page-content"} changeArr={[adViewed,samecategoryAds, sameVendorAds]} />
               </div> */}
          </div>
    </>
  )
}

export default AdvertPage

