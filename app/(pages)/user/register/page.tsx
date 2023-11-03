
"use client"

import Image from 'next/image'
import style from './register.module.css'

import registerHeaderLogoPath from '@/public/images/register-logo.png'
import { SyntheticEvent, createRef, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import { ClearToastsProps, NewToastProps, TOAST_POSITION, TOAST_STYLES, ToastProps, addToast, clearToastsByGroup } from '@/app/components/toasts/_toast'
import { AJAX, forceRedirectTo, redirectTo } from '@/app/(utils)/_http'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo'
import { sleep } from '@/app/(utils)/_delay'
import Tooltip, { TOOLTIP_POSITION, TooltipTrigger, TooltipWrapper } from '@/app/components/tooltip'

export default function Register() {

    // storage of each input values to be passed to the request
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    // each of form inputs styles if value is invalid after register request
    const defaultInputStyles = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    }
    const [inputStyles, setInputStyles] = useState(defaultInputStyles);

    // disabling the form while loading
    const [isDisabledForm, setDisabledForm] = useState(false);
    const onRegister = (e: SyntheticEvent) => {
        e.preventDefault();

        // @todo show toasts
        AJAX.post({
            url: '/api/user/register',
            data: registerForm,
            beforeRequest: () => {
                clearToastsByGroup(TOAST_POSITION.TOP_MIDDLE);
                setDisabledForm(true);
            },
            successCallback: (response: any) => {
                setInputStyles(defaultInputStyles);

                const message = response.data.message + '<br/><br/> Or click <a class="underline underline-offset-2" href="/user/login">here</a> to redirect manually.';
                addToast({
                    position: TOAST_POSITION.TOP_MIDDLE,
                    toastProp: {message: message, hasClose: true, style: TOAST_STYLES.SUCCESS} as ToastProps
                } as NewToastProps);

                sleep(5000, () => {
                   forceRedirectTo('/user/login'); 
                });
            },
            errorCallback: (response: any) => {
                setDisabledForm(false);
                const responseData = response.data;

                // highlight input with invalid input
                setInputStyles({
                    ...defaultInputStyles,
                    [responseData.metadata.formName]: 'border-red-600 hover:border-red-600 border-2'
                });

                // show toast
                addToast({
                    position: TOAST_POSITION.TOP_MIDDLE,
                    toastProp: {message: responseData.message, hasClose: true, style: TOAST_STYLES.ERROR} as ToastProps
                } as NewToastProps);
            }
        });
    };

    // "Show password" feature for password and confirm password inputs
    const [isShowPasswords, setIsShowPasswords] = useState({
        password: false as boolean,
        confirm_password: false as boolean
    } as any);
    const toggleShowPassword = (formName: string) => {
        setIsShowPasswords({
            ...isShowPasswords,
            [formName] : !isShowPasswords[formName] as boolean
        });
    }

    // username hint tooltip
    const usernameTooltipRef = useRef();
    const [isShowUsernameTooltip, setIsShowUsernameTooltip] = useState(false);

    // password hint tooltip
    const [isShowPasswordTooltip, setIsShowPasswordTooltip] = useState(false);

    return (
        // @todo show valid password in a hint
        <>
            <div className="page_register">
                <form className={`page_wrapper rounded-sm mx-auto text-center ${style.page_wrapper} ${isDisabledForm ? 'disabled' : ''}`} onSubmit={onRegister}>
                    <Image src={registerHeaderLogoPath} className={`mx-auto ${style.header_image}`} alt='' />
                    <h2 className={`page_title font-serif text-5xl ${style.page_title}`}>Registration</h2>
                    <label className='text-left'>
                        Firstname:
                        <input
                            type='text'
                            name='firstname'
                            className={`rounded-sm ${inputStyles.firstname}`}
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
                            className={`rounded-sm ${inputStyles.lastname}`}
                            placeholder='Lastname'
                            required
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  lastName: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Username:&nbsp;
                        <TooltipWrapper className='inline-block'>
                            <TooltipTrigger>
                                <FontAwesomeIcon
                                    className='cursor-help'
                                    icon={faCircleInfo} size="lg" style={{color: "#1f2937"}}
                                />
                            </TooltipTrigger>
                            <Tooltip position={TOOLTIP_POSITION.TOP_MIDDLE} >
                                Username can only have letters, numbers, dots(.), or underscores(_)
                            </Tooltip>
                        </TooltipWrapper>
                        <input
                            type='text'
                            name='username'
                            className={`rounded-sm ${inputStyles.username}`}
                            placeholder='Username'
                            required
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  username: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Email:
                        <input
                            type='email'
                            name='email'
                            className={`rounded-sm ${inputStyles.email}`}
                            placeholder='Email'
                            required
                            onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  email: (e.target as HTMLInputElement).value})}
                        />
                    </label>
                    <label className='text-left'>
                        Password:&nbsp;
                        
                        <TooltipWrapper className='inline-block'>
                            <TooltipTrigger>
                            <FontAwesomeIcon
                                className='cursor-help'
                                icon={faCircleInfo} size="lg" style={{color: "#1f2937"}}
                            />
                            </TooltipTrigger>
                            <Tooltip position={TOOLTIP_POSITION.TOP_MIDDLE} >
                            Password must have: <br/>
                                At least one uppercase letter.<br/>
                                At least one special case letter (!@#$&*).<br/>
                                At least has two digits.<br/>
                                At least three lowercase letters.<br/>
                                At least 8 characters.
                            </Tooltip>
                        </TooltipWrapper>
                        <div>
                            <input
                                type={`${isShowPasswords['password'] ? 'text' : 'password'}`}
                                name='password'
                                className={`rounded-sm ${inputStyles.password}`}
                                placeholder='Password'
                                required
                                onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  password: (e.target as HTMLInputElement).value})}
                            />
                            <FontAwesomeIcon
                                className={`absolute top-0 bottom-0 my-auto cursor-pointer ${isShowPasswords['password'] ? 'right-2' : 'right-2.5'}`}
                                icon={ isShowPasswords['password'] ? faEyeSlash : faEye } size='lg' style={{color: "#1f2937"}} 
                                onClick={() => toggleShowPassword('password')}
                            />
                        </div>
                    </label>
                    <label className='text-left'>
                        Confirm Password:
                        <div>
                            <input
                                type={`${isShowPasswords['confirm_password'] ? 'text' : 'password'}`}
                                name='confirm_password'
                                className={`rounded-sm ${inputStyles.confirm_password}`}
                                placeholder='Confirm Password'
                                required
                                onChange={(e: SyntheticEvent) => setRegisterForm({...registerForm,  confirmPassword: (e.target as HTMLInputElement).value})}
                            />
                            <FontAwesomeIcon
                                className={`absolute top-0 bottom-0 my-auto cursor-pointer ${isShowPasswords['confirm_password'] ? 'right-2' : 'right-2.5'}`}
                                icon={ isShowPasswords['confirm_password'] ? faEyeSlash : faEye } size='lg' style={{color: "#1f2937"}} 
                                onClick={() => toggleShowPassword('confirm_password')}
                            />
                        </div>
                        
                    </label>

                    <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Submit' />

                    Already have an account? <a className={`italic text-blue hover:underline underline-offset-4 ${style.login_button}`} onClick={() => {signIn()}}>Login Here</a>
                </form>
            </div>
        </>
    )
}