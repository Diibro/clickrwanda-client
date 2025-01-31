import { useQuery } from "@tanstack/react-query";
import { MainServer } from "../../../services/beta/server";
import { BetaEndpoints } from "../../../services/beta/endpoints";
import { getItemUrl } from "../../../utils/urlFunctions";
import { CategoryContainerSquare } from "../../dynamic/Containers";
import CategoriesLoader from "./CategoriesLoader";

const CategoriesSection = () => {
     const {data,isLoading, error} = useQuery({queryKey:["categories"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.category}`), staleTime: 120000, refetchInterval: 120000,});
     if(isLoading) return <CategoriesLoader />
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const categories = data ? data.data : null
     return (
          <div className=' w-full bg-white flex flex-col items-center rounded-[5px] p-[10px] '>
          {!categories ? null : categories[0] ? (
               <>
               <div className='w-full flex items-center gap-[10px] '>
                    <h2 className='text-main-blue-700 text-[1.4rem] md:tex-[1.6rem] font-extrabold '>Our top Categories</h2>
               </div>
               <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-[10px] md:gap-[20px] '>
                    {Array.isArray(categories)  ? categories.map(
                         (item) => item.category_id !== "d5bc3430-c1ce-4802-be23-b243a40229e3" ? <CategoryContainerSquare 
                              view={`/category/${getItemUrl(item.category_name, item.category_id)}`}
                              key={item.category_id} 
                              image={item.category_icon}
                              title={item.category_name}
                              ads_no={item.total_adverts > 0 ?` ${item.total_adverts} ads`: 'no ads'}
                              /> :null
                    )
                    : null}
               </div>
               </>
          
          ) : categories.status ? null : null }
          </div>
     )
}

export default CategoriesSection