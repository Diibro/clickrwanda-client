import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { capitalizeString } from '../../utils/otherFunctions'
import { useNavigate } from 'react-router-dom'
import { getItemUrl } from '../../utils/urlFunctions'
import { FaLocationDot } from 'react-icons/fa6'
// import { formatTimeAgo } from '../../utils/dateFunctions'
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
          <div onClick={ViewAd} className="w-full cursor-pointer rounded-[5px] shadow-md shadow-gray-200 p-[5px] flex justify-between items-center overflow-hidden bg-white ">
               <div className="w-[20%] flex flex-col items-center justify-center gap-[5px] ">
                    <img src={ad.ad_image} alt="job-image" className=' w-auto max-w-[95%] max-h-[100px] rounded-[5px] ' width={300} onClick={ViewAd}/>
                    {/* <p className='text-[0.8rem] text-gray-700 font-semibold '>{formatTimeAgo(ad.ad_date)}</p> */}
               </div>
               <div className="w-[78%] flex flex-col gap-[5px] ">
                    <h4 className='text-[0.9rem] font-semibold line-clamp-1 cursor-pointer hover:text-blue-600 ' onClick={ViewAd} >{ad.ad_name}</h4>
                    <p className='flex items-center flex-wrap gap-[5px]  font-semibold text-gray-600 whitespace-pre-wrap text-[0.85rem] '>
                         {description['Company/Institution'] ? description['Company/Institution'].value.split(' ').join("") : 'Compny not specified'}
                         <span className='text-[0.8rem] text-gray-600 font-bold'>|</span>
                         <span className='flex items-center justify-start gap-[2px]'>
                              <i><FaLocationDot/></i>
                              <a href={`https://www.google.com/maps/place/${capitalizeString(description['Location'] ? description['Location'].value : 'Rwanda')}`} target="_blank" rel="noopener noreferrer"> {description['Location'] ? description['Location'].value : 'Rwanda'}</a>
                         </span>
                         <span className='text-[0.8rem] text-gray-600 font-bold'>|</span>
                         Deadline on {description['Deadline'] ? description['Deadline'].value : 'Not specified'}
                    </p>
                    <div className='w-full flex items-center justify-start gap-[5px]'>
                         <p className='text-[0.8rem] font-semibold text-white bg-gray-700 p-[2.5px] px-[10px] rounded-[2.5px] w-auto '>{description['Type'] ? description['Type'].value : 'Job'}</p>
                         <span className='text-[0.8rem] font-semibold text-white bg-main-gold-500 hover:bg-main-gold-600 p-[2.5px] px-[10px] rounded-[2.5px] w-auto transition-all duration-300' onClick={ViewAd}>Apply Now</span>
                    </div>
               </div>
          </div>
     )
}

JobCard.propTypes = {
     ad: PropTypes.object.isRequired
}

export default JobCard