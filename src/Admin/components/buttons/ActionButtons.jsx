import PropTypes from "prop-types";

export const AddButton = ({title, action}) => {
     return (
     <button className="admin-action-btn admin-action-add-btn" onClick={action}>{title}</button>
     )
}

AddButton.propTypes = {
     title: PropTypes.string,
     action: PropTypes.func
}

export const DeleteButton = ({title, action}) => {
     return (
     <button className="admin-action-btn admin-action-delete-btn " onClick={action}>{title}</button>
     )
}

DeleteButton.propTypes = {
     title: PropTypes.string,
     action: PropTypes.func
}

export const EditButton = ({title, action}) => {
     return (
     <button className="admin-action-btn admin-action-edit-btn " onClick={action}>{title}</button>
     )
}

EditButton.propTypes = {
     title: PropTypes.string,
     action: PropTypes.func
}