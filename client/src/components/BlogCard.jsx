import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{blog.title}</h2>
        <p
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>
        <p className="text-sm font-medium mt-2">
          By {blog.userId?.fullname || "Unknown"}
        </p>
        <Link
          to={`/blog/${blog._id}`}
          className="inline-block mt-3 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
