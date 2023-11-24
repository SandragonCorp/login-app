"use client"

import Link from 'next/link'

import style from './_navbar.module.css';
import UserMenu from '@/app/components/_user_menu';

import { signIn, useSession } from "next-auth/react"

export function Navbar() {
    const {data: session, status} = useSession();

    if (status === 'loading') {
        return <></>;
    }
    // @ todo close navbar usermenu on change page
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
                            <li className="m-4 text-center">
                                <Link href="/about" className='hover:text-slate-400'>About</Link>
                            </li>
                            <li className="m-4 text-center">
                                <Link href="/contactus" className='hover:text-slate-400'>Contact Us</Link>
                            </li>
                            {
                                session ? (
                                    <li className="m-4 text-center">
                                        <UserMenu />
                                    </li>
                                ) : (
                                    <>
                                        <li className="m-4 text-center">
                                            <a className='p-2 bg-sky-400 text-white hover:bg-sky-300 rounded' onClick={() => {signIn()}}>Sign In</a>
                                        </li>
                                        <li className="m-4 text-center">
                                            <Link href="/user/register" className='p-2 bg-slate-300	hover:bg-slate-200 text-slate-600 rounded'>Sign Up</Link>
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