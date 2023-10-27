"use client"

import style from '@/app/components/toasts/_toast_main_container.module.css';

import React from 'react'
import ToastGroup from './_toast_group_container';
import { TOAST_POSITION } from '../../(globals)/global';

export const ToastMainContainer = () => {
  return (
    <>
      {/* TOP MIDDLE Toast container */}
      <ToastGroup position={TOAST_POSITION.TOP_MIDDLE}></ToastGroup>
      
      {/* TOP RIGHT Toast container */}
      <ToastGroup position={TOAST_POSITION.TOP_RIGHT}></ToastGroup>
      
      {/* BOTTOM RIGHT Toast container */}
      <ToastGroup position={TOAST_POSITION.BOTTOM_RIGHT}></ToastGroup>
    </>
  )
}
