import { useEffect, useState } from 'react';
import {  Route, Routes,   } from 'react-router-dom';
import AdvertService from '../services/Advert'
import { VerticalAds } from '../components/dynamic/Adverts.component';
import { RightBanner } from '../components/dynamic/Banners';
import { Banners } from '../config/banners';

const MarketPage = () => {
     
  return (
     <Routes>
          <Route path='/' index element={<MainPage />} />
     </Routes>
  )
}

const MainPage = () => {
     
     return (
          <div className="page">
               <MarketPageHeader />
               <AdsContainer />
          </div>
     )
}

const MarketPageHeader = () => {
     return (
          <div className="market-page-title">
               <h1>Welcome to our Marketplace</h1>
               <p>Buy best rated products on clickrwanda Market Place</p>
          </div>
     )
}


const AdsContainer = () => {
     
     const [ads,setAds] = useState(null);

     const fetchAds = async () => {
          const res = await AdvertService.getClientApprovedCommissionAds({limit:200, offset:0});
          if(res && res.data){
               setAds(res.data);
          }
     }


     useEffect(() => {
          (async() => await fetchAds())();
     },[]);

     
     return(
          <div className="page-main">
               <div className="side"></div>
               <div className="page-content">
                    {
                         ads && ads.length ? 
                         <VerticalAds ads={ads} adsNo={50} eleId={'commission-ads-container'}  />
                         :
                         <p className='no-ads-found'>No ads found</p>
                    }
               </div>
               <div className="side right-side">
                    <RightBanner items={Banners} />
               </div>
               
          </div>
     )
}



export default MarketPage