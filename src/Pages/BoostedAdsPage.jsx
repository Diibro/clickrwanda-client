import { useEffect, useState } from "react";
// import server from "../config/Server";
import Loading from "../components/static/Loading";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import AdvertService from '../services/Advert';

const BoostedAdsPage = () => {
     const [ads, setAds] = useState([]);
     const [loading, setLoading] = useState(false);

     const fetchData = async() => {
          try {
               setLoading(true);
               const {data} = await AdvertService.getAllApproved({listingAds:{limit: 100,offset:0}});
               if(data){
                    const {listingAds:boostedAds} = data;
               setAds(boostedAds);
               }
               
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
    <div className="w-full flex flex-col items-center gap-[10px]">
          <div className="best-sellers-header">
               <h3>Featured Ads</h3>
               <p>Discover the best ads choosen for you on Click Rwanda</p>
          </div>
          {loading ? <Loading /> : 
               <GeneralAdsContainer ads={ads} containerId={'featured-ads page-container'} />
          }
    </div>
  )
}

export default BoostedAdsPage;