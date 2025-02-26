const BlogCardSkeleton = () => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-md animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="h-8 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  };
  
  export default BlogCardSkeleton;
  