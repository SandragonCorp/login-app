'use client'

import Link from 'next/link'

import './_navbar.module.css';

import { useState } from 'react'

export function Navbar() {
    const [navbar, setNavbar] = useState(false)
    return (
        <>
            <nav className="_nav_bar w-full bg-gray-800 fixed top-0 left-0 right-0 z-10">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <Link href="/">
                            <h1 className="text-2x1 text-slate-600 font-bold">LOGO</h1>
                        </Link>
                    </div>
                    <div className={`md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'}`}>
                        <ul className="h-screen md:h-auto items-end justify-end md:flex ">
                            <li className="pb-6 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-slate-900  border-slate-900  md:hover:text-slate-600 md:hover:bg-transparent">
                                <Link href="/about" onClick={() => setNavbar(!navbar)}>About</Link>
                            </li>
                            <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-slate-600  border-slate-900  md:hover:text-slate-600 md:hover:bg-transparent">
                                <Link href="/projects" onClick={() => setNavbar(!navbar)}>Projects</Link>
                            </li>
                            <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-slate-600  border-slate-900  md:hover:text-slate-600 md:hover:bg-transparent">
                                <Link href="/contact" onClick={() => setNavbar(!navbar)}>Contact</Link>
                            </li>
                            <li className="pb-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-slate-600  border-slate-900  md:hover:text-slate-600 md:hover:bg-transparent">
                                <Link href="/user" onClick={() => setNavbar(!navbar)}>Users</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border" onClick={() => setNavbar(!navbar)}>
                            {navbar ? (<h4>close</h4>) : (<h4>open</h4>)}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}