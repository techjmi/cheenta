
const jwt = require('jsonwebtoken');
const Ch_Comment = require('../models/comment.schema');
// Create a comment
const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const userId = req.user.id;

        if (!content || !postId) {
            return res.status(400).json({ message: "Content and postId are required" });
        }

        const newComment = new Ch_Comment({
            content,
            userId,
            postId
        });

        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        const comments = await Ch_Comment.find({ postId })
            .populate("userId", "fullname email profilepic") 
            .sort({ createdAt: -1 }); 

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
};
// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id; 

        const comment = await Ch_Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await Ch_Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
};

module.exports = { createComment, deleteComment, getComments };
