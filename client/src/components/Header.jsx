import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch, FaSun, FaTimes } from "react-icons/fa";
import { MdClose, MdMenu, MdOutlineMenu } from "react-icons/md";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { link: "/", title: "Home" },
    { link: "/blogs", title: "Blogs" },
    { link: "/about", title: "About" },
    { link: "/contact", title: "Contact" },
  ];

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedMode !== null) {
      setDarkMode(savedMode);
      document.documentElement.classList.toggle("dark", savedMode);
    }
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-100 transition-all border-b border-gray-50 duration-300 ${
        scrolled
          ? "bg-white/50 dark:bg-gray-900 backdrop-blur-lg shadow-sm"
          : "bg-white dark:bg-gray-900 py-1"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
              style={{
                fontFamily: "Rowdies, sans-serif",
                fontWeight: "300",
                fontStyle: "normal",
              }}
            >
              xTensiver
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center cursor-pointer justify-center w-10 h-10 transition-all text-gray-700 dark:text-gray-300"
            >
              {darkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </button>

            {/* Login Button */}
            <Link
              to="/sign-in"
              className="hidden md:block border text-sm px-4 py-2 rounded-full transition border-gray-400 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300/10"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden cursor-pointer flex items-center justify-center w-10 h-10 transition-colors text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? (
                <MdClose className="text-3xl" />
              ) : (
                <MdOutlineMenu className="text-3xl" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`fixed md:hidden left-0 right-0 top-18 bottom-0 z-50 transform ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-500 ease-in-out ${
              darkMode ? "bg-gray-900/90" : "bg-gray-100/90"
            } backdrop-blur-md p-6`}
          >
            {/* Search */}
            <div className="mb-6 relative flex items-center">
              <input
                type="text"
                placeholder="Search blogs, articles, or more..."
                className="w-full px-4 py-2 rounded-full border border-gray-400 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
              />
              <FaSearch className="absolute right-4 text-gray-400" />
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Signin Button */}
            <div className="absolute bottom-16 left-0 right-0 px-6">
              <Link
                to="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center border px-4 py-2 rounded-full font-semibold border-gray-400 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
