import { useEffect, useState } from "react";
// import server from "../config/Server";
import Loading from "../components/static/Loading";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import AdvertService from "../services/Advert";

const TopDealsPage = () => {
     const [ads, setAds] = useState([]);
     const [loading, setLoading] = useState(false);

     const fetchData = async() => {
          try {
               setLoading(true);
               const {data} = await AdvertService.getAllApproved({urgentAds: {limit: 100,offset:0}});
               if(data) {
                    const {urgentAds:discounted} = data;
                    setAds(discounted);
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
               <h3>Today Deals</h3>
               <p>Discover the best deals on Click Rwanda.</p>
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[20px] py-[5px] relative">
          {loading ? <Loading /> : 
          <GeneralAdsContainer ads={ads} containerId={"top-ads-page"} />
          }
          </div>
    </div>
  )
}

export default TopDealsPage