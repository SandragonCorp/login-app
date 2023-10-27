"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'
import { ToastProps } from '../components/toasts/_toast';

interface GlobalContextProps {

}

const GlobalContext = createContext<GlobalContextProps>({

});

interface Props {
  children: React.ReactNode
}

export const AppContext = ({ children }: Props ) => {

  return (
    <GlobalContext.Provider value={{} as GlobalContextProps}>
        { children }
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);

/**
 * To add a global variable,
 * add variables to the GlobalContext.Provider::value
 * value={{var1, var2, ...}}
 * then use
 * const {var1, var2, ...} = useGlobalContext();
 * in the target component
 */