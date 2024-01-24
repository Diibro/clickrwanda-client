import { Helmet } from "react-helmet"
import { PaymentPlansContainer } from "../components/static/PaymentPlans.component"

const PaymentPlans = () => {
  return (
    <>
    <Helmet>
      <title>Membership Plans | Click Rwanda</title>
    </Helmet>
    <div className="page gray-back">
          <div className="payment-plans-page-header">
               <h3>Our Packages</h3>
               <p>Increase your sales and visibility with our boost packages.</p>
          </div>
          <div className="payment-plans-page-body">
            <PaymentPlansContainer />
          </div>
          <div className=""></div>
    </div>
    </>
    
  )
}

export default PaymentPlans