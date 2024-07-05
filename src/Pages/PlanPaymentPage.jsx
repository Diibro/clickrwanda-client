import { useContext, useEffect, useRef, useState } from "react"
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
import PlanSubscriptionService from "../services/PlanSubscription";
import { extractDateOnly, getDateToday } from "../utils/dateFunctions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PlanPaymentPage = () => {
     const [user] = useContext(UserContext);
     const [data] = useContext(AppData);
     const [plan,setPlan] = useState(null);
     const [refId, setRefId] = useState(null);
     const [showInvoice, setShowInvoice] = useState(false);
     const [invoice,setInvoice] = useState({});
     const invoiceRef = useRef();

     const {payPlans} = data;
     const {userInfo} = user;

     const location = useLocation();
     const navigate = useNavigate();

     const updateInvoice = async(item) => {
          const subNo = await PlanSubscriptionService.countAll();
          const paymentId = subNo.data + 10;
          const invoiceData = {
               payment_id: paymentId,
               plan_amount: item.amount,
               plan_name: plan.plan_name,
               user_id: userInfo.user_id,
               username: userInfo.username,
               plan_type: plan.plan_type
          } 
          setInvoice(invoiceData);
          setShowInvoice(true);
     }

     const saveSubscription = async() => {
          const newSubscription = {
               plan_id: plan.plan_id,
               plan_type: plan.plan_type,
               amount: invoice.plan_amount,
               subscription_date: getDateToday(),
               status: 'pending',
               user_id: userInfo.user_id,
               exp_date: null,
               r_id: userInfo.r_if || refId,
               payment_id: invoice.payment_id
          } 

          const subResponse = await PlanSubscriptionService.add(newSubscription);
          if(subResponse.status === "pass"){
               setShowInvoice(false);
               showMainNotification("pass", subResponse.message, () => navigate('/user-dashboard'));
          }else{
               showMainNotification('fail', subResponse.message, () => {});
          }
     }
     const generateInvoice = async() => {
          setTimeout(() => {
               const input = document.getElementById("plan-invoice");
               if (input) {
                    html2canvas(input, { scale: 2 }) 
                    .then(canvas => {
                              const imgWidth = 210; 
                              const pageHeight = 295; 
                              const imgHeight = canvas.height * imgWidth / canvas.width;
                              let heightLeft = imgHeight;
          
                              const pdf = new jsPDF('p', 'mm', 'a4');
                              let position = 0;
          
                              pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                              heightLeft -= pageHeight;
          
                              while (heightLeft >= 0) {
                                   position = heightLeft - imgHeight;
                                   pdf.addPage();
                                   pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                                   heightLeft -= pageHeight;
                              }
     
                              pdf.save("clickrwanda-invoice.pdf");
                              showMainNotification("pass", "Successfully generated invoice for your purchase.", async() => await saveSubscription());
                         })
                         .catch(error => {
                              console.error('Error generating PDF', error);
                              showMainNotification("fail", "Error generating invoice", () => {});
                         });
               } else {
                    console.error('Invoice element not found');
               }
               }, 1000);
               
     }

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
                                   <ActionBtn action={() => updateInvoice({amount: plan?.plan_amount, dur:1})} title="Pay"/>
                              </div>
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 3)}</b>
                                   <span>3 Month</span>
                                   <ActionBtn action={() => updateInvoice({amount: plan?.plan_amount * 3, dur:3})} title="Pay"/>
                              </div>
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 6)}</b>
                                   <span>6 Months</span>
                                   <ActionBtn action={() => updateInvoice({amount: plan?.plan_amount * 6,dur:6})} title="Pay"/>
                              </div>
                              <div className="plan-duration-card">
                                   <b>Rwf {formatPrice(plan?.plan_amount * 12)}</b>
                                   <span>1 Year</span>
                                   <ActionBtn action={() => updateInvoice({amount: plan?.plan_amount * 12,dur:12})} title="Pay"/>
                              </div>
                         </div>
                    </div>
                    :null
               }
               {showInvoice ? 
               <div className="pay-plan-invoice-container">
                    <div className="confirm-payment-container">
                         <p>After payment to the provided details. Click here to confirmation the payment. </p>
                         <span><ActionBtn action={() => generateInvoice()} title="Confirm Payment" /> <ActionBtn action={() => setShowInvoice(false)} title="Cancel" /></span>
                    </div>
                    <PlanInvoice item={invoice} ref={invoiceRef} />
                    
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
                    <div className="invoice-title">
                         <h2>Invoice</h2>
                         <h3>N<sup>o</sup> {item.payment_id}</h3>
                    </div>
               </div>
               <div className="header-row">
                    <div className="invoice-info">
                         <p>Payment ID:<b> {item?.payment_id}</b></p>
                         <p>Due Date:<b>{extractDateOnly(getDateToday())}</b></p>
                         <p>Cient:<b>{item?.username}</b></p>
                    </div>
               </div>
               <div className="invoice-table">
                    <table>
                         <thead>
                              <th>Description</th>
                              <th>Unity Price</th>
                              <th>VAT</th>
                              <th>Total Amount</th>
                         </thead>
                         <tbody>
                              <tr>
                                   <td>{item?.plan_name}</td>
                                   <td>{formatPrice(item.plan_amount - (item?.plan_amount * 18) / 100)}</td>
                                   <td>{"18%"}</td>
                                   <td>{formatPrice(item?.plan_amount)}</td>
                              </tr>
                         </tbody>
                    </table>
                    <div className="row-align-right">
                         <div className="total-amount-container">
                              <p><b>Total Excluding Tax:</b><span>{formatPrice(item.plan_amount - (item?.plan_amount * 18) / 100)}</span></p>
                              <p><b>VAT:</b><span>{formatPrice(Math.floor((item?.plan_amount * 18) / 100))}</span></p>
                              <div className="divider"></div>
                              <p><b>Total Amount Due: </b><span>{formatPrice(item?.plan_amount)}</span></p>
                         </div>
                    </div>
               </div>
               <div className="payment-details-row">
                    <h3>Payment Details for Mobile Money</h3>
                    <p><b>Service: </b> <span>Mobile Money</span></p>
                    <p><b>Account Name: </b> <span>Nyagatare Marius</span></p>
                    <p><b>Account number: </b><span>0787260494</span></p>
               </div>
               <div className="payment-details-row">
                    <h3>Bank  Payment Details</h3>
                    <p><b>Bank Name: </b><span>Banque Populaire du Rwanda</span></p>
                    <p><b>Account Number: </b><span>4490263474</span></p>
                    <p><b>Account Name: </b><span>Nyagatare Marius</span></p>
                    <p><b>Bank Address: </b><span>KN 67, Street 2, P.O. Box 1348, Kigali, Rwanda</span></p>
                    <p><b>Account Currency: </b><span>Rwandan Francs</span></p>
               </div>
               <div className="footer">
                    <div className="col">
                         <p>Huza250 Ltd</p>
                         <p>TIN: 121153135</p>
                         <p>clickrwanda.com</p>
                    </div>
                    <div className="col">
                         <p>Kigali, Rwanda</p>
                         <p>Tel: +250 727 559 173</p>
                         <p>Email: clickrwandaltd@gmail.com</p>
                    </div>
               </div>
          </div>
     )
}

PlanInvoice.propTypes = {
     item: PropTypes.object
}
export default PlanPaymentPage