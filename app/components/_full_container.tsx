import React from 'react'

interface FullContainerProps {
  bgImageSrc?: string | null
  id?: string
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const FullContainer = (config: FullContainerProps) => {
  // pt-[72px] is the height of the navbar 
  return (
    <section id={config.id} className={`w-screen min-h-screen pt-[72px] bg-fixed bg-center bg-no-repeat bg-cover ${config.className}`} style={ config.bgImageSrc ? {backgroundImage: `url(${config.bgImageSrc})`} : {} } onClick={ config.onClick }>
        { config.children }
    </section>
  )
}
