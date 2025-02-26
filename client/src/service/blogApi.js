import axios from "axios";
const BASE_URL = "/api/blog";
const token = localStorage.getItem("ch_token");
// Blog API functions
export const createBlog = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("Error while creating blog:", error.message);
  }
};
export const getAllBlogs = async (category = "") => {
  console.log(category)
  try {
    const response = await axios.get(BASE_URL, {
      params: category ? { category } : {},
    });
    return response;  
  } catch (error) {
    console.log("Error while fetching blogs:", error.message);
  }
};
export const fetchSearchPost = async (searchQuery) => {
  try {
    const res = await axios.get(`${BASE_URL}/?${searchQuery}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data; 
  } catch (error) {
    console.error("The error in getting the post is", error.message);
    throw error; 
  }
};
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.log("Error while fetching blog:", error.message);
  }
};

export const getUserBlogs = async () => {
  console.log('function is called')
  try {
    const response = await axios.get(`${BASE_URL}/my-blogs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('the user blog is',response)
    return response;
  } catch (error) {
    console.log("Error while fetching user blogs:", error.message);
  }
};

export const updateBlog = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("Error while updating blog:", error.message);
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("Error while deleting blog:", error.message);
  }
};

export const toggleLikeBlog = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/${id}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("Error while toggling like:", error.message);
  }
};
