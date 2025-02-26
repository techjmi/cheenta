import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./components/Profile";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateProfile from "./pages/UpdateProfile";
import { useContext } from "react";
import { DataContext } from "./context/Dataprovider";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import PrivateRoute from "./components/PrivateRoute";
import SearchPage from "./pages/SearchPage";
function App() {
  const { theme } = useContext(DataContext);
  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      } min-h-screen`}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<CreateBlog />} />
          <Route path="/profile-update/:id" element={<UpdateProfile />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path='/search' element={<SearchPage />} />
          <Route element={<PrivateRoute />}>
            {/* <Route path="/blog" element={<CreateBlog />} /> */}
           
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
