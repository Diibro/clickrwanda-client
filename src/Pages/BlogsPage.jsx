import { useEffect, useState } from "react"
import Server from "../services/Server"
import { extractDateOnly } from "../utils/dateFunctions"
import PropTypes from 'prop-types';
import { BlogCardRowView } from "../components/cards/BlogCard";
import Service from "../services/Service";
import { MyImage } from "../components/static/Image";
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
          <div className="blogs-page" >
               <WelcomeSection />
               <HomeBlogsSection />
          </div>
     )
}

const WelcomeSection = () => {
     return (
          <section className="blogs-page-welcome-section">

          </section>
     )
}

export const HomeBlogsSection = ({showTitle=false}) => {
     const [blogs, setBlogs] = useState(null);

     const fetchBlogs = async (ops) => {
          const res = await Service.get(`${Server.blog}?limit=${ops.limit}&offset=${ops.offset}`);
          if(res) {
               setBlogs(res.data);
          }
     }

     useEffect(() => {
          (async () => await fetchBlogs({limit:10,offset:0}))(); 
     }, [])

     useEffect(() => {
          console.log(blogs);
     },[blogs])
     return (
          <>
               {blogs && blogs.length && 
                    <section className="home-blogs-section">
                         {showTitle && <div className="blog-section-title"><h2>Top Stories</h2></div>}
                         {blogs[0] && 
                         <div className="main-blog">
                              <div className="image-container">
                                   {/* <img src={blogs[0].content.featuredImage} alt="feature image" /> */}
                                   <MyImage image={blogs[0].content.featuredImage} />
                              </div>
                              <div className="content">
                                   <h3>{blogs[0].title} </h3>
                                   <p>Posted on: {extractDateOnly(blogs[0].publication_date)}</p>
                                   <p>{blogs[0].content.description}</p>
                                   <Link to={'/blogs'}>Read More...</Link>
                              </div>
                         </div>
                         }
                         <div className="other-blogs">
                              <div className="title"><h4>Other Stories</h4> {showTitle && <Link to="/blogs">View All Stories</Link>}</div>
                              {
                                   blogs && blogs.length > 1 && blogs.map((blog, index) => index > 0 && index < 5 && <BlogCardRowView key={`home-section-blog-row-card-${index}`} blog={blog} />)
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