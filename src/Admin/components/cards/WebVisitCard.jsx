import PropTypes from "prop-types";
import { formatPrice } from "../../../utils/otherFunctions";

const WebVisitCard = ({content}) => {
     return (
          <div className="admin-web-visit-card">
               <b>{content.count && formatPrice(content.count)}</b>
               <p>{content.title}</p>
          </div>
     )
}

WebVisitCard.propTypes = {
     content: PropTypes.object
}
export default WebVisitCard