import PropTypes from 'prop-types';
import { extractDateOnly } from '../../utils/dateFunctions';

const RefWebVisitCard = ({visit}) => {
     return (
          <div className="agent-ref-web-visit-card">
               <span>{extractDateOnly(visit.v_date)}</span>
               <span>{visit.v_type}</span>
               <span>Rwf 5</span>
          </div>
     )
}

RefWebVisitCard.propTypes = {
     visit: PropTypes.object
}

export default RefWebVisitCard