import { useEffect, useState } from "react";
import Service from "../../services/Service";
import Server from "../../services/Server";
import { SlideAdsContainers } from "./AdsContainer";

const JobSeekersSection = () => {
     const [ads,setAds] = useState(null);

     const catId = 'bed1566b-5901-4af9-ae80-708c293aa925';

     const fetchAds = async() => {
          // const res = await AdvertService.getByCategory({category_id: catId, limit: 20, offset: 0});
          const res = await Service.post(Server.advert.getApprovedAdsByCategory, {ids: [catId], limit: 20, offset: 0});
          if(res){
               const {data} = res;
               if(data && data.length){
                    setAds(data);
               }
          }
     }

     useEffect(() => {
          (async () => {
               await fetchAds();
          })()
     },[])

     return (
          <section className="w-full pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white ">
               {
                    ads && Array.isArray(ads) && ads.length > 0 && 
                    <SlideAdsContainers 
                         ads={ads}
                         content={{title:"Hire Me", viewAll:"View All", viewAllLink: "/category/Job-Seekers-CVs?=bed1566b-5901-4af9-ae80-708c293aa925"}}
                    />
               }
          </section>
     )
}

export default JobSeekersSection