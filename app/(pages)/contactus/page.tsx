"use client"

import { AJAX } from '@/app/(utils)/_http';
import style from './contactus.module.css'
import { destroyInteractionObserver, initInteractionObserver } from "@/app/scripts/interaction_observer";
import { SyntheticEvent, useEffect, useState } from "react";
import { NewToastProps, TOAST_POSITION, TOAST_STYLES, ToastProps, addToast, clearToastsByGroup } from '@/app/components/toasts/_toast';

export default function Page() {
    useEffect(() => {
        initInteractionObserver();

        return () => {
            destroyInteractionObserver();
        };
    }, []);

    // storage of each input values to be passed to the request
    const [contactForm, setContactForm] = useState<ContactUsForm>({
        fullName: '',
        email: '',
        message: ''
    });

    // each of form inputs styles if value is invalid after register request
    const defaultInputStyles = {
        fullname: '',
        email: '',
        message: ''
    }
    const [inputStyles, setInputStyles] = useState(defaultInputStyles);

    // disabling the form while loading
    const [isDisabledForm, setDisabledForm] = useState(false);
    const onSendEmail = (e: SyntheticEvent) => {
        e.preventDefault();

        AJAX.post({
            url: '/api/contactus',
            data: contactForm,
            beforeRequest: () => {
                clearToastsByGroup(TOAST_POSITION.TOP_MIDDLE);
                setDisabledForm(true);
            },
            successCallback: (response: any) => {
                setInputStyles(defaultInputStyles);
                setContactForm({
                    fullName: '',
                    email: '',
                    message: ''
                });

                addToast({
                    position: TOAST_POSITION.TOP_MIDDLE,
                    toastProp: {message: response.data.message, hasClose: true, style: TOAST_STYLES.SUCCESS} as ToastProps
                } as NewToastProps);
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
            },
            finallyCallback() {
                setDisabledForm(false);
            }
        });
    }

    return (
        <>
            <div className="page_wrapper">
                <form className={`p-8 rounded-md mx-auto text-center max-w-lg bg-white border-2 border-neutral-400 observable observable-animate-opacity ${style.form} ${isDisabledForm ? 'disabled' : ''}`} onSubmit={onSendEmail}>
                    <div className={`text-5xl pt-8 pb-8`}>Contact Us</div>
                    <label className='text-left'>
                        Full name:
                        <input
                            type='text'
                            name='fullname'
                            className={`rounded-sm ${inputStyles.fullname}`}
                            placeholder='Full name'
                            required
                            onChange={(e: SyntheticEvent) => setContactForm({...contactForm, fullName: (e.target as HTMLInputElement).value})}
                            value={contactForm.fullName}
                        />
                    </label>
                    <label className='text-left'>
                        Email address:
                        <input
                            type='email'
                            name='email'
                            className={`rounded-sm ${inputStyles.email}`}
                            placeholder='Email address'
                            required
                            onChange={(e: SyntheticEvent) => setContactForm({...contactForm, email: (e.target as HTMLInputElement).value})}
                            value={contactForm.email}
                        />
                    </label>
                    <div className='text-left'>
                        Message:
                    </div>
                    <textarea
                        name='message'
                        className={`w-full rounded-sm ${inputStyles.message}`}
                        placeholder='Enter message at least 10 characters...'
                        required
                        onChange={(e: SyntheticEvent) => setContactForm({...contactForm, message: (e.target as HTMLInputElement).value})}
                        value={contactForm.message}
                    />
                    <input type='submit' className='mx-auto mb-16 bg-blue-500 hover:bg-blue-400 text-white font-bold' value='Submit' />

                    You can also text or call us at <span className='italic font-bold'>09XX-XXX-XXXX</span>.
                </form>
            </div>
        </>
    )
}