"use client"

import { FullContainer } from "../components/_full_container";

export default function Home() {
	const userRole = null;

	return (
	<>
		<FullContainer className="bg-neutral-200">
			ROLE: {userRole}
		</FullContainer>
	</>
	)
}
