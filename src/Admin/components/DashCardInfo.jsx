import PropTypes from "prop-types";
import { formatPrice } from "../../utils/otherFunctions";

const DashCardInfo = ({count, title, newAdded}) => {
     return (
          <div className="dash-card-info">
               {newAdded && newAdded > 0 ? <i>{newAdded} new Today</i> : null}
               <span>{formatPrice(count)}</span>
               <b>{title}</b>
          </div>
     )
}

DashCardInfo.propTypes = {
     count: PropTypes.number,
     title: PropTypes.string,
     newAdded: PropTypes.number
}
export default DashCardInfo