import { useEffect, useState } from "react"
import AdvertService from '../../services/Advert';

import { SlideAdsContainers } from "./AdsContainer";

const HomeCommissionAds = () => {
     const [ads,setAds] = useState(null);

     const fetchAds = async() => {
          const res = await AdvertService.getClientApprovedCommissionAds({limit: 20, offset:0});
          if(res){
               setAds(res.data);
          }
     }

     useEffect(() => {
          (async () => {
               await fetchAds();
          })();
     },[])
     return (
          <section className="w-full pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white ">
               {
                    ads && Array.isArray(ads) && ads.length > 0 &&
                    <SlideAdsContainers ads={ads} containerId={"home-commission-ads-container"} content={{title: "Today deals", viewAll: "View All", viewAllLink: "/market"}} />
               }
          </section>
     )
}

export default HomeCommissionAds