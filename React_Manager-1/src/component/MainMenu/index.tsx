import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom"
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
    const currentRoute = useLocation()

    //Routing
    const menuClick = (e:{key:string}) => {
        //click to router, using hooks
        console.log(e.key)
        navigateTo(e.key)
    }

    let firstOpenKey:string = "";
  // 在这里进行对比   find
    function findKey(obj:{key:string}){
        return obj.key === currentRoute.pathname
    }
    // 多对比的是多个children
    for(let i=0;i<items.length;i++){
        // 判断找到不到
        if(items[i]!['children'] && items[i]!['children'].length>0 && items[i]!['children'].find(findKey)){
        firstOpenKey = items[i]!.key as string;
        break;
        }
    }
  //items[???]['children'].find(findKey)   // 这结果如果找到拿到的，就是找到的这个对象，转布尔值就是true。如果找不到转布尔值就是false

  // 设置展开项的初始值
    const [openKeys, setOpenKeys] = useState([firstOpenKey]);

    // const [openKeys, setOpenKeys] = useState(['']);
    const handleOpenChange = (keys:string[]) => {
        setOpenKeys([keys[keys.length - 1]]);
    }

    return (
        <Menu 
            theme="dark" 
            defaultSelectedKeys={[currentRoute.pathname]} 
            mode="inline" 
            items={items} 
            onClick={menuClick}

            onOpenChange={handleOpenChange}
            openKeys={openKeys}
            />
    )
}

export default View