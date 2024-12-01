import { useEffect, useState } from 'react';
import {  Route, Routes,   } from 'react-router-dom';
import AdvertService from '../services/Advert'
// import { VerticalAds } from '../components/dynamic/Adverts.component';
// import { RightBanner } from '../components/dynamic/Banners';
// import { Banners } from '../config/banners';
import { GeneralAdsContainer } from '../components/containers/AdsContainer';

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
     
     const [ads,setAds] = useState(null);
     const [loading,setLoading] = useState(false);

     const fetchAds = async () => {
          setLoading(true);
          const res = await AdvertService.getClientApprovedCommissionAds({limit:200, offset:0});
          if(res && res.data){
               setAds(res.data);
          }
          setLoading(false);
     }


     useEffect(() => {
          (async() => await fetchAds())();
     },[]);

     
     return(
          <div className="w-full flex flex-col items-center gap-[10px]">
               {
                    loading ? <p className='text-[0.9rem] font-mono text-gray-800'>Loading...</p> :
                    ads && ads.length ? 
                    <GeneralAdsContainer ads={ads} containerId={'commission-ads-container'}  />
                    :
                    <p className='no-ads-found'>No ads found</p>
               }
          </div>
     )
}



export default MarketPage