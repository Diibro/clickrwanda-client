import { ActionBtn } from "../dynamic/Buttons";
import { TickIcon } from "./Icons";

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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const BasicPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const PremiumPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const SponseredPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const UrgentPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const TopDealsPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const TopSellersPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

export const BannersPlan = () => {
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
               </div>
               <div className="foot">
                    <ActionBtn title="Choose Package" />
               </div>
          </div>
     )
}

