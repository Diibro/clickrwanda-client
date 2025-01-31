import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"
import { MainServer } from "../../../services/beta/server";
import { BetaEndpoints } from "../../../services/beta/endpoints";
import AdvertRenderer from "../../dynamic/Advert.componet";
import LoadingJobs from "./LoadingJobs";


const TopJobsSection = () => {
     const {data,isLoading, error} = useQuery({queryKey:["topJobsAds-1"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&by-date=desc&take=20&category-id=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7`),  staleTime: 120000, refetchInterval: 120000,refetchIntervalInBackground: false,refetchOnReconnect: true,});
     if(isLoading) return <LoadingJobs/>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null
     return (
          <div className="w-full bg-white flex flex-col items-center justify-start gap-[10px] rounded-[5px] p-[5px] pb-[20px] md:px-[10px]">
               <div className="w-full py-[10px] flex items-center justify-start gap-[5px] ">
                    <h3 className="text-main-blue-700 text-[1.4rem] md:tex-[1.6rem] font-extrabold ">Today Jobs</h3>
                    <Link to='/category/Jobs?=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7' className="text-[0.7rem] md:text-[0.9rem] text-main-green-600 font-bold">View All</Link>
               </div>
               <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[10px] ">
                    {
                         ads && ads.length > 0 && Array.isArray(ads) && ads.map((item) => <AdvertRenderer key={item.ad_id} item={item} /> )
                    }
               </div>
          </div>
     )
}

export default TopJobsSection