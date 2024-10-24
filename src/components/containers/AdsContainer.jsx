/* eslint-disable react-hooks/exhaustive-deps */

import PropTypes from 'prop-types';
import AdvertRenderer from '../dynamic/Advert.componet';
import AdvertCard from '../cards/AdvertCard';
import { Link} from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const AdsContainer = ({adverts}) => {
     return (
          <>
               {
                    adverts.map(item => (<AdvertRenderer item={item} key={item.ad_id} />))
               }
          </>
     )
}

export const GeneralAdsContainer = ({ads, containerId}) => {
     return (
          <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] md:gap-[10px]'>
               {ads.map((item, index) => <AdvertCard ad={item} key={`ads-container-${containerId}-${index}`} />)}
          </div>
     )
}

GeneralAdsContainer.propTypes = {
     ads: PropTypes.array.isRequired,
     containerId: PropTypes.string
}

export const SlideAdsContainers = ({ads, containerId, content}) => {
     const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
     const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
     const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

     const [displayAds,setDisplayAds] = useState(null);
     const [displayNumber,setDisplayNumber] = useState(0);
     const [currentPage, setCurrentPage] = useState(1);

     const viewNextAds = (dir) => {
          if(dir === 1){
               setCurrentPage(prev => prev + 1)
          }else if(dir === -1) {
               setCurrentPage(prev => prev - 1);
          }else if(dir === 0) {
               setCurrentPage(1);
          }
     }
     
     const updateDisplayAds = () => {
          if(ads.length <= ((currentPage - 1 ) * displayNumber)){
               setCurrentPage(1);
          }else if((currentPage - 1) < 0) {
               setCurrentPage((ads.length / displayNumber) + 1)
          }
          setDisplayAds(ads.slice((currentPage - 1) * displayNumber, displayNumber * currentPage));
     }

     useEffect(() => {
          if (isMobile) setDisplayNumber(2);
          else if (isTablet) setDisplayNumber(3);
          else if (isDesktop) setDisplayNumber(4);
     }, [isMobile, isTablet, isDesktop]); 
     
     useEffect(() => {
          updateDisplayAds();
     }, [displayNumber, ads]);

     useEffect(() => {
          updateDisplayAds();
     },[currentPage])
     
     return(
          <div className='w-full flex flex-col items-center gap-[10px] '>
               <div className='w-full flex items-center justify-between'>
                    <div className='w-auto flex gap-[10px] items-center ' >
                         <h2 className='text-main-blue-700 text-[1.6rem] font-extrabold '>{content.title}</h2>
                         <Link to={content.viewAllLink} className='text-[0.9rem] text-main-green-600 font-bold' >View All</Link>
                    </div>
                    <div className='w-auto flex items-center gap-[5px] '>
                         <i onClick={() => viewNextAds(-1)} className={`text-[1.4rem] text-gray-800 cursor-pointer`} ><RiArrowLeftSLine /></i>
                         <i onClick={() => viewNextAds(1)} className={`text-[1.4rem] text-gray-800 cursor-pointer`} ><RiArrowRightSLine /></i>
                    </div>
               </div>
               {displayAds !== null && <GeneralAdsContainer ads={displayAds} containerId={`slide-container-${containerId}`} />}
          </div>
     )
}

SlideAdsContainers.propTypes = {
     ads: PropTypes.array.isRequired,
     containerId: PropTypes.string,
     content: PropTypes.shape({
          title: PropTypes.string,
          viewAll: PropTypes.string,
          viewAllLink: PropTypes.string
     })
}

AdsContainer.propTypes = {
     adverts: PropTypes.array
}
export default AdsContainer