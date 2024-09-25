import PropTypes from 'prop-types';
import { capitalizeString} from '../../utils/otherFunctions';
import { formatTimeAgo } from '../../utils/dateFunctions';
import { MyImage } from '../static/Image';
import { getItemUrl } from '../../utils/urlFunctions';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppData from '../../Contexts/AppContext';
import { VscVerifiedFilled } from 'react-icons/vsc';
const JobSeekerCard = ({ad}) => {
     const [,setData] = useContext(AppData);
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
               {ad.ad_discount && ad.ad_discount > 0 && ad.ad_discount <= 100 && +ad.ad_price > 0 ? <span className='advert-discount'>- {ad.ad_discount}%</span> : null}
               <div className="ad-image">
                    <div className='background-img' style={{backgroundImage:`url(${ad.ad_image})`}} ></div>
                    <MyImage image={ad.ad_image} action={ViewAd} />
               </div>
               <div className='content'>
                    <h5 onClick={ViewAd}><span>{capitalizeString(ad.ad_name)}</span>{ad.verified ? <i className='verified-ad-text'><VscVerifiedFilled /></i> : null}</h5>
                    <div className="row">
                         <b>
                              <a href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer">{ad.user_location?.location}</a>
                              <i>, Joined {formatTimeAgo(ad.ad_date)}</i>
                         </b>
                         <b>

                         </b>
                         
                    </div>
                    <div className="row">
                         <button className='view-btn' onClick={ViewAd}>View</button>
                         <button className='contact-btn' onClick={showContactSeller}>Contact</button>
                    </div>
               </div>
          </div>
     )
}

JobSeekerCard.propTypes = {
     ad: PropTypes.object
}

export default JobSeekerCard