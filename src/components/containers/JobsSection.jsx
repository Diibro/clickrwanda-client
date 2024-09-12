import { Link } from "react-router-dom";
import AdvertRenderer from "../dynamic/Advert.componet";
import { useEffect, useRef, useState } from "react";
import Service from "../../services/Service";
import Server from "../../services/Server";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

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

     const scrollHandle = (check) => {
          if(check === 1){
               adsRef.current.scrollBy({left: 300, behavior: 'smooth'});
          }else if(check === -1){
               adsRef.current.scrollBy({left: -300, behavior: 'smooth'})
          }
     }

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
          console.log(ads);
          const currentRef = adsRef.current;
          currentRef && currentRef.addEventListener('scroll', handleScroll);
      
          return () => {
            currentRef ? currentRef.removeEventListener('scroll', handleScroll) : null;
          };
        }, [ads]);
     return (
          <div className="container">
               <div className="ads-section-title">
                    <div className="title">
                         <h3 className="main-title">Available Jobs</h3>
                         <Link to='/category/Jobs?=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7'>View All</Link>
                    </div>
                    <div className="section-navigation">
                    <i  onClick={()=>scrollHandle(-1)} className={`${!scrollPos.atLeft  ? '' : 'inactive'}`} ><RiArrowLeftSLine/></i>
                    <i onClick={()=>scrollHandle(1)} className={`${!scrollPos.atRight ? '' : 'inactive'}`}><RiArrowRightSLine /></i>
                    </div>
               </div>
               <div className="ads-container-wrapped">
                    {
                              ads && ads.length && ads.map((item) => <AdvertRenderer key={item.ad_id} item={item} /> )
                    }
               </div>
          </div>
     )
}

export default JobsSection