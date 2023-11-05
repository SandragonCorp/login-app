import React from 'react'

import style from "./_expect_from_us_card.module.css";

interface ExpectFromUsProps {
  title: string
  className?: string
  children: React.ReactNode
}

export const ExpectFromUs = (config: ExpectFromUsProps) => {
  return (
    <div className={`text-left mb-5 ${config.className}`}>
      <div className="text-3xl font-bold italic">{ config.title }</div>
      <p className='mt-2 indent-8'>{ config.children }</p>
    </div>
  )
}
