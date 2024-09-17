import { useEffect, useRef, useState } from "react"
import AdvertService from '../../services/Advert';
import { Link } from "react-router-dom";
import AdvertRenderer from "../dynamic/Advert.componet";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const HomeCommissionAds = () => {
     const [ads,setAds] = useState(null);
     const [scrollPos, setScrollPos] = useState({atLeft: false});
     const adsRef = useRef(null);

     const fetchAds = async() => {
          const res = await AdvertService.getClientApprovedCommissionAds({limit: 20, offset:0});
          console.log(res);
          if(res){
               setAds(res.data);
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
          })();
     },[])

     useEffect(() => {
          const currentRef = adsRef.current;
          currentRef && currentRef.addEventListener('scroll', handleScroll);
      
          return () => {
            currentRef ? currentRef.removeEventListener('scroll', handleScroll) : null;
          };
        }, [ads]);
     return (
          <>
               {
                    ads ? 
                    <div className="container">
                         <div className="ads-section-title">
                              <div className="title">
                                   <h3 className="main-title">Hot Deals</h3>
                                   <Link to={'/market'}>View All</Link>
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
                    :null
               }
          </>
     )
}

export default HomeCommissionAds