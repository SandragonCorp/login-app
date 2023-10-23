// import { Navbar } from "@/app/components/_navbar";
// import { User } from "@/app/components/_user"
// import { prisma } from "@/app/db";
// import Link from "next/link";

// function getUsers() {
//     return prisma.user.findMany()
// }

// async function deleteAllUser() {
//     "use server"
//     await prisma.user.deleteMany({})
// }

// export default async function Page() {
//     const users = await getUsers()

//     return (
//         <>
//             <header className="flex justify-between items-center mb-4 p-12">
//                 <h1 className="text-2xl bg-black">Users</h1>
//                     <Link href="/user/register" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">New</Link>
//             </header>
//             <ul className="pl-4 top-8">
//                 {users.map(user => (
//                     <User key={user.id} {...user} />
//                 ))}
//             </ul>
//             <div>
//             <form action={deleteAllUser} className={`page_wrapper rounded-sm mx-auto text-center`}>
//                     <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Delete All' />
//                 </form>
//             </div>
//         </>
//     )
// }
