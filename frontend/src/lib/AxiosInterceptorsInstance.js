import axios from "axios"
import { cookies } from "next/headers";

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor to include token in Authorization header
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const cookieData = await getCookieData();
            if (cookieData) {
                const tokenCookie = cookieData.find(cookie => cookie.name === '_token');
                const accessToken = tokenCookie?.value;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
        } catch (error) {
            console.error("Request interceptor error - fetching cookie data failed:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
)


// get all cookie
async function getCookieData() {
    try {
        const cookieStore = cookies();
        return cookieStore.getAll();
    } catch (error) {
        throw new Error(`Failed to retrieve cookies: ${error.message}`);
    }
}

// // Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Log error details for debugging
        if (error.response) {
            console.error("Response error:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else {
            console.error("Error in response interceptor:", error.message);
        }
        return Promise.reject(error); // Reject with the original error
    }
)