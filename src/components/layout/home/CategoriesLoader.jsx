
import ContentLoader from "react-content-loader";

const CategoriesLoader = () => (
  <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {Array.from({ length: 12 }).map((_, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width="100%"
        height={150}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className="rounded-lg shadow"
      >
        {/* Icon Placeholder */}
        <rect x="40" y="15" rx="8" ry="8" width="70" height="70" />

        {/* Category Name */}
        <rect x="10" y="95" rx="4" ry="4" width="120" height="15" />

        {/* Ads Count */}
        <rect x="30" y="120" rx="4" ry="4" width="80" height="10" />
      </ContentLoader>
    ))}
  </div>
);

export default CategoriesLoader;
