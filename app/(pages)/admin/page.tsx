"use client"

import { AJAX } from '@/app/(utils)/_http';
import style from './contactus.module.css'
import { destroyInteractionObserver, initInteractionObserver } from "@/app/scripts/interaction_observer";
import { SyntheticEvent, useEffect, useState } from "react";
import { NewToastProps, TOAST_POSITION, TOAST_STYLES, ToastProps, addToast, clearToastsByGroup } from '@/app/components/toasts/_toast';
import { FullContainer } from '@/app/components/_full_container';
import { UserChat } from '@/app/(models)/_userChat';

export default function Page() {
    useEffect(() => {
        initInteractionObserver();

        return () => {
            destroyInteractionObserver();
        };
    }, []);

    const [userChats, setUserChats] = useState([] as UserChat[]); 

    return (
        <>
            <FullContainer>
                <div className='parentSize table'>
                    <div className='table-row'>
                        <div className='h-10 w-28 lg:w-52 table-cell'>
                            <div className='parentSize flex justify-center'>
                                <div className='mx-2 p-2 text-center border bg-white border-orange-300 rounded-md cursor-pointer'>Live Chats</div>
                            </div>
                        </div>
                    </div>
                    <div className='table-row'>
                        <div className='bg-blue-100 h-full w-28 lg:w-52 table-cell'>
                            <div className='parentSize bg-red-100 table'>
                                <div className='bg-orange-100 h-10 w-28 lg:w-52 table-cell'>
                                    User Chat
                                </div>
                                <div className='bg-green-100 table-cell'>
                                    User Chat Messages
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FullContainer>
        </>
    )
}