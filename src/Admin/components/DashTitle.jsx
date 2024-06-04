import PropTypes from "prop-types";

const DashTitle = ({children}) => {
     return (
     <div className="dash-title">{children}</div>
     )
}

DashTitle.propTypes = {
     children: PropTypes.node
}

export default DashTitle