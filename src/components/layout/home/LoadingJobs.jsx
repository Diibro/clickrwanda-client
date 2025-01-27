import ContentLoader from "react-content-loader";

const LoadingJobs = () => (
     <div className="w-full flex flex-col items-center gap-[10px]">
          <ContentLoader
               speed={2}
               width="100%"
               height={40}
               viewBox="0 0 full 40"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
               className="w-full"
          >
               <rect x="0" y="0" rx="4" ry="4" width="300" height="40" className="w-full" />
               {/* <rect x="85%" y="10" rx="4" ry="4" width="15%" height="20" /> */}
          </ContentLoader>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
               {Array.from({ length: 6 }).map((_, index) => (
                    <ContentLoader
                              key={index}
                              speed={2}
                              width="100%"
                              height={150}
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                              className="rounded-lg shadow"
                    >
                    {/* Company Logo */}
                    <rect x="10" y="10" rx="4" ry="4" width="50" height="50" />
                    
                    {/* Job Title */}
                    <rect x="70" y="15" rx="4" ry="4" width="200" height="16" />
                    <rect x="70" y="40" rx="4" ry="4" width="150" height="12" />
          
                    {/* Location */}
                    <rect x="10" y="80" rx="4" ry="4" width="120" height="12" />
          
                    {/* Deadline */}
                    <rect x="10" y="100" rx="4" ry="4" width="150" height="12" />
          
                    {/* Apply Button */}
                    <rect x="10" y="120" rx="8" ry="8" width="100" height="24" />
               </ContentLoader>
               ))}
          </div>
     </div>
     
   );

export default LoadingJobs