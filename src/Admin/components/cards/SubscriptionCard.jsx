import PropTypes from 'prop-types';
import { extractDateOnly } from '../../../utils/dateFunctions';
import { DeleteButton, EditButton } from '../buttons/ActionButtons';

const SubscriptionCard = ({subscription, actions}) => {
     return (
          <div className={`admin-agent-payment-card ${subscription.status === 'Approved' ? "approved-card" : subscription.status === 'pending' ? "pending-card" : subscription.status === 'rejected' ? "rejected-card" : ''}`}>
               <span>{extractDateOnly(subscription.subscription_date)}</span>
               <span>Invoice {subscription.payment_id}</span>
               <span>{subscription.username}</span>
               <span>Rwf {subscription.amount}</span>
               <span>{subscription.plan_name}</span>
               <span>{subscription.plan_type}</span>
               <span>{subscription.a_name || 'No Ref'}</span>
               {
                    subscription.status !== "Approved" ? <EditButton title='Approve' action={actions.approve} /> : null
               }
               {
                    subscription.status !== "Approved" && subscription.status !== "rejected"  ? <DeleteButton title='Reject' action={actions.reject} /> : null
               }
          </div>
     )
}

SubscriptionCard.propTypes = {
     subscription: PropTypes.object,
     actions: PropTypes.object
}
export default SubscriptionCard