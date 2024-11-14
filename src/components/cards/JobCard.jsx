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
          setDescription(ad.description);
     },[ad])
     return (
          <div className="w-full rounded-[5px] shadow-md shadow-gray-200 p-[5px] flex justify-between items-center overflow-hidden bg-white ">
               <div className="w-[70%] flex flex-col gap-[2.5px] ">
                    <h4 className='text-[1rem] font-bold line-clamp-2 '>{ad.ad_name}</h4>
                    <p className='text-[0.8rem] font-semibold text-gray-700 '><span className='text-gray-800'>Company/Institution: </span> {description['Company/Institution'] ? description['Company/Institution'].value : 'Not specified'}</p>
                    <p className='text-[0.8rem] font-semibold text-gray-700 '><span className='text-gray-800'>Type: </span>{description['Type'] ? description['Type'].value : 'Job'}</p>
                    <p className='text-[0.8rem] font-semibold text-gray-700 '><span className='text-gray-800'>Location: </span><a href={`https://www.google.com/maps/place/${capitalizeString(description['Location'] ? description['Location'].value : 'Rwanda')}`} target="_blank" rel="noopener noreferrer">{description['Location'] ? description['Location'].value : 'Rwanda'}</a></p>
                    <p className='text-[0.8rem] font-semibold text-gray-700 '><span className='text-gray-800'>Deadline: </span> {description['Deadline'] ? description['Deadline'].value : 'Not specified'}</p>
                    <button onClick={ViewAd} className='w-full text-center bg-main-blue-700 text-gray-50 border-[1.2px] border-main-blue-700 py-[5px] text-[0.8rem] font-semibold transition-all duration-300 hover:text-main-blue-700 hover:bg-white rounded-[5px] '>View More Details</button>
               </div>
               <div className="w-[28%] flex flex-col items-center justify-center gap-[5px] ">
                    <img src={ad.ad_image} alt="job-image" className='shadow-sm shadow-gray-400 w-auto max-w-[95%] max-h-[100px] rounded-[5px] ' width={300} onClick={ViewAd}/>
                    <p className='text-[0.8rem] text-gray-700 font-semibold '>{formatTimeAgo(ad.ad_date)}</p>
               </div>
          </div>
     )
}

JobCard.propTypes = {
     ad: PropTypes.object.isRequired
}

export default JobCard