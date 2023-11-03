"use client"

import Link from 'next/link'

import style from '@/app/components/_navbar.module.css';
import UserMenu from '@/app/components/_user_menu';

import { signIn, useSession } from "next-auth/react"

export function Navbar() {
    const {data: session, status} = useSession();

    // @todo design navbar when still loading
    if(status === 'loading') {
        return <></>;
    }

    return (
        <>
            <nav className="_nav_bar w-full bg-gray-800 fixed top-0 left-0 right-0 z-10">
                <div className="place-content-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <Link href="/">
                            <h1 className="text-2x1 text-slate-600 font-bold">LOGO</h1>
                        </Link>
                    </div>
                    <div className={`md:block md:pb-0 md:mt-0`}>
                        <ul className={`navbar_options_ul md:flex justify-items-center content-center ${style.navbar_options_ul}`} >
                            <li className="m-4 text-xl text-white text-cente hover:bg-slate-900 border-slate-900 md:hover:bg-transparent">
                                <Link href="/about" className='md:hover:text-slate-600'>About</Link>
                            </li>
                            <li className="m-4 text-xl text-white text-center hover:bg-slate-600 border-slate-900 md:hover:bg-transparent">
                                <Link href="/projects" className='md:hover:text-slate-600'>Projects</Link>
                            </li>
                            <li className="m-4 text-xl text-white  text-center hover:bg-slate-600 border-slate-900 md:hover:bg-transparent">
                                <Link href="/contact" className='md:hover:text-slate-600'>Contact</Link>
                            </li>
                            {
                                session ? (
                                    <li className="m-4 text-xl text-white text-center hover:bg-slate-600 border-slate-900 md:hover:bg-transparent">
                                        <UserMenu />
                                    </li>
                                ) : (
                                    <>
                                    <li className="m-4 text-xl text-white text-center hover:bg-slate-600 border-slate-900 md:hover:bg-transparent">
                                        <a className='p-2 bg-sky-600 rounded md:hover:text-slate-600' onClick={() => {signIn()}}>Sign In</a>
                                    </li>
                                    <li className="m-4 text-xl text-white text-center hover:bg-slate-600 border-slate-900 md:hover:bg-transparent">
                                        <Link href="/user/register"><button className='bg-sky-600 rounded md:hover:text-slate-600'>Sign Up</button></Link>
                                    </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}