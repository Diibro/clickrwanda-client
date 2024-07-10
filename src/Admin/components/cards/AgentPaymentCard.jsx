import PropTypes from 'prop-types';
import { extractDateOnly } from '../../../utils/dateFunctions';
import { formatPrice } from '../../../utils/otherFunctions';
import { DeleteButton, EditButton } from '../buttons/ActionButtons';

const AgentPaymentCard = ({payment,actions}) => {
     return (
          <div className={`admin-agent-payment-card ${payment.status === 'Approved' ? "approved-card" : payment.status === 'pending' ? "pending-card" : payment.status === 'rejected' ? "rejected-card" : ''}`}>
               <span>{extractDateOnly(payment.p_date)}</span>
               <span>{payment.agent_id}</span>
               <span>{payment.a_phone}</span>
               <span>{payment.a_name}</span>
               <span>Rwf {formatPrice(payment.amount)}</span>
               <span>{payment.status}</span>
               {
                    payment.status !== "Approved" ? <EditButton title='Approve' action={actions.approve} /> : null
               }
               {
                    payment.status !== "Approved" && payment.status !== "rejected"  ? <DeleteButton title='Reject' action={actions.reject} /> : null
               }
          </div>
     )
}

AgentPaymentCard.propTypes = {
     payment: PropTypes.object,
     actions: PropTypes.object
}
export default AgentPaymentCard
