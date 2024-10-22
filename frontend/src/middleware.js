"use server";
import { NextResponse, userAgent } from "next/server";
import { fetchData } from "./lib/website";

export default middleware = async (request) => {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const response = NextResponse.next();
  // detect device
  const { device } = userAgent(request);
  const viewport = device.type === undefined ? "desktop" : "mobile";
  const addedTime = 24 * 60 * 60 * 1000;
  url.searchParams.set("viewport", viewport);
  response.cookies.set({
    name: "device",
    value: viewport,
    expires: Date.now() + addedTime,
    path: "/",
  });
  response.headers.append("device", viewport);

  // Get token from cookies
  const token = request.cookies.get("_token");
  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if no token
  }
  // admin middleware
  // Fetch user data from your API
  const res = await fetchData("/user/getUserData", "GET");

  console.log("next middleware", res);
  // Handle the API response
  if (!res.success) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect if token is invalid or API fails
  }

  // Check user role
  if (res.success && res.user.role === "admin") {
    console.log("res success", res.user);
    return response; // Allow access to the dashboard
  } else {
    return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect if not admin
  }
};

// Apply the middleware to specific routes using config
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"], // Specify the routes to protect
};
