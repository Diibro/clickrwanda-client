import { useEffect, useState } from "react";
import server from "../config/Server";
import Loading from "../components/static/Loading";
import { TodayDeals } from "../components/dynamic/Adverts.component";

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
          <>
               {loading ? <Loading /> : 
               <TodayDeals params={{wrap: true, ads}} />
               }
          </>
    </div>
  )
}

export default TopDealsPage