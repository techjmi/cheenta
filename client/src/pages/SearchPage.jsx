import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSearchPost } from "../service/blogApi";
import BlogCard from "../components/BlogCard";
const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get("searchTerm") || "";
    setSearchTerm(term);
  }, [location.search]);

  // Fetch blog posts based on searchTerm
  useEffect(() => {
    if (!searchTerm) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetchSearchPost(searchTerm);
        // const data = await response.json();
        console.log("the seatc", response);
        setPosts(response.blogs);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

    // Update URL with new search term
    const params = new URLSearchParams();
    params.set("searchTerm", searchTerm);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Sidebar with Search Box */}
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSearch} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      {/* Search Results Section */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center sm:border-b border-gray-500 p-3 mt-2">
          Search Results for "{searchTerm}"
        </h1>
        <div className="p-7 flex flex-wrap gap-4 items-center justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : posts.length > 0 ? ( // Check if posts exist
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
