import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        !nextUrl.pathname.startsWith("/login") &&
        !nextUrl.pathname.startsWith("/register") &&
        !nextUrl.pathname.startsWith("/logged-out") &&
        nextUrl.pathname !== "/"; // トップページは除外

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        // ログイン済みでログイン・登録画面にアクセスした場合はトップへ
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [Google], // Add providers with an empty array for now
} satisfies NextAuthConfig;
