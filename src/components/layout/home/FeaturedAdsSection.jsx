import { useQuery } from "@tanstack/react-query";
import { SideBannerContainer } from "../../banners/SideBanners";
import { FeaturedAdsSidebanners } from "../../../config/banners";
import { SlideAdsContainers } from "../../containers/AdsContainer";
import { BetaEndpoints } from "../../../services/beta/endpoints";
import { MainServer } from "../../../services/beta/server";
import LoadingAds from "./LoadingAds";

const FeaturedAdsSection = () => {
     const {data,isLoading, error} = useQuery({
          queryKey:["featuredAds"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=20&plan-ids=plan_002,plan_004,plan_009,plan_12,plan_13,plan_14,plan_16,plan_17,plan_18,plan_19&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`),
          staleTime: 0, refetchInterval: 0,refetchOnMount: "always",refetchOnReconnect: true,
     });
     if(isLoading) return <LoadingAds />
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
     return (
          <section className="w-full flex items-center gap-[5px]  rounded-[5px]">
               <div className="w-full h-full lg:[85%] bg-white rounded-[5px] p-[10px]" id="home-featured-ads-container">
                    { ads && Array.isArray(ads) && ads.length > 0 && <SlideAdsContainers ads={ads} containerId={"home-featured-ads"} content={{title: "Featured Ads", viewAll: "View All", viewAllLink: '/sponsored-ads' }} />}
               </div>
               <div className="hidden lg:flex lg:w-[15%] bg-white rounded-[5px] h-auto">
                    <SideBannerContainer banners={FeaturedAdsSidebanners} containerId={"home-featured-ads-container"} changeArr={[ads]} />
               </div>
          </section>
     )
}

export default FeaturedAdsSection