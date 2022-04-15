import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    // allow the person
    const { pathname } = req.nextUrl
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }
    // redirect from login
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('http://localhost:3000/login')
    }

}
// 1:46