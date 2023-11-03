"use client"

import style from './_toast.module.css';
import { EVENTS } from '@/app/scripts/events';
import exp from 'constants';
import React, { SyntheticEvent, useEffect, useState } from 'react'

export const enum TOAST_POSITION {
    TOP_MIDDLE,
    TOP_RIGHT,
    BOTTOM_RIGHT
};

export const enum TOAST_STYLES {
    PRIMARY,
    SUCCESS,
    ERROR,
    WARNING
};

export interface ToastProps {
    id: string,
    message: string
    index: number
    hasClose?: boolean
    fadeTimeInMilliseconds?: number
    style: TOAST_STYLES

    // This variable is not really part of the ToastProps
    // This is just a flag for animating the fadeout when closing the toast
    isToRemove: boolean

    // this prop function is really part of the ToastProps
    // this is only used for a callback
    removeToast: (id: string) => void
}

// we use setTimeout() with TOAST_FADE_OUT_DURATION instead of onTransitionEnd() is because
// somehow, when two or more toasts are in a transition, only 1 toast triggers onTransitionEnd()
// any change in this should have a counterpart in tailwind.config.ts
export const TOAST_FADE_OUT_DURATION = 100; // ms

export default function Toast(config: ToastProps) {
    const onCloseHandler = (config: ToastProps) => {
        config.removeToast(config.id);
    }
    
    // set style
    let toastStyle = '';
    if (config.style === TOAST_STYLES.PRIMARY) {
        toastStyle = 'bg-cyan-300 border-cyan-400';
    } else if (config.style === TOAST_STYLES.SUCCESS) {
        toastStyle = 'bg-emerald-300 border-emerald-400';
    } else if (config.style === TOAST_STYLES.ERROR) {
        toastStyle = 'bg-red-400 border-red-500';
    } else if (config.style === TOAST_STYLES.WARNING) {
        toastStyle = 'bg-amber-300 border-amber-400';
    }

    return (
        <>
            <div className={`mb-1 p-3 rounded-sm border text-white ${toastStyle} ${style.toast} ${config.isToRemove ? `opacity-0 transition-opacity ease-linear duration-${TOAST_FADE_OUT_DURATION}` : 'opacity-100'}` }>
                <div dangerouslySetInnerHTML={{__html: config.message}}></div>
                { config.hasClose &&
                    <div className={`flex justify-center items-center absolute top-0 right-0 h-full w-5 cursor-pointer ${style.toastCloseButton}`} onClick={() => onCloseHandler(config)}>x</div>
                }
            </div>
        </>
    )
}

export interface NewToastProps {
    position: TOAST_POSITION,
    toastProp: ToastProps
}

export interface ClearToastsProps {
    position: TOAST_POSITION
}

export const addToast = (config: NewToastProps) => {
    EVENTS.triggerGlobalEvent('addToastToGroup' + config.position, config.toastProp);
}

export const clearToastsByGroup = (config: ClearToastsProps) => {
    EVENTS.triggerGlobalEvent('clearToastsByGroup' + config.position);
}