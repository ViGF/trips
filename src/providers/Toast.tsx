'use client'

import { ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider({children}: {children: ReactNode}) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}