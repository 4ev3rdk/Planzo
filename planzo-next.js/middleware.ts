import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)'
])

export default clerkMiddleware(async (auth, req) => {
    const { userId, orgId, redirectToSignIn } = await auth();

    // 1. Not signed in → block protected routes
    if (!userId && !isPublicRoute(req)) {
        return redirectToSignIn({ returnBackUrl: req.url });
    }

    // 2. Signed in but no org → force org selection
    if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
        return NextResponse.redirect(new URL("/select-org", req.url));
    }

    // 3. Signed in with org but still at `/` → send to org page
    if (userId && orgId && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
    }

    // 4. Otherwise → continue
    return NextResponse.next();
});
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}




