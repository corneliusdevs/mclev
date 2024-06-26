'use-client'

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
  children: ReactNode
}


const ToastNotifProvider:FC<ProvidersProps> = ({ children })=>{

    return (
     <>
       <Toaster 
       position='top-center' reverseOrder= {false}/>
       { children } 
     </>
    )
}

export default ToastNotifProvider