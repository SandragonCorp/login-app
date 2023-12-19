import React from 'react'

import style from "./_carousel.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { SyntheticEvent, useState, useEffect } from 'react';
import { CarouselItemProps } from './_carousel_item';

export enum CAROUSEL_EFFECTS {
    SLIDE = "slide",
    FADE = "fade"
}

export enum CAROUSEL_DIRECTION {
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

export enum CAROUSEL_DURATION {
    HALF_SECOND = 500,
    ONE_SECOND = 1000,
    TWO_SECONDS = 2000
}

interface CarouselProps {
    className?: string
    effect: CAROUSEL_EFFECTS
    animationDuration: CAROUSEL_DURATION
    isLoop: boolean
    children: JSX.Element[]
}

export const Carousel = (config: CarouselProps) => {
    let carouselItemActiveIndex = -1;

    // remove non-<CarouselItem>
    React.Children.toArray(config.children).forEach((child: any, i: number) => {
        if (child.props.className?.includes("active")) {
            carouselItemActiveIndex = i;
        }
        if (child.type!.name !== "CarouselItem") { throw "Carousel cannot have other node aside from 'CarouselItem' component." }
    });
    const carouselItemsCount = config.children.length;

    // check carousel items exist
    if (carouselItemActiveIndex === -1) {
        throw "Carousel must have Carousel Item with class active."
    }

    // setup for carousel

    // hide carousel buttons 
    let isHideLeftButton = false;
    let isHideRightButton = false;

    // isLoop = true means all buttons are always shown
    if (!config.isLoop) {
        if (carouselItemActiveIndex === 0) {
            isHideLeftButton = true;
        } else if (carouselItemActiveIndex === carouselItemsCount - 1) {
            isHideRightButton = true;
        }
    }

    // render carousel items
    const preRenderCarouselItem = (child: JSX.Element, index: number) => {
        // Note: <CarouselItem> can have no parameters
        // we update its props here
        let props: CarouselItemProps  = {
            index: index,
            className: child.props.className,
            children: child.props.children,
            animationDuration: config.animationDuration
        };

        if (config.effect === CAROUSEL_EFFECTS.FADE) {
            props.style = {
                left: "0%"
            };
        }

        return React.cloneElement(child, props);
    }

    // hide show left / right buttons based on active carousel item
    const toggleButtons = (carousel: Element) => {
        const carouselItemActiveIndex = getCarouselItemActiveIndex(carousel);
        const leftButtonClassList = carousel.getElementsByClassName('left-button')[0]!.classList;
        const rightButtonClassList = carousel.getElementsByClassName('right-button')[0]!.classList;

        leftButtonClassList.remove('hidden');
        rightButtonClassList.remove('hidden');

        if (carouselItemActiveIndex === 0) {
            leftButtonClassList.add('hidden');
        } else if (carouselItemActiveIndex === carouselItemsCount - 1) {
            rightButtonClassList.add('hidden');
        }
    }

    const onCarouselArrowClick = (e: SyntheticEvent, direction: string) => {
        const carousel = getCarouselEl(e);

        if (isCarouselMoving(carousel)) {return}

        let nextCarouselItemActiveIndex = getCarouselItemActiveIndex(carousel);
        if (direction === CAROUSEL_DIRECTION.RIGHT) nextCarouselItemActiveIndex++;
        if (direction === CAROUSEL_DIRECTION.LEFT) nextCarouselItemActiveIndex--;

        // nextCarouselItemActiveIndex should always exist
        if (nextCarouselItemActiveIndex < 0) {
            nextCarouselItemActiveIndex = carouselItemsCount - 1;
        } else if (nextCarouselItemActiveIndex >= carouselItemsCount) {
            nextCarouselItemActiveIndex = 0;
        }

        showNextCarouselItem(e, nextCarouselItemActiveIndex, direction as CAROUSEL_DIRECTION);
    };

    const onCarouselIndicatorClick = (e: SyntheticEvent, nextCarouselItemActiveIndex: number): void => {
        const carousel = getCarouselEl(e);
        const currentCarouselIndicator = e.currentTarget;
        if (isCarouselMoving(carousel) || currentCarouselIndicator.classList.contains("active")) {
            return;
        }

        showNextCarouselItem(e, nextCarouselItemActiveIndex);
    };

    const showNextCarouselItem = (e: SyntheticEvent, nextCarouselItemActiveIndex: number, direction?: CAROUSEL_DIRECTION): void => {
        const carousel = getCarouselEl(e);
        const carouselItems = carousel?.getElementsByClassName('carousel-item');
        const carouselItemActive = carousel?.getElementsByClassName('carousel-item active')[0];
    
        // check if there is an active and is not animating
        if (carouselItemActive && !isCarouselMoving(carousel)) {
            const carouselItemNextActive = carouselItems![nextCarouselItemActiveIndex];

            carouselItemActive.classList.add("moving");
            carouselItemNextActive.classList.add("moving");
            carouselItemNextActive.classList.add("next-active");

            if (config.effect === CAROUSEL_EFFECTS.SLIDE) {
                showNewCarouselItemBySlide(carouselItemActive, carouselItemNextActive, direction);
            } else if (config.effect === CAROUSEL_EFFECTS.FADE) {
                showNewCarouselItemByFade(carouselItemActive, carouselItemNextActive);
            }

            // update carousel indicators
            const carouselIndicators = carousel.getElementsByClassName("carousel-indicators")[0]!;

            // set new active carousel indicator
            Array.prototype.forEach.call(carouselIndicators.getElementsByClassName("carousel-indicator"), function(element: Element) {
                element.classList.remove("active");
            });
            carouselIndicators.querySelector("[data-index='" + nextCarouselItemActiveIndex + "']")!.classList.add("active");

            // call post animation after animation duration
            setTimeout(() => {
                onTransitionEnd(carousel);
            }, config.animationDuration);
        }
    }

    const onTransitionEnd = (carousel: Element) => {
        const oldCarouselItemActive = carousel.getElementsByClassName('carousel-item active')[0];
        const newCarouselItemActive = carousel.getElementsByClassName('carousel-item next-active')[0];

        // reset everything
        oldCarouselItemActive.classList.remove("moving");
        oldCarouselItemActive.classList.remove("active");
        oldCarouselItemActive.classList.remove("!z-10");
        oldCarouselItemActive.classList.remove("!opacity-0");
        oldCarouselItemActive.classList.remove("!opacity-100");
        oldCarouselItemActive.classList.remove("transition-property-opacity");
        oldCarouselItemActive.classList.remove("transition-property-left");
        oldCarouselItemActive.classList.remove("!-left-full");
        oldCarouselItemActive.classList.remove("!left-full");

        newCarouselItemActive.classList.remove("moving");
        newCarouselItemActive.classList.remove("next-active");
        newCarouselItemActive.classList.remove("!z-10");
        newCarouselItemActive.classList.remove("!opacity-0");
        newCarouselItemActive.classList.remove("!opacity-100");
        newCarouselItemActive.classList.remove("transition-property-opacity");
        newCarouselItemActive.classList.remove("transition-property-left");
        newCarouselItemActive.classList.remove("!-left-full");
        newCarouselItemActive.classList.remove("!left-full");

        // add new active class
        newCarouselItemActive.classList.add("active");

        const carouselItemActiveIndex = parseInt(newCarouselItemActive.getAttribute("data-index")!);
        carousel.setAttribute("data-current-active-index", carouselItemActiveIndex.toString());

        // toggle buttons only if not isLoop
        if (!config.isLoop) toggleButtons(carousel);
    }

    return (
        <div className={`carousel h-full w-full overflow-hidden ${config.className ?? ''} ${config.effect}`} data-current-active-index={carouselItemActiveIndex}>
            <div className={`carousel-slide-container h-full w-full transition-left duration-${config.animationDuration}`} >
                { React.Children.map(config.children, (child: JSX.Element, index) => preRenderCarouselItem(child, index)) }
            </div>
            <div className={`left-button absolute w-16 h-16 top-1/2 left-0 translate-y-N50Percent cursor-pointer ${isHideLeftButton ? 'hidden' : ''}`} onClick={(e: SyntheticEvent) => onCarouselArrowClick(e, CAROUSEL_DIRECTION.LEFT)}>
                <div className='flex justify-center items-center h-full w-full bg-gray-600/[0.4] hover:bg-gray-600/[0.8] rounded-full'>
                    <FontAwesomeIcon icon={faAngleLeft} size="2xl" style={{ color: "#ffffff" }} />
                </div>
            </div>
            <div className={`right-button absolute w-16 h-16 top-1/2 right-0 translate-y-N50Percent cursor-pointer ${isHideRightButton ? 'hidden' : ''}`} onClick={(e: SyntheticEvent) => onCarouselArrowClick(e, CAROUSEL_DIRECTION.RIGHT)}>
                <div className='flex justify-center items-center h-full w-full bg-gray-600/[0.4] hover:bg-gray-600/[0.8] rounded-full'>
                    <FontAwesomeIcon icon={faAngleRight} size="2xl" style={{ color: "#ffffff" }} />
                </div>
            </div>
            <div className="carousel-indicators border-slate-100 absolute bottom-6 left-2/4 translate-x-N50Percent">
                { React.Children.map(config.children, (child: JSX.Element, index) => {
                    return <div className={`carousel-indicator inline-block bg-slate-200 w-6 h-6 rounded-full cursor-pointer ${carouselItemActiveIndex === index ? "active" : ""}`} onClick={(e) => onCarouselIndicatorClick(e, index)} data-index={index}></div>;
                }) }
            </div>
        </div>
    )
}

const showNewCarouselItemBySlide = (carouselItemActive: Element, carouselItemNextActive: Element, direction?: CAROUSEL_DIRECTION): void => {
    carouselItemActive.classList.add("moving");
    carouselItemNextActive.classList.add("moving");

    // if direction is not available get it manually based on the carousel item's data-index
    // this can happen if the carousel indicator is clicked instead of arrows
    if (!direction) {
        direction = parseInt(carouselItemActive.getAttribute('data-index')!) > parseInt(carouselItemNextActive.getAttribute('data-index')!) ? CAROUSEL_DIRECTION.LEFT : CAROUSEL_DIRECTION.RIGHT;
    }

    if (direction === CAROUSEL_DIRECTION.RIGHT) {
        carouselItemNextActive.classList.add("!left-full");
    } else if (direction === CAROUSEL_DIRECTION.LEFT) {
        carouselItemNextActive.classList.add("!-left-full");
    }

    carouselItemActive.classList.add("transition-property-left");
    carouselItemNextActive.classList.add("transition-property-left");

    // we use timeout because somehow, the transition-property-left is not in the dom yet when we update the left position
    // so we put the next logic in the other event loop
    setTimeout(() => {
        if (direction === CAROUSEL_DIRECTION.RIGHT) {
            carouselItemActive.classList.add("!-left-full");
            carouselItemNextActive.classList.remove("!left-full");
        } else if (direction === CAROUSEL_DIRECTION.LEFT) {
            carouselItemActive.classList.add("!left-full");
            carouselItemNextActive.classList.remove("!-left-full");
        }
    });
}

const showNewCarouselItemByFade = (carouselItemActive: Element, carouselItemNextActive: Element) => {
    carouselItemActive.classList.add("moving");
    carouselItemNextActive.classList.add("moving");

    carouselItemNextActive.classList.add("!opacity-0");

    carouselItemNextActive.classList.add("transition-property-opacity");

    setTimeout(() => {
        carouselItemNextActive.classList.add("!z-10");
        carouselItemNextActive.classList.add("!opacity-100");
    });
}

const getCarouselEl = (e: SyntheticEvent) : Element => {
    return e.currentTarget.closest('.carousel')!;
}

const isCarouselMoving = (carousel: Element) => {
    return carousel?.getElementsByClassName('carousel-item moving').length !== 0;
}

const getCarouselItemActiveIndex = (carousel: Element) : number => {
    return parseInt(carousel.getAttribute("data-current-active-index")!);
}