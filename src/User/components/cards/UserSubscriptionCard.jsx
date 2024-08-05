import PropTypes from 'prop-types';
import { getDateOnly, getDateToday, isLaterThan } from '../../../utils/dateFunctions';
import { formatPrice } from '../../../utils/otherFunctions';
import { ActionBtn } from '../../../components/dynamic/Buttons';

const UserSubscriptionCard = ({subscription}) => {
     return (
     <div className={`user-subscription-card ${subscription.status} ${!isLaterThan(getDateToday(), subscription.exp_date) && subscription.status === 'Approved' ? 'expired' : ''}`}>
          <div className="col">
               <div className="row">
                    <span>Plan Name:</span>
                    <b>{subscription.plan_name}</b>
               </div>
               <div className="row">
                    <span>Invoice Number:</span>
                    <b>{subscription.payment_id}</b>
               </div>
               <div className="row">
                    <span>Date: </span>
                    <b>{getDateOnly(subscription.subscription_date)}</b>
               </div>
               <div className="row">
                    <span>Duration: </span>
                    <b>{subscription.duration / 30} month(s)</b>
               </div>
          </div>
          <div className="col">
               <div className="row">
                    <span>Amount:</span>
                    <b>RWf {formatPrice(subscription.amount)}</b>
               </div>
               {
                    subscription.status === 'Approved' ? 
                    <>
                         <div className="row">
                              <span>Expires on: </span>
                              <b>{subscription.exp_date}</b>
                         </div>
                         <div className="row">
                              <span>Ads boosted: </span>
                              <b>{subscription.ad_ids?.length} ad(s)</b>
                         </div>
                         {
                              isLaterThan(getDateToday(), subscription.exp_date) ? 
                                   <div className="row">
                                        <span>Add Ads: </span>
                                        <ActionBtn title='Add Adverts' action={() => {}} size={'small'}/>
                                   </div>
                              :null
                         }
                    </>
                    : null
               }
          </div>
     </div>
     )
}

UserSubscriptionCard.propTypes = {
     subscription: PropTypes.object
}
export default UserSubscriptionCard