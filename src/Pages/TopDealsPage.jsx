
// import server from "../config/Server";
import Loading from "../components/static/Loading";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import { useQuery } from "@tanstack/react-query";
import { MainServer } from "../services/beta/server";
import { BetaEndpoints } from "../services/beta/endpoints";

const TopDealsPage = () => {
     const {data,isLoading, error} = useQuery({queryKey:["urgentAdsPage"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=40&plan-ids=plan_003,plan_20&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`)});
     if(isLoading) return <div>Loading...</div>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
     console.log(data);
  return (
    <div className="w-full flex flex-col items-center gap-[10px]">
          <div className="best-sellers-header">
               <h3 className="text-[1.6rem] font-extrabold ">Today Deals</h3>
               <p>Discover the best deals on Click Rwanda.</p>
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[20px] py-[5px] relative">
          {isLoading ? <Loading /> :
          ads && ads.length > 0 ? 
          <GeneralAdsContainer ads={ads} containerId={"top-ads-page"} />
          : <div className="w-full flex items-center justify-center gap-[10px]">
               <p>No deals available at the moment.</p>
          </div>
          }
          </div>
    </div>
  )
}

export default TopDealsPage