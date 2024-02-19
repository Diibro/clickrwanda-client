import { ActionBtn } from "../dynamic/Buttons";
import { TickIcon } from "./Icons";
import PropTypes from "prop-types"
import { useLocation, useNavigate } from "react-router-dom";
import { ExtraBoostPlans, MainPaymentPlansInfo } from "../../config/payPlans";
import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/otherFunctions";
// import UserContext from "../../Contexts/UserContext";
import { MdCall, MdEmail } from "react-icons/md";

export const PaymentPlanCard = ({item}) => {
     const features = item.allowed;
     const navigate = useNavigate()
     return (
          <div className="payment-plan-card">
               <div className="head">
                    <h2 className="title">{item.title}</h2>
                    <p className="price">{item.price}</p>
               </div>
               <div className="body">
                    <ul>
                         {features.map((feature, index) => feature.allowed ? <li key={index}><TickIcon />{feature.name}</li>  : <li key={index} className={!feature.allowed ? "crossed-text" : ''} >{feature.name}</li>   )}
                    </ul>
                    <div className="image">
                         <img src={item.location} alt={item.title} />
                    </div>
               </div>
               <div className="foot">
                    {item.action ? <ActionBtn title="Choose Package" action={() => navigate(item.action)} /> : <p>Default Package</p>}
               </div>
          </div>
     )
}


export const PaymentPlansContainer = () => {
     return (
          <div className="pay-plans-container">
               <div className="row">
                    <h3>General Packages</h3>
                    {MainPaymentPlansInfo.map(plan => <PaymentPlanCard item={plan} key={plan.title} />)}
               </div>
               <div className="row">
                    <h3>Extra Boost Packages</h3>
                    {ExtraBoostPlans.map(plan => <PaymentPlanCard item={plan} key={plan.title} />)}
               </div>
          </div>
     )
}

export const PaymentPlanChoice = () => {
     const navigate = useNavigate();
     const location = useLocation()
     const {pathname} = location;
     const [planInView, setPlanInView] = useState({});
     const plans = [...MainPaymentPlansInfo, ...ExtraBoostPlans];
     const updatePlanViewed = () => {
          console.log(plans);
          const filteredPlans = plans.filter(plan => plan.action === pathname);
          console.log(filteredPlans);
          setPlanInView(filteredPlans[0]);
     }

     const proceedPayment = () => {
          return navigate("/forms/payment-plan-form")
     }
     useEffect(() => {
          updatePlanViewed();
     },[])
     return(
          <div className="payment-plan-choice">
               <div className="header">
                    <h2>{planInView?.title}</h2>
               </div>
               <div className="content">
                    <div className="features">
                         <h3>Features:</h3>
                         <ul>
                              {planInView?.allowed?.filter(feature => feature.allowed).map(feature => <li key={feature.name}><TickIcon />{feature.name}</li>)}
                         </ul>
                    </div>
                    <div className="membership">
                         <h3>Membership Period:</h3>
                         <div className="durations">
                              {planInView?.memberShipDuration?.map(duration => <div className="membership-duration-row" key={duration.months}>
                                   <span className="months">Months: {duration.months}</span> <span className="price">Price: Rwf {formatPrice(planInView.mainPrice * duration.months)}</span> <ActionBtn title="Select" action={() => proceedPayment()} />
                              </div>)}
                         </div>
                    </div>
               </div>
          </div>
     )
     
}

export const PaymentPlanForm = () => {
     // const [user,setUser] =useContext(UserContext);
     return(
          <div className="form-container hide-scroll">
               <div className="plan-form">
                    <h2 className="title">Contact Sales</h2>
                    <div className="row">
                         <p>Please contact us to complete your payment plan. We are here to assist you!</p>
                         <p>After completing payment, your membership plan is activated with in 24rs only.</p>
                    </div>
                    <div className="row">
                         <a href="tel:+250727559173"><MdCall /></a>
                         <a href="mailto:clickrwandaltd@gmail.com"><MdEmail /></a>
                    </div>
               </div>
          </div>
     )
}

PaymentPlanCard.propTypes = {
     item: PropTypes.any
}
