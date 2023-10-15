import { Navbar } from "@/app/components/_navbar";
import { User } from "@/app/components/_user"
import { prisma } from "@/app/db";
import Link from "next/link";

// function getUsers() {
// return prisma.user.findMany()
// }

export default async function Page() {
    // const users = await getUsers()

    return (
        <>
            <header className="flex justify-between items-center mb-4 p-12">
                <h1 className="text-2xl">Users</h1>
                    <Link href="/user/register" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">New</Link>
            </header>
            <ul className="pl-4">
                {/* {users.map(user => (
                    <User key={user.id} {...user} />
                ))} */}
            </ul>
        </>
    )
}
