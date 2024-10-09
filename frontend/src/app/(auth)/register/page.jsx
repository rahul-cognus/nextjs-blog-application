"use client";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

const Register = () => {
  const { error, registerUser } = useAuth();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [subscription, setSubscription] = useState(false);
  const handleChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setPasswordError("");
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const subscribe = e.target.checked;
    setSubscription(subscribe);
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordCriteria.test(password);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      subscription,
    } = registerData;
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (error) {
      toast.error(error);
    }
    console.log("subscription", subscription);
    // Validate password complexity
    // if (!validatePassword(password)) {
    //   setPasswordError(
    //     "Password must be at least 8 characters long, with one uppercase letter and one number."
    //   );
    //   return;
    // }
    registerUser({ firstName, lastName, email, password });
    toast.success("User Successful Register");
  };
  return (
    <main>
      <section className="container py-12 flex justify-center ">
        <div className="w-full md:w-10/12 lg:w-1/2 xl:w-[43%] p-8 sm:p-12 bg-primary bg-opacity-10 rounded">
          <h2 className=" text-2xl md:text-3xl font-semibold">
            Create your free account
          </h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="mb-5">
                <label
                  htmlFor="firstName"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                ></input>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="lastName"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required
                ></input>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-[#595D69] text-15 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                id="email"
                placeholder="E-mail"
                required
              ></input>
              <small className="text-[#595D69] ">
                We'll never share your email with anyone else.
              </small>
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
                name="password"
                minlength="8"
                value={registerData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                id="Password"
                placeholder="*********"
                required
              ></input>
            </div>
            {/* password */}
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="block text-[#595D69] text-15 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                minlength="8"
                value={registerData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                id="confirmPassword"
                placeholder="*********"
                required
              ></input>
            </div>
            {/* subscription check*/}
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded w-[15px] h-[15px] bg-[#f0f1f3]"
                id="subscriptionCheck"
                checked={subscription}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="subscriptionCheck"
                className="text-[#595D69] text-15"
              >
                Yes i'd also like to sign up for additional subscription
              </label>
            </div>
            {/* sign in button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* {error && <p className=" text-red-500 text-15 block">{error}</p>}
              {passwordError && (
                <small className="text-red-500 text-15 block">
                  {passwordError}
                </small>
              )} */}
              <button
                type="submit"
                className="bg-[#0cBC87] text-white font-medium py-2 px-4 rounded hover:bg-[#0aa073] transition-colors"
              >
                Register
              </button>
              <div className="flex items-center text-15 text-[#595D69] gap-1">
                Don't have an account?
                <Link href={"/login"} className=" text-blue-600 underline">
                  Log in
                </Link>
              </div>
            </div>
          </form>
          <hr className="my-5 text-[#a1a1a8] border-0 border-solid border-b opacity-25" />
          {/* Social media login */}
          <div className="text-center">
            <p className="text-15 text-[#595D69]">
              Sign up with your social network for quick access
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 my-4">
              <button className="bg-[#5d82d1] text-white font-medium py-2 px-4 rounded  hover:bg-[#5475bc] text-15 flex items-center justify-center gap-2 w-full md:w-1/2">
                <FaFacebookF />
                Sign up with Facebook
              </button>
              <button className="bg-[#3c7ff1] text-white font-medium py-2 px-4 rounded  hover:bg-[#3672d9] text-15 flex items-center justify-center gap-2 w-full md:w-1/2">
                <FaGoogle />
                Sign up with google
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
