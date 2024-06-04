import PropTypes from "prop-types";

const Notifier = ({count, icon}) => {
     return (
     <div className="dash-notifier">
          <i>{icon}</i>
          <span>{count}</span>
     </div>
     )
}

Notifier.propTypes = {
     count:PropTypes.number,
     icon: PropTypes.node
}
export default Notifier