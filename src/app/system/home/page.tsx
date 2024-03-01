"use client";
import {
    CalendarOutlined,
    FileOutlined,
    ReadOutlined,
    RobotOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserManagerComponent from './components/UserManagerComponent';
import PersonalCenterComponent from './components/PersonalCenterComponent';
import GuideManagerComponent from './components/GuideManagerComponent';
import MemorialManagerComponent from './components/MemorialManagerComponent';
import OrderManagerComponent from './components/OrderManagerComponent';
import MessageBoardManagerComponent from './components/MessageBoardManagerComponent';
import { get, post } from '@/request';
import { MyGlobalContext } from './MyGlobalContext';
import { Values } from './components/PersonalCenterComponent/component/editUserInfoModal';
import { useRouter } from 'next/navigation';

export default function SystemHome() {

    const [current, setCurrent] = useState('1');

    const [open, setOpen] = useState(false)

    const [userData, setUserData] = useState(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('userData') ?? '{}') : {})


    const router = useRouter()

    const getUserInfo = useCallback(async () => {
        if (userData.token) {
            const response = await get("/api/auth/getUserInfo/" + userData.userName)
            if (response.success) {
                setUserData(response.data)
            }
        }
    }, [userData.token, userData.userName]
    )
    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const onCreate = async (value: Values) => {
        let roleValue = ""
        switch (value.role) {
            case "1":
                roleValue = "管理员"
                break;
            case "2":
                roleValue = "讲解员"
                break;

            case "3":
                roleValue = "用户"
                break;
            default:
                break;
        }
        const response = await post("/api/auth/editUserInfo", {
            ...value, role: {
                code: value.role,
                value: roleValue
            },
            _id: userData._id
        })

        if (response.success) {
            setOpen(false)
            setUserData({
                ...value, role: {
                    code: value.role,
                    value: roleValue
                }
            })
        }


    }

    const logout = async () => {
        const response = await get("/api/auth/logout")
        if (response.success) {
            localStorage.removeItem('token')
            setUserData({})
            router.replace('/login')
        }
    }


    const menuList = [{
        label: "个人中心",
        key: "1",
        icon: <UserOutlined />
    }, {
        label: "用户管理",
        key: "2",
        icon: <TeamOutlined />
    }, {
        label: "讲解员管理",
        key: "3",
        icon: <RobotOutlined />
    }, {
        label: "纪念馆管理",
        key: "4",
        icon: <ReadOutlined />
    }, {
        label: "预约信息管理",
        key: "5",
        icon: <CalendarOutlined />
    }, {
        label: "留言板管理",
        key: "6",
        icon: <FileOutlined />
    }]

    const renderContent = () => {
        switch (current) {
            case "1":
                return <PersonalCenterComponent logout={logout} edit={() => { setOpen(true) }} open={open} onCancel={() => { setOpen(false) }} onCreate={onCreate} />

            case "2":
                return <UserManagerComponent />
            case "3":
                return <GuideManagerComponent />
            case "4":
                return <MemorialManagerComponent />
            case "5":
                return <OrderManagerComponent />
            case "6":
                return <MessageBoardManagerComponent />


            default:
                break;
        }
    }


    return (
        <MyGlobalContext.Provider value={{
            userData
        }}>
            <Layout hasSider>
                <Sider
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                >
                    <div style={{ margin: 16, display: "flex", alignItems: "center" }}>
                        <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} size="large" gap={6}>
                            {userData.username}
                        </Avatar>

                        <p style={{ marginLeft: 10 }}>{userData.username}</p>
                    </div>
                    <Menu onClick={onClick} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuList} />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ padding: 0, }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>
        </MyGlobalContext.Provider>
    )
}
