"use client"

import React from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
    children?: React.ReactNode;
    session?: any // @todo learn the session data type?
}

export default function NextAuthSessionProvider({ children, session }: Props) {
    return (
        <SessionProvider session={session}>
            { children }
        </SessionProvider>
    );
}