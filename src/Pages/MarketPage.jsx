import {  Route, Routes,   } from 'react-router-dom';
import { GeneralAdsContainer } from '../components/containers/AdsContainer';
import { useQuery } from '@tanstack/react-query';
import { MainServer } from '../services/beta/server';
import { BetaEndpoints } from '../services/beta/endpoints';

const MarketPage = () => {
     
  return (
     <Routes>
          <Route path='/' index element={<MainPage />} />
     </Routes>
  )
}

const MainPage = () => {
     
     return (
          <div className="w-full flex flex-col items-center gap-[10px]">
               <MarketPageHeader />
               <AdsContainer />
          </div>
     )
}

const MarketPageHeader = () => {
     return (
          <div className="w-full bg-main-blue-700 flex flex-col items-center gap-[10px] py-[20px] rounded-[5px]">
               <h1 className='text-[1.6rem] font-bold text-gray-50 text-center '>Welcome to our Marketplace</h1>
               <p className='text-[0.8rem] text-gray-400 text-center '>Buy best rated products on clickrwanda Market Place</p>
          </div>
     )
}


const AdsContainer = () => {
     const {data,isLoading, error} = useQuery({queryKey:["topDealsAdsPage"],queryFn:async () => await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=40&by-date=desc&is-commission-ad=true&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`)});
     if(isLoading) return <div>Loading...</div>
     if(error instanceof Error) return <div>Error: {error.message}</div>
     const ads = data ? data.data : null

     
     return(
          <div className="w-full flex flex-col items-center gap-[10px]">
               {
                    isLoading ? <p className='text-[0.9rem] font-mono text-gray-800'>Loading...</p> :
                    ads && ads.length ? 
                    <GeneralAdsContainer ads={ads} containerId={'commission-ads-container'}  />
                    :
                    <p className='no-ads-found'>No ads found</p>
               }
          </div>
     )
}



export default MarketPage