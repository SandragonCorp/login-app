import { useEffect } from "react";

export const EVENTS = {
    addGlobalEvent: (eventName: string, handler: any) => {
        // handler should always be a (event: CustomEvent) => void
        document.addEventListener(eventName, handler);
    },
    removeGlobalEvent: (eventName: string, handler: any) => {
        // handler should always be a (event: CustomEvent) => void
        document.removeEventListener(eventName, handler);
    },
    triggerGlobalEvent: (eventName: string, data?: any) => {
        document.dispatchEvent(new CustomEvent(eventName, {detail: data, bubbles: true}));
    }
}