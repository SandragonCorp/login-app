import React from 'react'

interface FullContainerProps {
  id?: string
  className?: string
  style?: object
  onClick?: () => void
  children?: React.ReactNode
}

export const FullContainer = (config: FullContainerProps) => {
  // pt-[72px] is the height of the navbar 
  return (
    <section id={config.id} className={`w-screen min-h-screen bg-fixed bg-center bg-no-repeat bg-cover ${config.className}`} style={ config.style } onClick={ config.onClick }>
      { config.children }
    </section>
  )
}
