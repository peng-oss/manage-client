"use client";
import React, { useState } from 'react'
import "./style.css"
import { Button, Card, Checkbox, Form, Input, message } from 'antd'

import { EyeTwoTone, UserOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { post } from '@/request';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();

    const [isBtnLoading, setIsBtnLoading] = useState(false)

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        setIsBtnLoading(true)
        const registerResponse = await post("/api/auth/register", values)
        const loginResponse = await post<{ userName: string, token: string }>("/api/auth/login", values)
        if (loginResponse.success && loginResponse.data) {
            localStorage.setItem('token', loginResponse.data.token)
            localStorage.setItem('userData', JSON.stringify(loginResponse.data))
            messageApi.info('登录成功');
            router.push("/system/home")
        } else {
            messageApi.error(loginResponse.message);
        }

        setIsBtnLoading(false)
    };

    return (
        <div className='loginContainer'>
            {contextHolder}
            <Card style={{ width: 500, }}>
                <Form
                    name="normal_login"
                    className="loginForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入你的用户名!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码!' }]}
                    >

                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="密码"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-between'>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                        </div>

                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button loading={isBtnLoading} type="primary" htmlType="submit" className="login-form-button">
                                登录/注册
                            </Button>
                        </div>


                    </Form.Item>
                </Form>


            </Card >
        </div >
    )
}
