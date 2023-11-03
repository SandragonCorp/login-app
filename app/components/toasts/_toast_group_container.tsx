"use client"

import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'

import style from '@/app/components/toasts/_toast_group_container.module.css';
import Toast, { TOAST_FADE_OUT_DURATION, ToastProps } from './_toast';
import { useGlobalContext } from '../../(contexts)/app_context';
import { TOAST_POSITION } from '../../components/toasts/_toast'
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

            // automatically remove this toast based on fadeTimeInMilliseconds
            if (newToast.fadeTimeInMilliseconds) {
                setTimeout(() => {
                    removeToast(newToast.id);
                }, newToast.fadeTimeInMilliseconds);
            }
        };

        const onClearToastsByGroup = (event: CustomEvent) => {
            toasts.forEach((toast) => {
                removeToast(toast.id);
            });
        }

        EVENTS.addGlobalEvent("addToastToGroup" + config.position, onAddToastHandler);
        EVENTS.addGlobalEvent("clearToastsByGroup" + config.position, onClearToastsByGroup);

        return () => {
            EVENTS.removeGlobalEvent("addToastToGroup" + config.position, onAddToastHandler);
            EVENTS.removeGlobalEvent("clearToastsByGroup" + config.position, onClearToastsByGroup);
        }
    }, [toasts]);

    const removeToast = (toastId: string): void => {
        // fade out first then remove the Toast
        const newToasts = [...toasts];
        const toastToRemove = newToasts.find(toast => toast.id === toastId);
        if(toastToRemove) {
            // this will make the Toast to fade out
            toastToRemove.isToRemove = true;
            setToasts(newToasts);
        }

        // we use setTimeout() with TOAST_FADE_OUT_DURATION instead of onTransitionEnd() is because
        // somehow, when two or more toasts are in a transition, only 1 toast triggers onTransitionEnd()
        setTimeout(() => {
            // remove this Toast
            setToasts(toasts => toasts.filter(toast => toast.id !== toastId));
        }, TOAST_FADE_OUT_DURATION);
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
                    return <Toast id={toast.id} message={toast.message} style={toast.style} hasClose={toast.hasClose} fadeTimeInMilliseconds={toast.fadeTimeInMilliseconds} index={index} isToRemove={toast.isToRemove} removeToast={removeToast} key={index} />;
                })
            }
        </div>
    )
}

export default ToastGroup;