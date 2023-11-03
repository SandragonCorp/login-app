"use client";

import Image from 'next/image'
import style from './login.module.css'
import registerHeaderLogoPath from '@/public/images/register-logo.png'
import Link from 'next/link'
import { SyntheticEvent, useState, useEffect } from 'react'
import { useRouter, useSearchParams, redirect  } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { redirectTo } from '@/app/(utils)/_http';

export default function Login() {
    // for some reason, this is called everytime. I don't know why. maybe is and side-effect thing or next auth thing? (Note that this page is a custom login page of next auth)

    const [loginForm, setLoginForm] = useState<LoginForm>({username: '', password: ''});
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    let search = searchParams.get('callbackUrl');

    // while status is loading we prevent the code from rendering the real Login content
    if (status === 'loading') {
        return <></>;
    }

    const onLoginSubmit = async (e: SyntheticEvent ) => {
        e.preventDefault();

        const loginResponse =  await signIn("credentials", {
            username: loginForm.username,
            password: loginForm.password,
            redirect: false,
        });

        // @todo implement different error messages. 
        // and redirect to profile
        console.log(loginResponse);
    };

    return (
        <>
            <div className='page_register'>
                <form className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper}`} onSubmit={onLoginSubmit}>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Login</h2>
                    <label className='text-left'>
                        Username:
                        <input 
                            type='text'
                            name='username'
                            className='rounded-sm'
                            placeholder='Username'
                            onChange={(e: SyntheticEvent) => setLoginForm({...loginForm,  username: (e.target as HTMLInputElement).value})} />
                    </label>
                    <label className='text-left'>
                        Password:
                        <input
                            type='password'
                            name='password'
                            className='rounded-sm'
                            placeholder='Password'
                            onChange={(e: SyntheticEvent) => setLoginForm({...loginForm,  password: (e.target as HTMLInputElement).value})} />
                    </label>
                    <input
                        type='submit'
                        className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold'
                        value='Submit' />
                    Don't have an account?
                    <Link
                        href='/user/register'
                        className={`italic text-blue hover:underline underline-offset-4 ${style.register_button}`}>
                            Sign up
                    </Link>
                </form>
            </div>`
        </>
    )
}