import PropTypes from 'prop-types';

export const ActionBtn = ({title, size, action}) => {
     return(
          <button onClick={action} className={ "actionBtn " + size}>{title}</button>
     )
}

export const SubmitButton =({content}) => {
     let size = content.size ? content.size : '';
     let backColor = content.backColor ? content.backColor : ''; 
     return(
          <button type={content.type} onClick={content.action} className={`submit-btn ${size} ${backColor}`}>{content.title}</button>
     )
}

ActionBtn.propTypes = {
     title: PropTypes.string.isRequired,
     size: PropTypes.oneOf(["small", "medium", "large"]),
     action: PropTypes.any
}

SubmitButton.propTypes = {
     content: PropTypes.object
}


const Buttons = () => {
  return (
    <div>Buttons</div>
  )
}

export default Buttons