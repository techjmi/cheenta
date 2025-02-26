import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import { DataContext } from "../context/Dataprovider";
import { deleteUserProfile, getUserProfile } from "../service/userApi";
import { toast } from "react-toastify";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";
import UserBlog from "./UserBlog"
const Profile = () => {
  const { currentUser, setCurrentUser , logout} = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
const navigate= useNavigate()
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setCurrentUser(userData);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [setCurrentUser]);

  const handleDeleteProfile = async () => {
    try {
      const response = await deleteUserProfile(currentUser._id);
      if (response.status === 200) {
        toast.success("Profile deleted successfully");
        // localStorage.removeItem('user')
        logout()
        setCurrentUser(null);
        navigate('/signin')
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="max-w-4xl mx-auto text-center py-6">
      {currentUser?.profilepic ? (
        <img
          src={currentUser.profilepic}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border shadow-lg mx-auto"
        />
      ) : (
        <FaUserCircle className="w-24 h-24 text-gray-500 mx-auto" />
      )}
      <h1 className="text-2xl font-semibold mt-4">{currentUser.fullname}</h1>
      <p className="text-sm text-gray-600">{currentUser.email}</p>
      <p className="text-gray-600 mt-2">
        Member Since: {new Date(currentUser.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-4 justify-center mt-4">
        <Link
          to={`/profile-update/${currentUser?._id}`}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FaEdit className="text-blue-600" />
          <span className="text-blue-600">Edit Profile</span>
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <FaTrash className="text-red-600" />
          <span className="text-red-600">Delete Profile</span>
        </button>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600">
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <UserBlog />
    </div>
  );
};

export default Profile;
