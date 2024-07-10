import PropTypes from 'prop-types';
import { ActionBtn } from '../../../components/dynamic/Buttons';
import { extractDateOnly } from '../../../utils/dateFunctions';
import { formatPrice } from '../../../utils/otherFunctions';

const AgentPaymentCard = ({payment}) => {
     return (
          <div className={`admin-agent-payment-card ${payment.status === 'Approved' ? "approved-card" : payment.status === 'pending' ? "pending-card" : payment.status === 'rejected' ? "rejected-card" : ''}`}>
               <span>{extractDateOnly(payment.p_date)}</span>
               <span>{payment.agent_id}</span>
               <span>{payment.a_phone}</span>
               <span>{payment.a_name}</span>
               <span>Rwf {formatPrice(payment.amount)}</span>
               <span>{payment.status}</span>
               {
                    payment.status !== "Approved" ? <ActionBtn title='Approve' /> : null
               }
          </div>
     )
}

AgentPaymentCard.propTypes = {
     payment: PropTypes.object
}
export default AgentPaymentCard
