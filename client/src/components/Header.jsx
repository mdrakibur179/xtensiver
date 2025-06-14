import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);

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

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedMode !== null) {
      setDarkMode(savedMode);
      document.documentElement.classList.toggle("dark", savedMode);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all border-b border-gray-100 duration-300 ${
        scrolled
          ? "bg-white/50 dark:bg-gray-900 backdrop-blur-lg shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div
        className={`relative transition-all duration-300 ${
          scrolled ? "" : "py-1"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
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
                className="md:hidden z-50 cursor-pointer flex items-center justify-center w-10 h-10 transition-colors text-gray-700 dark:text-gray-300"
              >
                {mobileMenuOpen ? (
                  <MdClose className="text-3xl" />
                ) : (
                  <MdOutlineMenu className="text-3xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu with Animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                ref={menuRef}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
                className={`fixed md:hidden inset-0 pt-20 left-22 top-0 bottom-0 min-h-screen z-40 bg-gray-100/70 dark:bg-gray-900/60 backdrop-blur-md p-6 overflow-y-auto`}
              >
                {/* Search */}
                <div className="mb-6 flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Search blogs or articles..."
                    className="w-full px-4 py-2 rounded-full border border-gray-400 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/80 dark:text-gray-100 transition"
                  />
                  <FaSearch className="text-black dark:text-white text-2xl rounded-full" />
                </div>

                {/* Menu Links */}
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((item) => (
                    <Link
                      key={item.link}
                      to={item.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-extralight py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>

                {/* Signin Button */}
                <div className="mt-4">
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center border px-4 py-2 rounded-full bg-blue-500 font-semibold border-teal-500 dark:border-teal-500 text-white dark:text-gray-100 hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                  >
                    Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
