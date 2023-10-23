
"use client"
import Image from 'next/image'
import Link from 'next/link'

import style from './register.module.css'

import registerHeaderLogoPath from '@/public/images/register-logo.png'
import { prisma } from '@/app/db'
import { redirect } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'

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

        console.log(registerForm);

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

    return (
        <>
            <div className="page_register">
                <form className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper}`} onSubmit={onRegister}>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Registration</h2>
                    <label className='text-left'>
                        Firstname:
                        <input
                            type='text'
                            name='firstname'
                            className='rounded-sm'
                            placeholder='Firstname'
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