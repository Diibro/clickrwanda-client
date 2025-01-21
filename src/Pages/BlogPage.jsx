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
                    <div className="w-full flex flex-col gap-[20px] py-[10px]  ">
                         <div className="w-full max-w-[1000px] px-[2%] rounded-[5px] bg-white mx-auto grid grid-cols-1 gap-[10px]">
                              <div className="w-full col-span-2 rounded-[5px] p-[10px]  flex flex-col items-start gap-[10px]">
                                   <div className="w-full flex flex-col items-start gap-[5px]">
                                        <h1 className="text-[1.2rem] md:text-[1.6rem] font-extrabold text-main-blue-700">{blog.title}</h1>
                                        <p className="text-[0.9rem] text-gray-700">{blog.category} | Posted on: {getDateOnly(blog.publication_date)} </p>
                                   </div>
                                   <div className="w-full flex flex-col items-start gap-[5px]"> 
                                        <img className="w-auto min-w-[400px] aspect-video object-cover shadow-sm rounded-[5px]" src={blog.content.featuredImage} alt="Blog image" />
                                   </div>
                                   <div className="w-full h-auto rounded-[10px] bg-white p-[5px]">
                                        <i className="text-[0.9rem] font-semibold text-gray-700">{blog.content.description}</i>
                                   </div>
                                   <div className="w-full px-[5px] text-[0.9rem] text-gray-700 flex flex-col items-start gap-[5px] bg-white p-[10px] rounded-[5px] " dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blog.content.detailedDescription)}} ></div>
                              </div>
                              
                         </div>
                    </div>
               : <p>Blog not found.</p>
          }
          </>
     )
}

export default BlogPage