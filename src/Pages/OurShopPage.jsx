// import { useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import HomeShopContainer from "../components/containers/HomeShopContainer"
import { TopDealsSidebanners } from "../config/banners"
import { useEffect, useState } from "react"
import Service from '../services/Service';
import Server from "../services/Server"
import {categories} from "../data/HotCategories.json";
import PropTypes from 'prop-types';
import { GeneralAdsContainer } from "../components/containers/AdsContainer"
import { SideBannerContainer } from "../components/banners/SideBanners"
import BlogsContainer from "../components/containers/BlogContainers";
const OurShopPage = () => {
     return (
          <div className="w-full flex flex-col items-center gap-[10px]" id={'our-shop-page-id'}>
               <Routes>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/*" element={<ItemsPage />} />
               </Routes>
          </div>
     )
}

const MainPage = () => {
     return (
          <HomeShopContainer />
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
     const [blogs,setBlogs] = useState(null);

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
               const res = subId ? await Service.post(Server.advert.getSpecialShopAds, {subIds: [subId], userIds: shopIds, limit: 50, offset: 0}) : null;
               
               if(res) {
                    setAds(res.data);
               }
               const {pathname} = location;
               const subName = pathname.split('/')[2];
               const resBlogs = await Service.get(`${Server.blog}?category=${subName}`);
               if(resBlogs) setBlogs(resBlogs.data);
               
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
          <div className="w-full flex items-start gap-[5px]">
               <div className="w-full lg:[85%] rounded-[5px]">
                    <Header category={searched} />
                    {
                         loading ? <p className="no-ads-found">Loading data...</p> :
                         <div className="w-full flex flex-col gap-[10px]">
                              {
                                   ads && ads.length > 0 && <GeneralAdsContainer ads={ads} containerId={'our-shop-page-ads-container'} /> 
                              }
                              {
                                   blogs && blogs.length > 0 && <BlogsContainer blogs={blogs} containerId={'our-shop-page-blogs'} />
                              }
                         </div>
                    }
                    {(!ads || !ads.length) && (!blogs || !blogs.length) && <p className="no-ads-found">No {searched.sub_name} found!!!</p>}
               </div>
               <div className="hidden lg:flex lg:w-[15%] rounded-[5px] h-auto py-[10px]">
                    <SideBannerContainer banners={TopDealsSidebanners} changeArr={[ads]} containerId={"our-shop-page-id"} />
               </div>
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


Header.propTypes = {
     category: PropTypes.object
}


export default OurShopPage