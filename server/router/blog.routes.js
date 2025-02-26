const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  createBlog,
  getUserBlogs,
} = require("../controller/blog.controller");

const router = express.Router();

router.post("/", verifyToken, createBlog);
router.get("/", getAllBlogs);
router.get("/my-blogs", verifyToken, getUserBlogs);
router.get("/:id", getBlogById);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.post("/:id/like", verifyToken, toggleLikeBlog);
module.exports = router;
