import React from 'react'
import ReactDOM from 'react-dom/client'

import "reset-css"
//UI框架

//全局样式
import "@/assets/styles/global.scss"
//组件样式

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
// import Router from "./router"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
