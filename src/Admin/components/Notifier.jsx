import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Notifier = ({count, icon, url}) => {
     const navigate = useNavigate();
     return (
     <div className="dash-notifier" onClick={() => navigate(url)}>
          <i>{icon}</i>
          <span>{count || null}</span>
     </div>
     )
}

Notifier.propTypes = {
     count:PropTypes.number,
     icon: PropTypes.node,
     url: PropTypes.string
}
export default Notifier