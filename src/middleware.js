import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/admin(.*)", "/api/cms(.*)"]);
const isLogin = createRouteMatcher(["/admin/login(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isLogin(req)) return;
  if (isProtected(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|placeholders|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
    "/api/(.*)",
  ],
};
