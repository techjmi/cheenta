import React, { useCallback, useEffect, useState, useMemo } from "react";
import { getUserBlogs } from "../service/blogApi";
import UserBlogSkeleton from "../skeleton/UserBlogSkeleton";
import UserBlogCard from "./UserBlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserBlogs();
      if (response.status === 200) {
        setBlogs(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserBlogs();
  }, [fetchUserBlogs]);

  const skeletons = useMemo(
    () => Array.from({ length: 3 }, (_, index) => <UserBlogSkeleton key={index} />),
    []
  );

  return (
    <div className="w-full  mx-auto mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">My Blogs</h2>
      <div className="flex flex-wrap gap-5 justify-center">
        {loading ? skeletons : blogs.length > 0 ? blogs.map((blog) => (
          <UserBlogCard key={blog._id} blog={blog} />
        )) : (
          <p className="text-gray-600 text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default UserBlog;
