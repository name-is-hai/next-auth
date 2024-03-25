import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  console.log("ROUTE:", nextUrl.pathname);
  console.log("IS LOGGEDIN:", !!req.auth);

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(authRoutes[0], nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
