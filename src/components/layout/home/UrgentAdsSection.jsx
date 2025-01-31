import { useQuery } from "@tanstack/react-query";
import { MainServer } from "../../../services/beta/server";
import { BetaEndpoints } from "../../../services/beta/endpoints";
import { SideBannerContainer } from "../../banners/SideBanners";
import { TopDealsSidebanners } from "../../../config/banners";
import { SlideAdsContainers } from "../../containers/AdsContainer";

const UrgentAdsSection = () => {
     const {data,isLoading, error} = useQuery({queryKey:["urgentAds"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=20&plan-ids=plan_003,plan_20&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`),  staleTime: 120000, refetchInterval: 120000,});
     if(isLoading) return <div>Loading...</div>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
     return (
          <section className="w-full flex items-center gap-[5px]  rounded-[5px] ">
               <div className="w-full lg:[85%] bg-white rounded-[5px] p-[10px] " id="top-deals-ads">
               { ads && Array.isArray(ads) && ads.length > 0 && <SlideAdsContainers ads={ads} containerId={"home-top-deals"} content={{title: "Promotions and Discount deals", viewAll: "View All", viewAllLink: '/top-deals' }} />}
               </div>
               <div className="hidden lg:flex lg:w-[15%] bg-white rounded-[5px] h-auto">
               <SideBannerContainer banners={TopDealsSidebanners} containerId={"top-deals-ads"} changeArr={[ads]} />
               </div>
          </section>
     )
}

export default UrgentAdsSection