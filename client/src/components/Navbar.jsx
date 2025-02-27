import { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { DataContext } from "../context/Dataprovider";
// import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, toggleTheme, theme, logout } = useContext(DataContext);

  const closeAll = () => {
    setIsDrawerOpen(false);
    setDropdownOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", search);
      navigate(`/search?${urlParams.toString()}`);
      setSearch("");
      closeAll();
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
    closeAll();
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDrawerOpen]);

  return (
    <nav className="sticky top-0 w-full z-50 border-b px-4 md:px-8 bg-slate-500">
      <div className="flex items-center justify-between h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
            className="text-2xl md:hidden p-2 rounded-lg hover:bg-slate-400 transition-colors"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="md:hidden">
            <FaSearch size='2rem'
              onClick={() => navigate("/search")} 
              className="text-2xl cursor-pointer p-1.5 rounded-lg hover:bg-slate-400 transition-colors" 
              aria-label="Search"
            />
          </div>
          <div className="hidden md:flex ml-6">
            <ul className="flex items-center space-x-6">
              <li><Link to="/" className="hover:opacity-70 py-2 px-3 rounded-lg transition-opacity">Home</Link></li>
              <li><Link to="/about" className="hover:opacity-70 py-2 px-3 rounded-lg transition-opacity">About</Link></li>
              {currentUser && <li><Link to="/blog" className="hover:opacity-70 py-2 px-3 rounded-lg transition-opacity">Create Post</Link></li>}
            </ul>
          </div>
        </div>

        {/* Middle Section - Search */}
        <div className="hidden md:flex w-1/3 max-w-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-full px-4 py-2 pl-4 pr-10 bg-slate-400 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute top-1/2 right-3 transform -translate-y-1/2 p-1 rounded-full hover:bg-slate-500 transition-colors"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="text-xl p-2 rounded-lg hover:bg-slate-400 transition-colors"
            aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <div className="relative dropdown-container">
            {currentUser ? (
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="text-3xl p-1 rounded-lg hover:bg-slate-400 transition-colors"
                aria-label="User menu"
              >
                <FaUserCircle size="1.5em" />
              </button>
            ) : (
              <Link to="/signin" className="px-4 py-2 rounded-md hover:bg-slate-400 transition-colors">Login</Link>
            )}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 border rounded-lg shadow-lg bg-slate-400 backdrop-blur-sm">
                <Link 
                  to="/profile" 
                  onClick={() => setDropdownOpen(false)} 
                  className="block px-4 py-3 hover:bg-slate-500 transition-colors rounded-t-lg"
                >
                  Profile
                </Link>
                <button 
                  onClick={handleClick} 
                  className="w-full text-left px-4 py-3 hover:bg-slate-500 transition-colors rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm" 
          onClick={closeAll} 
        />
      )}
      <div className={`fixed left-0 top-0 h-full w-56 shadow-xl z-50 bg-slate-500 transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-out`}>
        <div className="p-4 h-full flex flex-col">
          <button 
            className="text-2xl self-end p-2 rounded-lg hover:bg-slate-400 transition-colors" 
            onClick={closeAll}
            aria-label="Close menu"
          >
            <MdClose />
          </button>
          <div className="mt-4 space-y-2 flex-1">
            {/* <form onSubmit={handleSearch} className="px-2 pb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded-full px-4 py-2 bg-slate-400 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form> */}
            <nav className="space-y-1">
              {currentUser && (
                <Link 
                  to="/profile" 
                  onClick={closeAll} 
                  className="block p-3 rounded-lg hover:bg-slate-400 transition-colors"
                >
                  Profile
                </Link>
              )}
              <Link 
                to="/" 
                onClick={closeAll} 
                className="block p-3 rounded-lg hover:bg-slate-400 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={closeAll} 
                className="block p-3 rounded-lg hover:bg-slate-400 transition-colors"
              >
                About
              </Link>
              {currentUser && (
                <Link 
                  to="/blog" 
                  onClick={closeAll} 
                  className="block p-3 rounded-lg hover:bg-slate-400 transition-colors"
                >
                  Create Post
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;