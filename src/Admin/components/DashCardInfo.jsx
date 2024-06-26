import PropTypes from "prop-types";
import { formatPrice } from "../../utils/otherFunctions";

const DashCardInfo = ({count, title, newAdded, action}) => {
     return (
          <div className="dash-card-info" onClick={action}>
               {newAdded && newAdded > 0 ? <i>{newAdded} new Today</i> : null}
               <span>{formatPrice(count)}</span>
               <b>{title}</b>
          </div>
     )
}

DashCardInfo.propTypes = {
     count: PropTypes.number,
     title: PropTypes.string,
     newAdded: PropTypes.number,
     action: PropTypes.func
}
export default DashCardInfo