import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppData from '../../Contexts/AppContext';
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { FaLocationDot } from 'react-icons/fa6';
import {default as JobCardRow} from "./JobCard"


const AdvertCard = ({ad}) => {
     if(ad.ad_id === 'bed1566b-5901-4af9-ae80-708c293aa925' || ad.category_name === 'Job Seekers CVs' ){
          return <JobSeekerCard ad={ad} />
     }

     if(ad.ad_id === 'b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7' || ad.category_name == 'Jobs'){
          return <JobCard ad={ad} />
     }
     return (
          <>
               <div className='w-full hidden md:flex'>
                    <DefaultAdvertCard ad={ad} />
               </div>
               <DefaultHAdvertCard ad={ad} />
          </>
     )
}

AdvertCard.propTypes = {
     ad: PropTypes.object.isRequired
}
export const DefaultAdvertCard = ({ad}) => {
     const [,setData] = useContext(AppData);
     const currency= "Rwf";
     const navigate = useNavigate();
     // const categoryLink = `/category/${getItemUrl(ad.category_name, ad.category_id)}`;
     const ViewAd = () => {
          navigate(`/ad/${ad.ad_id}`);
     }

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: ad}))
     }

     const plan_name = ad.payment_plan ? ad.payment_plan.plan_name : "freemium";
     return(
          <div className={`w-full shadow-gray-400 shadow-sm rounded-[5px] relative h-auto flex flex-col gap-[4px] overflow-hidden ${plan_name == 'VIP' ? "border-green-500" : plan_name == "VVIP" ? "border-green-600" : plan_name}-ad ${ad.commission_ads ? 'border-main-primary-gold-500' : 'border-gray-400'}`}>
               {ad.commission_ads ? 
                    <span className='absolute top-[8px] left-[0px] bg-main-gold-500 rounded-tr-[4px] rounded-br-[4px] px-[10px] py-[5px] font-bold text-[0.7rem]  md:text-[0.8rem] text-white z-20 '>Deal</span> : 
                    <span className={`absolute top-[8px] left-[0px] rounded-tr-[4px] rounded-br-[4px] px-[10px] py-[5px] text-[0.7rem]  md:text-[0.8rem] font-bold text-white z-20 ${plan_name == "urgent" ? "bg-main-red-500" : plan_name == "VIP" ? "bg-main-green-600" : plan_name == "basic" ? "bg-main-purple-600" : plan_name == "VVIP" ? "bg-main-blue-500" : "bg-main-purple-600 hidden"}`}>{plan_name == 'VVIP' || plan_name == 'VIP' ? plan_name : capitalizeString(plan_name) }</span>
               }
               <div className="w-full overflow-hidden relative cursor-pointer">
                    {/* <MyImage image={ad.ad_image} action={ViewAd} /> */}
                    <img src={ad.ad_image} alt={ad.ad_name} onClick={ViewAd} className='w-full aspect-[100/80] object-cover' />
               </div>
               <div className='w-full flex flex-col gap-[2px] p-[4px]'>
                    <div className='w-full relative'>
                         <h5 onClick={ViewAd} className='w-full text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] font-bold text-main-blue-700 line-clamp-1 '>{capitalizeString(ad.ad_name)}</h5>
                    </div>
                    <div className="w-full flex items-center gap-[2.5px] flex-wrap ">
                              {/* <span className=' text-[0.65rem] md:text-[0.7rem] text-gray-600'>{formatTimeAgo(ad.ad_date)},</span> */}
                              <a className=' text-[0.8rem] md:text-[0.8rem] text-gray-600 inline-flex items-center gap-[2.5px]' href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location) || "Kigali"}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot /></i>{ad.user_location?.location || "Kigali"}</a>
                              {ad.verified ? <p className='flex items-center  text-[0.65rem] md:text-[0.7rem] text-green-600 rounded-[4px] font-bold ' >Verified<i className='text-green-600 text-[14px] md:text-[18px] '><VscVerifiedFilled /></i></p> : null}
                    </div>
                    <div className="w-full flex items-center gap-[2.5px]">
                         {
                              +ad.ad_price <= 0  
                              ? <span className='w-full flex justify-between items-center text-[1rem] md:text-[1.1rem] font-bold text-main-red-500 '>Negotiable</span> 
                              : <span className='w-full flex justify-between items-center text-[1rem] md:text-[1.1rem] font-bold text-main-red-500 ' >
                                   
                                   {
                                        ad.ad_discount && ad.ad_discount <= 100 && ad.ad_discount > 0 ?
                                        <>{`${currency} ${formatPrice(+ad.ad_price - ((+ad.ad_price * ad.ad_discount)/100))}`} <span className=" hidden md:inline-flex text-[0.75rem] text-gray-400 line-through ">{`${currency} ${formatPrice(ad.ad_price)}`}</span> </>:
                                        <>{`${currency} ${formatPrice(ad.ad_price)}`} </>
                                   }
                                   
                                   </span> 
                         }
                         
                    </div>
                    <div className="w-full grid grid-cols-2 gap-[5px] p-[4px]">
                         <button className='rounded-[4px] text-[0.7rem]  md:text-[0.8rem] font-semibold py-[5px] text-white bg-main-gold-500 hover:bg-orange-500 ' onClick={ViewAd}>View</button>
                         <button className='rounded-[4px] text-[0.7rem]  md:text-[0.8rem] font-semibold py-[5px] text-white bg-main-blue-700 hover:bg-blue-600 ' onClick={showContactSeller}>Contact</button>
                    </div>
               </div>
          </div>
     )
}


