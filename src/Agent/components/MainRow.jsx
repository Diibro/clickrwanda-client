import PropTypes from 'prop-types';

const MainRow = ({children}) => {
  return (
    <div className="agent-main-row">
      {children}
    </div>
  )
}

MainRow.propTypes = {
  children: PropTypes.node
}

export default MainRow