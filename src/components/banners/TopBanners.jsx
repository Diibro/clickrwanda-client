import { useContext, useEffect, useState } from "react"
import { TopBanners as Banners } from "../../config/banners" 
import DeviceView from "../../Contexts/ViewContext";
const TopBanners = () => {
     const [activeBanners, setActiveBanners ] = useState([]);
     const [deviceView] = useContext(DeviceView);
     const {isMobile, isTablet} = deviceView;

     useEffect(() => {
          if(isMobile || isTablet){
               setActiveBanners([Banners[0]]);
          }else {
               setActiveBanners([Banners[0], Banners[1]]);
          }
     },[isTablet, isMobile]);
     return (
          <div className="full flex items-center justify-center md:grid grid-cols-2 overflow-hidden gap-[10px]">
               {
                    activeBanners.length > 0 ? 
                    activeBanners.map((banner, index) => <a key={`top-banner-${index}`} href={banner.destLink} target="_blank" rel="noreferrer" className="w-full bg-blue-800 rounded-[8px]"  ><img src={banner.srcLink}  width={800} height={100} className="w-full aspect-[800/100] rounded-[8px] object-contain " /></a>)
                    :null
               }
          </div>
     )
}

export default TopBanners