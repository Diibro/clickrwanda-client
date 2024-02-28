import { useEffect, useState } from "react";
import server from "../config/Server";
import Loading from "../components/static/Loading";
import { TodayDeals } from "../components/dynamic/Adverts.component";
import { RightBanner } from "../components/dynamic/Banners";
import { Banners } from "../config/banners";

const TopDealsPage = () => {
     const [ads, setAds] = useState([]);
     const [loading, setLoading] = useState(false);

     const fetchData = async() => {
          try {
               setLoading(true);
               const {discounted} = await server.get('adverts', {todayDeals:100});
               setAds(discounted);
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
               <h3>Today Deals</h3>
               <p>Discover the best deals on Click Rwanda.</p>
          </div>
          <div className="page-main">
               <div className="side"></div>
               <div className="page-content">
                    {loading ? <Loading /> : 
                    <TodayDeals params={{wrap: true, ads}} />
                    }
               </div>
               
               <div className="side"><RightBanner items={Banners} /></div>
          </div>
    </div>
  )
}

export default TopDealsPage