import PropTypes from 'prop-types'

const ParagraphCard = ({children}) => {
     return (
          <div className="user-dashboard-paragraph-card">
               {children}
          </div>
     )
}

ParagraphCard.propTypes = {
     children: PropTypes.node
}

export default ParagraphCard