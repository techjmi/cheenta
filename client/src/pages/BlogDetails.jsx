
import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCalendarAlt, FaHeart } from "react-icons/fa";
import { getBlogById, deleteBlog, toggleLikeBlog } from "../service/blogApi";
import { DataContext } from "../context/Dataprovider";
import Comments from "../components/Comments";
import { toast } from "react-toastify";
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(DataContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
// console.log('the blog is', blog)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast.error("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Delete blog post
  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteBlog(id);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        navigate("/");
      } else {
        toast.error(response.data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog");
    }
  }, [id, navigate]);

  // Like / Unlike blog
  const handleLike = useCallback(async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await toggleLikeBlog(id);
      if (response.status === 200) {
        setBlog((prevBlog) => ({
          ...prevBlog,
          likes: response.data.likes || [],
        }));
      } else {
        toast.error(response.data.message || "Failed to update like status");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Error updating like status");
    } finally {
      setIsLiking(false);
    }
  }, [id, isLiking]);
  const isAuthor = useMemo(
    () => currentUser?._id === blog?.userId?._id,
    [currentUser, blog]
  );
  const hasLiked = useMemo(
    () => Array.isArray(blog?.likes) && blog.likes.includes(currentUser?._id),
    [blog, currentUser]
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-semibold">Blog Not Found</h1>
        <p className="mt-4">The requested blog post does not exist.</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto md:p-4 p-2">
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this blog post?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <article className="overflow-hidden">
        <header className="md:p-6 p-2 border-b">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            {isAuthor && (
              <div className="flex gap-3">
                <Link
                  to={`/update-blog/${id}`}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaEdit className="text-xl" />
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 hover:bg-gray-100 rounded-full text-red-600"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              {blog.userId?.image && (
                <img
                  src={blog.userId?.image}
                  alt={blog.userId.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">
                  {blog.userId?.fullname || "Unknown Author"}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt />
                  <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
                </div>
              </div>
            </div>
            <button
              onClick={handleLike}
              className={`p-2 rounded-full ${
                hasLiked ? "text-red-600" : "text-gray-600"
              }`}
              disabled={isLiking}
            >
              <FaHeart className="text-xl" /> {blog.likes?.length || 0}
            </button>
          </div>
        </header>

        <div className="md:p-6 p-2">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
          )}
{blog.tags?.length > 0 && (
  <div className="flex flex-wrap gap-2 mb-6">
    {blog.tags.map((tag, index) => (
      <span 
        key={index}
        className="px-3 py-1 text-sm font-medium rounded-full transition-colors 
        bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 
        dark:hover:bg-gray-700"
      >
        #{tag}
      </span>
    ))}
  </div>
)}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
      {currentUser ? (
  <Comments postId={blog._id} userId={currentUser._id} />
) : (
  <p className="text-center text-gray-600 mt-4">
    You need to <span className="text-blue-500 font-semibold cursor-pointer">log in</span> to view and add comments.
  </p>
)}
    </div>
  );
};

export default BlogDetails;
