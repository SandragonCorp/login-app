import React from 'react'

import style from "./_carousel_item.module.css";

export interface CarouselItemProps {
  style?: object
  className?: string
  index?: number,
  animationDuration?: number
  children: React.ReactNode
}

export const CarouselItem = (config: CarouselItemProps) => {
  return (
    <div className={`carousel-item w-full h-full bg-red-900 absolute top-0 transition-none duration-${config.animationDuration} ${config.className ?? ''}`} style={config.style} data-index={config.index}>
      {config.children}
    </div>
  )
}
