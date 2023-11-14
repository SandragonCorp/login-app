import { Users } from "@prisma/client";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: Users
    }
}

declare module "next-auth/jwt" {
    type JWT = Users;
}