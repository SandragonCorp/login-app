"use client"

import style from '@/app/components/modals/_modal.module.css'
import { FullContainer } from '../_full_container'
import { SyntheticEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    id: string
    className?: string
    children?: React.ReactNode
}

export const Modal = (config: ModalProps) => {
    const onModalClick = (e: SyntheticEvent) => {
        e.stopPropagation();
    }

    return (
        <>
            <FullContainer id={config.id} className={`modal bg-black/[.3] fixed top-0 px-6 z-50 text-center opacity-0 transition-opacity ease-linear duration-150 hidden` } onClick={() => { removeModal(config.id) }}>
                <div className={`p-4 bg-slate-100 rounded-md inline-block shadow-[0_0_7px_1px_rgba(0,0,0,0.5)] border-zinc-600 ${config.className}`} onClick={(e) => { onModalClick(e) }}>
                    { config.children }
                    <FontAwesomeIcon className="absolute top-4 right-4 cursor-pointer" icon={faXmark} size="xl" onClick={() => { removeModal(config.id) }}/>
                </div>
            </FullContainer>
        </>
    )
}

export const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    const classList = modal?.classList;
    classList?.remove('hidden');
    
    setTimeout(() => {
        classList?.add('opacity-100');
        classList?.remove('opacity-0');
    });
}

export const removeModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    const classList = modal?.classList;
    classList?.remove('opacity-100');
    classList?.add('opacity-0');
    setTimeout(() => {
        classList?.add('hidden');
    }, 200);
}