DefaultAdvertCard.propTypes = {
     ad: PropTypes.object.isRequired
}


export const DefaultHAdvertCard = ({ad}) => {
     const [,setData] = useContext(AppData);
     const currency= "Rwf";
     const navigate = useNavigate();
     // const categoryLink = `/category/${getItemUrl(ad.category_name, ad.category_id)}`;
     const ViewAd = () => {
          navigate(`/ad/${ad.ad_id}`);
     }

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: ad}))
     }

     return(
          <div className={`w-full border-[1.3px] rounded-[5px] p-[5px] relative h-auto  flex md:hidden gap-[4px] overflow-hidden ${ad.plan_name === 'VIP' ? "border-green-500" : ad.plan_name === "VVIP" ? "border-green-600" : ad.plan_name}-ad ${ad.commission ? 'border-main-primary-gold-500' : 'border-gray-400'}`}>
               
               <div className="w-full rounded-[2.5px] overflow-hidden relative cursor-pointer">
                    {/* <MyImage image={ad.ad_image} action={ViewAd} /> */}
                    <img src={ad.ad_image} alt={ad.ad_name} className='w-full aspect-[100/70] object-cover rounded-[5px]' onClick={ViewAd} />
               </div>
               <div className='w-full flex flex-col gap-[2px]'>
                    <div className='w-full relative flex flex-col items-start gap-[2px]'>
                         {ad.commission ? 
                              <span className=' bg-main-gold-500 rounded-[2.5px] px-[10px] py-[5px] font-bold text-[0.8rem] text-white '>Deal</span> : 
                              <span className={`rounded-[2.5px] px-[10px] py-[5px] text-[0.8rem] font-bold text-white ${ad.plan_name === "urgent" ? "bg-main-red-500" : ad.plan_name === "VIP" ? "bg-main-green-600" : ad.plan_name === "basic" ? "bg-main-purple-600" : ad.plan_name === "VVIP" ? "bg-main-blue-500" : "bg-main-purple-600 hidden"}`}>{ad.plan_name === 'VVIP' || ad.plan_name === 'VIP' ? ad.plan_name : capitalizeString(ad.plan_name) }</span>
                         }
                         <h5 onClick={ViewAd} className='w-full text-[1rem] font-bold text-main-blue-700 line-clamp-2 '>{capitalizeString(ad.ad_name)}</h5>
                    </div>
                    <div className="w-full flex items-center gap-[2.5px] flex-wrap ">
                              {/* <span className=' text-[0.65rem] md:text-[0.7rem] text-gray-600'>{formatTimeAgo(ad.ad_date)},</span> */}
                              <a className=' text-[0.9rem]  text-gray-600 inline-flex items-center gap-[2.5px]' href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location) || "Kigali"}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot /></i>{ad.user_location?.location || "Kigali"}</a>
                              {ad.verified ? <p className='flex items-center  text-[0.9rem] text-green-600 rounded-[4px] font-bold ' > Verified<i className='text-green-600 text-[14px] md:text-[18px] '><VscVerifiedFilled /></i></p> : null}
                    </div>
                    <div className="w-full flex items-center gap-[2.5px]">
                         {
                              +ad.ad_price <= 0  
                              ? <span className='w-full flex justify-between items-center text-[1rem] md:text-[1rem] font-bold text-main-red-500 '>Price Negotiable</span> 
                              : <span className='w-full flex justify-between items-center text-[1rem] md:text-[1.1rem] font-bold text-main-red-500 ' >
                                   
                                   {
                                        ad.ad_discount && ad.ad_discount <= 100 && ad.ad_discount > 0 ?
                                        <>{`${currency} ${formatPrice(+ad.ad_price - ((+ad.ad_price * ad.ad_discount)/100))}`} <span className=" hidden md:inline-flex text-[0.75rem] text-gray-400 line-through ">{`${currency} ${formatPrice(ad.ad_price)}`}</span> </>:
                                        <>{`${currency} ${formatPrice(ad.ad_price)}`} </>
                                   }
                                   
                                   </span> 
                         }
                         
                    </div>
                    <div className="w-full grid grid-cols-2 gap-[5px]">
                         <button className='rounded-[4px] text-[0.7rem]  md:text-[0.8rem] font-semibold py-[5px] text-white bg-main-gold-500 hover:bg-orange-500 ' onClick={ViewAd}>View</button>
                         <button className='rounded-[4px] text-[0.7rem]  md:text-[0.8rem] font-semibold py-[5px] text-white bg-main-blue-700 hover:bg-blue-600 ' onClick={showContactSeller}>Contact</button>
                    </div>
               </div>
          </div>
     )
}


