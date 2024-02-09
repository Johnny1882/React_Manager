import React from 'react'
import ReactDOM from 'react-dom/client'

import "reset-css"
//UI框架

//全局样式
import "@/assets/styles/global.scss"
//组件样式

// import App from './App.tsx'
import Router from "./router"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
)
