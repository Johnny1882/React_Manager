import React, {lazy} from "react"
import Home from "../views/Home"
// import About from "../views/About"

const Page1 = lazy(()=>import("../views/Page1"))
const Page2 = lazy(()=>import("../views/Page2"))
const Page301 = lazy(()=>import("../views/Page301"))

import { Navigate } from "react-router-dom"

const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>loading...</div>}>
        {comp}
    </React.Suspense>
);

const routes = [
    {
        path:'/',
        element: <Navigate to="/page1"/>
    },
    {
        path:'/',
        element: <Home/>,
        children:[
            {
                path:'page1',
                element: withLoadingComponent(<div>page1</div>)
            },
            {
                path:'page2',
                element: withLoadingComponent(<div>page2</div>)
            },
            {
                path:'page3/page301',
                element: withLoadingComponent(<div>page301</div>)
            }
        ]
    },
    {
        path:'*',
        element: <div>404</div>
    }
]

export default routes


// // 组件形式的写法
// import App from "../App"
// import Home from "../views/Home"
// import About from "../views/About"
// import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
// // 两种路由模式的组件： BrowserRouter ( History模式 ) ， HashRouter( Hash模式 )

// // const baseRouter = () => {
// //     return (
// //     <BrowserRouter>
// //       <Routes>
// //           <Route path="/" element={<App/>}>
// //               <Route path="/home" element={<Home/>}></Route>
// //               <Route path="/about" element={<About/>}></Route>
// //           </Route>
// //       </Routes>
// //   </BrowserRouter>
// //   )
// // }
// // 以上写法可以简写为：
// const baseRouter = () => (
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<App/>}>
//               {/* 配置 用户访问/ 的时候，重定向到/home路径 */}
//                 <Route path="/" element={<Navigate to="/home" />}></Route>
//                 <Route path="/home" element={<Home/>}></Route>
//                 <Route path="/about" element={<About/>}></Route>
//             </Route>
//         </Routes>
//     </BrowserRouter>
// )
// export default baseRouter


// // {
// //   path:"/home",
// //   component:
// // }