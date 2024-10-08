"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user
  const registerUser = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        // set token in cookie
        const expirationTime = 86400 * 30;
        document.cookie = `_token=${result.token};expires=${new Date(
          Date.now() + expirationTime * 1000
        ).toUTCString()}; path=/; domain=${
          process.env.NEXT_PUBLIC_COOKIE_DOMAIN
        }`;
        setUser(result.newUser);
        router.push("/");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred", err);
      console.log(err);
    }
  };

  // Login user
  const loginUser = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        // set token in cookie
        const expirationTime = 86400 * 30;
        document.cookie = `_token=${result.token};expires=${new Date(
          Date.now() + expirationTime * 1000
        ).toUTCString()}; path=/; domain=${
          process.env.NEXT_PUBLIC_COOKIE_DOMAIN
        }`;
        console.log(result);
        setUser(result.newUser);
        router.push("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred", err);
      console.log(err);
    }
  };
  return { user, error, registerUser, loginUser };
};
