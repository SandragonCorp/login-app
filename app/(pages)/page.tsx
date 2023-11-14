"use client"

import { useSession } from "next-auth/react";
import { FullContainer } from "../components/_full_container";


export default function Home() {
    const { data: session, status } = useSession();

	return (
	<>
		<FullContainer className="bg-neutral-200">
			ROLE: {session?.user.role}
		</FullContainer>
	</>
	)
}
