import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcryptjs from "bcryptjs";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    // debug: process.env.NODE_ENV === 'development',
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Simple Login",
            credentials: { },
            async authorize(credentials) {
                const prisma = new PrismaClient();

                //check if user exists
                const user = await prisma.users.findFirstOrThrow({
                    where: {
                        OR: [
                            { username: credentials?.username }
                        ]
                    }
                });

        
                //check if password is correct
                const isPasswordValid = await bcryptjs.compare(credentials?.password, user.password)
                if(!isPasswordValid){
                    return null;
                }

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