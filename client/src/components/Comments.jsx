import { useState, useEffect } from "react";
import { createComment, getComments, deleteComment } from "../service/commentApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(postId);
        setComments(res || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Failed to load comments");
      }
    };
    fetchComments();
  }, [postId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await createComment(content, postId);
      if (res.status === 200) {
        setComments((prev) => [res.data, ...prev]);
        setContent("");
        toast.success("Comment added successfully!");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
    setLoading(false);
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await deleteComment(commentId);
      if (res.status === 200) {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
        toast.success("Comment deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="md:p-4 max-w-xl mx-auto p-2">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <form onSubmit={addComment} className="mb-4">
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          rows="3"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </form>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-3  rounded-lg shadow flex items-start space-x-3"
            >
              <img
                src={comment.userId?.profilepic || ""}
                alt={comment.userId?.fullname || "User"}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="flex-1">
                <p className="font-semibold">{comment.userId?.fullname || "Anonymous"}</p>
                <p className="">{comment.content}</p>
              </div>
              {comment.userId?._id === userId && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
