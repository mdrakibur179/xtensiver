import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMoon, FaSun, FaTimes } from "react-icons/fa";

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
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
              className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
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
              className="hidden md:block border text-sm px-4 py-2 rounded-full transition border-gray-400 text-black dark:text-white hover:bg-amber-100 dark:hover:bg-amber-300/10"
            >
              Signin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            } rounded-lg`}
          >
            <nav className="flex flex-col space-y-3 px-4 py-2">
              {navLinks.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className="font-medium py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="px-4 pt-3">
              <Link
                to="/sign-in"
                className="block w-full text-center border text-sm px-4 py-2 rounded-full transition border-amber-400 text-black dark:text-white hover:bg-amber-100 dark:hover:bg-amber-300/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                SignIn
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
