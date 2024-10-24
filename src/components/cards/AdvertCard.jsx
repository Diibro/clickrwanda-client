import PropTypes from 'prop-types';
import { MyImage } from '../static/Image';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItemUrl } from '../../utils/urlFunctions';
import AppData from '../../Contexts/AppContext';
import { capitalizeString, formatPrice } from '../../utils/otherFunctions';
import { formatTimeAgo } from '../../utils/dateFunctions';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { FaLocationDot } from 'react-icons/fa6';

const AdvertCard = ({ad}) => {
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
          <div className={`w-full border-[1.3px] rounded-[5px] p-[2.5px] relative aspect-[100/150] md:aspect-[100/120]  flex flex-col gap-[4px] overflow-hidden ${ad.plan_name === 'VIP' ? "border-green-500" : ad.plan_name === "VVIP" ? "border-green-600" : ad.plan_name}-ad ${ad.commission ? 'border-main-primary-gold-500' : 'border-gray-400'}`}>
               {ad.commission ? 
                    <span className='pay-plan deal'>Deal</span> : 
                    <span className={ad.plan_name === "urgent" ? "pay-plan urgent" : ad.plan_name === "VIP" ? "pay-plan premium" : ad.plan_name === "basic" ? "pay-plan basic" : ad.plan_name === "VVIP" ? "pay-plan enterprise" : "free-plan"}>{ad.plan_name === 'VVIP' || ad.plan_name === 'VIP' ? ad.plan_name : capitalizeString(ad.plan_name) }</span>
               }
               <div className="w-full h-full rounded-[2.5px] overflow-hidden relative">
                    <MyImage image={ad.ad_image} action={ViewAd} />
               </div>
               <div className='w-full flex flex-col gap-[2px]'>
                    <div className='w-full relative'>
                         <h5 onClick={ViewAd} className='w-full text-[0.9rem] font-bold text-main-blue-700 line-clamp-2 '>{capitalizeString(ad.ad_name)}</h5>
                    </div>
                    <div className="w-full flex items-center gap-[2.5px] flex-wrap ">
                              <span className=' text-[0.65rem] md:text-[0.7rem] text-gray-600'>{formatTimeAgo(ad.ad_date)},</span>
                              <a className=' text-[0.65rem] md:text-[0.7rem] text-gray-600 inline-flex items-center gap-[2.5px]' href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer"><i><FaLocationDot /></i>{ad.user_location?.location}, </a>
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
                    <div className="w-full grid grid-cols-2 gap-[5px]">
                         <button className='rounded-[4px] text-[0.8rem] font-semibold py-[5px] text-white bg-main-gold-500 hover:bg-orange-500 ' onClick={ViewAd}>View</button>
                         <button className='rounded-[4px] text-[0.8rem] font-semibold py-[5px] text-white bg-main-blue-700 hover:bg-blue-600 ' onClick={showContactSeller}>Contact</button>
                    </div>
               </div>
          </div>
     )
}

AdvertCard.propTypes = {
     ad: PropTypes.object.isRequired
}

export default AdvertCard;