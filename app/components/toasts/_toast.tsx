"use client"

import style from '@/app/components/toasts/_toast.module.css';

import React, { SyntheticEvent, useEffect, useState } from 'react'

export interface ToastProps {
    id: string,
    message: string
    index: number,
    hasClose?: boolean
    fadeTimeInMilliseconds?: number,
    removeToast: (id: string) => void
}

export default function Toast(config: ToastProps) {
    "use client"

    // @todo fadeTimeInMilliseconds

    const [isToRemove, setIsToRemove] = useState(false);

    const onCloseHandler = () => {
        setIsToRemove(true);

        setTimeout(() => {
            config.removeToast(config.id);
            setIsToRemove(false);
        }, 100);
    }

    return (
        <>
            <div className={`mb-1 p-3 rounded-sm bg-cyan-400 border border-cyan-500 text-white ${style.toast} ${isToRemove ? 'opacity-0 transition-opacity ease-linear duration-100' : 'opacity-100'}` }>
                {config.message}
                { config.hasClose &&
                    <div className={`flex justify-center items-center absolute top-0 right-0 h-full w-5 cursor-pointer ${style.toastCloseButton}`} onClick={onCloseHandler}>x</div>
                }

                {/* <table className={`w-full ${style.toastWrapperTable}`}>
                    <tbody>
                        <tr>
                            <td>{config.message}</td>
                            { config.hasClose &&
                                <td>
                                    <div className={`flex justify-center items-center absolute top-0 right-0 h-full w-5 cursor-pointer ${style.toastCloseButton}`} onClick={onCloseHandler}>x</div>
                                </td>
                            }
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </>
    )
}
