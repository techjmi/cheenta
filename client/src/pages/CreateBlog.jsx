import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../service/blogApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: "",
  });
  const[loading,setLoading]=useState(false)
const navigate= useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ChatApp"); 
    formData.append("cloud_name", "saltechapp");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/saltechapp/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { title, content, category, tags, image } = formData;

    try {
      const response = await createBlog({
        title,
        content,
        category,
        image,
        tags: tags.split(",").map(tag => tag.trim()), 
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate('/')
        setFormData({ title: "", content: "", category: "", tags: "", image: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog!");
    }
    setLoading(false)
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">Select Category</option>
          <option value="technology">Technology</option>
          <option value="programming">Programming</option>
          <option value="web-development">Web Development</option>
          <option value="design">Design</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded-lg px-4 py-2"
        />
        {formData.image && <img src={formData.image} alt="Uploaded" className="w-32 h-32 object-cover mt-2" />}

        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Enter tags separated by commas"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          className="rounded-lg overflow-hidden [&_.ql-editor]:min-h-[250px]"
          modules={{
            toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link", "code-block"], ["clean"]],
          }}
        />
        {/* <button type="submit" className="w-full px-6 py-3 font-medium rounded-lg hover:opacity-90">
          Publish Post
        </button> */}
          <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
