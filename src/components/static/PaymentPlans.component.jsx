import { ActionBtn } from "../dynamic/Buttons";
import { TickIcon } from "./Icons";

import Sponsored from "../../assets/plansLocations/sponsoredAds.png"
import Featured from "../../assets/plansLocations/featuredAds.png"
import BestSellers from "../../assets/plansLocations/bestSellers.png"
import NewAds from "../../assets/plansLocations/newAds.png"
import TopDeals from "../../assets/plansLocations/topDeals.png"
import BannerImage from "../../assets/plansLocations/banners.png"
import { useLocation, useNavigate } from "react-router-dom";

export const PaymentPlansContainer = () => {
     return (
          <div className="pay-plans-container">
               <div className="row">
                    <h3>General Packages</h3>
                    <FreePlan />
                    <BasicPlan />
                    <PremiumPlan />
                    <SponseredPlan />
               </div>
               <div className="row">
                    <h3>Extra Boost Packages</h3>
                    <UrgentPlan/>
                    <TopDealsPlan />
                    <TopSellersPlan />
                    <BannersPlan />
               </div>
          </div>
     )
}


export const FreePlan = () => {
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Free Package</h2>
                    <p className="price">Free</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/> Listed in New Ads</li>
                         <li><TickIcon/>Ads allowed: 10ads</li>
                         <li><TickIcon/>Limited Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li className="crossed-text">Promotion For selected Ads</li>
                         <li className="crossed-text">Personal Support Manager</li>
                         <li className="crossed-text">Email & Social Media promotion</li>
                         <li className="crossed-text">Social Media/Website Link inclusion</li>
                         <li className="crossed-text">Youtube Video Promotion</li>
                    </ul>
                    <div className="image">
                         <img src={NewAds} loading="lazy" alt="news ads images" />
                    </div>
               </div>
               <div className="foot">
                    {/* <ActionBtn title="Choose Package" /> */}
                    <p>Default Package</p>
               </div>
          </div>
     )
}

export const BasicPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Basic Package</h2>
                    <p className="price">Rwf 17,500 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Listed in Featured Ads</li>
                         <li><TickIcon/>Ads allowed: 100ads</li>
                         <li><TickIcon/>Promotion Power: 2x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: 15ads</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li className="crossed-text">Email & Social Media promotion</li>
                         <li className="crossed-text">Social Media/Website Link inclusion</li>
                         <li className="crossed-text">Youtube Video Promotion</li>
                    </ul>
                    <div className="image">
                         <img src={Featured} alt="featured ads" loading="lazy" />
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate("/payment-plans/basic-plan")} />
               </div>
          </div>
     )
}

export const PremiumPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Premium Package</h2>
                    <p className="price">Rwf 45,000 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Listed in Featured Ads</li>
                         <li><TickIcon/>Ads allowed: 100ads</li>
                         <li><TickIcon/>Promotion Power: 10x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: 15ads</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li><TickIcon/>Email & Social Media promotion</li>
                         <li>Youtube Video Promotion</li>
                         <li className="crossed-text">Social Media/Website Link inclusion</li>
                    </ul>
                    <div className="image">
                         <img src={Featured} alt="featured ads" loading="lazy" />
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate("/payment-plans/premium-plan")} />
               </div>
          </div>
     )
}

export const SponseredPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Sponsored Package</h2>
                    <p className="price">Rwf 50,000 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Position on the bottom of the website </li>
                         <li><TickIcon/>Ads allowed: 100ads</li>
                         <li><TickIcon/>Promotion Power: 15x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: 1ad</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li><TickIcon/>Email & Social Media promotion</li>
                         <li><TickIcon/>Social Media/Website Link inclusion</li>
                         <li><TickIcon/>Youtube Video Promotion</li>
                    </ul>
                    <div className="image">
                         <img src={Sponsored} alt="sponsered ads" loading="lazy" />
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate("/payment-plans/sponsored-plan")} />
               </div>
          </div>
     )
}

export const UrgentPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Urgent Package</h2>
                    <p className="price">Rwf 10,000 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Listed in Featured Ads</li>
                         <li><TickIcon/>Ads allowed: 100ads</li>
                         <li><TickIcon/>Promotion Power: 10x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: 1ad</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li><TickIcon/>Email & Social Media promotion</li>
                         <li><TickIcon/>Youtube Video Promotion</li>
                         <li className="crossed-text">Social Media/Website Link inclusion</li>
                    </ul>
                    <div className="image">
                         <img src={Featured} alt="featured ads" loading="lazy" />
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate("/payment-plans/urgent-plan")} />
               </div>
          </div>
     )
}

export const TopDealsPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Top Deals</h2>
                    <p className="price">Rwf 15,000 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Listed in Top Deals</li>
                         <li><TickIcon/>Positon on top of the website</li>
                         <li><TickIcon/>Promotion Power: 15x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: 1ad</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li><TickIcon/>Email & Social Media promotion</li>
                         <li><TickIcon/>Youtube Video Promotion</li>
                         <li className="crossed-text">Social Media/Website Link inclusion</li>
                    </ul>
                    <div className="image">
                         <img src={TopDeals} alt="top Deals ads" loading="lazy"  />
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate("/payment-plans/top-deals-plan")} />
               </div>
          </div>
     )
}

export const TopSellersPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Top Sellers</h2>
                    <p className="price">Rwf 50,000 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Listed in “Our Top Sellers”</li>
                         <li><TickIcon/>Positon on top of the website</li>
                         <li><TickIcon/>Promotion Power: 15x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: All Ads</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li><TickIcon/>Email & Social Media promotion</li>
                         <li><TickIcon/>Social Media/Website Link inclusion</li>
                         <li><TickIcon/>Youtube Video Promotion</li>
                    </ul>
                    <div className="image">
                         <img src={BestSellers} alt="best sellers" loading="lazy" />
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate("/payment-plans/top-sellers-plan")} />
               </div>
          </div>
     )
}

export const BannersPlan = () => {
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">Banners</h2>
                    <p className="price">Rwf 75,000 /Month</p>
               </div>
               <div className="body">
                    <ul>
                         <li><TickIcon/>Listed in “Our Banners”</li>
                         <li><TickIcon/>Positon on top of the website</li>
                         <li><TickIcon/>Promotion Power: 20x Ad Views</li>
                         <li><TickIcon/>Adress & Contact Visibility</li>
                         <li><TickIcon/>Ads Promoted: All Ads</li>
                         <li><TickIcon/>Personal Support Manager</li>
                         <li><TickIcon/>Email & Social Media promotion</li>
                         <li><TickIcon/>Social Media/Website Link inclusion</li>
                         <li><TickIcon/>Youtube Video Promotion</li>
                    </ul>
                    <div className="image">
                         <img src={BannerImage} alt="banners"  loading="lazy"/>
                    </div>
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" action={() => navigate('/payment-plans/banners') } />
               </div>
          </div>
     )
}

export const PaymentPlanChoice = () => {
     // const location = useLocation()
     // const {pathname} = location
     // const pathSegments = pathname.split("/")
     // let currentPath = pathSegments[pathSegments.length - 1]
     return(
          <div className="payment-plan-choice">
               {/* <h2>{currentPath}</h2> */}
               <div><p>Not Available</p></div>
          </div>
     )
     
}
