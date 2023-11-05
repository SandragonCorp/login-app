"use client"

import Link from 'next/link'

import style from './_navbar.module.css';
import UserMenu from '@/app/components/_user_menu';

import { signIn, useSession } from "next-auth/react"

export function Navbar() {
    const {data: session, status} = useSession();

    // // @todo design navbar when still loading
    // if(status === 'loading') {
    //     return <></>;
    // }

    return (
        <>
            <nav className={`w-full fixed top-0 left-0 right-0 z-10 text-slate-800 text-lg ${style.navbar}`}>
                <div className="place-content-between px-4 mx-auto md:items-center md:flex md:px-8">
                    <div>
                        <Link href="/">
                            <h1 className="text-2x1 font-bold">LOGO</h1>
                        </Link>
                    </div>
                    <div className={`md:block md:pb-0 md:mt-0`}>
                        <ul className={`navbar_options_ul md:flex justify-items-center content-center ${style.navbar_options_ul}`} >
                            <li className="m-4 text-center hover:text-slate-400">
                                <Link href="/about" className=''>About</Link>
                            </li>
                            <li className="m-4 text-center hover:text-slate-400">
                                <Link href="/contact" className=''>Contact</Link>
                            </li>
                            {
                                session ? (
                                    <li className="m-4 text-center hover:text-slate-400">
                                        <UserMenu />
                                    </li>
                                ) : (
                                    <>
                                    <li className="m-4 text-center text-white">
                                        <a className='p-2 bg-sky-400 hover:bg-sky-300 rounded' onClick={() => {signIn()}}>Sign In</a>
                                    </li>
                                    <li className="m-4 text-center text-white">
                                        <Link href="/user/register"><button className='bg-sky-400 hover:bg-sky-300 rounded'>Sign Up</button></Link>
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