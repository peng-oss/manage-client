import { IUserInfo } from '@/models/user';
import { deleteOne, get, post } from '@/request';
import { DeleteFilled, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Table, TableProps, message } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import useSWR from 'swr';
import { useGlobalContext } from '../../MyGlobalContext';
const items = [
    {
        label: '管理员',
        key: '1',
    },
    {
        label: '讲解员',
        key: '2',
    },
    {
        label: '用户',
        key: '3',
    },
];

export default function UserManagerComponent() {


    const { data: userList, mutate, isLoading } = useSWR<{ data: IUserInfo[] }>("/api/auth/getAllUserList", get)

    const { userData } = useGlobalContext()

    const [messageApi, contextHolder] = message.useMessage();
    const handleMenuClick = async (e: MenuInfo, record: IUserInfo) => {
        const roleValue = items?.find(item => item?.key === e.key)?.label
        const response = await post("/api/auth/editUserInfo", {
            _id: record._id,
            role: {
                code: e.key,
                value: roleValue
            }
        })

        if (response.success) {
            messageApi.success('修改成功');
            mutate()
        } else {
            messageApi.error('修改失败');
        }
    };

    const handleButtonClick = async (record: IUserInfo) => {

        const response = await deleteOne("/api/auth/editUserInfo", {
            _id: record._id,
        })

        if (response.success) {
            messageApi.success('删除成功');
            mutate()
        } else {
            messageApi.error('删除失败');
        }



    };



    const columns: TableProps<IUserInfo>['columns'] = [
        {
            title: '用户名',
            dataIndex: 'username',

        },
        {
            title: '性别',
            dataIndex: 'sex',

        },
        {
            title: '电话',
            dataIndex: 'phone',

        },
        {
            title: '身份',

            dataIndex: 'role',
            render: (data, record) => {

                let disable = false
                if (record.username === userData?.username) {
                    disable = true
                }

                if (userData?.role?.code !== "1") {
                    disable = true
                }
                return <Dropdown.Button icon={<DownOutlined />} disabled={disable} menu={{
                    items,
                    onClick: (e) => {
                        handleMenuClick?.(e, record)
                    },
                }} >
                    {data.value}

                </Dropdown.Button>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                let disable = false
                if (record.username === userData?.username) {
                    disable = true
                }
                if (userData?.role?.code !== "1") {
                    disable = true
                }
                return <Space size="middle">
                    <Button onClick={() => {
                        handleButtonClick(record)
                    }} disabled={disable} icon={<DeleteFilled color='red' />}>删除</Button>

                </Space>
            },
        },
    ];


    return (
        <div>         {contextHolder}<Table loading={isLoading} rowKey={(e) => e._id} columns={columns} dataSource={userList?.data} /></div>
    )
}
