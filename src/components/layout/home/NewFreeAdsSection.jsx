import { useQuery } from "@tanstack/react-query"
import { MainServer } from "../../../services/beta/server"
import { BetaEndpoints } from "../../../services/beta/endpoints";
import { GeneralAdsContainer } from "../../containers/AdsContainer";

const NewFreeAdsSection = () => {
     const {data,isLoading, error} = useQuery({queryKey:["newFreeAds"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=12&plan-id=plan_001&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`)});
     if(isLoading) return <div>Loading...</div>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
     return (
          <section className="w-full flex flex-col items-center gap-[10px] pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white ">
               <div className="w-full flex items-center justify-between">
                    <h2 className="text-main-blue-700 text-[1.6rem] font-extrabold ">New Ads</h2>
               </div>
               {ads && ads.length > 0 && <GeneralAdsContainer ads={ads} containerId={"Home-general-ads-container"} /> }
          </section>
     )
}

export default NewFreeAdsSection