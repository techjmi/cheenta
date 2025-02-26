import { useState } from "react";
import { FaUserCircle, FaRegComment, FaPaperPlane } from "react-icons/fa";
import { DataContext } from "../context/Dataprovider";
import { useContext } from "react";

const Comments = ({ comments, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(commentText.trim());
      setCommentText("");
    }
  };

  return (
    <div className="mt-12 border-t pt-8">
      <div className="max-w-2xl mx-auto">
        {/* Comments Header */}
        <div className="flex items-center gap-2 mb-6">
          <FaRegComment className="text-xl" />
          <h3 className="text-xl font-semibold">
            Comments ({comments.length})
          </h3>
        </div>

        {/* Comments List */}
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <div className="flex-shrink-0">
                {comment.user.avatar ? (
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium">{comment.user.fullname}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-200">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-500" />
              )}
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
                rows="2"
                disabled={!currentUser}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim() || !currentUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="inline mr-2" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;