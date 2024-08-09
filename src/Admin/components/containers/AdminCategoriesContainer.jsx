import PropTypes from 'prop-types';
import AdminCategoryCard from '../cards/AdminCategoryCard';
import { useEffect } from 'react';

const AdminCategoriesContainer = ({categories}) => {
     useEffect(() => {
          console.log(categories)
     }, [])
     return (
          <div className='admin-adverts-container'>
               {categories && categories.length ? 
                    categories.map((item) => <AdminCategoryCard key={`admin-category-card-${item.category_id}`} item={item} />)
               : <p className='no-ads-found'>No Categories found</p>}
          </div>
     )
}

AdminCategoriesContainer.propTypes = {
     categories: PropTypes.array
}

export default AdminCategoriesContainer