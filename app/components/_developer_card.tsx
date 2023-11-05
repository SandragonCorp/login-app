import React from 'react'

import style from "./_developer_card.module.css";

interface DeveloperCardProps {
  className?: string
  image: string
  name: string
  position: string
  quote: string
}

export const DeveloperCard = (config: DeveloperCardProps) => {
  return (
    <div className={`${ style.developerCard } ${config.className}`}>
        <img src={config.image}/>
        <div className={`${ style.developerName }`}>{config.name}</div>
        <div className={`${ style.developerPosition }`}>{config.position}</div>
        <div className={`${ style.developerQuote }`}>"{config.quote}" </div>
    </div>
  )
}
