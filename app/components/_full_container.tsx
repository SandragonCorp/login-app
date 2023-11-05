import React from 'react'

interface FullContainerProps {
  bgImageSrc?: string | null
  className?: string
  children?: React.ReactNode
}

export const FullContainer = (config: FullContainerProps) => {
  // pt-[72px] is the height of the navbar 
  return (
    <section className={`w-full min-h-full pt-[72px] bg-fixed bg-center bg-no-repeat bg-cover ${config.className}`} style={ config.bgImageSrc ? {backgroundImage: `url(${config.bgImageSrc})`} : {} }>
        { config.children }
    </section>
  )
}