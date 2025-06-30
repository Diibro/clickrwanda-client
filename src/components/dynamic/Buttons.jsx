import PropTypes from 'prop-types';

export const ActionBtn = ({title, size, action,type}) => {
     return(
          <button onClick={action} type={type} className={ "bg-main-gold-500 text-sm font-medium rounded-[5px] text-white hover:bg-main-gold-600 px-[12px] py-[8px] " + size}>{title}</button>
     )
}

export const SubmitButton =({content}) => {
     let size = content.size ? content.size : '';
     let backColor = content.backColor ? content.backColor : ''; 
     return(
          <button type={content.type} onClick={content.action} className={`submit-btn ${size} ${backColor}`}>{content.title}</button>
     )
}

export const SelectFileBtn = ({title, action}) => {
     return(
          <button onClick={action} type='button' className={ "select-file-btn "}>{title}</button>
     )
}

ActionBtn.propTypes = {
     title: PropTypes.string.isRequired,
     size: PropTypes.any,
     action: PropTypes.any,
     type: PropTypes.any
}

SubmitButton.propTypes = {
     content: PropTypes.object
}

SelectFileBtn.propTypes = {
     title: PropTypes.string,
     action: PropTypes.func
}


const Buttons = () => {
  return (
    <div>Buttons</div>
  )
}

export default Buttons