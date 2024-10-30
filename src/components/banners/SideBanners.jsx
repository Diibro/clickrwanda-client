import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getContainerHeight } from '../../utils/domFunctions';
import { openNewTab } from '../../utils/otherFunctions';
import { DefaultSideBanner } from '../../config/banners';

export const SideBanner = ({banner}) => {
     

     return (
          <div className='w-full h-full rounded-[5px] border-[0.8px] border-gray-200 overflow-hidden ' >
               <img src={banner.image} alt={banner.name} onClick={() => openNewTab(banner.link)} className='w-full h-full object-fill cursor-pointer ' />
          </div>
     )
}

SideBanner.propTypes = {
     banner: PropTypes.shape({
          image: PropTypes.string,
          link: PropTypes.string,
          name: PropTypes.string
     }),
}

export const SideBannerContainer = ({banners, containerId,changeArr}) => {
     const [displayBanners, setDisplayBanners] = useState([]);
     const [bannersNo, setBannersNo] = useState(1);
     const [height,setHeight] = useState(350)
     const updateBanners = useCallback(() => {
          if (!banners || !Array.isArray(banners)) return;
          
          const newBanners = [];
          for (let i = 0; i < bannersNo; i++) {
               newBanners.push(banners[i] || DefaultSideBanner);
          }
          setDisplayBanners(newBanners);
     }, [bannersNo, banners]);

     useEffect(() => {
          const calculateHeight = () => {
               const container = document.getElementById(containerId);
               if (container) {
                    requestAnimationFrame(() => {
                         const containerHeight = Math.floor(container.offsetHeight);
                         if (containerHeight >= 350) { 
                              setHeight(containerHeight);
                              setBannersNo(Math.max(1, Math.floor(containerHeight / 350)));
                         }
                    });
               }
          };

          const initialTimer = setTimeout(calculateHeight, 100);
          
          window.addEventListener('resize', calculateHeight);
          return () => {
               window.removeEventListener('resize', calculateHeight);
               clearTimeout(initialTimer);
          }
     }, [containerId, ...changeArr]);

     useEffect(() => {
          updateBanners();
     }, [banners, height, updateBanners]);

     return (
          <div style={{height: `${height}px`}} className={`w-full min-h-[350px] overflow-hidden grid grid-col-1 gap-[5px] p-[2.5px] rounded-[5px] bg-white `}>
               {
                    displayBanners.map((banner,index) => <SideBanner banner={banner} key={`side-banner-${containerId}-${index}`} /> )
               }
               
          </div>
     )
}

SideBannerContainer.propTypes = {
     changeArr: PropTypes.array,
     containerId: PropTypes.string,
     banners: PropTypes.arrayOf(PropTypes.shape({image: PropTypes.string, link: PropTypes.string, name: PropTypes.string}))
}


