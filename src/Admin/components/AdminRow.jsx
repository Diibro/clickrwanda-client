import PropTypes from "prop-types";

const AdminRow = ({children}) => {
     return (     
     <div className="dash-main-row">{children}</div>
     )
}

AdminRow.propTypes = {
     children: PropTypes.node
}
export default AdminRow