
"use client"

import Image from 'next/image'

import style from './register.module.css'

import registerHeaderLogoPath from '@/public/images/register-logo.png'
import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { TOAST_POSITION } from '@/app/(globals)/global'
import { EVENTS } from '@/app/scripts/events'
import { ToastProps } from '@/app/components/toasts/_toast'

export default function Register() {

    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const onRegister = (e: SyntheticEvent) => {
        e.preventDefault();

        axios
            .post(
                '/api/user/register',
                registerForm
            )
            .then((response) => {
                // @todo show message and add the login link
                console.log(response);
            }
        );
    };

    const onClickTestTM = (e: SyntheticEvent) => {
        e.preventDefault();

        EVENTS.triggerGlobalEvent('addToastToGroup' + TOAST_POSITION.TOP_MIDDLE, {message: "TM " + Date.now(), hasClose: true} as ToastProps);
    };

    const onClickTestTR = (e: SyntheticEvent) => {
        e.preventDefault();

        EVENTS.triggerGlobalEvent('addToastToGroup' + TOAST_POSITION.TOP_RIGHT, {message: "TR " + Date.now(), hasClose: true} as ToastProps);
    };

    const onClickTestBR = (e: SyntheticEvent) => {
        e.preventDefault();

        EVENTS.triggerGlobalEvent('addToastToGroup' + TOAST_POSITION.BOTTOM_RIGHT, {message: "BR " + Date.now(), hasClose: true} as ToastProps);
    };

    return (
        <>
            <div className="page_register">
                <form className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper}`} onSubmit={onRegister}>
                    <button onClick={onClickTestTM}>Add Toast Top Middle</button>
                    <button onClick={onClickTestTR}>Add Toast Top Right</button>
                    <button onClick={onClickTestBR}>Add Toast Bottom Right</button>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Registration</h2>
                    <label className='text-left'>
                        Firstname:
                        <input
                            type='text'
                            name='firstname'
                            className='rounded-sm'
                            placeholder='Firstname'
                            required
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  firstName: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Lastname:
                        <input
                            type='text'
                            name='lastname'
                            className='rounded-sm'
                            placeholder='Lastname'
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  lastName: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Email:
                        <input
                            type='email'
                            name='email'
                            className='rounded-sm'
                            placeholder='Email'
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  email: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Username:
                        <input
                            type='text'
                            name='username'
                            className='rounded-sm'
                            placeholder='Username'
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  username: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Password:
                        <input
                            type='password'
                            name='password'
                            className='rounded-sm'
                            placeholder='Password'
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  password: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Confirm Password:
                        <input
                            type='password'
                            name='confirm_password'
                            className='rounded-sm'
                            placeholder='Confirm Password'
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  confirmPassword: (e.target as HTMLInputElement).value})}
                        />
                    </label>

                    <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Submit' />

                    Already have an account? <a className={`italic text-blue hover:underline underline-offset-4 ${style.login_button}`} onClick={() => {signIn()}}>Login Here</a>
                </form>
            </div>
        </>
    )
}