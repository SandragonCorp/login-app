"use client"

import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'

import style from '@/app/components/toasts/_toast_group_container.module.css';
import Toast, { ToastProps } from './_toast';
import { useGlobalContext } from '../../(contexts)/app_context';
import { TOAST_POSITION } from '../../(globals)/global';
import { EVENTS } from '@/app/scripts/events';

interface Props {
    position: TOAST_POSITION
}

const ToastGroup = (config: Props) => {
    let [toasts, setToasts] = useState([] as ToastProps[]);

    useEffect(() => {
        const onAddToastHandler = (event: CustomEvent) => {
            const newToast = {
                ...event.detail,
                id: 'toast_id_' + Date.now()
            };

            const newToasts: ToastProps[] = [
                ...toasts,
                newToast
            ]

            // only allow 5 notifications 
            // remove the 1st
            const toastsCountAllowed = config.position === TOAST_POSITION.TOP_MIDDLE ? 1 : 5;
            if (newToasts.length > toastsCountAllowed) {
                newToasts.splice(0, 1);
            }
        
            setToasts(newToasts);
        };

        EVENTS.addGlobalEvent("addToastToGroup" + config.position, onAddToastHandler);

        return () => {
            EVENTS.removeGlobalEvent("addToastToGroup" + config.position, onAddToastHandler);
        }
    }, [toasts]);
    
    const removeToast = (id: string): void => {
        const newToasts = [...toasts].filter((toast) => {
            return toast.id != id;
        });

        setToasts(newToasts);
    }
    

    let positionClassName = '';
    if (config.position == TOAST_POSITION.TOP_MIDDLE) {
        positionClassName = `max-w-sm w-screen fixed left-1/2 translate-x-N50Percent ${style.top}`;
    } else if (config.position == TOAST_POSITION.TOP_RIGHT) {
        positionClassName = `w-screen fixed ${style.top} ${style.right}`;
    } else if (config.position == TOAST_POSITION.BOTTOM_RIGHT) {
        positionClassName = `w-screen fixed ${style.bottom} ${style.right}`;
    }

    return (
        <div className={`fixed z-50 ${config.position} ${positionClassName}`}>
            {
                toasts.map((toast: ToastProps, index: number) => {
                    return <Toast id={toast.id} message={toast.message} hasClose={toast.hasClose} fadeTimeInMilliseconds={toast.fadeTimeInMilliseconds} index={index} removeToast={removeToast} key={index} />;
                })
            }
        </div>
    )
}

export default ToastGroup;