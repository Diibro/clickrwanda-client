import PropTypes from 'prop-types';

export const ActionBtn = ({title, size}) => {
     return(
          <button className={ "actionBtn " + size}>{title}</button>
     )
}

ActionBtn.propTypes = {
     title: PropTypes.string.isRequired,
     size: PropTypes.oneOf(["small", "medium", "large"])
}


const Buttons = () => {
  return (
    <div>Buttons</div>
  )
}

export default Buttons