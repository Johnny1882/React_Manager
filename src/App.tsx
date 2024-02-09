import { useState } from 'react'
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { Outlet,Link } from "react-router-dom"


import Comp1 from "@/component/Comp1"
import Comp2 from '@/component/Comp2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "App">
        this is a react app
        {/* <Button type = "primary" >my button</Button>
        <UpCircleOutlined style = { {fontSize: '40px', color: 'red'} }/> */}

        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        {/* 占位符，用来展示组件 */}
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
