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
          <div className='w-full h-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] md:gap-[10px]  '>
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
     const [scrollAmount, setScrollAmount] = useState(250);

     const viewNextAds = (direction) => {
          const container = document.getElementById(`slide-container-${containerId}`);
          if (container) {
               container.scrollLeft += direction === 1 ? scrollAmount : -scrollAmount;
          }
     }

     useEffect(() => {
          if (isMobile) setScrollAmount(200);
          else if (isTablet) setScrollAmount(250);
          else if (isDesktop) setScrollAmount(250);
     }, [isMobile, isTablet, isDesktop]); 

     
     return(
          <div className='w-full flex flex-col items-center gap-[10px] '>
               <div className='w-full flex items-center justify-between'>
                    <div className='w-auto flex gap-[10px] items-center ' >
                         <h2 className='text-main-blue-700 text-[1.4rem] md:tex-[1.6rem] font-extrabold '>{content.title}</h2>
                         <Link to={content.viewAllLink} className='text-[0.7rem] md:text-[0.9rem] text-main-green-600 font-bold' >View All</Link>
                    </div>
                    <div className='w-auto hidden  lg:flex items-center gap-[5px]  '>
                         <i onClick={() => viewNextAds(-1)} className={`text-[1.4rem] text-gray-800 cursor-pointer`} ><RiArrowLeftSLine /></i>
                         <i onClick={() => viewNextAds(1)} className={`text-[1.4rem] text-gray-800 cursor-pointer`} ><RiArrowRightSLine /></i>
                    </div>
               </div>
               <div id={`slide-container-${containerId}`} className='w-full overflow-hidden overflow-x-auto scroll-smooth hide-scroll'>
                    <div className='w-auto grid gap-[10px] grid-flow-col auto-cols-[220px] md:auto-cols-[250px]'>
                         {
                              ads && ads.length > 0 ? ads.map((ad) =><AdvertCard ad={ad} key={`${containerId}-${ad.ad_id}`} /> ) :
                              <p className='text-gray-600 text-[0.8rem]'>No ads found</p>
                         }
                    </div>
               </div>
               {/* {displayAds !== null && <GeneralAdsContainer ads={displayAds} containerId={`slide-container-${containerId}`} />} */}
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