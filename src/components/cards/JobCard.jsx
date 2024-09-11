import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { capitalizeString } from '../../utils/otherFunctions'
import { useNavigate } from 'react-router-dom'
import { getItemUrl } from '../../utils/urlFunctions'
import { formatTimeAgo } from '../../utils/dateFunctions'
const JobCard = ({ad}) => {
     const navigate = useNavigate();
     const [description, setDescription] = useState(ad.description);

     const ViewAd = () => {
          navigate(`/ad/${getItemUrl(ad.ad_name, ad.ad_id)}`);
     }
     return (
          <div className="job-card">
               <div className="content">
                    <h3>{ad.ad_name}</h3>
                    <p><span>Position: </span> {description['Position'] ? description['Position'].value : 'Other'}</p>
                    <p><span>Deadline: </span> {description['Deadline'] ? description['Deadline'].value : 'Not specified'}</p>
                    <p><span>Location: </span><a href={`https://www.google.com/maps/place/${capitalizeString(ad.user_location?.location)}`} target="_blank" rel="noopener noreferrer">{ad.user_location?.location}</a></p>
                    <button onClick={ViewAd} className='job-card-apply-btn'>View More Details</button>
               </div>
               <div className="image">
                    <img src={ad.ad_image} alt="job-image" width={300} onClick={ViewAd}/>
                    <p>{formatTimeAgo(ad.ad_date)}</p>
               </div>
          </div>
     )
}

JobCard.propTypes = {
     ad: PropTypes.object
}

export default JobCard