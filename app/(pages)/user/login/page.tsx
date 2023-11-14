"use client";

import Image from 'next/image'
import style from './login.module.css'
import registerHeaderLogoPath from '@/public/images/register-logo.png'
import Link from 'next/link'
import { SyntheticEvent, useState, useEffect } from 'react'
import { useSearchParams, redirect  } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { STATUS_CODES, forceRedirectTo } from "@/app/(utils)/_http";
import { NewToastProps, TOAST_POSITION, TOAST_STYLES, ToastProps, addToast, clearToastsByGroup } from '@/app/components/toasts/_toast';
import { destroyInteractionObserver, initInteractionObserver } from '@/app/scripts/interaction_observer';

export default function Login() {
    // for some reason, this is called everytime. I don't know why. maybe is and side-effect thing or next auth thing? (Note that this page is a custom login page of next auth)

    const { data: session, status } = useSession();
    useEffect(() => {
        initInteractionObserver();

        return () => {
            destroyInteractionObserver();
        };
    }, [session]);

    // disabling the form while loading
    const [isDisabledForm, setDisabledForm] = useState(false);
    const [loginForm, setLoginForm] = useState<LoginForm>({username: 'admin', password: 'Lfucio123!!'});
    const searchParams = useSearchParams();

    let search = searchParams.get('callbackUrl');

    const onLoginSubmit = async (e: SyntheticEvent ) => {
        e.preventDefault();

        clearToastsByGroup(TOAST_POSITION.TOP_MIDDLE);
        setDisabledForm(true);

        const loginResponse =  await signIn("credentials", {
            username: loginForm.username,
            password: loginForm.password,
            redirect: false
        });

        if (loginResponse?.status === STATUS_CODES.OK) {
            forceRedirectTo('/');
        } else if (loginResponse?.status === STATUS_CODES.UNAUTHORIZED) {
            // if unauthorized we always show same error message
            addToast({
                position: TOAST_POSITION.TOP_MIDDLE,
                toastProp: {message: 'Invalid username/password', hasClose: true, style: TOAST_STYLES.ERROR} as ToastProps
            } as NewToastProps);
        } else {
            addToast({
                position: TOAST_POSITION.TOP_MIDDLE,
                toastProp: {message: 'There is a problem logging in.', hasClose: true, style: TOAST_STYLES.ERROR} as ToastProps
            } as NewToastProps);
        }
        setDisabledForm(false);
    };

    return (
        <>
            <div className='page_wrapper'>
                <form className={`p-8 rounded-md mx-auto text-center max-w-lg bg-white border-2 border-neutral-400 observable observable-animate-opacity ${isDisabledForm ? 'disabled' : ''}`} onSubmit={onLoginSubmit}>
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
            </div>
        </>
    )
}