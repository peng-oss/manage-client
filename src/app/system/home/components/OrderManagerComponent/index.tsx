

import { IReserve } from '@/models/reserve';
import { deleteOne, get } from '@/request';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Space, Table, TableProps, message } from 'antd';
import useSWR from 'swr';
import { useGlobalContext } from '../../MyGlobalContext';

export default function OrderManagerComponent() {


    const { data: userList, error, isLoading, mutate } = useSWR<{
        data: IReserve[]
    }>("/api/reserve/getReserveList", get)

    const { userData } = useGlobalContext()

    const [messageApi, contextHolder] = message.useMessage();


    const handleButtonClick = async (record: IReserve) => {

        const response = await deleteOne("/api/reserve/editReserve", {
            _id: record._id,
        })

        if (response.success) {
            messageApi.success('删除成功');
            mutate()
        } else {
            messageApi.error('删除失败');
        }



    };



    const columns: TableProps<IReserve>['columns'] = [
        {
            title: '用户名',
            dataIndex: 'username',

        },
        {
            title: '预约时间',
            dataIndex: 'dateString',

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
        <div>    {contextHolder}<Table loading={isLoading} rowKey={(e) => e._id} columns={columns} dataSource={userList?.data} /></div>
    )
}
