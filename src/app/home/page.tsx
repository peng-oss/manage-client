"use client";
import LoginModal, { Values } from "@/components/loginModal";
import { IHome } from "@/models/home";
import { get, post } from "@/request";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, Spinner, Tooltip } from "@nextui-org/react";
import { message } from "antd";
import { useEffect, useState } from "react";
import AppraisalComponent from "./components/appraisalComponent";
import MainComponent from "./components/mainComponent";
import MessageBoardComponent from "./components/messageBoardComponent";
import ReserveComponent from "./components/reserveComponent";
import { MyGlobalContext, UserData } from "./MyGlobalContext";


const TabList = ["首页", "留言板", "预约", "观后评价"]
export default function Home() {
    const [messageApi, contextHolder] = message.useMessage();
    const [currentActive, setCurrentActive] = useState("首页");

    const [userData, setUserData] = useState<UserData>({
        username: undefined,
        token: undefined
    })

    const [homeData, setHomeData] = useState<IHome>({
        introduction: "",
        notice: "",
        timeDetail: "",
        phone: ""
    })

    const [open, setOpen] = useState(false);


    useEffect(() => {
        fetchHomeData()
    }, [])


    const fetchHomeData = async () => {
        const response = await get<IHome>("/api/home")

        if (response.success && response.data) {
            setHomeData(response.data)

        } else {

        }
    }

    const renderContent = () => {
        switch (currentActive) {
            case "首页":
                return <MainComponent homeData={homeData} ></MainComponent>
            case "留言板":
                return <MessageBoardComponent></MessageBoardComponent>
            case "预约":
                return <ReserveComponent></ReserveComponent>

            case "观后评价":
                return <AppraisalComponent></AppraisalComponent>
            default:
                break;
        }
    }


    const onCreate = async (value: Values) => {
        const registerResponse = await post("/api/auth/register", value)
        const loginResponse = await post<{ userName: string, token: string }>("/api/auth/login", value)
        if (loginResponse.success && loginResponse.data) {
            setOpen(false)
            localStorage.setItem('token', loginResponse.data.token)
            setUserData(loginResponse.data)
            messageApi.info('登录成功');
        } else {
            messageApi.info(loginResponse.message);
        }

    }


    const onClickLogout = async () => {
        const response = await get("/api/auth/logout")

        if (response.success) {
            localStorage.removeItem('token')
            setUserData({
                username: undefined,
                token: undefined
            })
        }



    }
    return (
        <MyGlobalContext.Provider value={{
            userData, login: () => {
                setOpen(true);
            }
        }}>
            {contextHolder}
            <Navbar shouldHideOnScroll isBordered>
                <NavbarBrand>

                    <p className="font-bold text-inherit">三五九旅纪念馆</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {
                        TabList.map((item, index) => {
                            return (
                                <NavbarItem key={index}>
                                    <Button color={currentActive === item ? "primary" : "default"} variant="light" onClick={() => setCurrentActive(item)}>
                                        {item}
                                    </Button>
                                </NavbarItem>
                            )
                        })
                    }
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                        <Tooltip content={homeData.phone}>
                            <Button color="default" variant="light">联系电话</Button>
                        </Tooltip>
                    </NavbarItem>

                    <NavbarItem className="hidden lg:flex">
                        {
                            userData.token ? <Dropdown>
                                <DropdownTrigger>
                                    <Avatar name={userData.username} />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem onClick={onClickLogout} className="text-danger" color="danger">退出登录</DropdownItem>

                                </DropdownMenu>
                            </Dropdown> : <Button color="primary" variant="bordered" onClick={() => {
                                setOpen(true);
                            }}>登录/注册</Button>
                        }



                    </NavbarItem>
                </NavbarContent>

            </Navbar>
            {
                homeData.introduction === '' ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
                        <Spinner label="Loading..." color="primary" />
                    </div>

                    : renderContent()
            }

            <LoginModal open={open}
                onCreate={onCreate} onCancel={() => {
                    setOpen(false)
                }}></LoginModal>


        </MyGlobalContext.Provider>

    );
}
