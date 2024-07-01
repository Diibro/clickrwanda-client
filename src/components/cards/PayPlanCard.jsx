import PropTypes from 'prop-types';
import { parseString } from '../../utils/jsonFunctions';
import { TickIcon } from '../static/Icons';
import { ActionBtn } from '../dynamic/Buttons';

const PayPlanCard = ({plan, action, btnTitle}) => {
     const planDescription = parseString(plan.description);
     return (
          <div className='payment-plan-card'>
               <div className="head">
                    {/* <img width={60} src={plan?.plan_icon} alt="plan icon" /> */}
                    <h2 className='title'>{plan?.plan_name}</h2>
                    <p className='price'><span>Rwf</span> {plan.plan_amount} <span>/month</span></p>
               </div>
               {
                    planDescription ? 
                         <div className="body">
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
                         </div>
                    : null
               }
               <div className="image">
                    <img src={plan.location} alt="location on website" width={70} />
               </div>
               {
                    action ? <ActionBtn title={btnTitle} action={action} /> : null
               }
          </div>
     )
}

PayPlanCard.propTypes = {
     plan: PropTypes.object,
     action: PropTypes.func,
     btnTitle: PropTypes.string
}

export default PayPlanCard