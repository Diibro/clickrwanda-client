import Loading from "../components/static/Loading";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import { useQuery } from "@tanstack/react-query";
import { MainServer } from "../services/beta/server";
import { BetaEndpoints } from "../services/beta/endpoints";

const BoostedAdsPage = () => {
     const {data,isLoading, error} = useQuery({queryKey:["featuredAdsPage"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=40&by-date=desc&plan-ids=plan_002,plan_004,plan_009,plan_12,plan_13,plan_14,plan_16,plan_17,plan_18,plan_19&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`)});
     if(isLoading) return <div>Loading...</div>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
  return (
    <div className="w-full flex flex-col items-center gap-[10px]">
          <div className="best-sellers-header">
               <h3 className="text-[1.6rem] font-extrabold">Featured Ads</h3>
               <p>Discover the best ads choosen for you on Click Rwanda</p>
          </div>
          {isLoading ? <Loading /> : 
               ads && ads.length ? <GeneralAdsContainer ads={ads} containerId={'featured-ads page-container'} /> : 
               <div className="w-full flex items-center justify-center gap-[10px]">
                    <p>No ads available at the moment.</p>
               </div>
          }
    </div>
  )
}

export default BoostedAdsPage;