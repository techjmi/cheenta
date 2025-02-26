import { useEffect, useState } from "react";
import { getAllBlogs } from "../service/blogApi";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../skeleton/BlogCardSkeleton";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // console.log("the cat is", category);
  const handleCategoryClick = (selectedCategory) => {
    console.log("Selected Category:", selectedCategory);
    setSelectedCategory(selectedCategory);
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs(selectedCategory);
        // console.log("the blog res", response);
        setBlogs(response.data.blogs);
        setCategory(response.data.categories);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ul className="flex flex-wrap gap-2">
        {category.map((cat, index) => (
          <li key={index}>
            <button
              onClick={() => handleCategoryClick(cat)}
              className="px-4 py-2 rounded-full transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-200 dark:text-black"
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
      <h1 className="text-xl font-semibold text-center mb-4">Latest Blogs</h1>
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
