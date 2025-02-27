const express = require("express");
const verifyToken = require("../middleware/auth");
const { createComment, deleteComment, getComments } = require("../controller/comment.controller");
const router = express.Router();

router.post("/", verifyToken, createComment);
router.delete("/:commentId", verifyToken, deleteComment);
router.get("/:postId", getComments); 

module.exports = router;

