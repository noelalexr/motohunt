import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router";
// import { VitalsProvider } from './contexts/VitalsContext';
// import ToastProvider from './components/ToastProvider';

import router from './router';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <VitalsProvider> */}
      <RouterProvider router={router}/>
      {/* <ToastProvider /> */}
    {/* </VitalsProvider> */}
  </StrictMode>,
)
