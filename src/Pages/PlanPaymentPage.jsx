import { useContext, useEffect, useState } from "react"
import UserContext from "../Contexts/UserContext"
import AppData from "../Contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchIds } from "../utils/urlFunctions";
import { getActivePlan } from "../utils/subscriptionFunctions";
import { showMainNotification } from "../utils/AdminFunctions";
import { ActionBtn } from "../components/dynamic/Buttons";
import PropTypes from 'prop-types';
import Logo from '../assets/logo/clickrwanda.png'
import { formatPrice } from "../utils/otherFunctions";

const PlanPaymentPage = () => {
     const [user] = useContext(UserContext);
     const [data] = useContext(AppData);
     const [plan,setPlan] = useState(null);
     const [refId, setRefId] = useState(null);
     const [showInvoice, setShowInvoice] = useState(false);

     const {payPlans} = data;
     const {userInfo, loggedIn} = user;

     const location = useLocation();
     const navigate = useNavigate();

     useEffect(() => {
          const {v_id, r_id} = fetchIds(location);
          const activePlan = getActivePlan(payPlans, v_id);
          setRefId(r_id)
          setPlan(activePlan);
          
     },[payPlans, userInfo]);
     return (
          <div className="page payment-plan-page">
               <h1>Subscribe to: {plan ? `${plan?.plan_name} Plan` : "Plan"}</h1>
               <div className="plan-benefits-container">
                    <div className="benefits-container">
                         <p>By subscribing to this plan, you are allowed the following benefits.</p>
                         <ul>
                              {
                                   plan ? 
                                        plan?.description.allowed.map((item, index) => <li key={`plan-allowed-desc-${index}`}>{item}</li>)
                                   : null
                              }
                         </ul>
                         
                    </div>
                    <div className="plan-location-image-container">
                    <p>This is how your ad will appear on our website:</p>
                         {
                              plan ? <img src={plan?.location} width={600}/> : null
                         }
                    </div>
               </div>
               {
                    plan ? 
                    <div className="plan-duration-container">
                         <h4>Choose Duration</h4>
                         <div className="row">
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 1)}</b>
                                   <span>One Month</span>
                                   <ActionBtn action={() => {}} title="Pay"/>
                              </div>
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 3)}</b>
                                   <span>3 Month</span>
                                   <ActionBtn action={() => {}} title="Pay"/>
                              </div>
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 6)}</b>
                                   <span>6 Months</span>
                                   <ActionBtn action={() => {}} title="Pay"/>
                              </div>
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 12)}</b>
                                   <span>1 Year</span>
                                   <ActionBtn action={() => {}} title="Pay"/>
                              </div>
                         </div>
                    </div>
                    :null
               }
               {showInvoice ? 
               <div className="pay-plan-invoice-container">
                    <div className="confirm-payment-container">
                         <p>After payment to the provided details. Click here to confirmation the payment. <ActionBtn title="Confirm Payment" /></p>
                    </div>
                    <PlanInvoice item={{}} />
                    
               </div>
               : null}
          </div>
     )
}

const PlanInvoice = ({item}) => {
     return(
          <div className="plan-invoice" id="plan-invoice">
               <div className="header-row">
                    <img src={Logo} alt="Click Rwanda Logo" />
                    <div>
                         <h2>Invoice</h2>
                         <h3>No. 00001</h3>
                    </div>
               </div>
               <div className="header-row">
                    <div className="col">
                         <b>Payment ID: {}</b>
                         <b>Due Date:{}</b>
                         <b>Cient: </b>
                    </div>
               </div>
               <div className="invoice-table">
                    <table>
                         <thead>
                              <td>Description</td>
                              <td>Unity Price</td>
                              <td>Total Amount</td>
                         </thead>
                    </table>
               </div>
          </div>
     )
}

PlanInvoice.propTypes = {
     item: PropTypes.object
}
export default PlanPaymentPage