import React, { useMemo } from "react";
import { Link } from "react-router-dom";
// import { Button } from "flowbite-react";

const UserBlogCard = React.memo(({ blog }) => {
  const formattedDate = useMemo(() => {
    const date = new Date(blog?.createdAt);
    return `on ${date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  }, [blog?.createdAt]);

  const readTime = useMemo(
    () => Math.max(1, Math.round(blog?.content.length / 1000)),
    [blog?.content.length]
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card border-b">
        {/* Image Part */}
        <div className="relative w-full md:w-[500px] h-60">
          <Link to={`/blog/${blog._id}`}>
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover rounded-[25px] bg-slate-50"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Post Text Part */}
        <div className="w-full md:w-2/3 flex flex-col justify-between text-left">
          <div className="self-start">
            <p className="text-sm mb-3">{formattedDate}</p>
            <Link to={`/blog/${blog._id}`}>
              <h2 className="text-lg font-bold text-primary hover:text-primary-hover">
                {blog.title}
              </h2>
            </Link>
            <p
              className="mt-1 text-left"
              dangerouslySetInnerHTML={{
                __html: blog?.content.slice(0, 150) + "....",
              }}
            />
          </div>
          <div className="mt-3 flex justify-between">
            <span className="text-xs text-muted-foreground italic">
              {readTime} min read (Approx)
            </span>
            <Link to={`/blog/${blog._id}`} className="inline-block">
              <button className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                Discover More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserBlogCard;
