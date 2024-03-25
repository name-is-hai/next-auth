import { auth } from "@/auth";

export default auth((req) => {
  console.log("ROUTE:", req.nextUrl.pathname);
  console.log("IS LOGGEDIN:", !!req.auth);

  // req.auth
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
