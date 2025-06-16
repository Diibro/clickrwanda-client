import { useQuery } from "@tanstack/react-query";
import { MainServer } from "../../../services/beta/server";
import { BetaEndpoints } from "../../../services/beta/endpoints";
import { SlideAdsContainers } from "../../containers/AdsContainer";
import LoadingAds from "./LoadingAds";

const TopDealsSection = () => {
     const {data,isLoading, error} = useQuery({queryKey:["topDealsAds"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=20&by-date=desc&is-commission-ad=true&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`),  staleTime: 0, refetchInterval: 0,refetchOnMount: "always",refetchOnReconnect: true,});
     if(isLoading) return <LoadingAds />
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
     return (
          <section className="w-full pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white ">
               {
                    ads && Array.isArray(ads) && ads.length > 0 &&
                    <SlideAdsContainers ads={ads} containerId={"home-commission-ads-container"} content={{title: "Today deals", viewAll: "View All", viewAllLink: "/market"}} />
               }
          </section>
     )
}

export default TopDealsSection