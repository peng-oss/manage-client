import { Button, Descriptions, Switch } from 'antd';
import { useMemo } from 'react';
import { useGlobalContext } from '../../MyGlobalContext';
import EditUserInfoModal, { Values } from './component/editUserInfoModal';
import "./styles.css";


interface Props {
    onCreate: (value: Values) => void
    edit: () => void
    open: boolean;
    onCancel: () => void;
    logout: () => void
}
export default function PersonalCenterComponent(props: Props) {
    const { onCreate, open, edit, onCancel, logout } = props



    const { userData } = useGlobalContext()

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const items = useMemo(() => {
        if (userData?.role?.code === "2") {
            return [
                {
                    key: '1',
                    label: '用户名',
                    children: <p>{userData?.username}</p>,
                },
                {
                    key: '2',
                    label: '电话',
                    children: <p>{userData?.phone}</p>,
                },
                {
                    key: '3',
                    label: '性别',
                    children: <p>{userData?.sex}</p>,
                },
                {
                    key: '4',
                    label: '角色',
                    children: <p>{userData?.role?.value}</p>,
                },
                {
                    key: '5',
                    label: '接待讲解状态',
                    children: <Switch value={userData?.receiveStatus} disabled />,
                },

            ]
        } else {
            return [
                {
                    key: '1',
                    label: '用户名',
                    children: <p>{userData?.username}</p>,
                },
                {
                    key: '2',
                    label: '电话',
                    children: <p>{userData?.phone}</p>,
                },
                {
                    key: '3',
                    label: '性别',
                    children: <p>{userData?.sex}</p>,
                },
                {
                    key: '4',
                    label: '角色',
                    children: <p>{userData?.role?.value}</p>,
                },


            ]
        }
    }, [userData?.phone, userData?.receiveStatus, userData?.role?.code, userData?.role?.value, userData?.sex, userData?.username])

    return (
        <div className='container'>
            <Descriptions bordered title="个人信息" items={items} extra={<Button type="primary" onClick={edit}>修改个人信息</Button>} />
            <EditUserInfoModal open={open} onCreate={onCreate} onCancel={onCancel} />

            <div style={{ display: "flex", justifyContent: "flex-end", margin: "100px 0" }}>
                <Button type={"default"} onClick={logout}>退出登录</Button>
            </div>

        </div>
    )
}
