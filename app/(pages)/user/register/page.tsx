
import Image from 'next/image'
import Link from 'next/link'

import style from './register.module.css'

import registerHeaderLogoPath from '@/public/images/register-logo.png'
import { prisma } from '@/app/db'
import { redirect } from 'next/navigation'

async function createUser(data: FormData) {
    "use server"

    const firstName = data.get("firstname")?.valueOf()
    const lastName = data.get("lastname")?.valueOf()
    const email = data.get("email")?.valueOf()
    const userName = data.get("username")?.valueOf()
    const password = data.get("password")?.valueOf()

    if (typeof firstName !== "string" || firstName.length <= 0) throw new Error("Invalid Firstname")
    if (typeof lastName !== "string" || lastName.length <= 0) throw new Error("Invalid LastName")
    if (typeof email !== "string" || email.length <= 0) throw new Error("Invalid Email")
    if (typeof userName !== "string" || userName.length <= 0) throw new Error("Invalid UserName")
    if (typeof password !== "string" || password.length <= 0) throw new Error("Invalid Password")
    
    await prisma.user.create({
        data: {
            firstName, lastName, email, userName, password, isActive: true
        }
    })
    redirect("/user")
}

export default function Register() {
    return (
        <>
            <div className="page_register">
                <form action={createUser} className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper}`}>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Registration</h2>
                    <label>Firstname: <input type='text' name='firstname' className='rounded-sm' placeholder='Firstname' /> </label>
                    <label>Lastname: <input type='text' name='lastname' className='rounded-sm' placeholder='Lastname' /> </label>
                    <label>Email: <input type='email' name='email' className='rounded-sm' placeholder='Email' /> </label>
                    <label>Username: <input type='text' name='username' className='rounded-sm' placeholder='Username' /> </label>
                    <label>Password: <input type='password' name='password' className='rounded-sm' placeholder='Password'/> </label>
                    <label>Confirm Password: <input type='password' name='confirm_password' className='rounded-sm' placeholder='Confirm Password' /> </label>
                    <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Submit' />
                    Already have an account? <Link href="/" className={`italic text-blue hover:underline underline-offset-4 ${style.login_button}`}>Login Here</Link>
                </form>
            </div>
        </>
    )
}