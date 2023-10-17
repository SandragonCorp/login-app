'use client'

import Image from 'next/image'
import style from './login.module.css'
import registerHeaderLogoPath from '@/public/images/register-logo.png'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Login() {
    const [loginForm, setLoginForm] = useState<LoginForm>({username: '', password: ''});
    const router = useRouter()

    const onLoginSubmit = async (e: SyntheticEvent ) => {
        e.preventDefault();

        const response = await axios.post('/api/user/login', loginForm);
        if (response.status === 200) {
            // @TODO do profile page
            router.push('/about')
        } else {
            // @TODO implement TOAST to show message?
        }
    };

    return (
        <>
            <div className='page_register'>
                <form className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper}`} onSubmit={onLoginSubmit}>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Login</h2>
                    <label>
                        Username:
                        <input 
                            type='text'
                            name='username'
                            className='rounded-sm'
                            placeholder='Username'
                            onChange={(e: SyntheticEvent) => setLoginForm({...loginForm,  username: (e.target as HTMLInputElement).value})} />
                    </label>
                    <label>
                        Password:
                        <input
                            type='password'
                            name='password'
                            className='rounded-sm'
                            placeholder='Password'
                            onChange={(e: SyntheticEvent) => setLoginForm({...loginForm,  password: (e.target as HTMLInputElement).value})} />
                    </label>
                    <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Submit' />
                    Don't have an account? <Link href='/user/login' className={`italic text-blue hover:underline underline-offset-4 ${style.register_button}`}>Sign up</Link>
                </form>
            </div>
        </>
    )
}