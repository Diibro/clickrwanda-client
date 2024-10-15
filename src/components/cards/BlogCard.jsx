import { Link } from "react-router-dom"
import { TBlog } from "../../common/Entities"
import { extractDateOnly } from "../../utils/dateFunctions"
import { ActionBtn } from "../dynamic/Buttons"
import { MyImage } from "../static/Image"

export const BlogCardRowView = ({blog}) => {
     return (
          <div className="blog-row-card">
               <div className="image-container">
                    {/* <img src={blog.content.featuredImage} alt="" /> */}
                    <MyImage image={blog.content.featuredImage} />
               </div>
               <div className="content">
                    <h4>{blog.title}</h4>
                    <div className="row">
                         <p>Published On: {extractDateOnly(blog.publication_date)}</p>
                    </div>
                    <div className="row">
                         <p>{blog.content.description}</p>
                         <Link to={`/blogs/blog?=${blog.id}`}>Read More</Link>
                    </div>
               </div>
          </div>
     )
}

export const BLogCardVerticalView = ({blog}) => {
     return (
          <div className="blog-vertical-card"></div>
     )
}

BlogCardRowView.propTypes = {
     blog: TBlog
}

BLogCardVerticalView.propTypes = {
     blog: TBlog
}