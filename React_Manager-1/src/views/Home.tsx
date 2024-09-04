import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from "react-router-dom"

import MainMenu from "@/component/MainMenu"

const { Header, Content, Footer, Sider } = Layout;



const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
//   const navigateTo = useNavigate()

//   //Routing
//   const menuClick = (e:{key:string}) => {
//     //click to router, using hooks
//     console.log(e.key)
//     navigateTo(e.key)
//   }

//   const [openKeys, setOpenKeys] = useState(['']);
//   const handleOpenChange = (keys:string[]) => {
//     setOpenKeys([keys[keys.length - 1]]);
//   }

  return (
    <Layout style={{ minHeight: '100vh' }}>

        {/* 侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
            <MainMenu />
      </Sider>
      {/* 右边栏 */}
      <Layout>
        {/* 头部白色 */}
        <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
            <Breadcrumb style={{ lineHeight: '64px' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
        </Header>

        {/* 内容，白色盒子 */}
        <Content style={{ margin: '16px 16px' }}>
          
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        {/* 底部签名 */}
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px'}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;