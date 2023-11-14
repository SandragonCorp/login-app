"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

import style from '@/app/components/_user_menu.module.css'
import registerHeaderLogoPath from '@/public/images/register-logo.png'

import { signOut, useSession } from 'next-auth/react'
import { SyntheticEvent } from 'react'
import { ROLES } from '../(models)/_user'

const UserMenu = () => {
    const handleSignOut = async (e: SyntheticEvent) => {
        e.preventDefault();

        // @todo Add a modal for confirmation
        signOut({ callbackUrl: 'http://localhost:3000/user/login' });
    };
  
    const { data: session, status } = useSession();

    const [ isOpenMenu, setOpenMenu ] = useState(false);

    return (
        <>
            <div className={`bg-white md:hover:bg-black cursor-pointer ${style.openMenuButton}`} onClick={() => setOpenMenu(!isOpenMenu)}>
            <Image src={registerHeaderLogoPath} className={`h-full w-full`} alt='' />
            </div>
            <div className={`p-2 mx-auto absolute bg-gray-600 border-2 right-0 md:hover:text-zinc- ${style.popup}  ${isOpenMenu ? '' : 'hidden'} `}>
            <ul className='whitespace-nowrap'>
                <li className='px-2'>Lean Fucio</li>
                <li><hr className='h-px my-2 bg-slate-100 border-0' /></li>
                <li><Link href="/user/profile" className='block px-2 md:hover:bg-white md:hover:text-slate-600 select-none' >Profile</Link></li>
                <li><Link href="/user/settings" className='block px-2 md:hover:bg-white md:hover:text-slate-600 select-none'>Settings</Link></li>
                <li><Link href="/help" className='block px-2 md:hover:bg-white md:hover:text-slate-600 select-none'>Help & Support</Link></li>
                <li><hr className='h-px my-2 bg-slate-100 border-0' /></li>
                {
                    session?.user.role === ROLES.ROLE_ADMIN ? (
                        <>
                            <li><Link href="/admin" className='block px-2 md:hover:bg-white md:hover:text-slate-600 select-none'>Admin</Link></li>
                            <li><hr className='h-px my-2 bg-slate-100 border-0' /></li>
                        </>
                    ) : null
                }
                <li><Link href="/api/auth/signout"><button className='bg-sky-600 mx-auto rounded' onClick={handleSignOut}>Sign Out</button> </Link></li>
            </ul>
            </div>
        </>
    )
}

export default UserMenu