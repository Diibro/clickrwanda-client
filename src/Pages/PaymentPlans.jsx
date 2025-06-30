import { Helmet } from "react-helmet"
import { PaymentPlanChoice } from "../components/static/PaymentPlans.component"
import {Routes, Route} from "react-router-dom";
// import UserPlansContainer from "../User/components/containers/UserPlansContainer";
import PlansContainer from "../components/containers/PlansContainer";
import { BannerPlans, BusinessPlans, IndividualSellerPlans, SellForMePlans } from "../data/plans";

const PaymentPlans = () => {
  return (
    <>
    <Helmet>
      <title>Membership Plans | Click Rwanda</title>
    </Helmet>
    <div className="w-full flex flex-col items-center gap-[10px]">
          <Routes>
            <Route path="/" element={<>
              <div className="w-full rounded-[5px] py-12 flex flex-col items-center justify-center gap-[5px]  bg-main-blue-700 ">
                  <h3 className="text-[1.8rem] text-white font-bold ">Our Packages</h3>
                  <p className="text-gray-200 text-[0.9rem] md:text-[0.85rem] ">Increase your sales and visibility with our boost packages.</p>
              </div>
              <div className="w-full flex flex-col items-center justify-start ">
                {/* <PaymentPlansContainer /> */}
                {/* <UserPlansContainer /> */}
                <PlansContainer planGroup={IndividualSellerPlans} />
                <PlansContainer planGroup={BusinessPlans} />
                <PlansContainer planGroup={SellForMePlans} />
                <PlansContainer planGroup={BannerPlans} />
              </div>
            </>} /> 
            <Route path="/:planName" element={<PaymentPlanChoice />} />
          </Routes>
          
          <div className=""></div>
    </div>
    </>
    
  )
}

export default PaymentPlans