import PropTypes from 'prop-types';
import { parseString } from '../../utils/jsonFunctions';
import { TickIcon } from '../static/Icons';
import { ActionBtn } from '../dynamic/Buttons';

import DOMPurify from 'dompurify';

const PayPlanCard = ({plan, action, btnTitle, extra}) => {
     const planDescription = parseString(plan.description);
     return (
          <div className={`payment-plan-card ${plan?.plan_name} ${extra?.view_type}`}>
               <div className="head">
                    {/* <img width={60} src={plan?.plan_icon} alt="plan icon" /> */}
                    <h2 className='title'>{plan?.plan_name}</h2>
                    <p className='price'><span>Rwf</span> {plan.plan_amount} <span>/month</span></p>
               </div>
               {
                    planDescription ? 
                         <div className="body">
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
               <div className="image">
                    <img src={plan.location} alt="location on website" width={70} />
               </div>
               {
                    action ? <ActionBtn title={btnTitle} action={action} /> : null
               }
               {
                    extra?.currentName ? <b className='current-plan-text'>{extra?.currentName}</b> : null
               }
          </div>
     )
}

PayPlanCard.propTypes = {
     plan: PropTypes.object,
     action: PropTypes.func,
     btnTitle: PropTypes.string,
     extra: PropTypes.any

}

export default PayPlanCard