
import Image from 'next/image'
import Link from 'next/link'

import style from './register.module.css'

import registerHeaderLogoPath from '@/public/images/register-logo.png'

export default function Register() {
    return (
        <>
            <div className="page_register">
                <form className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper}`}>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Registration</h2>
                    <label>Usernam: <input type='text' name='usernam' className='rounded-sm' placeholder='Usernam' /> </label>
                    <label>Passwor: <input type='text' name='passwor' className='rounded-sm' placeholder='Passwor'/> </label>
                    <label>Confirm Passwor: <input type='text' name='confirm_password' className='rounded-sm' placeholder='Confirm Passwor' /> </label>
                    <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Submit' />
                    Already have an account? <Link href="/" className={`italic text-blue hover:underline underline-offset-4 ${style.login_button}`}>Login Here</Link>
                </form>
            </div>
        </>
    )
}