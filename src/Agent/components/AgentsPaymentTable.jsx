import PropTypes from 'prop-types';
import { extractDateOnly } from '../../utils/dateFunctions';

const AgentsPaymentTable = ({payments}) => {
     return (
     <div className='agent-payment-table'>
          <div className="agent-payments-title">
               <span>Date</span>
               <span>Amount</span>
               <span>Status</span>
          </div>
          {
               payments && payments[0] ?
                    payments.map((item, index) => 
                         <div className="agent-payment-row" key={`agent-payment-row-${index}`}>
                              <span>{extractDateOnly(item.p_date)}</span>
                              <span>{item.amount}</span>
                              <span>{item.status}</span>
                         </div>
                    )
               : <p className='agent-not-found-paragraphs'>No payments found</p>
          }
     </div>
     )
}

AgentsPaymentTable.propTypes = {
     payments: PropTypes.array
}

export default AgentsPaymentTable