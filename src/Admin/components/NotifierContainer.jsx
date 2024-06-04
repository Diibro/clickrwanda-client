import PropTypes from "prop-types";

const NotifierContainer = ({children}) => {
     return (
     <div className="notifier-container">{children}</div>
     )
}

NotifierContainer.propTypes = {
     children: PropTypes.node
}
export default NotifierContainer