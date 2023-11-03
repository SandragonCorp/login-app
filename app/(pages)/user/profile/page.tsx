"use client"

import { signOut } from 'next-auth/react'
import { SyntheticEvent } from 'react'

export default function Profile() {
    const handleSignOut = async (e: SyntheticEvent) => {
        e.preventDefault();

        // @todo Add a modal for confirmation
        signOut({ callbackUrl: 'http://localhost:3000/user/login' });
    };

    return (
        <>
            <h1 className='p-12'>Profile</h1>
            <input
                type='submit'
                className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold'
                value='Signout'
                onClick={handleSignOut}
            />
        </>
    )
}