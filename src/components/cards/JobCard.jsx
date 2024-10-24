import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
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

     useEffect(() => {
          console.log(ad.description);
          setDescription(ad.description);
     },[ad])
     return (
          <div className="job-card">
               <div className="content">
                    <h4 className='card-title'>{ad.ad_name}</h4>
                    <p><span>Company/Institution: </span> {description['Company/Institution'] ? description['Company/Institution'].value : 'Not specified'}</p>
                    <p><span>Type: </span>{description['Type'] ? description['Type'].value : 'Job'}</p>
                    <p><span>Location: </span><a href={`https://www.google.com/maps/place/${capitalizeString(description['Location'] ? description['Location'].value : 'Rwanda')}`} target="_blank" rel="noopener noreferrer">{description['Location'] ? description['Location'].value : 'Rwanda'}</a></p>
                    <p><span>Deadline: </span> {description['Deadline'] ? description['Deadline'].value : 'Not specified'}</p>
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
     ad: PropTypes.object.isRequired
}

export default JobCard