DefaultHAdvertCard.propTypes = {
     ad: PropTypes.object.isRequired
}

const JobSeekerCard = ({ad}) => {
     const [,setData] = useContext(AppData);
     const navigate = useNavigate();
     // const categoryLink = `/category/${getItemUrl(ad.category_name, ad.category_id)}`;
     const ViewAd = () => {
          navigate(`/ad/${ad.ad_id}`);
     }

     const showContactSeller = () => {
          setData((prev) => ({...prev, contactAd: ad}))
     }

     return(
          <div className={`w-full border-[1.3px] bg-white rounded-[5px] p-[2.5px] relative  grid grid-cols-3   gap-[4px] overflow-hidden ${ad.plan_name === 'VIP' ? "border-green-500" : ad.plan_name === "VVIP" ? "border-green-600" : ad.plan_name}-ad ${ad.commission ? 'border-main-primary-gold-500' : 'border-gray-400'}`}>
               <div className="w-full h-[100px] rounded-[2.5px] overflow-hidden relative cursor-pointer" onClick={ViewAd}>
                    <img src={ad.ad_image} alt={ad.ad_name} className='w-auto h-full min-w-[100px] max-w-full max-h-full rounded-[2.5px] object-cover ' />
               </div>
               <div className='w-full col-span-2 flex flex-col justify-between gap-[2px]'>
                    <div className='w-full flex-col items-start justify-start gap-[5px]'>
                         <div className='w-full relative'>
                              <h5 onClick={ViewAd} className='w-full text-[1rem] md:text-[0.8rem] lg:text-[0.9rem] font-bold text-main-blue-700 line-clamp-2 '>{capitalizeString(ad.ad_name)}</h5>
                         </div>
                         <div className="w-full flex items-center gap-[2.5px] flex-wrap ">
                                   {/* <span className=' text-[0.8rem] md:text-[0.8rem] text-gray-600'>Best in {ad?.sub_name},</span> */}
                                   <a className=' text-[0.8rem] md:text-[0.8rem] text-gray-600 inline-flex items-center gap-[2.5px]' href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot /></i>{ad.user_location?.location} </a>
                                   {ad.verified ? <p className='flex items-center  text-[0.65rem] md:text-[0.7rem] text-green-600 rounded-[4px] font-bold ' >, Verified<i className='text-green-600 text-[14px] md:text-[18px] '><VscVerifiedFilled /></i></p> : null}
                         </div>
                    </div>
                    <div className="w-full col-span-2 self-end grid grid-cols-2 gap-[5px]">
                         <button className='rounded-[4px] text-[0.7rem]  md:text-[0.7rem] font-medium py-[3px] border border-main-gold-500 text-main-gold-500 bg-white hover:bg-orange-100 ' onClick={ViewAd}>View</button>
                         <button className='rounded-[4px] text-[0.7rem]  md:text-[0.7rem] font-medium py-[3px] text-white bg-main-blue-700 hover:bg-blue-600 ' onClick={showContactSeller}>Call Me</button>
                    </div>
               </div>
               
          </div>
     )
}

