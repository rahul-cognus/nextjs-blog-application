import Link from "next/link";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";

const Login = () => {
  return (
    <main>
      <section className="container py-12 flex justify-center ">
        <div class="w-full md:w-10/12 lg:w-1/2 xl:w-[43%] p-8 sm:p-12 bg-primary bg-opacity-10 rounded">
          <h2 className=" text-2xl md:text-3xl font-semibold">
            Log in to your account
          </h2>
          <form className="mt-8">
            {/* email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-[#595D69] text-15 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                id="email"
                placeholder="E-mail"
              ></input>
            </div>
            {/* password */}
            <div className="mb-3">
              <label
                htmlFor="Password"
                className="block text-[#595D69] text-15 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                id="Password"
                placeholder="*********"
              ></input>
            </div>
            {/* forget password */}
            <div className="mb-4">
              <Link href={"/"} className="block text-[#595D69]">
                Forgot Password?
              </Link>
            </div>
            {/* sign in button */}
            <div className="flex items-center justify-between">
              <button className="bg-[#0cBC87] text-white font-medium py-2 px-4 rounded hover:bg-[#0aa073] transition-colors">
                Sign in me
              </button>
              <div className="flex items-center text-15 text-[#595D69] gap-1">
                Don't have an account?
                <Link href={"/"} className=" text-blue-600 underline">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <hr className="my-5 text-[#a1a1a8] border-0 border-solid border-b opacity-25" />
          {/* Social media login */}
          <div className="text-center">
            <p className="text-15 text-[#595D69]">
              Sign in with your social network for quick access
            </p>
            <div className="flex items-center gap-4 my-4">
              <button className="bg-[#5d82d1] text-white font-medium py-2 px-4 rounded  hover:bg-[#5475bc] text-15 flex items-center justify-center gap-2 w-1/2">
                <FaFacebookF />
                Sign in with Facebook
              </button>
              <button className="bg-[#3c7ff1] text-white font-medium py-2 px-4 rounded  hover:bg-[#3672d9] text-15 flex items-center justify-center gap-2 w-1/2">
                <FaGoogle />
                Sign in with google
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
