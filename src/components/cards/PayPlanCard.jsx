import PropTypes from 'prop-types';
import { parseString } from '../../utils/jsonFunctions';
import { TickIcon } from '../static/Icons';

import DOMPurify from 'dompurify';
import { formatPrice } from '../../utils/otherFunctions';

const PayPlanCard = ({plan, action, btnTitle, extra}) => {
     const planDescription = parseString(plan.description);
     return (
          <div className={`w-full shadow-md shadow-gray-200 flex flex-col items-center justify-start rounded-[5px] p-[5px] ${plan?.plan_name} ${extra?.view_type} aspect-auto overflow-hidden gap-[10px]`}>
               <div className="w-full bg-main-blue-700 rounded-[5px] flex flex-col items-center justify-center gap-[5px] ">
                    {/* <img width={60} src={plan?.plan_icon} alt="plan icon" /> */}
                    <h2 className='text-[1.2rem] text-white font-bold  '>{plan?.plan_name}</h2>
                    <p className='price text-[1.3rem] font-bold text-center text-blue-200 ' ><span className='text-[0.9rem] font-semibold '>Rwf</span> { plan.plan_name === "Simple Ads" ? `2,000 - 10,000` : formatPrice(plan.plan_amount)} <span className='text-[0.9rem] font-semibold '>/month</span></p>
               </div>
               {
                    planDescription ? 
                         <div className="w-full flex flex-col items-center gap-[5px] payplan-body h-[250px] overflow-hidden overflow-y-auto custom-scroll-bar">
                              {
                                   planDescription.detailedDescription ? 
                                        <div className='detailed-description' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(planDescription.detailedDescription)}}>
                                        </div>
                                   :
                                   <ul>
                                   {
                                        planDescription.allowed ? 
                                             planDescription.allowed.map((item, index) => <li className='' key={`plan-allowed-${index}`}><TickIcon />{item}</li>) 
                                        : null
                                   }

                                   {
                                        planDescription.unAllowed ? 
                                             planDescription.unAllowed.map((item, index) => <li className='crossed-text' key={`plan-allowed-${index}`}>{item}</li>) 
                                        : null
                                   }
                              </ul>
                              }
                         </div>
                    : null
               }
               <div className="w-full h-[250px] shadow-sm shadow-gray-400 flex items-center justify-center rounded-[5px] ">
                    <img src={plan.location} alt="location on website" width={400} className='w-auto h-auto max-h-full max-w-full' />
               </div>
               {
                    action ? <PlanBtn title={btnTitle} action={action} /> : null
               }
               {
                    extra?.currentName ? <b className='current-plan-text'>{extra?.currentName}</b> : null
               }
          </div>
     )
}

const PlanBtn = ({title, action}) => {
     return (
          <button onClick={action} className='w-full py-[5px] border-[1.2px] border-main-gold-500 rounded-[5px] bg-main-gold-500 text-white font-bold text-[0.9rem] hover:bg-white hover:text-main-gold-500 transition-all duration-200 '>
               {title}
          </button>
     )
}

PlanBtn.propTypes = {
     title: PropTypes.string,
     action: PropTypes.func
}

PayPlanCard.propTypes = {
     plan: PropTypes.object,
     action: PropTypes.func,
     btnTitle: PropTypes.string,
     extra: PropTypes.any

}

export default PayPlanCard