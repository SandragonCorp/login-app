import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcryptjs from "bcryptjs";
import { DateTime } from "@/app/(utils)/_datetime";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Simple Login",
            credentials: { 
                username: { },
                password: { }
            },
            async authorize(credentials) : Promise<any> {
                const prisma = new PrismaClient();

                // check if user exists
                const user = await prisma.users.findFirstOrThrow({
                    where: {
                        OR: [
                            { username: credentials?.username }
                        ]
                    }
                });
        
                //check if password is correct
                const isPasswordValid = await bcryptjs.compare(credentials?.password as string, user.password as string)
                if(!isPasswordValid){
                    return null;
                }

                await prisma.users.update({
                    where: { id: user.id },
                    data: { lastloggedindatetime: (new DateTime()).toISOString() }
                });

                return user;
            }
        })
    ],
    pages: {
        signIn: '/user/login'
    },
    callbacks: {
        async jwt({ token, user, session}) {
            return token;
        },
        async session({ session, token, user}) {
            return session;
        }
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}