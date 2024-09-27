"use server";
import { NextResponse, userAgent } from "next/server"

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
    return response;
}