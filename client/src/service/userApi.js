import axios from "axios";

const user_url = "/api/auth";
const token = localStorage.getItem("ch_token");
// Signup
export const postData = async (data) => {
  try {
    const response = await axios.post(`${user_url}/signup`, data);
    return response;
  } catch (error) {
    console.log("Error while posting signup data:", error.message);
    throw error
  }
};
// Signin
export const signin = async (data) => {
  try {
    const response = await axios.post(`${user_url}/signin`, data);
    return response;
  } catch (error) {
    console.log("Error while posting signin data:", error.message);
    throw error
  }
};
// Get user profile
export const getUserProfile = async (tok) => {
  try {
    const response = await axios.get(`${user_url}/user`, {
      headers: { Authorization: `Bearer ${tok}` },
    });
    // console.log('the profile data ', response)
    return response.data;
  } catch (error) {
    console.log("Error while fetching user profile:", error.message);
    throw error
  }
};
// Update user profile
export const updateUserProfile = async (data,id) => {
  try {
    const response = await axios.put(`${user_url}/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("Error while updating user profile:", error.message);
    throw error
  }
};
// Delete user
export const deleteUserProfile = async (id) => {
  try {
    const response = await axios.delete(`${user_url}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("Error while deleting user:", error.message);
    throw error
  }
};
