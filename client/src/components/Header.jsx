import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Searchbox from "./Searchbox";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (mobileMenuOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, isModalOpen]);

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
      className={`fixed top-0 backdrop-blur-sm dark:bg-gray-950 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm bg-gray-50" : "bg-gray-50 shadow-xs"
      }`}
    >
      <div
        className={`relative transition-all ease-in-out duration-600 ${
          scrolled ? "" : "py-[.25rem]"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-3xl font-bold text-blue-600 dark:text-blue-400 mr-12"
                style={{
                  fontFamily: "Rowdies, sans-serif",
                  fontWeight: "300",
                  fontStyle: "normal",
                }}
              >
                xTensiver
              </Link>
              <div className="hidden md:flex">
                <Searchbox onClick={() => setIsModalOpen(true)} />
              </div>
            </div>

            <div className="flex gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.link}
                    to={item.link}
                    className={({ isActive }) =>
                      `font-[500] ${
                        isActive
                          ? "text-blue-600 dark:text-white"
                          : "text-gray-700 dark:text-gray-400"
                      } hover:text-blue-600 dark:hover:text-white transition-colors`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>

              {/* Right Side Controls */}
              <div className="flex items-center gap-4">
                <div className="md:hidden">
                  <Searchbox onClick={() => setIsModalOpen(true)} />
                </div>
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
                  className="hidden md:block border text-sm px-4 py-1 rounded-full transition border-gray-400 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  Login
                </Link>

                {/* Mobile Menu Button */}
                {!isModalOpen && (
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
                )}
              </div>
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
                className={`fixed md:hidden inset-0 pt-20 left-22 top-0 bottom-0 min-h-screen z-40 bg-teal-100/40 dark:bg-gray-950/60 backdrop-blur-md p-6 overflow-y-auto`}
              >
                {/* Menu Links */}
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.link}
                      to={item.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive ? "bg-gray-700 text-white" : ""
                        } text-xl font-extralight py-2 px-4 rounded hover:bg-gray-400 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-100`
                      }
                    >
                      {item.title}
                    </NavLink>
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

      {/* Modal */}
      {isModalOpen && (
        <div
          aria-hidden="false"
          tabIndex="-1"
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 px-2 z-[99rem] flex min-h-screen justify-center items-start pt-28 backdrop-blur-md bg-gray-950/90"
        >
          {/* Modal content */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-950 p-6 rounded-xl shadow-2xl w-full max-w-md transform border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Search
              </h3>
              <button
                aria-label="Close modal"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {/* Close icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m6 18 12-12M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search blogs or articles…"
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Action button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  /* perform search */
                }}
                className="bg-blue-500 px-4 py-2 rounded-md font-semibold text-gray-100 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Search
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Header;
