import PropTypes from 'prop-types'
import { BlogCardRowView } from '../cards/BlogCard'
const BlogsContainer = ({blogs, containerId}) => {
     return (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[5px] '>
               {
                    blogs.map((blog, index) => <BlogCardRowView blog={blog} key={`blog-row-card-${containerId}-${index}`} />)
               }
          </div>
     )
}

BlogsContainer.propTypes = {
     blogs: PropTypes.array,
     containerId: PropTypes.string
}

export default BlogsContainer