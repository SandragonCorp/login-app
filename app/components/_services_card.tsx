import React from 'react'

import style from "./_services_card.module.css";

interface ServicesCardProps {
  title: string
  className?: string
  children: React.ReactNode
}

export const ServicesCard = (config: ServicesCardProps) => {
  return (
    <div className={`${style.servicesCard} ${config.className}`}>
      <div className="text-4xl">{config.title}</div>
      <div className="pt-5">
          { config.children }
      </div>
  </div>
  )
}
