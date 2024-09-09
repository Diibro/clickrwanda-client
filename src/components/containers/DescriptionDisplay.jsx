import PropTypes from 'prop-types';
const DescriptionDisplay = ({content}) => {
     return (
          <div className="content-display" dangerouslySetInnerHTML={{ __html: content }}></div>
     )
}

DescriptionDisplay.propTypes = {
     content: PropTypes.any
}
export default DescriptionDisplay