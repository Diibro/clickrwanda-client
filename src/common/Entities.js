import PropTypes from 'prop-types';

export const TBlog = PropTypes.shape({
     id: PropTypes.number,
     title: PropTypes.string, 
     publication_date: PropTypes.string,
     content: PropTypes.any,
     category: PropTypes.string
})