import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {authServer} from "@/lib/auth/server"; // correct SDK helper

export async function middleware(req: NextRequest) {

    const { data } = await authServer.getSession();

    // Redirect logged-in users *away* from Neon UI routes
    if (data?.session && req.nextUrl.pathname === "/auth/sign-in") {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*"],
};
