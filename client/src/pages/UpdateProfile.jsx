import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { DataContext } from "../context/Dataprovider";
import { getUserProfile, updateUserProfile } from "../service/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { currentUser, setCurrentUser } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    profilepic: "",
  });
  console.log('the use data', userData)
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile(currentUser?._id);
        if (user) {
          setUserData({
            name: user.fullname || "",
            email: user.email || "",
            bio: user.bio || "",
            profilepic: user.profilepic || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (currentUser?._id) fetchProfile();
  }, [currentUser]);

  // Optimized input change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Optimized image upload to Cloudinary
  const handleFileChange = useCallback(async (e) => {
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
      setUserData((prev) => ({ ...prev, profilepic: data.secure_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // const formData = new FormData();
        // formData.append("name", userData.name);
        // formData.append("bio", userData.bio);
        // formData.append("profilepic", userData.profilepic);

        const updatedUser = await updateUserProfile(userData, id);
        setCurrentUser(updatedUser);
        navigate("/profile");
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Profile update failed!");
      } finally {
        setIsSubmitting(false);
      }
    },
    [userData, currentUser, navigate, setCurrentUser]
  );

  // Memoize profile image to prevent unnecessary recalculations
  const profileImage = useMemo(() => userData.profilepic || "", [userData.profilepic]);

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Change Photo</span>
              </div>
            </div>
            <label className="cursor-pointer border rounded-md px-4 py-2 text-sm hover:opacity-80">
              Upload New Photo
              <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={userData.email}
                className="w-full px-4 py-2 border rounded-md bg-opacity-10 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-1"
                rows="4"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Prevents unnecessary re-renders when props/state don't change
export default React.memo(UpdateProfile);
