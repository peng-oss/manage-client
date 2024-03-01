import { useGlobalContext } from '@/app/system/home/MyGlobalContext';
import { Form, Input, Modal, Radio } from 'antd';

import React, { useMemo } from 'react'

export interface Values {
    username: string;
    phone: string;
    role: string;
    sex: string
}
interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
export default function EditUserInfoModal(props: CollectionCreateFormProps) {
    const { open, onCreate, onCancel } = props
    const [form] = Form.useForm();

    const { userData } = useGlobalContext()

    console.log('peng-oss😈--------userData11------', userData)

    return (
        <Modal
            open={open}
            title="编辑个人信息"
            okText="提交"
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
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ username: userData?.username, phone: userData?.phone, role: userData?.role?.code, sex: userData?.sex }}
            >
                <Form.Item
                    name="username"
                    label="用户名"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item name="phone" label="电话">
                    <Input />
                </Form.Item>
                <Form.Item name="sex" label="性别" className="collection-create-form_last-form-item">
                    <Radio.Group >
                        <Radio defaultChecked={userData?.sex === "男"} value="男">男</Radio>
                        <Radio defaultChecked={userData?.sex === "女"} value="女">女</Radio>
                    </Radio.Group>
                </Form.Item>
                {
                    userData?.role?.code === "1" ? <Form.Item name="role" label="角色" className="collection-create-form_last-form-item">
                        <Radio.Group >
                            <Radio defaultChecked={userData.role?.code === "1"} value="1">管理员</Radio>
                            <Radio value="2">讲解员</Radio>
                            <Radio value="3">用户</Radio>
                        </Radio.Group>
                    </Form.Item> : null
                }


            </Form>
        </Modal>
    )
}
