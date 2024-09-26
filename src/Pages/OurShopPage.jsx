// import { useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import HomeShopContainer from "../components/containers/HomeShopContainer"
import { RightBanner } from "../components/dynamic/Banners"
import { Banners } from "../config/banners"
import { useEffect, useState } from "react"
import Service from '../services/Service';
import Server from "../services/Server"
import {categories} from "../data/HotCategories.json";
import PropTypes from 'prop-types';
import AdvertRenderer from "../components/dynamic/Advert.componet"
const OurShopPage = () => {
     return (
          <div className="page-main">
               <div className="side"></div>
               <Routes>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/*" element={<ItemsPage />} />
               </Routes>
               <div className="side">
                    <RightBanner items={Banners}  />
               </div>
          </div>
     )
}

const MainPage = () => {
     // const [ads,setAds] = useState(null)
     return (
          <div className="page-content">
               <HomeShopContainer />
          </div>
     )
}

const ItemsPage = () => {
     const location = useLocation();
     const [searched, setSearched] = useState("")
     const shopIds = [
          "1f8aeeaa-f580-4081-a5b3-1ad5447ebad7",
          "f6f2d43f-dd46-4ae3-86dc-fafcd9a3b452"
     ]
     const [loading, setLoading] = useState(false);

     const [ads,setAds] = useState(null);
     
     const fetchParams = () => {
          const {pathname} = location;
          const subName = pathname.split('/')[2].split('-').join(' ');
          categories.forEach(cat => {
               cat.subs.forEach(sub => {
                    if(sub.sub_name === subName){
                         setSearched(sub);
                         return;
                    }
               })
          })
     }

     const fetchAds = async () => {
          try {
               setLoading(true);
               const subId = location.search.split("?=")[1];
               const res = await Service.post(Server.advert.getSpecialShopAds, {subIds: [subId], userIds: shopIds, limit: 500, offset: 0});
               if(res) {
                    setAds(res.data);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
          
     } 

     useEffect(() => {
          fetchParams();
          (async() => await fetchAds())();
     }, [location.pathname])

     return (
          <div className="page">
               <Header category={searched} />
               {
                    loading ? <p className="no-ads-found">Loading data...</p> :
                    ads && ads.length ? <AdsContainer ads={ads}/> :
                    <p className="no-ads-found">No {searched.sub_name} found!!!</p>
               }
          </div>
     )
}

const Header = ({category}) => {
     const styles = {
          backgroundImage: `url(${category.image})`
     }
     return (
          <div className="market-page-category-page-header" style={styles}>
               <div className="content">
                    <h3>{category.sub_name}</h3>
               </div>
          </div>
     )
}

const AdsContainer = ({ads}) => {
     return (
          <div className="our-shop-page-ads-container">
               {
                    ads.map((ad, index) => <AdvertRenderer item={ad} key={`our-shop-ad-${index}`} />)
               }
          </div>
     )
}

Header.propTypes = {
     category: PropTypes.object
}

AdsContainer.propTypes = {
     ads: PropTypes.arrayOf(Object)
}

export default OurShopPage