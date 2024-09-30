"use server";

import { cookies, headers } from "next/headers";

// get device
export const getDevice = () => {
  const headersList = headers();
  return headersList.get("device");
};

// fetchdata
// const res = await fetch(process.env.NEXT_PUBLIC_API_URL + api, {
//     cache: "no-store",
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(updatedPayload)
// });

export const fetchData = async (apiUrl, method = "GET", payload = {}) => {
  try {
    //get cookie
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("_token");
    const token = tokenCookie?.value;

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`, {
      cache:
        process.env.NEXT_PUBLIC_APP_MODE === "production"
          ? "force-cache"
          : "no-store",
      method,
      headers,
      body: method === "GET" ? null : JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return { error: error.message };
  }
};
