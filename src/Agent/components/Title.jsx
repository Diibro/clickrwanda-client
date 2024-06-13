import PropTypes from "prop-types";

const Title = ({children}) => {
     return (
     <div className="agent-main-title">{children}</div>
     )
}

Title.propTypes = {
     children: PropTypes.node
}

export default Title