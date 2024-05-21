import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs-react";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { signIn } from "./fetchers";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          if (!credentials || !credentials?.email || !credentials.password)
            return null;

          // const devUrl = "http://localhost:3030/api/sign-in";
          // const prodUrl = "https://dumpling.oskarpetr.dev/api/sign-in";

          // const req = await fetch(
          //   process.env.NODE_ENV === "development" ? devUrl : prodUrl,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({ username: credentials.email }),
          //   }
          // );

          const req = await signIn(credentials.email);
          const res = await req.json();
          const user = res.data;

          if (req.status !== 200 || !user) return null;
          console.log(user);
          const passwordMatch = bcrypt.compareSync(
            credentials.password,
            user.password
          );

          if (!passwordMatch) return null;

          return {
            id: user.userId,
            name: user.name,
            email: user.username,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error.message);
            return null;
          }

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }

      return token;
    },
    session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
