import React from "react";

const UserBlogSkeleton = () => {
  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default UserBlogSkeleton;
