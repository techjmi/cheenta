import { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { DataContext } from "../context/Dataprovider";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, toggleTheme, theme, logout } = useContext(DataContext);

  const closeAll = () => {
    setIsDrawerOpen(false);
    setDropdownOpen(false);
  };

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", search);
      navigate(`/search?${urlParams.toString()}`);
      setSearch("");
    },
    [navigate, search]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handleClick = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 w-full z-50 border-b px-4 md:px-8 bg-slate-500">
      <div className="flex items-center justify-between h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="text-2xl md:hidden">
            <FaBars />
          </button>
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <CiSearch onClick={() => navigate("/search")} className="text-xl cursor-pointer" />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-6">
            <ul className="flex items-center space-x-6">
              <li><Link to="/" className="hover:opacity-70">Home</Link></li>
              <li><Link to="/about" className="hover:opacity-70">About</Link></li>
              {currentUser && <li><Link to="/blog" className="hover:opacity-70">Create Post</Link></li>}
            </ul>
          </div>
        </div>

        {/* Middle Section - Search */}
        <div className="hidden md:flex w-1/3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-full px-4 py-2 pl-4 pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-xl">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <div className="relative dropdown-container">
            {currentUser ? (
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-3xl">
                <FaUserCircle size="1.5em" />
              </button>
            ) : (
              <Link to="/signin" className="px-4 py-2 rounded-md">Login</Link>
            )}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 border rounded-lg shadow bg-gray-600">
                <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-3 hover:opacity-70">Profile</Link>
                <button onClick={handleClick} className="w-full text-left px-4 py-3 hover:opacity-70">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeAll} />}
      <div className={`fixed left-0 top-0 h-full w-64 shadow z-50 bg-gray-500 transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <button className="text-2xl absolute right-1 top-5" onClick={closeAll}><MdClose /></button>
          <div className="mt-8 space-y-4">
            {currentUser && <Link to="/profile" onClick={closeAll} className="block p-2 hover:opacity-70">Profile</Link>}
            <Link to="/" onClick={closeAll} className="block p-2 hover:opacity-70">Home</Link>
            <Link to="/about" onClick={closeAll} className="block p-2 hover:opacity-70">About</Link>
            {currentUser && <Link to="/blog" onClick={closeAll} className="block p-2 hover:opacity-70">Create Post</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;