// Simple but important piece of code that makes sure that the user is logged in before they can access the page. Because this is a high level component it is active throughout the whole website. 
// Set to ignore api/send path, solution from: https://next-auth.js.org/configuration/nextjs
export {default} from "next-auth/middleware"

export const config = {
    matcher: ["/((?!api/route).*)"],
  };