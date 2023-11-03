"use client";

import { useState } from "react";

export const enum TOOLTIP_POSITION {
    TOP_LEFT,
    TOP_MIDDLE,
    TOP_RIGHT
};

interface TooltipWrapperProps {
    className?: string
    children: JSX.Element[]
}
export function TooltipWrapper(config: TooltipWrapperProps) {
    const [isShowTooltip, setIsShowTooltip] = useState(false);

    const triggerComponent = config.children[0];
    const tooltipComponent = config.children[1];

    let wrapperStyle: string = '';
    if (tooltipComponent?.props.position === TOOLTIP_POSITION.TOP_MIDDLE) {
        wrapperStyle = 'top-0 left-0 right-0 mx-auto';
    } else if (tooltipComponent?.props.position === TOOLTIP_POSITION.TOP_LEFT) {
        wrapperStyle = 'top-0 left-0';
    } else if (tooltipComponent?.props.position === TOOLTIP_POSITION.TOP_RIGHT) {
        wrapperStyle = 'top-0';
    }

    const onClick = () => {
        setIsShowTooltip(!isShowTooltip);
    }

    const onMouseEnter = () => {
        setIsShowTooltip(true);
    }

    const onMouseLeave = () => {
        setIsShowTooltip(false);
    }

    return (
        <>
            <div className={`${config.className}`}>
                <div
                    onMouseEnter={() => onMouseEnter()}
                    onMouseLeave={() => onMouseLeave()}
                    onClick={() => onClick()}
                >
                    { triggerComponent }
                </div>
                <div className={`absolute w-full ${!isShowTooltip ? 'hidden' : ''} ${wrapperStyle}`}>
                    { tooltipComponent }
                </div>
            </div>
        </>
    )
}

interface Props {
    children: React.ReactNode
}
export function TooltipTrigger(config: Props) {
    return (
        <>
            { config.children }
        </>
    )
}

export interface TooltipProps {
    children: React.ReactNode
    position: TOOLTIP_POSITION
}
export default function Tooltip(tooltip: TooltipProps) {
    let wrapperStyle: string = '';
    let tooltipStyle: string = '';

    if (tooltip.position === TOOLTIP_POSITION.TOP_MIDDLE) {
        wrapperStyle = 'top-0 left-0 right-0 mx-auto';
        tooltipStyle = 'translate-x-N50Percent';
    } else if (tooltip.position === TOOLTIP_POSITION.TOP_LEFT) {
        wrapperStyle = 'top-0 left-0';
        tooltipStyle = '';
    } else if (tooltip.position === TOOLTIP_POSITION.TOP_RIGHT) {
        wrapperStyle = 'top-0';
        tooltipStyle = 'right-0';
    } 

    return (
        <>
            <div className={`absolute text-xs bottom-0 z-50 bg-cyan-100 p-4 whitespace-nowrap ${tooltipStyle}`} >
                { tooltip.children }
            </div>
        </>
    )
}