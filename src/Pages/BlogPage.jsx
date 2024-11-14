import { useEffect, useState } from "react"
import Loading from "../components/static/Loading";
import { getDateOnly } from "../utils/dateFunctions";
import Service from "../services/Service";
import Server from "../services/Server";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";


const BlogPage = () => {
     const [blog,setBlog] = useState(null);
     const location = useLocation();
     const blogId = location.search.split("?=")[1];
     const [loading,setLoading] = useState(false)

     const fetchBlog = async () => {
          try {
               setLoading(true)
               const res = await Service.get(`${Server.blog}?id=${blogId}`);
          if(res && res.data) setBlog(res.data);
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async( ) => await fetchBlog())();
     },[]);
     return (
          <>
          {
               loading ? <Loading /> :
               blog ? 
                    <div className="blog-page">
                         <div className="title">
                              <h1>{blog.title}</h1>
                              <p>Posted on: {getDateOnly(blog.publication_date)}</p>
                         </div>
                         <div className="image-container"> 
                              <img src={blog.content.featuredImage} alt="Blog image" />
                              <p className="category">{blog.category}</p>
                         </div>
                         <div className="description-container">
                              <p className="summary">{blog.content.description}</p>
                         </div>
                         <div className="html-value-container" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blog.content.detailedDescription)}} ></div>
                    </div>
               : <p>Blog not found.</p>
          }
          </>
     )
}

export default BlogPage