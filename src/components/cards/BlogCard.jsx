import { Link } from "react-router-dom"
import { TBlog } from "../../common/Entities"
import { extractDateOnly } from "../../utils/dateFunctions"
import { ActionBtn } from "../dynamic/Buttons"
import { MyImage } from "../static/Image"

export const BlogCardRowView = ({blog}) => {
     return (
          <div className="w-full flex items-start border-[1.3px] border-gray-500 justify-between p-[2.5px] rounded-[5px] ">
               <div className="w-[30%] md:w-[35%] lg:w-[25%] h-full ">
                    <img src={blog.content.featuredImage} alt="blog image" className="rounded-[5px] w-auto h-auto max-h-[120px] " />
                    {/* <MyImage image={blog.content.featuredImage} /> */}
               </div>
               <div className="w-[68%] md:w-[65%] lg:w-[74%]  flex flex-col p-[2.5px] gap-[2.5px] ">
                    <h4 className="text-[0.9rem] text-main-blue-700 font-bold line-clamp-1">{blog.title}</h4>
                    <div className="w-full flex flex-col items-start  ">
                         <p className="text-[0.8rem] font-mono text-gray-500 ">Published On: {extractDateOnly(blog.publication_date)}</p>
                    </div>
                    <div className="w-full flex flex-col items-start">
                         <p className="text-[0.8rem] text-gray-500 line-clamp-2">{blog.content.description}</p>
                         <Link className="text-[0.8rem] text-green-500 w-full text-right " to={`/blogs/blog?=${blog.id}`}>Read More...</Link>
                    </div>
               </div>
          </div>
     )
}

export const BLogCardVerticalView = ({blog}) => {
     return (
          <div className=""></div>
     )
}

BlogCardRowView.propTypes = {
     blog: TBlog
}

BLogCardVerticalView.propTypes = {
     blog: TBlog
}