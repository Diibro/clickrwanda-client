
import ContentLoader from "react-content-loader";

const CardLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={350}
    viewBox="0 0 300 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="rounded-lg shadow w-full"
  >
    {/* Image Placeholder */}
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="180" />
    {/* Urgent Label */}
    <rect x="10" y="10" rx="4" ry="4" width="60" height="20" />
    {/* Title Placeholder */}
    <rect x="10" y="190" rx="4" ry="4" width="80%" height="16" />
    {/* Location Icon Placeholder */}
    <circle cx="20" cy="220" r="8" />
    <rect x="35" y="212" rx="4" ry="4" width="50%" height="16" />
    {/* Price Placeholder */}
    <rect x="10" y="250" rx="4" ry="4" width="30%" height="18" />
    {/* Buttons Placeholder */}
    <rect x="10" y="290" rx="8" ry="8" width="40%" height="40" />
    <rect x="160" y="290" rx="8" ry="8" width="40%" height="40" />
  </ContentLoader>
);

const LoadingAds = () => {
  return (
    <div className="w-full">
      {/* Header Placeholder */}
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

      {/* Card Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[10px] mt-6">
          {[...Array(4)].map((_, index) => (
               <CardLoader key={index} />
          ))}
      </div>
    </div>
  );
};

export default LoadingAds;