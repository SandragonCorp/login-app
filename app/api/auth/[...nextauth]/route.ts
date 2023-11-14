import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { DateTime } from "@/app/(models)/_datetime";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import { User } from "@/app/(models)/_user";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Simple Login",
            credentials: { 
                username: { },
                password: { }
            },
            async authorize(credentials) : Promise<any> {
                // check if user exists
                let user = await prisma.users.findFirstOrThrow({
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

                user = await prisma.users.update({
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
        async jwt({ token, user, session}: any): Promise<any> {

            return {...token, ...user};
        },
        async session({ session, token, user}: any): Promise<any> {
            // build user object
            session.user = {
                id: token.id,
                username: token.username,
                email: token.email,
                firstname: token.firstname,
                lastname: token.lastname,
                enabled: token.enabled,
                role: token.role,
                createddatetime: token.createddatetime,
                lastloggedindatetime: token.lastloggedindatetime
            } as User;

            return session;
        }
    }
}

export const handler = NextAuth(authOptions as AuthOptions);

export {handler as GET, handler as POST}