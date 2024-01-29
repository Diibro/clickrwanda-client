import { useEffect, useState } from "react";
import server from "../config/Server";
import Loading from "../components/static/Loading";
import { BoostedAds } from "../components/dynamic/Adverts.component";
import { LeftBanner, RightBanner } from "../components/dynamic/Banners";

const BoostedAdsPage = () => {
     const [ads, setAds] = useState([]);
     const [loading, setLoading] = useState(false);

     const fetchData = async() => {
          try {
               setLoading(true);
               const {boostedAds} = await server.get('adverts', {boost:100});
               setAds(boostedAds);
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }
     useEffect(() => {
          (async () => await fetchData())();
     }, [])
  return (
    <div className="page">
          <div className="best-sellers-header">
               <h3>Featured Ads</h3>
               <p>Discover the best ads choosen for you on Click Rwanda</p>
          </div>
          <div className="page-main">
               <div className="side">
                    <LeftBanner />
               </div>
               <div className="page-content">
                    {loading ? <Loading /> : 
                    <BoostedAds params={{wrap: true, ads}} />
                    }
               </div>
               <div className="side">
                    <RightBanner />
               </div>
          </div>
    </div>
  )
}

export default BoostedAdsPage;