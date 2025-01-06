import { Link } from "react-router-dom";
import AdvertRenderer from "../dynamic/Advert.componet";
import { useEffect, useRef, useState } from "react";
import Service from "../../services/Service";
import Server from "../../services/Server";
// import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const JobsSection = () => {
     const [ads,setAds] = useState(null);
     const [scrollPos, setScrollPos] = useState({atLeft: false});
     const adsRef = useRef(null);

     const catId = 'b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7';

     const fetchAds = async() => {
          // const res = await AdvertService.getByCategory({category_id: catId, limit: 20, offset: 0});
          const res = await Service.post(Server.advert.getApprovedAdsByCategory, {ids: [catId], limit: 8, offset: 0});
          if(res){
               const {data} = res;
               if(data && data.length){
                    setAds(data);
               }
          }
     }

     // const scrollHandle = (check) => {
     //      if(check === 1){
     //           adsRef.current.scrollBy({left: 300, behavior: 'smooth'});
     //      }else if(check === -1){
     //           adsRef.current.scrollBy({left: -300, behavior: 'smooth'})
     //      }
     // }

     const handleScroll = () => {
     const { scrollLeft, scrollWidth, clientWidth } = adsRef.current;
     setScrollPos({
          atLeft: scrollLeft === 0,
          atRight: scrollLeft + clientWidth >= scrollWidth,
     });
     };

     useEffect(() => {
          (async () => {
               await fetchAds();
          })()
     },[])

     useEffect(() => {
          const currentRef = adsRef.current;
          currentRef && currentRef.addEventListener('scroll', handleScroll);
      
          return () => {
            currentRef ? currentRef.removeEventListener('scroll', handleScroll) : null;
          };
        }, [ads]);
     return (
          <div className="w-full bg-white flex flex-col items-center justify-start gap-[10px] rounded-[5px] p-[5px] pb-[20px] md:px-[10px]">
               <div className="w-full py-[10px] flex items-center justify-start gap-[5px] ">
                    <h3 className="text-main-blue-700 text-[1.4rem] md:tex-[1.6rem] font-extrabold ">Today Jobs</h3>
                    <Link to='/category/Jobs?=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7' className="text-[0.7rem] md:text-[0.9rem] text-main-green-600 font-bold">View All</Link>
               </div>
               <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[10px] ">
                    {
                         ads && ads.length && Array.isArray(ads) && ads.map((item) => <AdvertRenderer key={item.ad_id} item={item} /> )
                    }
               </div>
          </div>
     )
}

export default JobsSection