import axios from "axios";
const url = "/api/comments"; 
const token = localStorage.getItem("ch_token");
// Create a comment
export const createComment = async (content, postId) => {
    try {
        const response = await axios.post(
            url, 
            { content, postId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Error creating comment:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch comments for a specific post
export const getComments = async (postId) => {
    try {
        const response = await axios.get(`${url}/${postId}`);
        // console.log('the api comments', response.data)
        return response.data; 
    } catch (error) {
        console.error("Error fetching comments:", error.response?.data || error.message);
        throw error;
    }
};

// Delete a comment
export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${url}/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error deleting comment:", error.response?.data || error.message);
        throw error;
    }
};
