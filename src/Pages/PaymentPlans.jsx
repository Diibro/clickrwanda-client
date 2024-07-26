import { Helmet } from "react-helmet"
import { PaymentPlanChoice } from "../components/static/PaymentPlans.component"
import {Routes, Route} from "react-router-dom";
import UserPlansContainer from "../User/components/containers/UserPlansContainer";

const PaymentPlans = () => {
  return (
    <>
    <Helmet>
      <title>Membership Plans | Click Rwanda</title>
    </Helmet>
    <div className="page gray-back">
          <Routes>
            <Route path="/" element={<>
              <div className="payment-plans-page-header">
                  <h3>Our Packages</h3>
                  <p>Increase your sales and visibility with our boost packages.</p>
              </div>
              <div className="payment-plans-page-body">
                {/* <PaymentPlansContainer /> */}
                <UserPlansContainer />
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