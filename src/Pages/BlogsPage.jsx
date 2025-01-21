import { useEffect, useState } from "react"
import Server from "../services/Server"
import { extractDateOnly } from "../utils/dateFunctions"
import PropTypes from 'prop-types';
import { BlogCardRowView, BLogCardVerticalView } from "../components/cards/BlogCard";
import Service from "../services/Service";
import { Link, Route, Routes } from "react-router-dom";
import BlogPage from "./BlogPage";


const BlogsPage = () => {
     return (
          <Routes>
               <Route index path="/" element={<MainPage />}  />
               <Route path="/blog" element={<BlogPage />} />
          </Routes>
     )
}

// sections

const MainPage = () => {
     return (
          <div className="w-full flex flex-col items-center justify-start gap-[20px]" >
               <WelcomeSection />
               <MainBlogsSection />
          </div>
     )
}

const WelcomeSection = () => {
     const [blogs, setBlogs] = useState(null);

     const fetchBlogs = async (ops) => {
          const res = await Service.get(`${Server.blog}?limit=${ops.limit}&offset=${ops.offset}`);
          if(res && res.data && typeof(res.data) !== "string") {
               setBlogs(res.data);
          }
     }

     useEffect(() => {
          (async () => await fetchBlogs({limit:10,offset:0}))(); 
     }, []);
     
     return (
          <>
               {blogs && blogs.length && 
                    <section className="w-full flex items-start justify-between flex-wrap bg-white p-[10px] rounded-[10px] gap-[10px] ">
                         <h2 className="w-full text-main-blue-700 font-extrabold text-[1.6rem]">Featured Stories</h2>
                         {blogs && blogs[0] && 
                              <div className="w-full lg:w-[55%] flex flex-col items-start gap-[10px] border-[1.4px] border-gray-400 rounded-[10px] p-[5px] ">
                                   <div className="w-full">
                                        {/* <img src={blogs[0].content.featuredImage} alt="feature image" /> */}
                                        <img src={blogs[0].content.featuredImage} width={800} height={800} className="w-full rounded-[10px] max-h-[500px] object-fill"/>
                                   </div>
                                   <div className="w-full flex flex-col items-start gap-[5px]">
                                        <h3 className="text-[1.2rem] md:text-[1.4rem] text-main-blue-700 line-clamp-2 font-extrabold" >{blogs[0].title} </h3>
                                        <p className="text-[0.8rem] text-gray-700 ">Posted on: {extractDateOnly(blogs[0].publication_date)}</p>
                                        <p className="text-[0.85rem] font-medium line-clamp-3">{blogs[0].content.description}</p>
                                        <Link className="text-[0.8rem] font-bold text-blue-600" to={`/blogs/blog?=${blogs[0].id}`}>Read More...</Link>
                                   </div>
                              </div>
                         }
                         <div className="w-full lg:w-[42.5%] flex flex-col gap-[5px] overflow-hidden items-center max-h-[500px] overflow-y-auto">
                              {
                                   blogs && blogs.length > 1 && blogs.map((blog, index) => index > 0 && <BlogCardRowView key={`home-section-blog-row-card-${index}`} blog={blog} />)
                              }
                         </div>
                    </section>
               }
          </>
     )
}

const MainBlogsSection = () => {
     const [blogs, setBlogs] = useState(null);

     const fetchBlogs = async (ops) => {
          const res = await Service.get(`${Server.blog}?limit=${ops.limit}&offset=${ops.offset}`);
          if(res && res.data && typeof(res.data) !== "string") {
               setBlogs(res.data);
          }
     }

     useEffect(() => {
          (async () => await fetchBlogs({limit:50,offset:10}))(); 
     }, []);
     return(
          <div className="w-full flex flex-col items-start gap-[10px] py-[10px]">
               <h2 className="text-[1.6rem] font-bold text-main-blue-700">Other stories to read</h2>
               {
                    blogs && blogs[0] ? 
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                         {
                              blogs.map((blog, index) => <BLogCardVerticalView blog={blog} key={`main-blogs-card${blog.title}-${index}`} />)
                         }
                    </div>
                    :<p className="text-[0.9rem] text-gray-700">No blogs found</p>
               }
               
          </div>
     )
}

export const HomeBlogsSection = ({showTitle=false}) => {
     const [blogs, setBlogs] = useState(null);

     const fetchBlogs = async (ops) => {
          const res = await Service.get(`${Server.blog}?limit=${ops.limit}&offset=${ops.offset}`);
          if(res && res.data && typeof(res.data) !== "string") {
               setBlogs(res.data);
          }
     }

     useEffect(() => {
          (async () => await fetchBlogs({limit:20,offset:0}))(); 
     }, []);
     
     return (
          <>
               {blogs && blogs.length > 0 && 
                    <section className="w-full flex items-start justify-between flex-wrap bg-white p-[10px] rounded-[10px] gap-[10px] ">
                         {showTitle ? 
                         <h2 className="w-full text-main-blue-700 font-extrabold text-[1.6rem]">Featured Stories</h2>
                         :<h2 className="w-full text-main-blue-700 font-extrabold text-[1.6rem]">Best Stories</h2>
                         }
                         {blogs && blogs[0] && 
                         <div className="w-full lg:w-[55%] flex flex-col items-start gap-[10px] rounded-[10px]">
                              <div className="w-full">
                                   {/* <img src={blogs[0].content.featuredImage} alt="feature image" /> */}
                                   <img src={blogs[0].content.featuredImage} width={800} height={800} className="w-full max-h-[400px] object-fill rounded-[10px]"/>
                              </div>
                              <div className="w-full flex flex-col items-start gap-[5px]">
                                   <h3 className="text-[1.2rem] md:text-[1.4rem] text-main-blue-700 line-clamp-2 font-extrabold" >{blogs[0].title} </h3>
                                   <p className="text-[0.8rem] text-gray-700 ">Posted on: {extractDateOnly(blogs[0].publication_date)}</p>
                                   <p className="text-[0.85rem] font-medium line-clamp-3">{blogs[0].content.description}</p>
                                   <Link className="text-[0.8rem] font-bold text-blue-600" to={`/blogs/blog?=${blogs[0].id}`}>Read More...</Link>
                              </div>
                         </div>
                         }
                         <div className="w-full lg:w-[42.5%] flex flex-col gap-[5px] overflow-hidden items-center h-[600px] overflow-y-auto">
                              <div className="w-full flex items-center justify-between"><h4 className="text-[1.4rem] font-extrabold text-gray-800 ">Other Stories</h4> {showTitle && <Link className="text-[0.8rem] font-bold text-blue-600" to="/blogs">View All Stories</Link>}</div>
                              {
                                   blogs && blogs.length > 1 && blogs.map((blog, index) => index > 0 && <BlogCardRowView key={`home-section-blog-row-card-${index}`} blog={blog} />)
                              }
                         </div>
                    </section>
               }
          </>
     )
}

HomeBlogsSection.propTypes = {
     showTitle: PropTypes.bool
}

export default BlogsPage