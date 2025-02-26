import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../service/blogApi";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    inputTag: ""
  });
const navigate= useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        if (blog) {
          setFormData({
            title: blog.data.title,
            content: blog.data.content,
            category: blog.data.category,
            tags: blog.data.tags || [],
            inputTag: ""
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const removeTag = (indexToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleTagInputChange = (e) => {
    setFormData({ ...formData, inputTag: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response=await updateBlog(id, {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags, 
      });
      console.log('the update blog res', response)
      if(response.status===200){
toast.success(response.data.message)
navigate('/')
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="px-2 w-full max-w-2xl">
        <h1 className="text-xl font-semibold text-center mb-6">Update Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="design">Design</option>
              </select>
            </div>

            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="border rounded-md px-3 py-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-sm border rounded-md flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="text-sm"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  name="inputTag"
                  value={formData.inputTag} // Corrected binding
                  onChange={handleTagInputChange}
                  placeholder="Add Tags"
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              className="rounded-md overflow-hidden [&_.ql-editor]:min-h-[300px]"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "code-block"],
                  ["clean"],
                ],
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium border rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
