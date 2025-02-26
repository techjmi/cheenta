const Ch_Blog = require("../models/blog.schema");
// Create Blog Post
const createBlog = async (req, res) => {
    // console.log(req.ch_User.id)
    try {
        const { title, content, tags, category, image } = req.body;
        const newBlog = new Ch_Blog({
            title,
            content,
            tags,
            category,
            image,
            userId: req.user.id 
        });
        await newBlog.save();
        res.status(201).json({message:'Post Created Successfully'});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' });
    }
};
// Get All Blogs
const getAllBlogs = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.searchTerm) {
            filter.$or = [
                { title: { $regex: req.query.searchTerm, $options: "i" } },
                { content: { $regex: req.query.searchTerm, $options: "i" } }
            ];
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }
        // Fetch blogs based on filter
        const blogs = await Ch_Blog.find(filter)
            .populate("userId", "fullname email")
            .sort({ updatedAt: -1 });
        // Fetch unique categories
        const categories = await Ch_Blog.distinct("category");

        res.status(200).json({blogs, categories});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};
// Get Blog by ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Ch_Blog.findById(id).populate('userId', 'fullname email image');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
// Update Blog (Only Owner or Admin)
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, category } = req.body;
        const blog = await Ch_Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (req.user.id !== blog.userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.tags = tags || blog.tags;
        blog.category = category || blog.category;

        const updatedBlog = await blog.save();
        res.status(200).json({message:"Post Updated Successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
// Delete Blog (Only Owner or Admin)
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Ch_Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (req.user.id !== blog.userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await blog.deleteOne();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
//own blog
const getUserBlogs = async (req, res) => {
    // console.log('func called')
    try {
      if (!req.user) {
        console.log("Unauthorized request - no user found");
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = req.user.id;
      const userBlogs = await Ch_Blog.find({ userId }).populate('userId', 'fullname email');
      res.status(200).json(userBlogs);
    } catch (error) {
      console.log("Server Error:", error.message);
      res.status(500).json({ message: error.message }); 
    }
  };
// Like or Unlike Blog
const toggleLikeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Ch_Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const userIndex = blog.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            blog.likes.push(req.user.id); // Like
        } else {
            blog.likes.splice(userIndex, 1); 
        }

        await blog.save();
        res.status(200).json({ message: 'Like status updated', likes: blog.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, toggleLikeBlog, getUserBlogs };
