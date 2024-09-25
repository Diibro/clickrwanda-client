// import { useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import HomeShopContainer from "../components/containers/HomeShopContainer"
import { RightBanner } from "../components/dynamic/Banners"
import { Banners } from "../config/banners"
const OurShopPage = () => {
     return (
          <div className="page-main">
               <div className="side"></div>
               <Routes>
                    <Route index path="/" element={<MainPage />} />
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
     
     const fetchParams = () => {

     }

     return (
          <div className="page">
               
          </div>
     )
}

export default OurShopPage