const JobCard = ({ad}) => {
     const [description, setDescription] = useState(ad.description);

     useEffect(() => {
          setDescription(ad.description);
     },[ad]);

     const navigate = useNavigate();
     // const categoryLink = `/category/${getItemUrl(ad.category_name, ad.category_id)}`;
     const ViewAd = () => {
          navigate(`/ad/${ad.ad_id}`);
     }

     return(
          <>
               <div className='flex md:hidden'>
                    <JobCardRow ad={ad} />
               </div>
               <div className={`w-full border-[1.3px] rounded-[5px] p-[5px] relative hidden md:flex flex-col gap-[4px] overflow-hidden ${ad.plan_name === 'VIP' ? "border-green-500" : ad.plan_name === "VVIP" ? "border-green-600" : ad.plan_name}-ad ${ad.commission ? 'border-main-primary-gold-500' : 'border-gray-400'}`}>
                    {/* {ad.commission ? 
                         <span className='absolute top-[2.5px] left-[2.5px] bg-main-gold-500 rounded-[2.5px] px-[10px] py-[5px] font-bold text-[0.7rem]  md:text-[0.8rem] text-white z-20 '>Deal</span> : 
                         <span className={`absolute top-[2.5px] left-[2.5] rounded-[2.5px] px-[10px] py-[5px] text-[0.7rem]  md:text-[0.8rem] font-bold text-white z-20 ${ad.plan_name === "urgent" ? "bg-main-red-500" : ad.plan_name === "VIP" ? "bg-main-green-600" : ad.plan_name === "basic" ? "bg-main-purple-600" : ad.plan_name === "VVIP" ? "bg-main-blue-500" : "bg-main-purple-600 hidden"}`}>{ad.plan_name === 'VVIP' || ad.plan_name === 'VIP' ? ad.plan_name : capitalizeString(ad.plan_name) }</span>
                    }
                    */}
                    <div className='w-full flex flex-col gap-[2px]'>
                         <div className='flex items-start justify-start gap-[5px]'>
                              <img src={ad.ad_image} className="w-[30%] bg-white aspect-auto rounded-[5px] " alt={ad.ad_name} />
                              <div className='w-[65%] flex flex-col gap-[2.5px] items-start justify-start'>
                                   <p className='text-[0.8rem] font-bold text-gray-800 w-full text-wrap line-clamp-2'>{description['Company/Institution'] ? description['Company/Institution'].value.split(' ').join("") : 'Huza250 Ltd'}</p>   
                                   <span className='flex items-center justify-start text-[0.65rem] md:text-[0.7rem] text-gray-600 gap-[2.5px]'>
                                        <i><FaLocationDot/></i>
                                        <a href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer"> {ad.user_location?.location}</a>
                                   </span>
                              </div>
                         </div>
                         <div className='w-full relative'>
                              <h5 className='w-full text-[0.7rem] md:text-[0.8rem] lg:text-[0.8rem] font-bold text-gray-700 line-clamp-1'>Title: {capitalizeString(ad.ad_name)}</h5>
                              <p className='text-[0.8rem] font-medium text-gray-600'>Deadline on {description['Deadline'] ? description['Deadline'].value : 'Not specified'}</p>
                              <p className='text-[0.8rem] font-medium text-gray-600'>Job Type: {description['Type'] ? description['Type'].value : 'Job'}</p>
                         </div>
                         <div className="w-full flex items-center gap-[2.5px] flex-wrap ">
                                   {ad.verified ? <p className='flex items-center  text-[0.65rem] md:text-[0.7rem] text-green-600 rounded-[4px] font-bold ' >, Verified<i className='text-green-600 text-[14px] md:text-[18px] '><VscVerifiedFilled /></i></p> : null}
                         </div>
                         <div className="w-full grid grid-cols-1 gap-[5px]">
                              <button className='rounded-[4px] text-[0.7rem]  md:text-[0.8rem] font-semibold py-[5px] text-white bg-main-gold-500 hover:bg-orange-500 ' onClick={ViewAd}>Apply now</button>
                         </div>
                    </div>
               </div>
          </>
          
     )
}

JobCard.propTypes = {
     ad: PropTypes.object.isRequired
}

JobSeekerCard.propTypes = {
     ad: PropTypes.object.isRequired
}


export default AdvertCard;