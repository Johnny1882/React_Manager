import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '/page1', <PieChartOutlined />),
  getItem('Option 2', '/page2', <DesktopOutlined />),
  getItem('User', 'page3', <UserOutlined />, [
    getItem('Page301', '/page3/page301'),
    getItem('Page302', '/page3/page302'),
    getItem('Page303', '/page3/page303'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigateTo = useNavigate()

    //Routing
    const menuClick = (e:{key:string}) => {
        //click to router, using hooks
        console.log(e.key)
        navigateTo(e.key)
    }

    const [openKeys, setOpenKeys] = useState(['']);
    const handleOpenChange = (keys:string[]) => {
        setOpenKeys([keys[keys.length - 1]]);
    }

    return (
        <Menu 
            theme="dark" 
            defaultSelectedKeys={['/page1']} 
            mode="inline" 
            items={items} 
            onClick={menuClick}

            onOpenChange={handleOpenChange}
            openKeys={openKeys}
            />
    )
}

export default View