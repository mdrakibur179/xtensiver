import illustration from "../assets/sign-up_page.jpg";
import ai from "../assets/ai-platform.svg";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email);
  }

  return (
    <div className="min-h-screen max-w-screen grid place-content-center pt-16 dark:bg-teal-950  text-black transition-all ease-in-out duration-300 dark:text-white">
      {/* Sign-up Text */}
      <div className="text-center mb-4 mt-8 lg:mt-0">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold dark:text-white">
          Create an Account
        </h2>
        <h3 className="text-gray-500 dark:text-gray-400 max-w-[16rem] mx-auto">
          Join our community and start something awesome.
        </h3>
      </div>

      <div className="grid justify-center h-full gap-8 md:gap-16 grid-cols-1 lg:grid-cols-2 container p-4">
        <img
          className="rounded-[8px] order-2 lg:order-1 mx-auto self-center max-w-full md:max-w-md lg:max-w-full"
          src={illustration}
          alt="illustration"
        />

        <div className="flex h-full items-center order-1 lg:order-2">
          <form className="w-full lg:max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="enter your email address"
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="user-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="user-name"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  placeholder="enter your username"
                  required
                />
                <button className="absolute right-2.5 cursor-pointer top-1/2 transform -translate-y-1/2">
                  <img src={ai} className="w-5 h-5" alt="ai" />
                </button>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="enter your password"
                  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 cursor-pointer top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </label>
            </div>

            <div className="flex items-center gap-1 flex-col md:flex-row md:gap-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register new account
              </button>

              <span>or</span>

              <button className="text-black dark:text-white flex items-center gap-2 cursor-pointer rounded-full border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center transition-colors">
                <FaGoogle />
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
