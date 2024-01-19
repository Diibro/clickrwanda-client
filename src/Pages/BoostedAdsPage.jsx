import { useEffect, useState } from "react";
import server from "../config/Server";
import Loading from "../components/static/Loading";
import { BoostedAds } from "../components/dynamic/Adverts.component";

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
          <>
               {loading ? <Loading /> : 
               <BoostedAds params={{wrap: true, ads}} />
               }
          </>
    </div>
  )
}

export default BoostedAdsPage;