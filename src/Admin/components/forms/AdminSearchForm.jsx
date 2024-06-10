
import PropTypes from 'prop-types';


const AdminSearchForm = ({searchHandler, searchMessage}) => {
     return (
          <div className="admin-search-form">
               <input type="text" onChange={ e => searchHandler(e)}  />
               <span>{searchMessage}</span>
          </div>
     )
}

AdminSearchForm.propTypes = {
     searchHandler: PropTypes.func,
     searchMessage: PropTypes.string
}

export default AdminSearchForm