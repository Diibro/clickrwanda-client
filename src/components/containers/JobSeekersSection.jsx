import { useEffect, useRef, useState } from "react";
import AdvertService from "../../services/Advert";
import { Link } from "react-router-dom";
import AdvertRenderer from "../dynamic/Advert.componet";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const JobSeekersSection = () => {
     const [ads,setAds] = useState(null);
     const [scrollPos, setScrollPos] = useState({atLeft: false});
     const adsRef = useRef(null);

     const catId = 'bed1566b-5901-4af9-ae80-708c293aa925';

     const fetchAds = async() => {
          const res = await AdvertService.getByCategory({category_id: catId, limit: 20, offset: 0});
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
                         <h3 className="main-title">Best Employees</h3>
                         <Link to='/category/Job-Seekers-CVs?=bed1566b-5901-4af9-ae80-708c293aa925'>View All</Link>
                    </div>
                    <div className="section-navigation">
                    <i  onClick={()=>scrollHandle(-1)} className={`${!scrollPos.atLeft  ? '' : 'inactive'}`} ><RiArrowLeftSLine/></i>
                    <i onClick={()=>scrollHandle(1)} className={`${!scrollPos.atRight ? '' : 'inactive'}`}><RiArrowRightSLine /></i>
                    </div>
               </div>
               <div className="home-boosted-ads">
                    <div className="ads-container hide-scroll"  ref={adsRef}>
                         {
                              ads && ads.length && ads.map((item) => <AdvertRenderer key={item.ad_id} item={item} /> )
                         }
                    </div>
               </div>
          </div>
     )
}

export default JobSeekersSection