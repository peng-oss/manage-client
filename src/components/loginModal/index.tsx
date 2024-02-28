import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Radio } from 'antd';
import { EyeTwoTone, UserOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

export interface Values {
    useName: string;
    password: string;
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const LoginModal: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="登录/注册"
            okText="登录/注册"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
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


            </Form>
        </Modal>
    );
};
export default LoginModal
